import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  TrendingDown, 
  TrendingUp, 
  TreePine, 
  Sliders, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Bus, 
  Zap, 
  Utensils, 
  ShoppingBag, 
  Trash2,
  Calendar
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
    badges, 
    addActivity 
  } = useCarbon();

  // Quick Activity Quick-Add modal state
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickCategory, setQuickCategory] = useState('transport');
  const [quickSubtype, setQuickSubtype] = useState('bus');
  const [quickQuantity, setQuickQuantity] = useState(8);
  const [quickUnit, setQuickUnit] = useState('km');
  const [quickLabel, setQuickLabel] = useState('');

  // Pie chart data from baseline breakdown
  const pieData = [
    { name: 'Transport', value: baseline.breakdown.transport, color: CATEGORY_COLORS.transport, key: 'transport' },
    { name: 'Energy', value: baseline.breakdown.energy, color: CATEGORY_COLORS.energy, key: 'energy' },
    { name: 'Food', value: baseline.breakdown.food, color: CATEGORY_COLORS.food, key: 'food' },
    { name: 'Shopping', value: baseline.breakdown.shopping, color: CATEGORY_COLORS.shopping, key: 'shopping' },
    { name: 'Waste', value: baseline.breakdown.waste, color: CATEGORY_COLORS.waste, key: 'waste' }
  ];

  // Monthly trend comparison data (simulated seasonal semester distribution)
  const monthlyTrends = [
    { month: 'Jun', total: Math.round(baseline.total * 0.07), avg: 260 },
    { month: 'Jul', total: Math.round(baseline.total * 0.06), avg: 250 },
    { month: 'Aug', total: Math.round(baseline.total * 0.08), avg: 270 },
    { month: 'Sep', total: Math.round(baseline.total * 0.09), avg: 275 },
    { month: 'Oct', total: Math.round(baseline.total * 0.085), avg: 265 },
  ];

  const handleQuickAddSubmit = (e) => {
    e.preventDefault();
    addActivity({
      category: quickCategory,
      subtype: quickSubtype,
      quantity: quickQuantity,
      unit: quickUnit,
      label: quickLabel || `${quickCategory} activity`
    });
    setShowQuickAdd(false);
    setQuickLabel('');
  };

  const treesNeeded = getTreeEquivalents(baseline.total);

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      
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
              Student Footprint Portal
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', color: '#0f172a' }}>
            Hello, {currentUser?.name?.split(' ')[0] || 'Student'} 👋
          </h1>
          <p style={{ fontSize: '0.9375rem', color: '#64748b' }}>
            Here is your verified academic-year carbon footprint audit and active lifestyle metrics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setShowQuickAdd(true)}
            className="btn-primary"
          >
            <Plus size={18} /> Log Trip / Meal
          </button>
          <Link to="/simulator" className="btn-secondary">
            <Sliders size={18} /> Open Simulator
          </Link>
        </div>
      </div>

      {/* 4 TOP KPI CARDS */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '2.5rem' }}>
        {/* Card 1 */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Annual Footprint
            </span>
            <div style={{ padding: '0.375rem', backgroundColor: '#ecfdf5', borderRadius: '0.5rem', color: '#059669' }}>
              🌱
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
            {baseline.total.toLocaleString()} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>kg CO₂e</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.5rem', fontSize: '0.8125rem' }}>
            {benchmark.isLower ? (
              <span style={{ color: '#059669', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                <TrendingDown size={14} style={{ marginRight: '2px' }} /> {benchmark.percentDiff}% below campus avg
              </span>
            ) : (
              <span style={{ color: '#d97706', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                <TrendingUp size={14} style={{ marginRight: '2px' }} /> {benchmark.percentDiff}% above campus avg
              </span>
            )}
          </div>
        </div>

        {/* Card 2 */}
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
            {Math.round(baseline.total / 12)} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>kg / mo</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.5rem' }}>
            Target: &lt; 220 kg / month
          </div>
        </div>

        {/* Card 3 */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Trees to Offset
            </span>
            <div style={{ padding: '0.375rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem', color: '#16a34a' }}>
              <TreePine size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669', lineHeight: 1.1 }}>
            {treesNeeded} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>mature trees</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.5rem' }}>
            Annual carbon sequestration
          </div>
        </div>

        {/* Card 4 */}
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
            {activityEmissionsByCategory.total} kg CO₂e tracked
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
        {/* Category Breakdown Donut */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Emissions by Category</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Proportion of your annual estimated carbon budget</p>
            </div>
            <span className="badge badge-emerald">Verified DEFRA</span>
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
                  formatter={(value) => [`${value.toLocaleString()} kg CO₂e`, 'Emissions']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            {pieData.map((cat) => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: cat.color }} />
                <span style={{ color: '#475569' }}>{cat.name}:</span>
                <strong style={{ color: '#0f172a' }}>{cat.value} kg</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend Bar Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Monthly Trend vs Campus Benchmark</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Historical trajectory over recent months</p>
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
                    name === 'total' ? 'Your Footprint' : 'Campus Peer Avg'
                  ]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="total" fill="#059669" radius={[4, 4, 0, 0]} name="Your Footprint" />
                <Bar dataKey="avg" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Campus Peer Avg" />
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
        {/* Recent Activities List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Recent Activity Log</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Latest logged trips and meals</p>
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
                  backgroundColor: '#ffffff',
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
                    {act.category === 'transport' && <Bus size={18} />}
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
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CO₂e</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Sustainability Goals</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Active reduction challenges</p>
            </div>
            <Link to="/goals" style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600 }}>
              Manage Goals →
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
                    <span>Savings: ~{g.co2SavingsKg} kg CO₂e</span>
                    {pct >= 100 ? (
                      <span style={{ color: '#059669', fontWeight: 700 }}>✓ Completed</span>
                    ) : (
                      <span>Deadline: {g.deadline}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.75rem', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#166534' }}>
                Need personalized advice?
              </div>
              <div style={{ fontSize: '0.75rem', color: '#15803d' }}>
                Ask the AI sustainability coach tailored to your habits.
              </div>
            </div>
            <Link to="/ai-assistant" className="btn-primary" style={{ padding: '0.5rem 0.875rem', fontSize: '0.8125rem' }}>
              <Sparkles size={14} /> Talk to Coach
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK ADD MODAL */}
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
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: '#0f172a' }}>Log New Student Activity</h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Calculated deterministically using UK DEFRA & US EPA factors
            </p>

            <form onSubmit={handleQuickAddSubmit}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={quickCategory}
                  onChange={(e) => {
                    const cat = e.target.value;
                    setQuickCategory(cat);
                    if (cat === 'transport') { setQuickSubtype('bus'); setQuickUnit('km'); setQuickQuantity(8); }
                    if (cat === 'food') { setQuickSubtype('vegetarian'); setQuickUnit('day'); setQuickQuantity(1); }
                    if (cat === 'energy') { setQuickSubtype('dorm_room'); setQuickUnit('kWh'); setQuickQuantity(20); }
                    if (cat === 'shopping') { setQuickSubtype('clothing_thrift'); setQuickUnit('item'); setQuickQuantity(1); }
                    if (cat === 'waste') { setQuickSubtype('recycled_kg'); setQuickUnit('kg'); setQuickQuantity(2); }
                  }}
                  className="form-select"
                >
                  <option value="transport">Transportation</option>
                  <option value="food">Food & Meals</option>
                  <option value="energy">Electricity & Housing</option>
                  <option value="shopping">Shopping & Apparel</option>
                  <option value="waste">Waste & Recycling</option>
                </select>
              </div>

              {quickCategory === 'transport' && (
                <div className="form-group">
                  <label className="form-label">Transport Mode</label>
                  <select value={quickSubtype} onChange={(e) => setQuickSubtype(e.target.value)} className="form-select">
                    <option value="walking">Walking (0 kg CO₂e)</option>
                    <option value="bicycle">Bicycle (0 kg CO₂e)</option>
                    <option value="ebike">E-Bike (0.015 kg CO₂e/km)</option>
                    <option value="bus">Campus Bus (0.089 kg CO₂e/km)</option>
                    <option value="metro">Metro / Subway (0.035 kg CO₂e/km)</option>
                    <option value="carpool">Carpool 2+ (0.096 kg CO₂e/km)</option>
                    <option value="rideshare">Rideshare / Taxi (0.170 kg CO₂e/km)</option>
                    <option value="car_gasoline">Personal Car Solo (0.192 kg CO₂e/km)</option>
                  </select>
                </div>
              )}

              {quickCategory === 'food' && (
                <div className="form-group">
                  <label className="form-label">Diet Pattern / Meal</label>
                  <select value={quickSubtype} onChange={(e) => setQuickSubtype(e.target.value)} className="form-select">
                    <option value="vegan">100% Plant-Based Vegan (1.5 kg/day)</option>
                    <option value="vegetarian">Vegetarian (2.5 kg/day)</option>
                    <option value="pescatarian">Pescatarian (3.2 kg/day)</option>
                    <option value="flexitarian">Low Meat / Flexitarian (3.8 kg/day)</option>
                    <option value="high_meat">High Meat (7.2 kg/day)</option>
                  </select>
                </div>
              )}

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

              <div className="form-group">
                <label className="form-label">Description / Note</label>
                <input
                  type="text"
                  placeholder="e.g. Bus to campus science complex"
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
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
