import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe2, 
  ArrowRight, 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  TrendingDown, 
  Train,
  ArrowRightLeft
} from 'lucide-react';
import { INDIA_EMISSION_FACTORS } from '../services/carbonEngine';

export default function LandingPage() {
  const [goingKm, setGoingKm] = useState(7.5); // e.g. Jayanagar to BMSCE Basavanagudi
  const [comingKm, setComingKm] = useState(7.5);
  const [commuteDays, setCommuteDays] = useState(5);
  const [commuteMode, setCommuteMode] = useState('metro');
  const [dietChoice, setDietChoice] = useState('pure_veg');

  const roundTripKm = Number(goingKm) + Number(comingKm);
  const transportFactor = INDIA_EMISSION_FACTORS.transport[commuteMode]?.factor || 0.0125;
  const annualCommuteKg = roundTripKm * transportFactor * (commuteDays * 36);
  const annualDietKg = (INDIA_EMISSION_FACTORS.food[dietChoice]?.factor || 1.7) * 365;
  const annualHostelAndOtherKg = 510 + 40 + 20; // BESCOM 60 kWh/mo + desi shopping/waste baseline

  const calculatedEstimate = Math.round(annualCommuteKg + annualDietKg + annualHostelAndOtherKg);

  return (
    <div className="animate-fade-in">
      
      {/* HERO SECTION */}
      <section style={{
        background: 'radial-gradient(circle at top right, #d1fae5 0%, #ffffff 60%)',
        paddingTop: '4.5rem',
        paddingBottom: '5rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#059669',
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                marginBottom: '1.5rem'
              }}>
                <Sparkles size={16} /> 🌿 B.M.S. College of Engineering (BMSCE), Bengaluru
              </div>

              <h1 style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                color: '#0f172a'
              }}>
                Track your student carbon footprint. <br />
                <span style={{ color: '#059669', background: 'linear-gradient(90deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Built for South Bengaluru.
                </span>
              </h1>

              <p style={{
                fontSize: '1.125rem',
                color: '#475569',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '540px'
              }}>
                <strong>EcoSphere</strong> gives students of <strong>BMSCE (Bull Temple Road, Basavanagudi)</strong> and Karnataka universities precision carbon tracking calibrated to <strong>Namma Metro (Green/Purple Line)</strong>, <strong>BMTC City Buses</strong>, <strong>BESCOM electricity grid metrics</strong>, and <strong>Govt of India GHG Program factors</strong>.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                <Link to="/register" className="btn-primary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
                  Start 2-Min BMSCE Audit <ArrowRight size={18} />
                </Link>
                <Link to="/dashboard" className="btn-secondary" style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
                  View Demo Student Hub (Chetan Rao)
                </Link>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} color="#059669" /> Namma Metro & BMTC Calibrated
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} color="#059669" /> BESCOM Karnataka Power Grid (CEA)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} color="#059669" /> India GHG Program (WRI / TERI / CII)
                </span>
              </div>
            </div>

            {/* Right Mini Interactive Preview Card */}
            <div>
              <div className="card" style={{
                backgroundColor: '#ffffff',
                border: '1px solid #a7f3d0',
                boxShadow: '0 20px 25px -5px rgba(5, 150, 105, 0.1), 0 8px 10px -6px rgba(5, 150, 105, 0.05)',
                padding: '2rem',
                borderRadius: '1.5rem',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '24px',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Namma Bengaluru Estimator
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <Calculator size={20} color="#059669" />
                  <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>BMSCE Commute & Footprint</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
                  
                  {/* Transport Mode */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.375rem' }}>
                      Primary Commute to Basavanagudi / BMSCE
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.375rem' }}>
                      {[
                        { id: 'metro', label: 'Namma Metro', icon: '🚇' },
                        { id: 'bus_city', label: 'BMTC Bus', icon: '🚌' },
                        { id: 'scooter_petrol', label: 'Honda Activa', icon: '🛵' },
                        { id: 'auto_cng', label: 'Namma Auto', icon: '🛺' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCommuteMode(item.id)}
                          style={{
                            padding: '0.5rem 0.25rem',
                            borderRadius: '0.5rem',
                            border: `1px solid ${commuteMode === item.id ? '#059669' : '#e2e8f0'}`,
                            backgroundColor: commuteMode === item.id ? '#ecfdf5' : '#ffffff',
                            color: commuteMode === item.id ? '#059669' : '#475569',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.2rem'
                          }}
                        >
                          <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Going and Coming Distance Sliders */}
                  <div style={{ backgroundColor: '#f8fafc', padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                      <ArrowRightLeft size={14} color="#059669" /> Daily Commute Distances (Going & Coming)
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569' }}>
                          <span>Going to BMSCE:</span>
                          <strong style={{ color: '#059669' }}>{goingKm} km</strong>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="25"
                          step="0.5"
                          value={goingKm}
                          onChange={(e) => setGoingKm(Number(e.target.value))}
                          style={{ width: '100%', accentColor: '#059669' }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569' }}>
                          <span>Coming Back (Return):</span>
                          <strong style={{ color: '#059669' }}>{comingKm} km</strong>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="25"
                          step="0.5"
                          value={comingKm}
                          onChange={(e) => setComingKm(Number(e.target.value))}
                          style={{ width: '100%', accentColor: '#059669' }}
                        />
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Round-trip: <strong>{roundTripKm} km/day</strong>
                    </div>
                  </div>

                  {/* Diet Choice */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.375rem' }}>
                      Campus Canteen / Mess Diet
                    </label>
                    <select
                      value={dietChoice}
                      onChange={(e) => setDietChoice(e.target.value)}
                      className="form-select"
                      style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
                    >
                      <option value="pure_veg">South Indian Vegetarian (Dosa, Idli, Bisi Bele Bath, Curd Rice)</option>
                      <option value="jain_veg">Jain Vegetarian (Rootless Satvik)</option>
                      <option value="vegan_indian">100% Plant-Based Vegan (Filter coffee with oat/soy milk)</option>
                      <option value="occasional_nonveg">Eggitarian / Military Hotel Non-Veg (1x/week)</option>
                      <option value="regular_nonveg">Regular Non-Vegetarian (Frequent Biryani/Chicken)</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div style={{
                  backgroundColor: '#f0fdf4',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  border: '1px solid #bbf7d0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Estimated Academic Year Footprint
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#059669', margin: '0.25rem 0' }}>
                    {calculatedEstimate.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 600 }}>kg CO₂e / yr</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#15803d' }}>
                    {calculatedEstimate < 1750 ? (
                      <span>🌿 <strong>{Math.round(1750 - calculatedEstimate)} kg lower</strong> than Bengaluru student avg (1,750 kg)</span>
                    ) : (
                      <span>⚠️ <strong>{Math.round(calculatedEstimate - 1750)} kg higher</strong> than Bengaluru student avg. Easy to optimize with Namma Metro!</span>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Link to="/onboarding" style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>
                    Take complete 5-step BMSCE student baseline survey →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PLATFORM FEATURES */}
      <section style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: '#059669', letterSpacing: '0.05em' }}>
              Built For BMSCE Bengaluru
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1rem', color: '#0f172a' }}>
              Namma Bengaluru Campus Climate Action
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="card">
              <div style={{ padding: '0.875rem', backgroundColor: '#e0f2fe', borderRadius: '0.75rem', width: 'fit-content', color: '#0284c7', marginBottom: '1rem' }}>
                <Train size={24} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#0f172a' }}>Namma Metro Green Line</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                National College and South End Circle station connectivity. Avoid Gandhi Bazaar traffic and reduce commute emissions by over 65%.
              </p>
            </div>

            <div className="card">
              <div style={{ padding: '0.875rem', backgroundColor: '#ecfdf5', borderRadius: '0.75rem', width: 'fit-content', color: '#059669', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>☕</span>
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#0f172a' }}>South Indian Canteen Diet</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                Accurate lifecycle data for campus mess thalis, dosas, and filter coffee. Naturally sustainable and nutrient dense.
              </p>
            </div>

            <div className="card">
              <div style={{ padding: '0.875rem', backgroundColor: '#fef3c7', borderRadius: '0.75rem', width: 'fit-content', color: '#d97706', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⚡</span>
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#0f172a' }}>BESCOM Regional Grid Factors</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                Official CEA Karnataka emission calculations (0.708 kg CO₂/kWh) for BMSCE hostel geysers, fans, and Basavanagudi PGs.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
