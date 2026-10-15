/**
 * Deterministic AI Advisor Service for EcoSphere (Indian College Lifestyle)
 * Grounded in Govt of India, India GHG Program and Central Electricity Authority metrics.
 */

export function generateSmartRecommendations(baseline, activities) {
  const recommendations = [];

  const sorted = Object.entries(baseline.breakdown).sort((a, b) => b[1] - a[1]);
  const highestCategory = sorted[0];

  // Transport recommendation (Shift to Metro or City Bus)
  if (baseline.breakdown.transport > 300) {
    recommendations.push({
      id: 'rec_trans_01',
      title: 'Shift 3 Days to Metro Rail or DTC/BEST/BMTC Buses',
      category: 'transport',
      impactKg: 140,
      costSavings: '₹1,200/month in petrol & parking',
      difficulty: 'Easy',
      summary: 'Per the India GHG Program, Metro Rail and electric public buses emit only 0.0125 to 0.0152 kg CO₂/passenger-km, cutting emissions by over 65% compared to petrol scooters or cabs.',
      sourceRef: 'India GHG Program Table 5.4.1'
    });
  }

  // Food recommendation
  if (baseline.breakdown.food > 700) {
    recommendations.push({
      id: 'rec_food_01',
      title: 'Embrace Campus Mess Vegetarian Thali Days',
      category: 'food',
      impactKg: 280,
      costSavings: '₹800/month off canteen bills',
      difficulty: 'Easy',
      summary: 'Traditional Indian thalis (Dal, Roti, Seasonal Sabzi, Curd) require 1/3rd of the agricultural carbon intensity of frequent broiler chicken or red meat meals.',
      sourceRef: 'Indian Dietary LCA & Food Carbon Hub'
    });
  }

  // Energy recommendation (CEA Grid factor 0.720 kg/kWh)
  if (baseline.breakdown.energy > 400) {
    recommendations.push({
      id: 'rec_energy_01',
      title: 'Hostel Geyser & Standby Switch Discipline',
      category: 'energy',
      impactKg: 110,
      costSavings: '₹400/month shared savings',
      difficulty: 'Easy',
      summary: 'India’s electricity grid has a carbon factor of 0.720 kg CO₂/kWh (CEA). Switching off idle laptop chargers, immersion rods, and water coolers when leaving the hostel saves immediate emissions.',
      sourceRef: 'Central Electricity Authority (CEA) v20'
    });
  }

  // Waste & Kabadiwala
  recommendations.push({
    id: 'rec_waste_01',
    title: 'Sort Semester Notes & Bottles to the Kabadiwala',
    category: 'waste',
    impactKg: 45,
    costSavings: 'Earn ₹200-₹300 cash/semester',
    difficulty: 'Easy',
    summary: 'Directing paper and clean plastics to the informal circular recycling ecosystem prevents municipal landfill methane generation.',
    sourceRef: 'Swachh Bharat Urban Recycling Benchmark'
  });

  return {
    highestCategory: highestCategory[0],
    highestAmount: highestCategory[1],
    recommendations
  };
}

export function answerStudentQuestion(query, baseline) {
  const q = query.toLowerCase();

  if (q.includes('metro') || q.includes('scooter') || q.includes('activa') || q.includes('bus') || q.includes('auto')) {
    return {
      answer: `According to the official India Specific Road Transport Emission Factors (India GHG Program Table 5.1.1 & 5.4.1):
- Petrol Scooter (<110cc Activa/Jupiter): 0.0368 kg CO₂/km
- City Public Bus: 0.01516 kg CO₂/passenger-km
- Metro Rail (DMRC/Namma): ~0.0125 kg CO₂/passenger-km
- CNG Auto Rickshaw: 0.1077 kg CO₂/km

Switching from a daily solo Activa ride (16 km round trip) to the Metro saves ~115 kg CO₂ annually and cuts ₹1,400+ per month in fuel costs!`,
      estimatedSavings: '115–180 kg CO₂ / year',
      tags: ['Metro', 'India GHG Program', 'Student Transit Pass']
    };
  }

  if (q.includes('hostel') || q.includes('electricity') || q.includes('pg') || q.includes('room') || q.includes('energy')) {
    return {
      answer: `Because India's grid is predominantly thermal powered, 1 kWh of electricity generates ~0.720 kg CO₂ (Central Electricity Authority).
In your college hostel or PG:
1. Heating water using instant geysers consumes ~2 kWh per 15 minutes (~1.4 kg CO₂).
2. Leaving ceiling fans and monitors running while attending classes wastes 20–30 units/month.
3. Air-drying clothes on the hostel balcony instead of machine drying saves 100% of cycle electricity.`,
      estimatedSavings: '80–150 kg CO₂ / year',
      tags: ['Hostel Hacks', 'CEA Grid', 'Zero Cost']
    };
  }

  if (q.includes('mess') || q.includes('thali') || q.includes('food') || q.includes('veg') || q.includes('chicken') || q.includes('diet')) {
    return {
      answer: `The classic Indian Vegetarian Mess Thali (Roti, Chana/Arhar Dal, Aloo Gobi, Steamed Rice, Dahi) has an ultra-low emission score of ~1.8 kg CO₂e/day.
- Frequent mutton/beef generates 15x–30x more carbon than lentils.
- Broiler chicken thalis generate ~4.8 kg CO₂e/day.
Even choosing vegetarian meals from Monday to Friday saves ~280 kg CO₂ annually without compromising your protein intake (rajma, chole, soya chunks, paneer, and eggs).`,
      estimatedSavings: '200–350 kg CO₂ / year',
      tags: ['Desi Thali', 'Hostel Mess', 'Nutrition']
    };
  }

  if (q.includes('kabadiwala') || q.includes('raddi') || q.includes('waste') || q.includes('recycle')) {
    return {
      answer: `The Indian Kabadiwala network is one of the world's most efficient circular economy models!
- Unsorted paper dumped in landfills degrades into methane (0.62 kg CO₂e/kg).
- Paper recycled via Kabadiwala saves 90% of energy and reduces virgin wood pulp harvesting (0.06 kg CO₂e/kg).
- Plus, students earn ₹14–₹18/kg for old newspapers, notebook scrap, and plastic bottles!`,
      estimatedSavings: '40–60 kg CO₂ / year + Pocket Money',
      tags: ['Kabadiwala', 'Circular Economy', 'Zero Waste']
    };
  }

  return {
    answer: `Based on your Indian college footprint profile (${baseline.total} kg CO₂e/yr), your greatest reduction opportunity is in ${sortedCategoryName(baseline.breakdown)}.
1. Use Metro or college buses for round-trip commutes.
2. Unplug hostel devices when leaving for lectures.
3. Commit to 1 achievable challenge in the Goals section!`,
    estimatedSavings: 'Up to 25% footprint reduction',
    tags: ['Overview', 'Custom Strategy']
  };
}

function sortedCategoryName(breakdown) {
  const keys = Object.keys(breakdown);
  keys.sort((a, b) => breakdown[b] - breakdown[a]);
  return keys[0] ? keys[0].toUpperCase() : 'COMMUTE';
}
