import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { db, pool } from './index.js';
import { 
  users, 
  emissionFactors, 
  onboardingResponses, 
  activities, 
  goals, 
  badges, 
  userBadges 
} from './schema.js';
import { eq } from 'drizzle-orm';

// Official Indian Emission Factors Dataset (India GHG Program & CEA Karnataka)
const SEED_EMISSION_FACTORS = [
  // 1. Transport Factors (Table 5.1.1, 5.2.1, 5.3.1, 5.4.1 & BMRCL CDM)
  {
    id: 'transport_walking',
    category: 'transport',
    subtype: 'walking',
    factorValue: '0.000000',
    unit: 'kg CO₂/km',
    label: 'Walking / Foot (Basavanagudi/Bull Temple Road)',
    source: 'Zero operational emissions',
    region: 'Bengaluru Urban'
  },
  {
    id: 'transport_bicycle',
    category: 'transport',
    subtype: 'bicycle',
    factorValue: '0.000000',
    unit: 'kg CO₂/km',
    label: 'Bicycle / Yulu Miracle Cycle',
    source: 'Zero operational emissions',
    region: 'Bengaluru Urban'
  },
  {
    id: 'transport_ev_scooter',
    category: 'transport',
    subtype: 'ev_scooter',
    factorValue: '0.012000',
    unit: 'kg CO₂/km',
    label: 'Electric Scooter (Ather 450X / Ola S1)',
    source: 'BESCOM / CEA Southern Grid baseline',
    region: 'Karnataka / Southern Grid'
  },
  {
    id: 'transport_metro',
    category: 'transport',
    subtype: 'metro',
    factorValue: '0.012500',
    unit: 'kg CO₂/passenger-km',
    label: 'Namma Metro Green/Purple Line (National College / Lalbagh)',
    source: 'BMRCL Clean Development Mechanism (CDM)',
    region: 'Bengaluru Namma Metro'
  },
  {
    id: 'transport_bus_city',
    category: 'transport',
    subtype: 'bus_city',
    factorValue: '0.015161',
    unit: 'kg CO₂/passenger-km',
    label: 'BMTC City Bus (Bengaluru Metropolitan Transport Corp)',
    source: 'India GHG Program Table 5.4.1 (CIRT STU data)',
    region: 'Karnataka / BMTC'
  },
  {
    id: 'transport_scooter_petrol',
    category: 'transport',
    subtype: 'scooter_petrol',
    factorValue: '0.036800',
    unit: 'kg CO₂/km',
    label: 'Petrol Scooter (<110cc Honda Activa / TVS Jupiter / Dio)',
    source: 'India GHG Program Table 5.1.1',
    region: 'All-India'
  },
  {
    id: 'transport_bike_100cc',
    category: 'transport',
    subtype: 'bike_100cc',
    factorValue: '0.035800',
    unit: 'kg CO₂/km',
    label: 'Motorcycle (<100cc Hero Splendor / Platina)',
    source: 'India GHG Program Table 5.1.1',
    region: 'All-India'
  },
  {
    id: 'transport_bike_150cc',
    category: 'transport',
    subtype: 'bike_150cc',
    factorValue: '0.045800',
    unit: 'kg CO₂/km',
    label: 'Motorcycle (<200cc Bajaj Pulsar / TVS Apache / Yamaha FZ)',
    source: 'India GHG Program Table 5.1.1',
    region: 'All-India'
  },
  {
    id: 'transport_bike_bullet',
    category: 'transport',
    subtype: 'bike_bullet',
    factorValue: '0.059700',
    unit: 'kg CO₂/km',
    label: 'Motorcycle (<500cc Royal Enfield Classic 350 / Hunter)',
    source: 'India GHG Program Table 5.1.1',
    region: 'All-India'
  },
  {
    id: 'transport_auto_cng',
    category: 'transport',
    subtype: 'auto_cng',
    factorValue: '0.107680',
    unit: 'kg CO₂/km',
    label: 'Namma Auto Rickshaw (LPG / CNG / Electric)',
    source: 'India GHG Program Table 5.2.1',
    region: 'Bengaluru Urban'
  },
  {
    id: 'transport_auto_petrol',
    category: 'transport',
    subtype: 'auto_petrol',
    factorValue: '0.113500',
    unit: 'kg CO₂/km',
    label: 'Namma Auto Rickshaw (Petrol 2-Stroke/4-Stroke)',
    source: 'India GHG Program Table 5.2.1',
    region: 'All-India'
  },
  {
    id: 'transport_car_hatchback_petrol',
    category: 'transport',
    subtype: 'car_hatchback_petrol',
    factorValue: '0.127000',
    unit: 'kg CO₂/km',
    label: 'Hatchback Petrol (<1000cc Swift / i10 / Tiago)',
    source: 'India GHG Program Table 5.3.1',
    region: 'All-India'
  },
  {
    id: 'transport_car_cab_shared',
    category: 'transport',
    subtype: 'car_cab_shared',
    factorValue: '0.065000',
    unit: 'kg CO₂/passenger-km',
    label: 'Shared Cab / Ola / Uber Shuttle (South Bengaluru)',
    source: 'India GHG Program Shared Factor',
    region: 'Bengaluru Urban'
  },

  // 2. Electricity Factors (CEA Southern Regional Grid / BESCOM Karnataka)
  {
    id: 'energy_hostel_room',
    category: 'energy',
    subtype: 'hostel_room',
    factorValue: '0.708000',
    unit: 'kg CO₂/kWh',
    label: 'BMSCE Campus Hostel Room (Shared lights, fan, study lamp)',
    source: 'CEA CO2 Baseline Database Indian Power Sector (Ver 19)',
    region: 'Karnataka / BESCOM'
  },
  {
    id: 'energy_hostel_ac_room',
    category: 'energy',
    subtype: 'hostel_ac_room',
    factorValue: '0.708000',
    unit: 'kg CO₂/kWh',
    label: 'Hostel Room with Geyser & High Load',
    source: 'CEA Baseline Southern Regional Grid',
    region: 'Karnataka / BESCOM'
  },
  {
    id: 'energy_pg_sharing',
    category: 'energy',
    subtype: 'pg_sharing',
    factorValue: '0.708000',
    unit: 'kg CO₂/kWh',
    label: 'Basavanagudi / Hanumanthnagar / Jayanagar PG Room',
    source: 'CEA Baseline Southern Regional Grid',
    region: 'Karnataka / BESCOM'
  },
  {
    id: 'energy_rooftop_solar',
    category: 'energy',
    subtype: 'rooftop_solar',
    factorValue: '0.045000',
    unit: 'kg CO₂/kWh',
    label: 'BMSCE Rooftop Solar Tariff',
    source: 'Life-cycle assessment Karnataka Renewable Energy',
    region: 'Karnataka'
  },

  // 3. Food Factors (South Indian & Mess Diet)
  {
    id: 'food_pure_veg',
    category: 'food',
    subtype: 'pure_veg',
    factorValue: '1.700000',
    unit: 'kg CO₂e/day',
    label: 'South Indian Vegetarian (Dosa, Idli-Vada, Bisibelebath, Sambar Rice, Curd)',
    source: 'Indian Dietary Carbon Assessment',
    region: 'South India'
  },
  {
    id: 'food_jain_veg',
    category: 'food',
    subtype: 'jain_veg',
    factorValue: '1.500000',
    unit: 'kg CO₂e/day',
    label: 'Jain Vegetarian (Rootless traditional South Indian satvik meal)',
    source: 'Indian Dietary Carbon Assessment',
    region: 'India'
  },
  {
    id: 'food_vegan_indian',
    category: 'food',
    subtype: 'vegan_indian',
    factorValue: '1.250000',
    unit: 'kg CO₂e/day',
    label: '100% Plant-Based Vegan (Filter coffee with plant milk, no ghee/curd)',
    source: 'Plant-Based Indian Dietary Studies',
    region: 'India'
  },
  {
    id: 'food_occasional_nonveg',
    category: 'food',
    subtype: 'occasional_nonveg',
    factorValue: '2.800000',
    unit: 'kg CO₂e/day',
    label: 'Eggitarian / Weekend Non-Veg (Eggs, Military Hotel Chicken Biryani once a week)',
    source: 'Indian Dietary Carbon Assessment',
    region: 'South India'
  },
  {
    id: 'food_regular_nonveg',
    category: 'food',
    subtype: 'regular_nonveg',
    factorValue: '4.600000',
    unit: 'kg CO₂e/day',
    label: 'Regular Non-Vegetarian (Frequent chicken, mutton, or fish)',
    source: 'Indian Dietary Carbon Assessment',
    region: 'India'
  },

  // 4. Shopping & Academic Supplies
  {
    id: 'shopping_clothing_desi',
    category: 'shopping',
    subtype: 'clothing_desi',
    factorValue: '7.500000',
    unit: 'kg CO₂e/item',
    label: 'New Cotton Kurta / Shirt / Jeans from Gandhi Bazaar / Commercial St',
    source: 'Textile Carbon Assessment India',
    region: 'Karnataka'
  },
  {
    id: 'shopping_thrift_clothes',
    category: 'shopping',
    subtype: 'thrift_clothes',
    factorValue: '0.800000',
    unit: 'kg CO₂e/item',
    label: 'Thrifted / Pre-loved Clothes (Student Swap / Flea Market)',
    source: 'WRAP / Circular Fashion Study',
    region: 'Bengaluru'
  },
  {
    id: 'shopping_books_photocopy',
    category: 'shopping',
    subtype: 'books_photocopy',
    factorValue: '1.000000',
    unit: 'kg CO₂e/bundle',
    label: 'VTU / BMSCE Engineering Xerox Notes & Textbooks',
    source: 'Paper Life-Cycle Assessment',
    region: 'Karnataka'
  },

  // 5. Waste & Scrap Recycling
  {
    id: 'waste_municipal_dump',
    category: 'waste',
    subtype: 'municipal_dump',
    factorValue: '0.600000',
    unit: 'kg CO₂e/kg',
    label: 'BBMP Mixed Waste to Landfill',
    source: 'BBMP Solid Waste Assessment & EPA WARM',
    region: 'Bengaluru Urban'
  },
  {
    id: 'waste_kabadiwala_recycled',
    category: 'waste',
    subtype: 'kabadiwala_recycled',
    factorValue: '0.050000',
    unit: 'kg CO₂e/kg',
    label: 'Given to Local Basavanagudi Gujri Shop (Kabadiwala / Raddi Scrap)',
    source: 'Circular Economy Informal Recycling Study',
    region: 'Bengaluru Urban'
  }
];

// Campus Badges
const SEED_BADGES = [
  {
    id: 'badge_namma_metro',
    name: 'Namma Metro Rider',
    description: 'Logged 10 trips on Green/Purple Line to BMSCE',
    icon: 'Train',
    category: 'transport',
    triggerRule: 'metro_trips_gte_10'
  },
  {
    id: 'badge_gandhi_bazaar',
    name: 'Gandhi Bazaar Pedestrian',
    description: 'Walked or cycled across Basavanagudi',
    icon: 'Bike',
    category: 'transport',
    triggerRule: 'active_travel_gte_5'
  },
  {
    id: 'badge_gujri_hero',
    name: 'Namma Gujri Hero',
    description: 'Diverted campus raddi scrap to recycling',
    icon: 'Recycle',
    category: 'waste',
    triggerRule: 'kabadiwala_scrap_gte_5'
  },
  {
    id: 'badge_bmsce_energy',
    name: 'BMSCE Energy Saver',
    description: 'Maintained low electricity usage in campus hostel',
    icon: 'Zap',
    category: 'energy',
    triggerRule: 'energy_kwh_lte_60'
  },
  {
    id: 'badge_hasiru_bengaluru',
    name: 'Hasiru Bengaluru Champion',
    description: 'Maintained 30 days of active climate auditing',
    icon: 'Award',
    category: 'general',
    triggerRule: 'active_audit_days_gte_30'
  }
];

async function seed() {
  console.log('🌱 Starting EcoSphere database seed for Supabase...');

  try {
    // 1. Seed Emission Factors
    console.log(`Inserting ${SEED_EMISSION_FACTORS.length} official Indian emission factors...`);
    for (const factor of SEED_EMISSION_FACTORS) {
      await db.insert(emissionFactors)
        .values(factor)
        .onConflictDoUpdate({
          target: emissionFactors.id,
          set: {
            factorValue: factor.factorValue,
            label: factor.label,
            source: factor.source,
            region: factor.region,
            unit: factor.unit
          }
        });
    }

    // 2. Seed Badges
    console.log(`Inserting ${SEED_BADGES.length} campus sustainability badges...`);
    for (const badge of SEED_BADGES) {
      await db.insert(badges)
        .values(badge)
        .onConflictDoUpdate({
          target: badges.id,
          set: {
            name: badge.name,
            description: badge.description,
            icon: badge.icon,
            category: badge.category
          }
        });
    }

    // 3. Seed Demo Student (Chetan Rao)
    const studentPasswordHash = bcrypt.hashSync('demo123', 10);
    const existingStudent = await db.select().from(users).where(eq(users.email, 'chetan.rao.cs23@bmsce.ac.in'));
    let studentId;

    if (existingStudent.length === 0) {
      const inserted = await db.insert(users).values({
        name: 'Chetan Rao',
        email: 'chetan.rao.cs23@bmsce.ac.in',
        passwordHash: studentPasswordHash,
        role: 'student',
        university: 'B.M.S. College of Engineering (BMSCE), Bull Temple Road, Basavanagudi, Bengaluru',
        major: 'B.E. Computer Science & Engineering (Batch 2026)',
        hasCompletedOnboarding: true,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      }).returning({ id: users.id });
      studentId = inserted[0].id;
      console.log('Created student Chetan Rao:', studentId);
    } else {
      studentId = existingStudent[0].id;
      console.log('Student Chetan Rao already exists:', studentId);
    }

    // 4. Seed Demo Campus Admin (Dean Dr. H.S. Jagadeesh)
    const adminPasswordHash = bcrypt.hashSync('admin123', 10);
    const existingAdmin = await db.select().from(users).where(eq(users.email, 'sustainability.dean@bmsce.ac.in'));
    if (existingAdmin.length === 0) {
      await db.insert(users).values({
        name: 'Dr. H.S. Jagadeesh',
        email: 'sustainability.dean@bmsce.ac.in',
        passwordHash: adminPasswordHash,
        role: 'admin',
        university: 'B.M.S. College of Engineering (BMSCE), Basavanagudi, Bengaluru',
        major: 'Dean of Campus Development & Sustainability',
        hasCompletedOnboarding: true,
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
      });
      console.log('Created Campus Admin Dr. H.S. Jagadeesh');
    }

    // 5. Seed Onboarding Baseline for Chetan Rao
    const existingOnboarding = await db.select().from(onboardingResponses).where(eq(onboardingResponses.userId, studentId));
    if (existingOnboarding.length === 0) {
      await db.insert(onboardingResponses).values({
        userId: studentId,
        commuteMode: 'metro',
        goingDistanceKm: '7.50',
        comingDistanceKm: '7.50',
        commuteDaysPerWeek: 5,
        housingType: 'hostel_room',
        electricityKwh: '55.00',
        dietType: 'pure_veg',
        clothingItemsPerMonth: '1.0',
        thriftingPref: 'occasional',
        wasteBagsPerWeek: '1.5',
        recyclesRegularly: true,
        baselineTransportKg: '33.75',
        baselineEnergyKg: '467.28',
        baselineFoodKg: '620.50',
        baselineShoppingKg: '110.00',
        baselineWasteKg: '16.38',
        baselineTotalKg: '1248.00'
      });
      console.log('Seeded onboarding baseline for Chetan Rao');
    }

    // 6. Seed Sample Activities for Chetan Rao
    const existingActivities = await db.select().from(activities).where(eq(activities.userId, studentId));
    if (existingActivities.length === 0) {
      await db.insert(activities).values([
        {
          userId: studentId,
          category: 'transport',
          subtype: 'metro',
          label: 'Namma Metro Green Line (Banashankari to National College / Basavanagudi)',
          quantity: '15.00',
          unit: 'km',
          co2Kg: '0.188',
          factorValueApplied: '0.012500',
          emissionFactorId: 'transport_metro',
          note: 'Round trip college commute to BMSCE via Namma Metro'
        },
        {
          userId: studentId,
          category: 'food',
          subtype: 'pure_veg',
          label: 'BMSCE Canteen & Vidyarthi Bhavan Dosa + Filter Coffee',
          quantity: '1.00',
          unit: 'day',
          co2Kg: '1.700',
          factorValueApplied: '1.700000',
          emissionFactorId: 'food_pure_veg',
          note: 'South Indian vegetarian meals (Idli, Dosa, Sambar Rice)'
        },
        {
          userId: studentId,
          category: 'transport',
          subtype: 'bus_city',
          label: 'BMTC Bus Route 210 / 215 (Jayanagar 4th Block to BMSCE Bull Temple)',
          quantity: '6.00',
          unit: 'km',
          co2Kg: '0.091',
          factorValueApplied: '0.015161',
          emissionFactorId: 'transport_bus_city',
          note: 'BMTC Student Bus Pass commute'
        },
        {
          userId: studentId,
          category: 'waste',
          subtype: 'kabadiwala_recycled',
          label: 'Given Old Assignments & Newspapers to Local Basavanagudi Gujri Shop',
          quantity: '7.00',
          unit: 'kg',
          co2Kg: '0.350',
          factorValueApplied: '0.050000',
          emissionFactorId: 'waste_kabadiwala_recycled',
          note: 'Paper recycling scrap diversion'
        }
      ]);
      console.log('Seeded initial student activities for Chetan Rao');
    }

    // 7. Seed Student Goals
    const existingGoals = await db.select().from(goals).where(eq(goals.userId, studentId));
    if (existingGoals.length === 0) {
      await db.insert(goals).values([
        {
          userId: studentId,
          title: 'Commute to BMSCE exclusively via Namma Metro or BMTC 4 days/week',
          category: 'transport',
          targetValue: '16.00',
          currentValue: '13.00',
          unit: 'trips',
          deadline: '2026-11-15',
          status: 'in_progress',
          co2SavingsKg: '28.00'
        },
        {
          userId: studentId,
          title: 'Pure South Indian Veg Meals in Hostel Mess (Avoid late-night Zomato delivery)',
          category: 'food',
          targetValue: '6.00',
          currentValue: '5.00',
          unit: 'days',
          deadline: '2026-11-10',
          status: 'in_progress',
          co2SavingsKg: '14.50'
        },
        {
          userId: studentId,
          title: 'Sort all BMSCE exam paper scrap to Gujri shop / BBMP Dry Waste Centre',
          category: 'waste',
          targetValue: '10.00',
          currentValue: '10.00',
          unit: 'kg',
          deadline: '2026-10-31',
          status: 'achieved',
          co2SavingsKg: '16.00'
        }
      ]);
      console.log('Seeded student sustainability goals');
    }

    console.log('✅ Supabase database seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await pool.end();
  }
}

seed();
