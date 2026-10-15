import React, { useState } from 'react';
import { 
  Target, 
  Award, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  Flame, 
  Trophy, 
  Sparkles,
  Bike,
  Salad,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { useCarbon } from '../context/CarbonContext';
import confetti from 'canvas-confetti';

export default function GoalsPage() {
  const { goals, badges, addGoal, updateGoalProgress } = useCarbon();

  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('transport');
  const [newTarget, setNewTarget] = useState(10);
  const [newUnit, setNewUnit] = useState('trips');
  const [newDeadline, setNewDeadline] = useState('2026-11-15');
  const [newCo2Savings, setNewCo2Savings] = useState(15);

  const handleAddGoal = (e) => {
    e.preventDefault();
    addGoal({
      title: newTitle,
      category: newCategory,
      targetValue: Number(newTarget),
      unit: newUnit,
      deadline: newDeadline,
      co2SavingsKg: Number(newCo2Savings)
    });
    setModalOpen(false);
    setNewTitle('');
  };

  const handleIncrement = (g) => {
    updateGoalProgress(g.id, 1);
    if (g.currentValue + 1 >= g.targetValue) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }
  };

  const totalSavingsAchieved = goals
    .filter(g => g.status === 'achieved')
    .reduce((acc, curr) => acc + (curr.co2SavingsKg || 0), 0);

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
            Habits & Milestones
          </span>
          <h1 style={{ fontSize: '2.25rem', color: '#0f172a' }}>Sustainability Goals & Badges</h1>
          <p style={{ fontSize: '0.9375rem', color: '#64748b' }}>
            Commit to measurable personal reduction targets and unlock campus eco-achievements.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus size={18} /> Create New Goal
        </button>
      </div>

      {/* TOP ACHIEVEMENTS SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#ecfdf5', borderRadius: '0.5rem', color: '#059669' }}>
              <Flame size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Active Eco-Streak</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>14 Days</div>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Logged daily activities consistently</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#e0f2fe', borderRadius: '0.5rem', color: '#0284c7' }}>
              <Target size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Cumulative CO₂ Saved</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7' }}>{totalSavingsAchieved} kg</div>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Through completed challenge goals</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem', color: '#d97706' }}>
              <Trophy size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Badges Unlocked</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706' }}>
                {badges.filter(b => b.unlocked).length} / {badges.length}
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Greenfield Campus Pioneer Tier</p>
        </div>
      </div>

      {/* ACTIVE GOALS SECTION */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '1.25rem' }}>
          Active Commitments
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));
            return (
              <div key={g.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className={`badge ${
                      g.category === 'transport' ? 'badge-blue' :
                      g.category === 'food' ? 'badge-emerald' :
                      g.category === 'energy' ? 'badge-amber' : 'badge-purple'
                    }`}>
                      {g.category}
                    </span>
                    {g.status === 'achieved' ? (
                      <span className="badge badge-emerald">✓ Completed</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Calendar size={12} /> {g.deadline}
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                    {g.title}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.375rem' }}>
                    <span>Progress</span>
                    <span>{g.currentValue} / {g.targetValue} {g.unit} ({pct}%)</span>
                  </div>

                  <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      backgroundColor: pct >= 100 ? '#10b981' : '#059669',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#059669', fontWeight: 600 }}>
                    🌱 ~{g.co2SavingsKg} kg CO₂e saved
                  </span>
                  {g.status !== 'achieved' && (
                    <button
                      onClick={() => handleIncrement(g)}
                      className="btn-soft"
                      style={{ fontSize: '0.8125rem', padding: '0.375rem 0.75rem' }}
                    >
                      +1 {g.unit.replace(/s$/, '')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BADGES COLLECTION SECTION */}
      <div>
        <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '1.25rem' }}>
          Campus Sustainability Badges
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {badges.map((b) => (
            <div
              key={b.id}
              className="card"
              style={{
                textAlign: 'center',
                padding: '1.5rem',
                opacity: b.unlocked ? 1 : 0.6,
                backgroundColor: b.unlocked ? '#ffffff' : '#f8fafc',
                border: b.unlocked ? '1px solid #a7f3d0' : '1px dashed #cbd5e1'
              }}
            >
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '1rem',
                margin: '0 auto 1rem auto',
                backgroundColor: b.unlocked ? '#ecfdf5' : '#f1f5f9',
                color: b.unlocked ? '#059669' : '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {b.icon === 'Bike' && <Bike size={24} />}
                {b.icon === 'Salad' && <Salad size={24} />}
                {b.icon === 'ShoppingBag' && <ShoppingBag size={24} />}
                {b.icon === 'Zap' && <Zap size={24} />}
                {b.icon === 'Award' && <Award size={24} />}
              </div>

              <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.25rem' }}>
                {b.name}
              </h4>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                {b.desc}
              </p>

              {b.unlocked ? (
                <span className="badge badge-emerald">Unlocked ✓</span>
              ) : (
                <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#94a3b8' }}>Locked</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CREATE GOAL MODAL */}
      {modalOpen && (
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
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: '#0f172a' }}>Create Sustainable Goal</h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Set an actionable commitment for this term
            </p>

            <form onSubmit={handleAddGoal}>
              <div className="form-group">
                <label className="form-label">Goal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Walk or Bike to Physics Lab 8 times"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => {
                    const c = e.target.value;
                    setNewCategory(c);
                    if (c === 'transport') { setNewUnit('trips'); setNewCo2Savings(15); }
                    if (c === 'food') { setNewUnit('meals'); setNewCo2Savings(12); }
                    if (c === 'energy') { setNewUnit('kWh'); setNewCo2Savings(20); }
                    if (c === 'shopping') { setNewUnit('items'); setNewCo2Savings(25); }
                  }}
                  className="form-select"
                >
                  <option value="transport">Transportation</option>
                  <option value="food">Food & Diet</option>
                  <option value="energy">Dorm Energy</option>
                  <option value="shopping">Shopping & Thrift</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Target Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Unit</label>
                  <input
                    type="text"
                    required
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Estimated Savings (kg)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newCo2Savings}
                    onChange={(e) => setNewCo2Savings(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Date</label>
                  <input
                    type="date"
                    required
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
