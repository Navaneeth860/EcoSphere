/**
 * EcoSphere Deterministic Carbon Calculation Engine
 * 
 * Official Government of India & India GHG Program Emission Factors:
 * Reference: "India Specific Road Transport Emission Factors", India GHG Program (WRI India, TERI, CII)
 * Supported by Ministry of Environment, Forest & Climate Change (MoEFCC) data, ARAI, CIRT, and 
 * Central Electricity Authority (CEA) CO2 Baseline Database for the Indian Power Sector (Southern Regional Grid / Karnataka).
 */

export const INDIA_EMISSION_FACTORS = {
  transport: {
    walking: { factor: 0.0, unit: 'kg CO₂/km', label: 'Walking / Foot (Basavanagudi/Bull Temple Road)', source: 'Zero operational' },
    bicycle: { factor: 0.0, unit: 'kg CO₂/km', label: 'Bicycle / Yulu Miracle Cycle', source: 'Zero operational' },
    ev_scooter: { factor: 0.012, unit: 'kg CO₂/km', label: 'Electric Scooter (Ather 450X / Ola S1)', source: 'BESCOM / CEA Grid Karnataka' },
    
    // Namma Metro & BMTC Public Transport
    metro: { factor: 0.0125, unit: 'kg CO₂/passenger-km', label: 'Namma Metro Green/Purple Line (National College / Lalbagh / South End Circle)', source: 'BMRCL Clean Development Mechanism (CDM)' },
    bus_city: { factor: 0.015161, unit: 'kg CO₂/passenger-km', label: 'BMTC City Bus (Bengaluru Metropolitan Transport Corp / Vajra Volvo)', source: 'India GHG Program Table 5.4.1 (CIRT STU data)' },

    // India GHG Program 2-Wheelers (Table 5.1.1 with 10% uplift)
    scooter_petrol: { factor: 0.0368, unit: 'kg CO₂/km', label: 'Petrol Scooter (<110cc Honda Activa / TVS Jupiter / Dio)', source: 'India GHG Program Table 5.1.1' },
    bike_100cc: { factor: 0.0358, unit: 'kg CO₂/km', label: 'Motorcycle (<100cc Hero Splendor / Platina)', source: 'India GHG Program Table 5.1.1' },
    bike_150cc: { factor: 0.0458, unit: 'kg CO₂/km', label: 'Motorcycle (<200cc Bajaj Pulsar / TVS Apache / Yamaha FZ)', source: 'India GHG Program Table 5.1.1' },
    bike_bullet: { factor: 0.0597, unit: 'kg CO₂/km', label: 'Motorcycle (<500cc Royal Enfield Classic 350 / Hunter)', source: 'India GHG Program Table 5.1.1' },

    // Three Wheelers (Table 5.2.1)
    auto_cng: { factor: 0.10768, unit: 'kg CO₂/km', label: 'Namma Auto Rickshaw (LPG / CNG / Electric Auto)', source: 'India GHG Program Table 5.2.1' },
    auto_petrol: { factor: 0.1135, unit: 'kg CO₂/km', label: 'Namma Auto Rickshaw (Petrol 2-Stroke/4-Stroke)', source: 'India GHG Program Table 5.2.1' },

    // Passenger Cars (Table 5.3.1 with 8% uplift)
    car_hatchback_petrol: { factor: 0.127, unit: 'kg CO₂/km', label: 'Hatchback Petrol (<1000cc Swift / i10 / Tiago)', source: 'India GHG Program Table 5.3.1' },
    car_sedan_petrol: { factor: 0.153, unit: 'kg CO₂/km', label: 'Sedan Petrol (<1400cc Honda City / Dzire / Verna)', source: 'India GHG Program Table 5.3.1' },
    car_cab_shared: { factor: 0.065, unit: 'kg CO₂/passenger-km', label: 'Shared Cab / Ola / Uber Shuttle (South Bengaluru)', source: 'India GHG Program' },
  },
  
  // Electricity (BESCOM / Karnataka Energy Grid - CEA Baseline factor ~0.708 kg CO2/kWh)
  energy: {
    hostel_room: { factor: 0.708, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 60, label: 'BMSCE Campus Hostel Room (Shared lights, fan, study lamp)' },
    hostel_ac_room: { factor: 0.708, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 120, label: 'Hostel Room with Geyser & High Load' },
    pg_sharing: { factor: 0.708, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 85, label: 'Basavanagudi / Hanumanthnagar / Jayanagar PG Room' },
    independent_flat: { factor: 0.708, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 170, label: 'Shared Student 2BHK/3BHK Flat (Banashankari / Gandhi Bazaar)' },
    rooftop_solar: { factor: 0.045, unit: 'kg CO₂/kWh', defaultKwhPerMonth: 75, label: 'BMSCE Rooftop Solar Tariff' }
  },

  // Food & Diet (South Indian & Karnataka Canteen profile)
  food: {
    pure_veg: { factor: 1.7, unit: 'kg CO₂e/day', label: 'South Indian Vegetarian (Dosa, Idli-Vada, Bisibelebath, Sambar Rice, Curd)' },
    jain_veg: { factor: 1.5, unit: 'kg CO₂e/day', label: 'Jain Vegetarian (Rootless traditional South Indian satvik meal)' },
    vegan_indian: { factor: 1.25, unit: 'kg CO₂e/day', label: '100% Plant-Based Vegan (Filter coffee with plant milk, no ghee/curd)' },
    occasional_nonveg: { factor: 2.8, unit: 'kg CO₂e/day', label: 'Eggitarian / Weekend Non-Veg (Eggs, Military Hotel Chicken Biryani once a week)' },
    regular_nonveg: { factor: 4.6, unit: 'kg CO₂e/day', label: 'Regular Non-Vegetarian (Frequent chicken, mutton, or fish)' }
  },

  // Shopping & Goods
  shopping: {
    clothing_desi: { factor: 7.5, unit: 'kg CO₂e/item', label: 'New Cotton Kurta / Shirt / Jeans from Commercial Street / Jayanagar 4th Block' },
    thrift_clothes: { factor: 0.8, unit: 'kg CO₂e/item', label: 'Thrifted / Pre-loved Clothes (Flea Markets / Student Swap)' },
    books_photocopy: { factor: 1.0, unit: 'kg CO₂e/bundle', label: 'VTU / BMSCE Engineering Xerox Notes & Textbooks' },
    electronics: { factor: 68.0, unit: 'kg CO₂e/item', label: 'Laptop / Mobile replacement (SP Road electronics amortized)' }
  },

  // Waste & Recycling
  waste: {
    municipal_dump: { factor: 0.60, unit: 'kg CO₂e/kg', label: 'BBMP Mixed Waste to Landfill' },
    kabadiwala_recycled: { factor: 0.05, unit: 'kg CO₂e/kg', label: 'Given to Local Bengaluru Raddi / Gujri Shop (Kabadiwala)' },
    hostel_compost: { factor: 0.035, unit: 'kg CO₂e/kg', label: 'BMSCE Hostel Wet Waste Composted / Bio-digester' }
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
      total: 1540,
      breakdown: { transport: 380, energy: 510, food: 590, shopping: 40, waste: 20 }
    };
  }

  // 1. Commute: Going + Coming distances explicitly supported
  const collegeDaysPerYear = 180; // ~36 weeks * 5 college days
  const goingKm = parseFloat(onboardingData.goingDistanceKm) || parseFloat(onboardingData.commuteDistanceKm) || 7.5;
  const comingKm = parseFloat(onboardingData.comingDistanceKm) || goingKm;
  const roundTripKm = goingKm + comingKm;

  const transportFactor = (
    INDIA_EMISSION_FACTORS.transport[onboardingData.commuteMode] || 
    INDIA_EMISSION_FACTORS.transport.metro || 
    INDIA_EMISSION_FACTORS.transport.bus_city
  ).factor;
  
  const transportTotal = roundTripKm * transportFactor * collegeDaysPerYear;

  // 2. Electricity (Hostel/PG/Flat in South Bengaluru - BESCOM Grid)
  const energyKwhPerMonth = parseFloat(onboardingData.electricityKwh) || 60;
  const energyFactor = 0.708; // BESCOM / Karnataka grid emission factor
  const energyTotal = energyKwhPerMonth * 12 * energyFactor;

  // 3. Food
  const dietDayFactor = (
    INDIA_EMISSION_FACTORS.food[onboardingData.dietType] || 
    INDIA_EMISSION_FACTORS.food.pure_veg
  ).factor;
  const foodTotal = dietDayFactor * 365;

  // 4. Shopping
  const newGarmentsYear = (parseFloat(onboardingData.clothingItemsPerMonth) || 1) * 12;
  const isThrift = onboardingData.thriftingPref === 'mostly_thrift';
  const clothFactor = isThrift ? 0.8 : 7.5;
  const shoppingTotal = newGarmentsYear * clothFactor + 20;

  // 5. Waste (BBMP / Gujri shop scrap)
  const wasteKgWeek = (parseFloat(onboardingData.wasteBagsPerWeek) || 1.5) * 2;
  const recyclingCredit = onboardingData.recyclesRegularly ? 0.35 : 1.0;
  const wasteTotal = wasteKgWeek * 52 * 0.60 * recyclingCredit;

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
 * Tree equivalents based on native Karnataka trees (Gulmohar, Neem, Honge / Pongamia tree ~21 kg CO2/year)
 */
export function getTreeEquivalents(kgCO2) {
  return (kgCO2 / 21.0).toFixed(1);
}

/**
 * Compare student footprint with average Bengaluru engineering student benchmark (~1,750 kg CO2e / yr)
 */
export function getStudentBenchmarkComparison(totalAnnualKg) {
  const bmsceStudentAvg = 1750;
  const diff = totalAnnualKg - bmsceStudentAvg;
  const percentDiff = Math.round((Math.abs(diff) / bmsceStudentAvg) * 100);
  return {
    collegeAvg: bmsceStudentAvg,
    isLower: diff < 0,
    percentDiff,
    diffKg: Math.abs(diff)
  };
}
