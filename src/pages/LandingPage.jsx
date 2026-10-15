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
  Bus,
  Utensils,
  Zap,
  ShoppingBag,
  Sliders,
  ShieldCheck,
  ArrowRightLeft
} from 'lucide-react';
import { INDIA_EMISSION_FACTORS } from '../services/carbonEngine';

export default function LandingPage() {
  // Going and Coming commute states
  const [goingKm, setGoingKm] = useState(8);
  const [comingKm, setComingKm] = useState(8);
  const [commuteDays, setCommuteDays] = useState(5);
  const [commuteMode, setCommuteMode] = useState('metro');
  const [dietChoice, setDietChoice] = useState('pure_veg');

  // Preview estimation calculation using India GHG Program factors
  const roundTripKm = goingKm + comingKm;
  const transportFactor = INDIA_EMISSION_FACTORS.transport[commuteMode]?.factor || 0.0125;
  const annualCommuteKg = roundTripKm * transportFactor * (commuteDays * 36);
  const annualDietKg = (INDIA_EMISSION_FACTORS.food[dietChoice]?.factor || 1.8) * 365;
  const annualHostelAndOtherKg = 560 + 50 + 30; // CEA 65 kWh/mo + desi shopping/waste baseline

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
                <Sparkles size={16} /> 🇮🇳 India GHG Program & CEA Certified Factors
              </div>

              <h1 style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                color: '#0f172a'
              }}>
                Track your carbon footprint. <br />
                <span style={{ color: '#059669', background: 'linear-gradient(90deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Built for Indian Colleges.
                </span>
              </h1>

              <p style={{
                fontSize: '1.125rem',
                color: '#475569',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '540px'
              }}>
                <strong>EcoSphere</strong> gives students across Indian universities (IITs, NITs, DU, BITS, State Colleges) precision carbon tracking powered by official <strong>Govt of India (WRI / TERI / CII)</strong> road transport factors and <strong>Central Electricity Authority (CEA)</strong> grid figures.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                <Link to="/register" className="btn-primary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
                  Start 2-Min College Audit <ArrowRight size={18} />
                </Link>
                <Link to="/dashboard" className="btn-secondary" style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
                  View Demo Student Hub
                </Link>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} color="#059669" /> India GHG Program (WRI/CII)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} color="#059669" /> CEA India Power Grid Verified
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} color="#059669" /> Metro, Bus, Auto & Hostel Ready
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
                  India Specific Calculator
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <Calculator size={20} color="#059669" />
                  <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>College Footprint Quick Estimator</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
                  
                  {/* Transport Mode */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.375rem' }}>
                      Primary Commute Mode (India GHG Factors)
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.375rem' }}>
                      {[
                        { id: 'metro', label: 'Metro Rail', icon: '🚇' },
                        { id: 'bus_city', label: 'City Bus', icon: '🚌' },
                        { id: 'scooter_petrol', label: 'Activa/Scooter', icon: '🛵' },
                        { id: 'auto_cng', label: 'Auto (CNG)', icon: '🛺' },
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
                      <ArrowRightLeft size={14} color="#059669" /> Daily Commute (Going & Coming)
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569' }}>
                          <span>Going:</span>
                          <strong style={{ color: '#059669' }}>{goingKm} km</strong>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={goingKm}
                          onChange={(e) => setGoingKm(Number(e.target.value))}
                          style={{ width: '100%', accentColor: '#059669' }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569' }}>
                          <span>Coming:</span>
                          <strong style={{ color: '#059669' }}>{comingKm} km</strong>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
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
                      Hostel Mess / Diet Habit
                    </label>
                    <select
                      value={dietChoice}
                      onChange={(e) => setDietChoice(e.target.value)}
                      className="form-select"
                      style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
                    >
                      <option value="pure_veg">Indian Vegetarian (Dal, Roti, Sabzi, Rice, Dahi)</option>
                      <option value="jain_veg">Jain Vegetarian</option>
                      <option value="vegan_indian">100% Plant-Based Vegan</option>
                      <option value="occasional_nonveg">Eggitarian / Occasional Chicken (1-2x/week)</option>
                      <option value="regular_nonveg">Regular Non-Vegetarian (Chicken/Mutton)</option>
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
                    {calculatedEstimate < 1850 ? (
                      <span>🌿 <strong>{Math.round(1850 - calculatedEstimate)} kg lower</strong> than Indian student avg (1,850 kg)</span>
                    ) : (
                      <span>⚠️ <strong>{Math.round(calculatedEstimate - 1850)} kg higher</strong> than Indian student avg. Good reduction scope!</span>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Link to="/onboarding" style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>
                    Take complete 5-step hostel & college baseline audit →
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
              Built For Indian Students
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1rem', color: '#0f172a' }}>
              Realistic Campus Climate Tracking
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="card">
              <div style={{ padding: '0.875rem', backgroundColor: '#e0f2fe', borderRadius: '0.75rem', width: 'fit-content', color: '#0284c7', marginBottom: '1rem' }}>
                <Train size={24} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#0f172a' }}>Metro, Auto & State Buses</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                Accurate Indian factors for DMRC, BMTC, BEST, auto rickshaws (CNG/petrol), and two-wheelers (Activa, Splendor, Pulsar).
              </p>
            </div>

            <div className="card">
              <div style={{ padding: '0.875rem', backgroundColor: '#ecfdf5', borderRadius: '0.75rem', width: 'fit-content', color: '#059669', marginBottom: '1rem' }}>
                <Utensils size={24} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#0f172a' }}>Hostel Mess Thali Analytics</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                Tailored for Indian dietary realities: Pure vegetarian thalis, Jain options, and campus canteen choices.
              </p>
            </div>

            <div className="card">
              <div style={{ padding: '0.875rem', backgroundColor: '#fef3c7', borderRadius: '0.75rem', width: 'fit-content', color: '#d97706', marginBottom: '1rem' }}>
                <Zap size={24} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#0f172a' }}>CEA Grid Certified Factors</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                Electricity footprint computed using the Central Electricity Authority (0.720 kg CO₂/kWh) for hostel fans, coolers, and PG appliances.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
