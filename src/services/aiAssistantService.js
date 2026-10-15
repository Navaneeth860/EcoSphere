/**
 * Deterministic AI Advisor Service for EcoSphere (BMSCE Bengaluru & South Karnataka Context)
 * Grounded in Govt of India, India GHG Program and BESCOM / Karnataka Energy guidelines.
 */

export function generateSmartRecommendations(baseline, activities) {
  const recommendations = [];

  const sorted = Object.entries(baseline.breakdown).sort((a, b) => b[1] - a[1]);
  const highestCategory = sorted[0];

  // Transport recommendation (Namma Metro Green Line / BMTC Volvo)
  if (baseline.breakdown.transport > 250) {
    recommendations.push({
      id: 'rec_trans_01',
      title: 'Take Namma Metro Green Line to National College / Lalbagh',
      category: 'transport',
      impactKg: 135,
      costSavings: 'Save ₹1,500/month on petrol & parking',
      difficulty: 'Easy',
      summary: 'BMSCE is conveniently located near National College & South End Circle Metro stations on the Green Line. Namma Metro emits only 0.0125 kg CO₂/pax-km vs 0.0368 kg on a Honda Activa, avoiding peak Bull Temple Road and Gandhi Bazaar traffic.',
      sourceRef: 'India GHG Program Table 5.1.1 & BMRCL CDM Report'
    });
  }

  // Food recommendation (Traditional Karnataka Vegetarian Diet)
  if (baseline.breakdown.food > 500) {
    recommendations.push({
      id: 'rec_food_01',
      title: 'Opt for South Indian Canteen Thali & Mess Meals',
      category: 'food',
      impactKg: 240,
      costSavings: 'Save ₹900/month off food delivery',
      difficulty: 'Easy',
      summary: 'Traditional Karnataka vegetarian meals (Idli, Dosa, Bisi Bele Bath, Dal Sambar, Rasam, Curd Rice) have a low lifecycle footprint of ~1.7 kg CO₂e/day compared to 4.6 kg for frequent fast-food or non-veg restaurant orders.',
      sourceRef: 'Indian Dietary Carbon Assessments'
    });
  }

  // Energy recommendation (BESCOM Grid)
  if (baseline.breakdown.energy > 350) {
    recommendations.push({
      id: 'rec_energy_01',
      title: 'Hostel Geyser Discipline & Bangalore Weather Ventilation',
      category: 'energy',
      impactKg: 90,
      costSavings: '₹350/month in shared hostel bills',
      difficulty: 'Easy',
      summary: 'Bengaluru’s pleasant climate means fans and cross-ventilation are sufficient for most of the year. Limiting water geyser usage in the BMSCE hostel to 15 mins saves ~1.5 units (BESCOM factor 0.708 kg CO₂/kWh).',
      sourceRef: 'Central Electricity Authority (CEA) Karnataka Regional Grid'
    });
  }

  // Waste & Local Gujri shop
  recommendations.push({
    id: 'rec_waste_01',
    title: 'Sell VTU Question Banks & Assignment Paper to Gandhi Bazaar Gujri',
    category: 'waste',
    impactKg: 40,
    costSavings: 'Earn ₹150–₹250 cash per semester',
    difficulty: 'Easy',
    summary: 'Basavanagudi and Gandhi Bazaar have active local raddi/scrap recyclers (Gujri). Diverting exam notes from BBMP municipal landfills prevents organic decomposition and methane emissions.',
    sourceRef: 'BBMP Solid Waste Management Circular Guidelines'
  });

  return {
    highestCategory: highestCategory[0],
    highestAmount: highestCategory[1],
    recommendations
  };
}

export function answerStudentQuestion(query, baseline) {
  const q = query.toLowerCase();

  if (q.includes('metro') || q.includes('bmtc') || q.includes('activa') || q.includes('commute') || q.includes('bus') || q.includes('scooter')) {
    return {
      answer: `For a student commuting to BMSCE (Basavanagudi):
- Namma Metro (National College / South End Circle Station): ~0.0125 kg CO₂/pax-km
- BMTC City Bus (Route 210/215): 0.0152 kg CO₂/pax-km (Govt India GHG factor)
- Honda Activa / TVS Jupiter: 0.0368 kg CO₂/km
- Auto Rickshaw: 0.1077 kg CO₂/km

Switching your daily 15 km round trip from an Activa to Namma Metro cuts your commute emissions by ~66% (saving ~120 kg CO₂ per academic year) while skipping Gandhi Bazaar traffic bottlenecks!`,
      estimatedSavings: '120–160 kg CO₂ / year + Petrol Savings',
      tags: ['Namma Metro', 'BMTC', 'BMSCE Commute']
    };
  }

  if (q.includes('hostel') || q.includes('bmsce') || q.includes('pg') || q.includes('electricity') || q.includes('bescom')) {
    return {
      answer: `In BMSCE Campus Hostels or PGs across Basavanagudi/Hanumanthnagar:
1. BESCOM grid carbon intensity is ~0.708 kg CO₂/kWh (CEA Southern Grid).
2. Instant bathroom geysers are the largest power draw (1500W–2000W). Keeping shower times crisp saves ~1 unit/day (~0.7 kg CO₂).
3. Switching off laptop chargers and study lamps before heading to academic blocks keeps standby loss near zero.`,
      estimatedSavings: '70–120 kg CO₂ / year',
      tags: ['BMSCE Hostel', 'BESCOM Grid', 'Zero Cost']
    };
  }

  if (q.includes('food') || q.includes('mess') || q.includes('canteen') || q.includes('dosa') || q.includes('veg') || q.includes('diet')) {
    return {
      answer: `Traditional South Indian meals in the BMSCE canteen or nearby iconic spots (like Vidyarthi Bhavan or Brahmins' Coffee Bar) are inherently low in carbon:
- Idli, Vada, Masala Dosa, Bisibelebath, and Curd Rice average only ~1.7 kg CO₂e/day.
- Compare this with non-veg chicken biryani (~4.6 kg CO₂e/day).
Sticking to vegetarian mess meals on weekdays cuts ~240 kg CO₂e annually while maintaining balanced nutrition with lentils, sambar, and curd.`,
      estimatedSavings: '200–300 kg CO₂ / year',
      tags: ['South Indian Thali', 'BMSCE Canteen', 'Low Carbon']
    };
  }

  if (q.includes('waste') || q.includes('gujri') || q.includes('raddi') || q.includes('recycle') || q.includes('bbmp')) {
    return {
      answer: `Basavanagudi has a well-established informal Gujri (raddi) recycling network:
- Dumping old lab records and Xerox question banks into BBMP municipal bins sends them to landfills, releasing methane (0.60 kg CO₂/kg).
- Selling your end-of-semester bundles to a local Gujri shop recycles the paper at only 0.05 kg CO₂/kg and earns you pocket money (₹14–₹18/kg)!`,
      estimatedSavings: '35–55 kg CO₂ / year + Pocket Money',
      tags: ['Gujri Scrap', 'BBMP Circular Economy', 'Basavanagudi']
    };
  }

  return {
    answer: `Based on your BMSCE Bengaluru footprint (${baseline.total} kg CO₂e/yr), your greatest reduction opportunity is in ${sortedCategoryName(baseline.breakdown)}.
1. Use Namma Metro Green Line or BMTC buses for college commutes.
2. Moderate geyser usage in the hostel.
3. Track your daily habits in the Goals tab!`,
    estimatedSavings: 'Up to 25% footprint reduction',
    tags: ['Overview', 'BMSCE Custom Strategy']
  };
}

function sortedCategoryName(breakdown) {
  const keys = Object.keys(breakdown);
  keys.sort((a, b) => breakdown[b] - breakdown[a]);
  return keys[0] ? keys[0].toUpperCase() : 'COMMUTE';
}
