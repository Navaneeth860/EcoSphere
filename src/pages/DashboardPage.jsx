import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  TrendingDown, 
  TrendingUp, 
  TreePine, 
  Sliders, 
  Sparkles, 
  Calendar,
  Train,
  Zap,
  Utensils,
  ShoppingBag,
  Trash2,
  ArrowRightLeft
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { useCarbon } from '../context/CarbonContext';
import { useAuth } from '../context/AuthContext';
import { getTreeEquivalents } from '../services/carbonEngine';
import DatabaseLiveModal from '../components/DatabaseLiveModal';

const CATEGORY_COLORS = {
  transport: '#0284c7',
  energy: '#f59e0b',
  food: '#10b981',
  shopping: '#8b5cf6',
  waste: '#ef4444'
};

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { 
    baseline, 
    activityEmissionsByCategory, 
    activities, 
    benchmark, 
    goals, 
    addActivity 
  } = useCarbon();

  // Quick Activity Quick-Add modal state
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showDbLive, setShowDbLive] = useState(false);
  const [quickCategory, setQuickCategory] = useState('transport');
  const [quickSubtype, setQuickSubtype] = useState('metro');
  const [quickGoingKm, setQuickGoingKm] = useState(7.5);
  const [quickComingKm, setQuickComingKm] = useState(7.5);
  const [quickQuantity, setQuickQuantity] = useState(15);
  const [quickUnit, setQuickUnit] = useState('km');
  const [quickLabel, setQuickLabel] = useState('');

  const safeTotal = baseline?.total || 1720;
  const safeBreakdown = baseline?.breakdown || {
    transport: 420,
    energy: 460,
    food: 620,
    shopping: 140,
    waste: 80
  };

  const pieData = [
    { name: 'Commute (Namma Metro/BMTC/Activa)', value: safeBreakdown.transport || 0, color: CATEGORY_COLORS.transport, key: 'transport' },
    { name: 'Hostel Power (BESCOM Grid)', value: safeBreakdown.energy || 0, color: CATEGORY_COLORS.energy, key: 'energy' },
    { name: 'Mess Diet (South Indian Veg/Non-Veg)', value: safeBreakdown.food || 0, color: CATEGORY_COLORS.food, key: 'food' },
    { name: 'VTU Notes & Clothes', value: safeBreakdown.shopping || 0, color: CATEGORY_COLORS.shopping, key: 'shopping' },
    { name: 'Gujri Shop & BBMP Waste', value: safeBreakdown.waste || 0, color: CATEGORY_COLORS.waste, key: 'waste' }
  ];

  const monthlyTrends = [
    { month: 'Jun', total: Math.round(safeTotal * 0.075), avg: 145 },
    { month: 'Jul', total: Math.round(safeTotal * 0.070), avg: 140 },
    { month: 'Aug', total: Math.round(safeTotal * 0.085), avg: 150 },
    { month: 'Sep', total: Math.round(safeTotal * 0.090), avg: 155 },
    { month: 'Oct', total: Math.round(safeTotal * 0.080), avg: 145 },
  ];

  const handleQuickAddSubmit = (e) => {
    e.preventDefault();
    const finalQuantity = quickCategory === 'transport' ? (Number(quickGoingKm) + Number(quickComingKm)) : Number(quickQuantity);
    addActivity({
      category: quickCategory,
      subtype: quickSubtype,
      quantity: finalQuantity,
      unit: quickUnit,
      label: quickLabel || `${quickCategory} trip`
    });
    setShowQuickAdd(false);
    setQuickLabel('');
  };

  const treesNeeded = getTreeEquivalents(safeTotal);

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      
      {/* Live Supabase Cloud Telemetry Banner */}
      <div style={{
        backgroundColor: '#f0fdf4',
        border: '1px solid #86efac',
        borderRadius: '0.875rem',
        padding: '0.75rem 1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 1px 3px rgba(16, 185, 129, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
          <div>
            <span style={{ fontWeight: 800, color: '#065f46', fontSize: '0.875rem' }}>
              Cloud Database Connected: Supabase PostgreSQL 17.11
            </span>
            <span style={{ fontSize: '0.78rem', color: '#166534', marginLeft: '0.625rem' }}>
              Host: <code style={{ backgroundColor: '#dcfce7', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>db.xbztcoqmlawmysgxuphq.supabase.co</code> • SSL Secure
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowDbLive(true)}
          className="btn-soft"
          style={{ padding: '0.375rem 0.875rem', fontSize: '0.8125rem', fontWeight: 700, borderColor: '#10b981' }}
        >
          ⚡ Open Live DB Monitor & Test Transactions
        </button>
      </div>

      {/* Welcome Banner */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🌿 B.M.S. College of Engineering (BMSCE)
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', color: '#0f172a' }}>
            Namaskara, {currentUser?.name?.split(' ')[0] || 'Student'} 👋
          </h1>
          <p style={{ fontSize: '0.9375rem', color: '#64748b' }}>
            {currentUser?.university || 'BMSCE Bengaluru'} • Bull Temple Road, Basavanagudi
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setShowQuickAdd(true)}
            className="btn-primary"
          >
            <Plus size={18} /> Log Metro / Canteen
          </button>
          <Link to="/simulator" className="btn-secondary">
            <Sliders size={18} /> What-If Simulator
          </Link>
        </div>
      </div>

      {/* 4 TOP KPI CARDS */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Academic Footprint
            </span>
            <div style={{ padding: '0.375rem', backgroundColor: '#ecfdf5', borderRadius: '0.5rem', color: '#059669' }}>
              🌱
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
            {safeTotal.toLocaleString()} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>kg CO₂e</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.5rem', fontSize: '0.8125rem' }}>
            {benchmark?.isLower ? (
              <span style={{ color: '#059669', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                <TrendingDown size={14} style={{ marginRight: '2px' }} /> {benchmark.percentDiff}% below Bengaluru avg (1,750 kg)
              </span>
            ) : (
              <span style={{ color: '#d97706', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                <TrendingUp size={14} style={{ marginRight: '2px' }} /> {benchmark?.percentDiff || 0}% above Bengaluru avg
              </span>
            )}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Monthly Average
            </span>
            <div style={{ padding: '0.375rem', backgroundColor: '#e0f2fe', borderRadius: '0.5rem', color: '#0284c7' }}>
              <Calendar size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
            {Math.round(safeTotal / 12)} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>kg / mo</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.5rem' }}>
            City target: &lt; 145 kg/mo
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Honge / Neem Trees
            </span>
            <div style={{ padding: '0.375rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem', color: '#16a34a' }}>
              <TreePine size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669', lineHeight: 1.1 }}>
            {treesNeeded} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>trees</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.5rem' }}>
            Annual carbon sequestration
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Logged Activities
            </span>
            <div style={{ padding: '0.375rem', backgroundColor: '#f3e8ff', borderRadius: '0.5rem', color: '#7c3aed' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
            {activities.length} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>entries</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#7c3aed', fontWeight: 600, marginTop: '0.5rem' }}>
            {activityEmissionsByCategory.total} kg CO₂ tracked
          </div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Emissions by Category</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>India GHG Program & BESCOM grid factors</p>
            </div>
            <span className="badge badge-emerald">Karnataka Grid</span>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell key={`cell-${entry.key}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()} kg CO₂`, 'Emissions']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.875rem', marginTop: '0.5rem' }}>
            {pieData.map((cat) => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color }} />
                <span>{cat.name.split(' ')[0]}: <strong>{cat.value} kg</strong></span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Monthly Trajectory vs Bengaluru Student Average</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Semester comparison against South Bengaluru benchmark</p>
            </div>
            <span className="badge badge-blue">Trajectory</span>
          </div>

          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} kg`, 
                    name === 'total' ? 'Your Footprint' : 'BMSCE Peer Avg'
                  ]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="total" fill="#059669" radius={[4, 4, 0, 0]} name="Your Footprint" />
                <Bar dataKey="avg" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="BMSCE Peer Avg" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITIES & ACTIVE GOALS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Recent Activities */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Recent Activity Log</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Latest logged trips and canteen meals</p>
            </div>
            <Link to="/activities" style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600 }}>
              View All ({activities.length}) →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {activities.slice(0, 5).map(act => (
              <div 
                key={act.id}
                style={{
                  padding: '0.875rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: act.category === 'transport' ? '#e0f2fe' :
                                     act.category === 'food' ? '#ecfdf5' :
                                     act.category === 'energy' ? '#fef3c7' :
                                     act.category === 'shopping' ? '#f3e8ff' : '#fee2e2',
                    color: act.category === 'transport' ? '#0284c7' :
                           act.category === 'food' ? '#059669' :
                           act.category === 'energy' ? '#d97706' :
                           act.category === 'shopping' ? '#7c3aed' : '#dc2626'
                  }}>
                    {act.category === 'transport' && <Train size={18} />}
                    {act.category === 'food' && <Utensils size={18} />}
                    {act.category === 'energy' && <Zap size={18} />}
                    {act.category === 'shopping' && <ShoppingBag size={18} />}
                    {act.category === 'waste' && <Trash2 size={18} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{act.label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {act.quantity} {act.unit} • {act.date}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: act.co2Kg === 0 ? '#059669' : '#0f172a' }}>
                    {act.co2Kg === 0 ? '0.00 kg' : `+${act.co2Kg} kg`}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CO₂</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Active Commitments</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>BMSCE student eco-challenges</p>
            </div>
            <Link to="/goals" style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600 }}>
              All Goals →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {goals.map(g => {
              const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));
              return (
                <div key={g.id} style={{ padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{g.title}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: pct >= 100 ? '#059669' : '#475569' }}>
                      {g.currentValue} / {g.targetValue} {g.unit}
                    </span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.375rem' }}>
                    <div style={{ height: '100%', width: `${pct}%`, backgroundColor: pct >= 100 ? '#10b981' : '#059669' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                    <span>Savings: ~{g.co2SavingsKg} kg CO₂</span>
                    {pct >= 100 ? (
                      <span style={{ color: '#059669', fontWeight: 700 }}>✓ Achieved</span>
                    ) : (
                      <span>Target: {g.deadline}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.75rem', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#166534' }}>
                Ask AI Campus Coach
              </div>
              <div style={{ fontSize: '0.75rem', color: '#15803d' }}>
                Get Namma Metro and Basavanagudi advice.
              </div>
            </div>
            <Link to="/ai-assistant" className="btn-primary" style={{ padding: '0.5rem 0.875rem', fontSize: '0.8125rem' }}>
              <Sparkles size={14} /> Open Coach
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK ADD MODAL WITH GOING AND COMING */}
      {showQuickAdd && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: '#0f172a' }}>Log BMSCE Activity</h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Using India GHG Program (2015) & BESCOM factors
            </p>

            <form onSubmit={handleQuickAddSubmit}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={quickCategory}
                  onChange={(e) => {
                    const cat = e.target.value;
                    setQuickCategory(cat);
                    if (cat === 'transport') { setQuickSubtype('metro'); setQuickUnit('km'); }
                    if (cat === 'food') { setQuickSubtype('pure_veg'); setQuickUnit('day'); setQuickQuantity(1); }
                    if (cat === 'energy') { setQuickSubtype('hostel_room'); setQuickUnit('kWh'); setQuickQuantity(15); }
                    if (cat === 'shopping') { setQuickSubtype('books_photocopy'); setQuickUnit('bundle'); setQuickQuantity(1); }
                    if (cat === 'waste') { setQuickSubtype('kabadiwala_recycled'); setQuickUnit('kg'); setQuickQuantity(2); }
                  }}
                  className="form-select"
                >
                  <option value="transport">Transportation / Commute</option>
                  <option value="food">Canteen / Hostel Mess</option>
                  <option value="energy">Hostel / PG Electricity</option>
                  <option value="shopping">VTU Notes & Clothes</option>
                  <option value="waste">Gujri / Scrap Recycling</option>
                </select>
              </div>

              {quickCategory === 'transport' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Transport Mode</label>
                    <select value={quickSubtype} onChange={(e) => setQuickSubtype(e.target.value)} className="form-select">
                      <option value="metro">Namma Metro (0.0125 kg/pax-km)</option>
                      <option value="bus_city">BMTC City Bus (0.0152 kg/pax-km)</option>
                      <option value="scooter_petrol">Honda Activa / TVS Jupiter (0.0368 kg/km)</option>
                      <option value="bike_100cc">Hero Splendor / Platina (0.0358 kg/km)</option>
                      <option value="auto_cng">Namma Auto Rickshaw (0.1077 kg/km)</option>
                      <option value="bicycle">Bicycle / Yulu (0 kg/km)</option>
                    </select>
                  </div>

                  <div style={{ backgroundColor: '#f8fafc', padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                      <ArrowRightLeft size={14} color="#059669" /> Commute Distance (Going & Coming)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>Going to BMSCE (km):</label>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={quickGoingKm}
                          onChange={(e) => setQuickGoingKm(Number(e.target.value))}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>Coming Back (km):</label>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={quickComingKm}
                          onChange={(e) => setQuickComingKm(Number(e.target.value))}
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: '0.375rem' }}>
                      Round-trip: {Number(quickGoingKm) + Number(quickComingKm)} km
                    </div>
                  </div>
                </>
              )}

              {quickCategory !== 'transport' && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      min="0.1"
                      step="any"
                      required
                      value={quickQuantity}
                      onChange={(e) => setQuickQuantity(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Unit</label>
                    <input
                      type="text"
                      disabled
                      value={quickUnit}
                      className="form-input"
                      style={{ backgroundColor: '#f1f5f9' }}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Description / Route</label>
                <input
                  type="text"
                  placeholder="e.g. Namma Metro Green Line to National College"
                  value={quickLabel}
                  onChange={(e) => setQuickLabel(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowQuickAdd(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Database Live Telemetry Modal */}
      <DatabaseLiveModal isOpen={showDbLive} onClose={() => setShowDbLive(false)} />

    </div>
  );
}
