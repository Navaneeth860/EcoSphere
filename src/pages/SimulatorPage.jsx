import React, { useState } from 'react';
import { 
  Sliders, 
  ArrowRight, 
  TrendingDown, 
  TreePine, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useCarbon } from '../context/CarbonContext';
import { EMISSION_FACTORS, getTreeEquivalents } from '../services/carbonEngine';

export default function SimulatorPage() {
  const { baseline } = useCarbon();

  // Scenario modification controls
  const [bikeWalkDays, setBikeWalkDays] = useState(2); // days per week swapped to active transit
  const [dietChange, setDietChange] = useState('flexitarian_to_veg'); // lifestyle dietary lever
  const [unplugDormKwh, setUnplugDormKwh] = useState(20); // kwh saved per month from smart power strips / LED
  const [thriftGarments, setThriftGarments] = useState(1); // new garments avoided per month by thrifting

  // Deterministic calculation of savings:
  // 1. Commute savings: replacing 2 days/week (approx 36 weeks/yr = 72 days) * 12 km from bus (0.089) or car (0.192) to bike (0.00)
  const commuteSavedKg = Math.round(bikeWalkDays * 36 * 12 * 0.089);

  // 2. Diet savings
  let dietSavedKg = 0;
  if (dietChange === 'meatless_monday') {
    // 1 day a week vegetarian instead of flexitarian (3.8 -> 2.5 = 1.3 kg saved * 52)
    dietSavedKg = Math.round(1.3 * 52);
  } else if (dietChange === 'flexitarian_to_veg') {
    // full vegetarian switch (3.8 -> 2.5 = 1.3 kg saved * 365)
    dietSavedKg = Math.round(1.3 * 365);
  } else if (dietChange === 'veg_to_vegan') {
    // vegetarian to vegan (2.5 -> 1.5 = 1.0 kg * 365)
    dietSavedKg = Math.round(1.0 * 365);
  }

  // 3. Energy savings
  const energySavedKg = Math.round(unplugDormKwh * 12 * 0.385);

  // 4. Shopping savings: 1 garment/mo avoided (15 kg each) vs thrifted (1.2 kg) = 13.8 kg * 12
  const shoppingSavedKg = Math.round(thriftGarments * 12 * 13.8);

  const totalProjectedSavings = commuteSavedKg + dietSavedKg + energySavedKg + shoppingSavedKg;
  const simulatedFootprint = Math.max(400, baseline.total - totalProjectedSavings);
  const percentageCut = Math.round((totalProjectedSavings / baseline.total) * 100);
  const treesEquiv = getTreeEquivalents(totalProjectedSavings);

  // Chart comparison data
  const comparisonData = [
    {
      category: 'Total Footprint',
      Current: baseline.total,
      Simulated: simulatedFootprint
    },
    {
      category: 'Transport',
      Current: baseline.breakdown.transport,
      Simulated: Math.max(0, baseline.breakdown.transport - commuteSavedKg)
    },
    {
      category: 'Diet & Food',
      Current: baseline.breakdown.food,
      Simulated: Math.max(0, baseline.breakdown.food - dietSavedKg)
    },
    {
      category: 'Dorm Energy',
      Current: baseline.breakdown.energy,
      Simulated: Math.max(0, baseline.breakdown.energy - energySavedKg)
    },
    {
      category: 'Shopping',
      Current: baseline.breakdown.shopping,
      Simulated: Math.max(0, baseline.breakdown.shopping - shoppingSavedKg)
    }
  ];

  const handleReset = () => {
    setBikeWalkDays(2);
    setDietChange('flexitarian_to_veg');
    setUnplugDormKwh(20);
    setThriftGarments(1);
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Interactive Decision Lab
          </span>
          <h1 style={{ fontSize: '2.25rem', color: '#0f172a' }}>What-If Carbon Reduction Simulator</h1>
          <p style={{ fontSize: '0.9375rem', color: '#64748b' }}>
            Test micro-lifestyle modifications and project your semester emissions savings in real time.
          </p>
        </div>

        <button onClick={handleReset} className="btn-secondary">
          <RotateCcw size={16} /> Reset Default Levers
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        
        {/* LEVERS COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Lever 1: Transit */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a' }}>1. Active Commute Days</h3>
              <span className="badge badge-blue">+{commuteSavedKg} kg saved/yr</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1rem' }}>
              Replace motorized transit with bicycle or walking:
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: '#059669', marginBottom: '0.25rem' }}>
              <span>{bikeWalkDays} days / week</span>
              <span style={{ color: '#64748b', fontWeight: 400 }}>approx 24 km/week</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={bikeWalkDays}
              onChange={(e) => setBikeWalkDays(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#059669' }}
            />
          </div>

          {/* Lever 2: Food & Diet */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a' }}>2. Campus Dining Transition</h3>
              <span className="badge badge-emerald">+{dietSavedKg} kg saved/yr</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1rem' }}>
              Choose a realistic plant-forward commitment:
            </p>
            <select
              value={dietChange}
              onChange={(e) => setDietChange(e.target.value)}
              className="form-select"
            >
              <option value="none">No Change to Current Diet (0 kg)</option>
              <option value="meatless_monday">Meatless Monday Only (1 day/week veg) (~68 kg)</option>
              <option value="flexitarian_to_veg">Full Vegetarian Transition (~475 kg)</option>
              <option value="veg_to_vegan">Full 100% Plant-Based Vegan Transition (~365 kg)</option>
            </select>
          </div>

          {/* Lever 3: Energy Savings */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a' }}>3. Dorm Energy Conservation</h3>
              <span className="badge badge-amber">+{energySavedKg} kg saved/yr</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1rem' }}>
              Unplug idle chargers, use LED desk bulbs, and cold-water laundry washes:
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: '#d97706', marginBottom: '0.25rem' }}>
              <span>{unplugDormKwh} kWh / month saved</span>
              <span style={{ color: '#64748b', fontWeight: 400 }}>~${Math.round(unplugDormKwh * 0.16)} off bills</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={unplugDormKwh}
              onChange={(e) => setUnplugDormKwh(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#d97706' }}
            />
          </div>

          {/* Lever 4: Shopping & Thrifting */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a' }}>4. Thrift Instead of Fast Fashion</h3>
              <span className="badge badge-purple">+{shoppingSavedKg} kg saved/yr</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1rem' }}>
              Replace brand-new garment purchases with thrift or clothing swaps:
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: '#7c3aed', marginBottom: '0.25rem' }}>
              <span>{thriftGarments} garment / month thrifted</span>
              <span style={{ color: '#64748b', fontWeight: 400 }}>Avoids virgin cotton & dyeing</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              value={thriftGarments}
              onChange={(e) => setThriftGarments(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#7c3aed' }}
            />
          </div>

        </div>

        {/* SIMULATED IMPACT RESULTS COLUMN */}
        <div>
          {/* Key Result Banner */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
            border: '2px solid #a7f3d0',
            padding: '2rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#166534' }}>
              Projected Annual Reduction
            </span>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#059669', margin: '0.5rem 0' }}>
              -{totalProjectedSavings.toLocaleString()} <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>kg CO₂e</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', backgroundColor: '#ffffff', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 700, color: '#059669', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <TrendingDown size={16} /> {percentageCut}% Total Footprint Reduction
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem', textAlign: 'left' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #d1fae5' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Current Baseline</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{baseline.total} kg</div>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #d1fae5' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Simulated Footprint</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{simulatedFootprint} kg</div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', fontSize: '0.875rem', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <TreePine size={18} /> Equivalent to planting <strong>{treesEquiv} mature trees</strong>
            </div>
          </div>

          {/* Comparison Bar Chart */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>
              Baseline vs. Simulated Scenario
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Deterministic breakdown by lifestyle component
            </p>

            <div style={{ height: '260px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    formatter={(val, name) => [`${val} kg CO₂e`, name]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="Current" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Current Baseline" />
                  <Bar dataKey="Simulated" fill="#059669" radius={[4, 4, 0, 0]} name="Simulated Scenario" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scientific Disclaimer Note */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
            <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              Calculated using UK DEFRA (2023) passenger conversion factors and Poore & Nemecek dietary lifecycle benchmarks. Projected reductions represent estimated theoretical carbon savings based on self-reported inputs.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
