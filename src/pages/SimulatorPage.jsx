import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  TreePine, 
  CheckCircle2, 
  TrendingDown, 
  Train, 
  AlertCircle, 
  ArrowRightLeft 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useCarbon } from '../context/CarbonContext';
import { INDIA_EMISSION_FACTORS, getTreeEquivalents } from '../services/carbonEngine';

export default function SimulatorPage() {
  const { baseline } = useCarbon();

  // Indian Student lifestyle levers
  const [metroDays, setMetroDays] = useState(3); // swap 3 days of scooter/cab to Metro/Bus
  const [dietCommitment, setDietCommitment] = useState('veg_all_week'); // switch occasional nonveg to pure veg
  const [hostelPowerSavingKwh, setHostelPowerSavingKwh] = useState(15); // turn off geysers/fans/standby
  const [kabadiwalaRecyclingKg, setKabadiwalaRecyclingKg] = useState(4); // raddi/paper diversion

  // 1. Commute savings:
  // Replacing 3 days/week * 18 km round trip from petrol scooter (0.0368) or cab (0.127) to Metro (0.0125)
  // Per day saved: 18 * (0.0368 - 0.0125) = ~0.437 kg * 36 weeks * 3 days = ~47 kg CO2
  const commuteSavedKg = Math.round(metroDays * 36 * 17 * (0.0368 - 0.0125));

  // 2. Diet savings
  let dietSavedKg = 0;
  if (dietCommitment === 'meatless_tuesday') {
    dietSavedKg = Math.round(1.1 * 52); // ~57 kg
  } else if (dietCommitment === 'veg_all_week') {
    dietSavedKg = Math.round(1.1 * 365); // ~400 kg
  } else if (dietCommitment === 'jain_or_vegan') {
    dietSavedKg = Math.round(0.5 * 365); // ~182 kg
  }

  // 3. Electricity savings using CEA India Grid factor (0.720 kg/kWh)
  const energySavedKg = Math.round(hostelPowerSavingKwh * 12 * 0.720);

  // 4. Waste & Kabadiwala savings
  const wasteSavedKg = Math.round(kabadiwalaRecyclingKg * 12 * (0.62 - 0.06));

  const totalProjectedSavings = commuteSavedKg + dietSavedKg + energySavedKg + wasteSavedKg;
  const simulatedFootprint = Math.max(300, baseline.total - totalProjectedSavings);
  const percentageCut = Math.round((totalProjectedSavings / baseline.total) * 100);
  const treesEquiv = getTreeEquivalents(totalProjectedSavings);

  const comparisonData = [
    {
      category: 'Total Footprint',
      Current: baseline.total,
      Simulated: simulatedFootprint
    },
    {
      category: 'Commute',
      Current: baseline.breakdown.transport,
      Simulated: Math.max(0, baseline.breakdown.transport - commuteSavedKg)
    },
    {
      category: 'Hostel Diet',
      Current: baseline.breakdown.food,
      Simulated: Math.max(0, baseline.breakdown.food - dietSavedKg)
    },
    {
      category: 'Hostel Power',
      Current: baseline.breakdown.energy,
      Simulated: Math.max(0, baseline.breakdown.energy - energySavedKg)
    },
    {
      category: 'Shopping & Waste',
      Current: baseline.breakdown.shopping + baseline.breakdown.waste,
      Simulated: Math.max(0, (baseline.breakdown.shopping + baseline.breakdown.waste) - wasteSavedKg)
    }
  ];

  const handleReset = () => {
    setMetroDays(3);
    setDietCommitment('veg_all_week');
    setHostelPowerSavingKwh(15);
    setKabadiwalaRecyclingKg(4);
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
            Simulate realistic Indian student lifestyle changes backed by India GHG Program & CEA factors.
          </p>
        </div>

        <button onClick={handleReset} className="btn-secondary">
          Reset Default Levers
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
          
          {/* Lever 1: Metro Commute Shift */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a' }}>1. Shift Commute to Metro / City Bus</h3>
              <span className="badge badge-blue">+{commuteSavedKg} kg saved/yr</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1rem' }}>
              Replace petrol scooter (Activa) or solo car days with Metro Rail / Public Bus:
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: '#059669', marginBottom: '0.25rem' }}>
              <span>{metroDays} days / week via Metro</span>
              <span style={{ color: '#64748b', fontWeight: 400 }}>Save on petrol & congestion</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={metroDays}
              onChange={(e) => setMetroDays(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#059669' }}
            />
          </div>

          {/* Lever 2: Desi Mess Diet */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a' }}>2. Campus Mess Dietary Switch</h3>
              <span className="badge badge-emerald">+{dietSavedKg} kg saved/yr</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1rem' }}>
              Opt for vegetarian hostel thali and reduce poultry/mutton frequency:
            </p>
            <select
              value={dietCommitment}
              onChange={(e) => setDietCommitment(e.target.value)}
              className="form-select"
            >
              <option value="none">No Change to Current Diet (0 kg saved)</option>
              <option value="meatless_tuesday">Vegetarian Days 2x a week (~57 kg saved)</option>
              <option value="veg_all_week">Full Desi Vegetarian Mess Thali (~400 kg saved)</option>
              <option value="jain_or_vegan">Plant-Based / Jain Transition (~182 kg saved)</option>
            </select>
          </div>

          {/* Lever 3: Hostel Electricity */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a' }}>3. Hostel Power Conservation (CEA)</h3>
              <span className="badge badge-amber">+{energySavedKg} kg saved/yr</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1rem' }}>
              Turn off cooler/geysers when leaving, switch to LED lamps, and power off idle monitors:
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: '#d97706', marginBottom: '0.25rem' }}>
              <span>{hostelPowerSavingKwh} units (kWh) saved / month</span>
              <span style={{ color: '#64748b', fontWeight: 400 }}>Save ₹{Math.round(hostelPowerSavingKwh * 8)} on electricity</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={hostelPowerSavingKwh}
              onChange={(e) => setHostelPowerSavingKwh(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#d97706' }}
            />
          </div>

          {/* Lever 4: Kabadiwala Scrap Diversion */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a' }}>4. Scrap to Kabadiwala / Raddi</h3>
              <span className="badge badge-purple">+{wasteSavedKg} kg saved/yr</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1rem' }}>
              Sort old assignments, boxes, and plastic bottles to informal scrap recyclers:
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, color: '#7c3aed', marginBottom: '0.25rem' }}>
              <span>{kabadiwalaRecyclingKg} kg paper/plastic diverted / mo</span>
              <span style={{ color: '#64748b', fontWeight: 400 }}>Earn ₹40-60/mo</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={kabadiwalaRecyclingKg}
              onChange={(e) => setKabadiwalaRecyclingKg(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#7c3aed' }}
            />
          </div>

        </div>

        {/* RESULTS COLUMN */}
        <div>
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', backgroundColor: '#ffffff', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 700, color: '#059669' }}>
              ✓ {percentageCut}% Total Footprint Reduction
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

            <div style={{ marginTop: '1.25rem', fontSize: '0.875rem', color: '#166534' }}>
              🌳 Equivalent to planting <strong>{treesEquiv} mature Peepal/Neem trees</strong>
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
        </div>

      </div>

    </div>
  );
}
