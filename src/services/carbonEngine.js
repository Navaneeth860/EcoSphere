/**
 * GreenTrack Deterministic Carbon Calculation Engine
 * Sources: UK DEFRA (2023), US EPA GHG Emission Factors Hub (2023), Poore & Nemecek (Science 2018)
 */

export const EMISSION_FACTORS = {
  transport: {
    walking: { factor: 0.0, unit: 'kg CO₂e/km', label: 'Walking / Foot' },
    bicycle: { factor: 0.0, unit: 'kg CO₂e/km', label: 'Bicycle (Manual)' },
    ebike: { factor: 0.015, unit: 'kg CO₂e/km', label: 'E-Bike / Electric Scooter' },
    bus: { factor: 0.089, unit: 'kg CO₂e/km', label: 'City Transit Bus' },
    metro: { factor: 0.035, unit: 'kg CO₂e/km', label: 'Subway / Metro / Tram' },
    carpool: { factor: 0.096, unit: 'kg CO₂e/km', label: 'Carpool (2+ riders)' },
    rideshare: { factor: 0.170, unit: 'kg CO₂e/km', label: 'Rideshare / Taxi (Solo)' },
    car_gasoline: { factor: 0.192, unit: 'kg CO₂e/km', label: 'Personal Gas Car' },
    flight_short: { factor: 0.255, unit: 'kg CO₂e/km', label: 'Flight (< 3 hrs)' },
    flight_long: { factor: 0.190, unit: 'kg CO₂e/km', label: 'Flight (> 3 hrs)' },
  },
  energy: {
    dorm_room: { factor: 0.385, unit: 'kg CO₂e/kWh', defaultKwhPerMonth: 120, label: 'Campus Dorm Room' },
    shared_apt: { factor: 0.385, unit: 'kg CO₂e/kWh', defaultKwhPerMonth: 210, label: 'Shared Apartment (Your share)' },
    studio_apt: { factor: 0.385, unit: 'kg CO₂e/kWh', defaultKwhPerMonth: 280, label: 'Studio Apartment' },
    green_tariff: { factor: 0.050, unit: 'kg CO₂e/kWh', defaultKwhPerMonth: 150, label: 'Renewable / Green Tariff' }
  },
  food: {
    vegan: { factor: 1.5, unit: 'kg CO₂e/day', label: '100% Plant-Based (Vegan)' },
    vegetarian: { factor: 2.5, unit: 'kg CO₂e/day', label: 'Vegetarian (Dairy & Eggs)' },
    pescatarian: { factor: 3.2, unit: 'kg CO₂e/day', label: 'Pescatarian (Fish & Veg)' },
    flexitarian: { factor: 3.8, unit: 'kg CO₂e/day', label: 'Low Meat / Flexitarian' },
    high_meat: { factor: 7.2, unit: 'kg CO₂e/day', label: 'High Meat (Daily Red Meat)' },
  },
  shopping: {
    clothing_new: { factor: 15.0, unit: 'kg CO₂e/item', label: 'New Clothing (Fast Fashion)' },
    clothing_thrift: { factor: 1.2, unit: 'kg CO₂e/item', label: 'Thrifted / Secondhand Clothing' },
    electronics_small: { factor: 35.0, unit: 'kg CO₂e/item', label: 'Small Device (Headphones, Tablet)' },
    laptop_phone: { factor: 85.0, unit: 'kg CO₂e/item', label: 'Laptop / Smartphone' },
    books_stationery: { factor: 2.5, unit: 'kg CO₂e/item', label: 'Books & School Supplies' }
  },
  waste: {
    landfill_kg: { factor: 0.58, unit: 'kg CO₂e/kg', label: 'Landfill Trash' },
    composted_kg: { factor: 0.05, unit: 'kg CO₂e/kg', label: 'Composted Organic' },
    recycled_kg: { factor: 0.08, unit: 'kg CO₂e/kg', label: 'Recycled Paper/Plastic' }
  }
};

/**
 * Calculates emission for a single activity.
 * @param {string} category 
 * @param {string} subtype 
 * @param {number} quantity 
 * @returns {number} kg CO2e
 */
export function calculateActivityEmission(category, subtype, quantity) {
  const numQuantity = Math.max(0, parseFloat(quantity) || 0);
  const factorGroup = EMISSION_FACTORS[category];
  if (!factorGroup || !factorGroup[subtype]) {
    return 0;
  }
  const factor = factorGroup[subtype].factor;
  return parseFloat((numQuantity * factor).toFixed(3));
}

/**
 * Calculate Baseline Annual Footprint from student onboarding inputs
 */
export function calculateBaselineAnnual(onboardingData) {
  if (!onboardingData) return { total: 2850, breakdown: { transport: 850, energy: 600, food: 1100, shopping: 200, waste: 100 } };

  // 1. Commute
  const commuteDaysPerYear = 180; // ~2 semesters of 15 weeks each * 5 days
  const dailyKm = (parseFloat(onboardingData.commuteDistanceKm) || 6) * 2;
  const transportFactor = (EMISSION_FACTORS.transport[onboardingData.commuteMode] || EMISSION_FACTORS.transport.bus).factor;
  const transportTotal = dailyKm * transportFactor * commuteDaysPerYear;

  // 2. Energy
  const energyKwhPerMonth = parseFloat(onboardingData.electricityKwh) || 130;
  const energyFactor = 0.385; // kg CO2e/kWh
  const energyTotal = energyKwhPerMonth * 12 * energyFactor;

  // 3. Food
  const foodDayFactor = (EMISSION_FACTORS.food[onboardingData.dietType] || EMISSION_FACTORS.food.flexitarian).factor;
  const foodTotal = foodDayFactor * 365;

  // 4. Shopping
  const clothingItemsPerYear = parseFloat(onboardingData.clothingItemsPerMonth || 2) * 12;
  const isThrift = onboardingData.thriftingPref === 'mostly_thrift';
  const clothingFactor = isThrift ? 1.2 : 12.0;
  const shoppingTotal = clothingItemsPerYear * clothingFactor + 50; // buffer for books

  // 5. Waste
  const wasteKgWeek = parseFloat(onboardingData.wasteBagsPerWeek || 2) * 3;
  const recyclingCredit = onboardingData.recyclesRegularly ? 0.6 : 1.0;
  const wasteTotal = wasteKgWeek * 52 * 0.58 * recyclingCredit;

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
 * Convert kg CO2e to equivalent metric trees planted absorption (approx 21.77 kg CO2/tree/year)
 */
export function getTreeEquivalents(kgCO2) {
  return (kgCO2 / 21.77).toFixed(1);
}

/**
 * Compare student footprint with college average (~3,200 kg CO2e / yr)
 */
export function getStudentBenchmarkComparison(totalAnnualKg) {
  const collegeAvg = 3200;
  const diff = totalAnnualKg - collegeAvg;
  const percentDiff = Math.round((Math.abs(diff) / collegeAvg) * 100);
  return {
    collegeAvg,
    isLower: diff < 0,
    percentDiff,
    diffKg: Math.abs(diff)
  };
}
