/**
 * Deterministic AI Advisor Service for GreenTrack
 * Produces personalized, mathematically grounded recommendations
 * based on student's actual emission profile and university constraints.
 */

export function generateSmartRecommendations(baseline, activities) {
  const recommendations = [];

  // Identify highest category
  const sorted = Object.entries(baseline.breakdown).sort((a, b) => b[1] - a[1]);
  const highestCategory = sorted[0]; // [categoryName, kgValue]

  // Food recommendation
  if (baseline.breakdown.food > 900) {
    recommendations.push({
      id: 'rec_food_01',
      title: 'Adopt Meatless Weekdays or Plant-Forward Dining',
      category: 'food',
      impactKg: 380,
      costSavings: '$35/month',
      difficulty: 'Easy',
      summary: 'Dining halls offer extensive legume and grain bowls. Swapping meat 3 days a week avoids ~380 kg CO₂e annually without nutritional compromise.',
      sourceRef: 'Poore & Nemecek (Science 2018)'
    });
  }

  // Transport recommendation
  if (baseline.breakdown.transport > 500) {
    recommendations.push({
      id: 'rec_trans_01',
      title: 'Switch 2 Commute Days to Campus Transit or Bike',
      category: 'transport',
      impactKg: 190,
      costSavings: '$40/month in fuel & parking',
      difficulty: 'Medium',
      summary: 'Taking the campus shuttle or cycling on Tuesdays & Thursdays cuts solo motor vehicle mileage by 40%, preventing 190 kg CO₂e.',
      sourceRef: 'UK DEFRA Transport (2023)'
    });
  }

  // Energy recommendation
  if (baseline.breakdown.energy > 400) {
    recommendations.push({
      id: 'rec_energy_01',
      title: 'Smart Power Strip & Cold Laundry Wash',
      category: 'energy',
      impactKg: 95,
      costSavings: '$15/month',
      difficulty: 'Easy',
      summary: 'Eliminate phantom standby loads from gaming consoles and mini-fridges. Washing clothes in 30°C/cold water saves ~75% of cycle electricity.',
      sourceRef: 'US EPA Energy Star & eGRID'
    });
  }

  // Shopping / Goods
  if (baseline.breakdown.shopping > 150) {
    recommendations.push({
      id: 'rec_shop_01',
      title: 'Campus Thrift Fairs & Clothing Swaps',
      category: 'shopping',
      impactKg: 120,
      costSavings: '$50+/month',
      difficulty: 'Easy',
      summary: 'Thrifted garments carry a life-cycle carbon footprint 90% lower than brand-new fast fashion pieces.',
      sourceRef: 'WRAP UK Textile Carbon Report'
    });
  }

  return {
    highestCategory: highestCategory[0],
    highestAmount: highestCategory[1],
    recommendations
  };
}

export function answerStudentQuestion(query, baseline) {
  const q = query.toLowerCase();

  if (q.includes('dorm') || q.includes('electricity') || q.includes('energy') || q.includes('power')) {
    return {
      answer: `In campus dorms, heating/cooling and mini-fridges consume the majority of power. Your energy footprint is currently ~${baseline.breakdown.energy} kg CO₂e/yr. You can reduce this by:
1. Setting your mini-fridge dial to medium rather than maximum cold.
2. Using a smart power strip to prevent phantom load when laptops and displays are in sleep mode.
3. Air-drying heavy hoodies or using cold-water cycles in the student laundry room.`,
      estimatedSavings: '60–110 kg CO₂e / year',
      tags: ['Energy', 'Dorm Hacks', 'Zero Cost']
    };
  }

  if (q.includes('food') || q.includes('diet') || q.includes('meal') || q.includes('vegan') || q.includes('meat')) {
    return {
      answer: `Food represents ~${baseline.breakdown.food} kg CO₂e of your annual budget. Because ruminant meat (beef/lamb) generates ~60 kg CO₂e per kg of food compared to under 1.5 kg for lentils and beans, even small changes compound:
- Committing to "Meatless Mondays" cuts ~68 kg CO₂e annually.
- Swapping cow's milk for oat or soy milk saves ~120 kg CO₂e per year if you consume coffee or cereal daily.`,
      estimatedSavings: '150–400 kg CO₂e / year',
      tags: ['Diet', 'Dining Hall', 'Nutrition']
    };
  }

  if (q.includes('commute') || q.includes('bike') || q.includes('bus') || q.includes('transit') || q.includes('car')) {
    return {
      answer: `Your commute accounts for ~${baseline.breakdown.transport} kg CO₂e/yr. If you currently ride a bus or drive:
- Biking or walking for trips under 3 km has 0 operational emissions.
- Carpooling with 1 peer cuts passenger-km emissions in half (from 0.192 to 0.096 kg CO₂e/km).
- Most student IDs grant free or discounted campus bus passes.`,
      estimatedSavings: '120–250 kg CO₂e / year',
      tags: ['Commute', 'Active Transit', 'Campus Perks']
    };
  }

  if (q.includes('budget') || q.includes('save money') || q.includes('cheap') || q.includes('cost')) {
    return {
      answer: `Being eco-friendly as a student actually saves money rather than costing more:
1. Campus bus pass (Free with student ID) saves ~$60/mo in gas and parking decals.
2. Thrift store clothing and university free-swap fairs save ~$40–$80/mo over fast fashion.
3. Plant-rich pantry staples (beans, lentils, rice, tofu) cost roughly 40% less per protein gram than beef or deli meats.`,
      estimatedSavings: 'Save $80–$150/mo while cutting 200+ kg CO₂e',
      tags: ['Student Budget', 'Financial Sustainability']
    };
  }

  // Default fallback answer
  return {
    answer: `Based on your audited profile (Annual total: ${baseline.total} kg CO₂e), your highest opportunity for reduction lies in ${sortedCategoryName(baseline.breakdown)}. 

To make the greatest immediate impact without disrupting your study schedule:
1. Target your top category first.
2. Try the What-If Simulator to find your optimal balance.
3. Set one achievable goal in the Goals tab and track it for 2 weeks.`,
    estimatedSavings: 'Up to 25% footprint reduction',
    tags: ['Overview', 'Custom Strategy']
  };
}

function sortedCategoryName(breakdown) {
  const keys = Object.keys(breakdown);
  keys.sort((a, b) => breakdown[b] - breakdown[a]);
  return keys[0] ? keys[0].toUpperCase() : 'TRANSPORTATION';
}
