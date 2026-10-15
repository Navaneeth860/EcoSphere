import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  ArrowRight, 
  Calculator, 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingDown, 
  BarChart3, 
  Users, 
  Award,
  Zap,
  Bus,
  Utensils
} from 'lucide-react';
import { EMISSION_FACTORS } from '../services/carbonEngine';

export default function LandingPage() {
  // Interactive mini-calculator states for quick hero preview
  const [commuteDays, setCommuteDays] = useState(4);
  const [commuteMode, setCommuteMode] = useState('bus');
  const [dietChoice, setDietChoice] = useState('flexitarian');

  // Preview estimation calculation
  const calculatedEstimate = Math.round(
    (commuteDays * 12 * (EMISSION_FACTORS.transport[commuteMode]?.factor || 0.089) * 36) +
    (EMISSION_FACTORS.food[dietChoice]?.factor || 3.8) * 365 +
    750 // dorm electricity & shopping baseline
  );

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
                <Sparkles size={16} /> Campus Climate Action Platform
              </div>

              <h1 style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                color: '#0f172a'
              }}>
                Track your carbon footprint. <br />
                <span style={{ color: '#059669', background: 'linear-gradient(90deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Live sustainably on campus.
                </span>
              </h1>

              <p style={{
                fontSize: '1.125rem',
                color: '#475569',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '540px'
              }}>
                GreenTrack gives university students deterministic GHG-protocol carbon calculations, personalized AI reduction coaching, and interactive what-if lifestyle simulations.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                <Link to="/register" className="btn-primary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
                  Start Your Footprint Audit <ArrowRight size={18} />
                </Link>
                <Link to="/dashboard" className="btn-secondary" style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
                  Explore Demo Student Hub
                </Link>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} color="#059669" /> DEFRA & EPA Verified Data
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} color="#059669" /> Zero Private Data Shared
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 size={16} color="#059669" /> Free for All Students
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
                  Instant Preview
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <Calculator size={20} color="#059669" />
                  <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Quick Student Carbon Estimator</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {/* Commute Mode */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.375rem' }}>
                      Primary Commute Method
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                      {[
                        { id: 'bicycle', label: 'Bike / Walk', icon: '🚲' },
                        { id: 'bus', label: 'Transit Bus', icon: '🚌' },
                        { id: 'car_gasoline', label: 'Solo Car', icon: '🚗' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCommuteMode(item.id)}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            border: `1px solid ${commuteMode === item.id ? '#059669' : '#e2e8f0'}`,
                            backgroundColor: commuteMode === item.id ? '#ecfdf5' : '#ffffff',
                            color: commuteMode === item.id ? '#059669' : '#475569',
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Commute Days Slider */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                      <span>Campus Commute Days</span>
                      <span style={{ color: '#059669' }}>{commuteDays} days / week</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      value={commuteDays}
                      onChange={(e) => setCommuteDays(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#059669' }}
                    />
                  </div>

                  {/* Diet Choice */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.375rem' }}>
                      Dietary Pattern
                    </label>
                    <select
                      value={dietChoice}
                      onChange={(e) => setDietChoice(e.target.value)}
                      className="form-select"
                      style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
                    >
                      <option value="vegan">Vegan (100% Plant-Based)</option>
                      <option value="vegetarian">Vegetarian (Dairy & Eggs)</option>
                      <option value="flexitarian">Flexitarian (Low Meat)</option>
                      <option value="high_meat">High Meat Consumption</option>
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
                    Estimated Annual Footprint
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#059669', margin: '0.25rem 0' }}>
                    {calculatedEstimate.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 600 }}>kg CO₂e / yr</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#15803d' }}>
                    {calculatedEstimate < 3200 ? (
                      <span>🌿 <strong>{Math.round(3200 - calculatedEstimate)} kg lower</strong> than campus average (3,200 kg)</span>
                    ) : (
                      <span>⚠️ <strong>{Math.round(calculatedEstimate - 3200)} kg higher</strong> than campus average. High potential for reduction!</span>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Link to="/onboarding" style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>
                    Take the complete 2-minute baseline survey →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS / HOW IT WORKS */}
      <section style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: '#059669', letterSpacing: '0.05em' }}>
              Simple & Rigorous
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1rem', color: '#0f172a' }}>
              How GreenTrack Works
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
              Built specifically for university routines: dorm life, campus dining halls, student transit passes, and shared living.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Step 1 */}
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '1rem',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.25rem',
                fontWeight: 800
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0f172a' }}>
                Establish Your Baseline
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                Answer 5 simple questions about your daily commute distance, dorm or apartment electricity, dining choices, and recycling habits.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '1rem',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.25rem',
                fontWeight: 800
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0f172a' }}>
                Simulate & Optimize
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                Use the What-If Simulator to test realistic changes like Meatless Mondays or walking twice a week before committing to them.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '1rem',
                backgroundColor: '#f5f3ff',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.25rem',
                fontWeight: 800
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0f172a' }}>
                AI-Powered Action
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                Receive tailored budget-friendly recommendations from your Green AI Coach grounded directly in your emission data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PLATFORM FEATURES GRID */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: '#059669', letterSpacing: '0.05em' }}>
              Features Built for Campus Life
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1rem', color: '#0f172a' }}>
              Everything You Need for Impact
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Feature 1 */}
            <div className="card" style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ padding: '0.875rem', backgroundColor: '#e0f2fe', borderRadius: '0.75rem', height: 'fit-content', color: '#0284c7' }}>
                <Bus size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>Transit & Commute Analytics</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                  Track carpool savings, subway rides, electric scooter hops, and walk trips with automatic distance-to-CO₂e conversion.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card" style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ padding: '0.875rem', backgroundColor: '#ecfdf5', borderRadius: '0.75rem', height: 'fit-content', color: '#059669' }}>
                <Utensils size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>Dining Hall & Diet Impact</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                  Understand the tangible carbon difference between plant-based dining and high-meat consumption across every semester.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card" style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ padding: '0.875rem', backgroundColor: '#fef3c7', borderRadius: '0.75rem', height: 'fit-content', color: '#d97706' }}>
                <Zap size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>Dorm & Apartment Energy</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                  Accurately compute electricity footprints using regional grid emission metrics (EPA eGRID) and practical cooling/heating tips.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card" style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ padding: '0.875rem', backgroundColor: '#f3e8ff', borderRadius: '0.75rem', height: 'fit-content', color: '#7c3aed' }}>
                <Sliders size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>What-If Scenario Simulator</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                  Test lifestyle modifications interactively and project annual emissions reductions alongside equivalent trees planted.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="card" style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ padding: '0.875rem', backgroundColor: '#ecfdf5', borderRadius: '0.75rem', height: 'fit-content', color: '#059669' }}>
                <Sparkles size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>AI Sustainability Coach</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                  An intelligent companion trained on college living constraints, offering realistic recipes, thrifting guidance, and habits.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="card" style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ padding: '0.875rem', backgroundColor: '#fee2e2', borderRadius: '0.75rem', height: 'fit-content', color: '#dc2626' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>Campus Admin Aggregates</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                  Privacy-first aggregate dashboards for campus sustainability directors to measure university climate goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#059669', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1rem' }}>
            Ready to measure your campus impact?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#d1fae5', lineHeight: 1.6, marginBottom: '2rem' }}>
            Join students across the university in calculating footprints, taking tangible eco-challenges, and building a greener campus.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              backgroundColor: '#ffffff',
              color: '#059669',
              fontWeight: 700,
              padding: '0.875rem 1.75rem',
              borderRadius: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link to="/login" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontWeight: 600,
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              Sign In Existing User
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
