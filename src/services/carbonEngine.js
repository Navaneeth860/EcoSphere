/**
 * EcoSphere Deterministic Carbon Calculation Engine
 * 
 * Official Government of India & India GHG Program Emission Factors:
 * Reference: "India Specific Road Transport Emission Factors", India GHG Program (WRI India, TERI, CII)
 * Supported by Ministry of Environment, Forest & Climate Change (MoEFCC) data, ARAI, CIRT, and Central Electricity Authority (CEA) CO2 Baseline Database for the Indian Power Sector (v19/v20).
 */

export const INDIA_EMISSION_FACTORS = {
  transport: {
    walking: { factor: 0.0, unit: 'kg CO₂/km', label: 'Walking / Foot', source: 'Zero operational' },
    bicycle: { factor: 0.0, unit: 'kg CO₂/km', label: 'Bicycle (Cycle)', source: 'Zero operational' },
    ev_scooter: { factor: 0.012, unit: 'kg CO₂/km', label: 'Electric Scooter (EV 2-Wheeler - Ola/Ather)', source: 'CEA Grid India avg' },
    
    // India GHG Program 2-Wheelers (Table 5.1.1 with uplift factor)
    scooter_petrol: { factor: 0.0368, unit: 'kg CO₂/km', label: 'Petrol Scooter (<110cc Activa/Jupiter/Dio)', source: 'India GHG Program Table 5.1.1' },
    bike_100cc: { factor: 0.0358, unit: 'kg CO₂/km', label: 'Motorcycle (<100cc Splendor/HF Deluxe/Platina)', source: 'India GHG Program Table 5.1.1' },
    bike_150cc: { factor: 0.0458, unit: 'kg CO₂/km', label: 'Motorcycle (<200cc Pulsar/Apache/FZ)', source: 'India GHG Program Table 5.1.1' },
    bike_bullet: { factor: 0.0597, unit: 'kg CO₂/km', label: 'Motorcycle (<500cc Royal Enfield Bullet/Classic 350)', source: 'India GHG Program Table 5.1.1' },

    // Three Wheelers (Table 5.2.1)
    auto_cng: { factor: 0.10768, unit: 'kg CO₂/km', label: 'Auto Rickshaw (CNG)', source: 'India GHG Program Table 5.2.1' },
    auto_petrol: { factor: 0.1135, unit: 'kg CO₂/km', label: 'Auto Rickshaw (Petrol)', source: 'India GHG Program Table 5.2.1' },
    auto_diesel: { factor: 0.1322, unit: 'kg CO₂/km', label: 'Auto Rickshaw (Diesel)', source: 'India GHG Program Table 5.2.1' },

    // Public Transport Buses (Section 5.4.1)
    bus_city: { factor: 0.015161, unit: 'kg CO₂/passenger-km', label: 'City Public Bus (DTC / BEST / BMTC / State Transport)', source: 'India GHG Program Table 5.4.1' },
    metro: { factor: 0.0125, unit: 'kg CO₂/passenger-km', label: 'Metro Rail (Delhi / Namma / Mumbai / Kolkata Metro)', source: 'DMRC Clean Development Mechanism (CDM)' },
    local_train: { factor: 0.009, unit: 'kg CO₂/passenger-km', label: 'Indian Railways Suburban / Local Train (Mumbai/Chennai Local)', source: 'Indian Railways BEE Data' },

    // Passenger Cars (Table 5.3.1 with uplift factor)
    car_small_cng: { factor: 0.068, unit: 'kg CO₂/km', label: 'Small Car CNG (<800cc Alto CNG/WagonR CNG)', source: 'India GHG Program Table 5.3.1' },
    car_hatchback_petrol: { factor: 0.127, unit: 'kg CO₂/km', label: 'Hatchback Petrol (<1000cc Celerio/Santro/i10/Swift)', source: 'India GHG Program Table 5.3.1' },
    car_hatchback_diesel: { factor: 0.113, unit: 'kg CO₂/km', label: 'Hatchback Diesel (<1000cc Polo/Indica)', source: 'India GHG Program Table 5.3.1' },
    car_sedan_petrol: { factor: 0.153, unit: 'kg CO₂/km', label: 'Sedan Petrol (<1400cc Dzire/Amaze/City/Verna)', source: 'India GHG Program Table 5.3.1' },
    car_suv_petrol: { factor: 0.166, unit: 'kg CO₂/km', label: 'Compact SUV Petrol (Brezza/Nexon/Creta/Venue)', source: 'India GHG Program Table 5.3.1' },
    car_suv_diesel: { factor: 0.201, unit: 'kg CO₂/km', label: 'SUV Diesel (Scorpio/Harrier/XUV700/Innova)', source: 'India GHG Program Table 5.3.1' },
    car_cab_shared: { factor: 0.065, unit: 'kg CO₂/passenger-km', label: 'Shared Cab / Ola / Uber Share (Hatchback/Sedan)', source: 'India GHG Program' },
  },
  
  // Electricity & Housing (Central Electricity Authority CEA CO2 Baseline Database India avg ~0.716 - 0.82 kg CO2/kWh)
  energy: {
    hostel_room: { factor: 0.720, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 65, label: 'Campus College Hostel Room (Shared Fan & Lights)' },
    hostel_ac_room: { factor: 0.720, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 140, label: 'Hostel AC Room' },
    pg_sharing: { factor: 0.720, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 90, label: 'Paying Guest (PG) Room (Shared flat)' },
    independent_flat: { factor: 0.720, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 180, label: 'Rented 1BHK/2BHK Student Apartment' },
    rooftop_solar: { factor: 0.045, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 80, label: 'Campus Solar Rooftop' }
  },

  // Diet & Food (Indian Nutritional & Agricultural Supply Chain Lifecycle values)
  food: {
    pure_veg: { factor: 1.8, unit: 'kg CO₂e/day', label: 'Strict Indian Vegetarian (Dal, Roti, Sabzi, Rice, Paneer/Curd)' },
    jain_veg: { factor: 1.6, unit: 'kg CO₂e/day', label: 'Jain Vegetarian (Root-free plant & dairy)' },
    vegan_indian: { factor: 1.3, unit: 'kg CO₂e/day', label: '100% Plant-Based Vegan (No dairy, dahi, or ghee)' },
    occasional_nonveg: { factor: 2.9, unit: 'kg CO₂e/day', label: 'Eggitarian / Occasional Chicken (1-2 times a week)' },
    regular_nonveg: { factor: 4.8, unit: 'kg CO₂e/day', label: 'Regular Non-Vegetarian (Chicken, Mutton, Fish 4+ days/week)' }
  },

  // Shopping & Lifestyle
  shopping: {
    clothing_desi: { factor: 8.5, unit: 'kg CO₂e/item', label: 'New Kurta / Cotton Shirt / Jeans' },
    thrift_clothes: { factor: 0.9, unit: 'kg CO₂e/item', label: 'Second-hand / Sarojini / Street Thrift / Hand-me-down' },
    books_photocopy: { factor: 1.2, unit: 'kg CO₂e/bundle', label: 'College Notes, Xerox & Standard Textbooks' },
    electronics: { factor: 70.0, unit: 'kg CO₂e/item', label: 'Smartphone / Laptop replacement (amortized)' }
  },

  // Waste & Recycling
  waste: {
    municipal_dump: { factor: 0.62, unit: 'kg CO₂e/kg', label: 'Mixed Municipal Waste (Kachra to Landfill)' },
    kabadiwala_recycled: { factor: 0.06, unit: 'kg CO₂e/kg', label: 'Sorted to Raddi / Kabadiwala (Paper, Plastic, Metal)' },
    hostel_compost: { factor: 0.04, unit: 'kg CO₂e/kg', label: 'Wet Food Waste Composted' }
  }
};

/**
 * Calculates emission for a single activity.
 */
export function calculateActivityEmission(category, subtype, quantity) {
  const numQuantity = Math.max(0, parseFloat(quantity) || 0);
  const factorGroup = INDIA_EMISSION_FACTORS[category];
  if (!factorGroup || !factorGroup[subtype]) {
    return 0;
  }
  const factor = factorGroup[subtype].factor;
  return parseFloat((numQuantity * factor).toFixed(3));
}

/**
 * Calculate Baseline Annual Footprint from Indian student onboarding inputs.
 * Takes into account going distance, returning distance, and academic working days.
 */
export function calculateBaselineAnnual(onboardingData) {
  if (!onboardingData) {
    return {
      total: 1680,
      breakdown: { transport: 420, energy: 560, food: 620, shopping: 50, waste: 30 }
    };
  }

  // 1. Commute: Going + Coming distances explicitly supported
  const collegeDaysPerYear = 180; // ~36 weeks * 5 college days
  const goingKm = parseFloat(onboardingData.goingDistanceKm) || parseFloat(onboardingData.commuteDistanceKm) || 7;
  const comingKm = parseFloat(onboardingData.comingDistanceKm) || goingKm;
  const roundTripKm = goingKm + comingKm;

  const transportFactor = (
    INDIA_EMISSION_FACTORS.transport[onboardingData.commuteMode] || 
    INDIA_EMISSION_FACTORS.transport.metro || 
    INDIA_EMISSION_FACTORS.transport.bus_city
  ).factor;
  
  const transportTotal = roundTripKm * transportFactor * collegeDaysPerYear;

  // 2. Electricity (Hostel/PG/Flat)
  const energyKwhPerMonth = parseFloat(onboardingData.electricityKwh) || 70;
  const energyFactor = 0.720; // CEA Grid emission factor for India
  const energyTotal = energyKwhPerMonth * 12 * energyFactor;

  // 3. Food
  const dietDayFactor = (
    INDIA_EMISSION_FACTORS.food[onboardingData.dietType] || 
    INDIA_EMISSION_FACTORS.food.pure_veg
  ).factor;
  const foodTotal = dietDayFactor * 365;

  // 4. Shopping (Indian college context)
  const newGarmentsYear = (parseFloat(onboardingData.clothingItemsPerMonth) || 1) * 12;
  const isThrift = onboardingData.thriftingPref === 'mostly_thrift';
  const clothFactor = isThrift ? 0.9 : 8.5;
  const shoppingTotal = newGarmentsYear * clothFactor + 25;

  // 5. Waste (Kabadiwala diversion)
  const wasteKgWeek = (parseFloat(onboardingData.wasteBagsPerWeek) || 1.5) * 2;
  const recyclingCredit = onboardingData.recyclesRegularly ? 0.4 : 1.0;
  const wasteTotal = wasteKgWeek * 52 * 0.62 * recyclingCredit;

  const total = Math.round(transportTotal + energyTotal + foodTotal + shoppingTotal + wasteTotal);

  return {
    total,
    breakdown: {
      transport: Math.round(transportTotal),
      energy: Math.round(energyTotal),
      food: Math.round(foodTotal),
      shopping: Math.round(shoppingTotal),
      waste: Math.round(wasteTotal)
    }
  };
}

/**
 * Tree equivalents based on native Indian trees (Peepal, Neem, Banyan sequestering ~20-22 kg CO2/year)
 */
export function getTreeEquivalents(kgCO2) {
  return (kgCO2 / 21.0).toFixed(1);
}

/**
 * Compare student footprint with average Indian university student benchmark (~1,850 kg CO2e / yr)
 */
export function getStudentBenchmarkComparison(totalAnnualKg) {
  const indianStudentAvg = 1850;
  const diff = totalAnnualKg - indianStudentAvg;
  const percentDiff = Math.round((Math.abs(diff) / indianStudentAvg) * 100);
  return {
    collegeAvg: indianStudentAvg,
    isLower: diff < 0,
    percentDiff,
    diffKg: Math.abs(diff)
  };
}
