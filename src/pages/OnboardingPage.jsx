import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bus, 
  Home, 
  Utensils, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useCarbon } from '../context/CarbonContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function OnboardingPage() {
  const { setOnboardingData } = useCarbon();
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    commuteMode: 'bus',
    commuteDistanceKm: 7,
    housingType: 'dorm_room',
    electricityKwh: 120,
    dietType: 'flexitarian',
    clothingItemsPerMonth: 2,
    thriftingPref: 'occasional',
    wasteBagsPerWeek: 2,
    recyclesRegularly: true
  });

  const update = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFinish = (e) => {
    e.preventDefault();
    setOnboardingData(formData);
    completeOnboarding();
    
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 12rem)',
      padding: '3rem 1.5rem',
      background: 'radial-gradient(circle at top, #f0fdf4 0%, #f8fafc 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="card" style={{ maxWidth: '640px', width: '100%', padding: '2.5rem' }}>
        
        {/* Progress header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step {step} of 5
            </span>
            <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
              Student Lifestyle Audit
            </span>
          </div>

          <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              backgroundColor: '#059669',
              width: `${(step / 5) * 100}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* STEP 1: TRANSPORTATION */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#e0f2fe', color: '#0284c7', borderRadius: '0.75rem' }}>
                <Bus size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Daily Campus Commute</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>How do you normally travel to lectures and labs?</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'walking', label: 'Walking / Foot', desc: '0 kg CO₂e (Cleanest)', icon: '🚶' },
                { id: 'bicycle', label: 'Bicycle / Non-electric', desc: '0 kg CO₂e (Cleanest)', icon: '🚲' },
                { id: 'bus', label: 'Campus / City Bus', desc: '0.089 kg CO₂e/km', icon: '🚌' },
                { id: 'metro', label: 'Metro / Subway', desc: '0.035 kg CO₂e/km', icon: '🚇' },
                { id: 'carpool', label: 'Carpool with peers', desc: '0.096 kg CO₂e/km', icon: '👥' },
                { id: 'car_gasoline', label: 'Personal Car (Solo)', desc: '0.192 kg CO₂e/km', icon: '🚗' },
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => update('commuteMode', item.id)}
                  style={{
                    padding: '0.875rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${formData.commuteMode === item.id ? '#059669' : '#e2e8f0'}`,
                    backgroundColor: formData.commuteMode === item.id ? '#ecfdf5' : '#ffffff',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{item.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>One-way commute distance:</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>{formData.commuteDistanceKm} km</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={formData.commuteDistanceKm}
                onChange={(e) => update('commuteDistanceKm', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#059669' }}
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                (Assuming 180 semester commute days per academic year)
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: HOUSING & ELECTRICITY */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#fef3c7', color: '#d97706', borderRadius: '0.75rem' }}>
                <Home size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Housing & Power</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Where do you reside during the term?</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'dorm_room', title: 'On-Campus Dorm Room', desc: 'Average ~120 kWh/month allocated per student', kwh: 120 },
                { id: 'shared_apt', title: 'Off-Campus Shared Apartment', desc: 'Average ~210 kWh/month your personal share', kwh: 210 },
                { id: 'studio_apt', title: 'Private Studio Apartment', desc: 'Average ~280 kWh/month independent usage', kwh: 280 },
              ].map(h => (
                <div
                  key={h.id}
                  onClick={() => {
                    update('housingType', h.id);
                    update('electricityKwh', h.kwh);
                  }}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${formData.housingType === h.id ? '#059669' : '#e2e8f0'}`,
                    backgroundColor: formData.housingType === h.id ? '#ecfdf5' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{h.title}</div>
                    {formData.housingType === h.id && <Check size={18} color="#059669" />}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.25rem' }}>{h.desc}</div>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Monthly Power Usage: {formData.electricityKwh} kWh</label>
              <input
                type="range"
                min="50"
                max="400"
                value={formData.electricityKwh}
                onChange={(e) => update('electricityKwh', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#059669' }}
              />
            </div>
          </div>
        )}

        {/* STEP 3: FOOD & DINING */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '0.75rem' }}>
                <Utensils size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Dining Habits</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>What best characterizes your daily diet?</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'vegan', title: '100% Plant-Based (Vegan)', factor: '1.5 kg CO₂e / day', desc: 'Lowest footprint diet' },
                { id: 'vegetarian', title: 'Vegetarian (Dairy & Eggs)', factor: '2.5 kg CO₂e / day', desc: 'No meat or poultry' },
                { id: 'pescatarian', title: 'Pescatarian', factor: '3.2 kg CO₂e / day', desc: 'Fish and vegetables' },
                { id: 'flexitarian', title: 'Flexitarian / Low Meat', factor: '3.8 kg CO₂e / day', desc: 'Meat a few times a week' },
                { id: 'high_meat', title: 'Daily Meat / High Beef', factor: '7.2 kg CO₂e / day', desc: 'Meat in most daily meals' }
              ].map(f => (
                <div
                  key={f.id}
                  onClick={() => update('dietType', f.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${formData.dietType === f.id ? '#059669' : '#e2e8f0'}`,
                    backgroundColor: formData.dietType === f.id ? '#ecfdf5' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{f.title}</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669' }}>{f.factor}</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: SHOPPING & GOODS */}
        {step === 4 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#f3e8ff', color: '#7c3aed', borderRadius: '0.75rem' }}>
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Shopping & Wardrobe</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Apparel purchasing and thrift habits</p>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Average new garments purchased per month:</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[0, 1, 2, 4, 6].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => update('clothingItemsPerMonth', num)}
                    style={{
                      flex: 1,
                      padding: '0.625rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${formData.clothingItemsPerMonth === num ? '#059669' : '#e2e8f0'}`,
                      backgroundColor: formData.clothingItemsPerMonth === num ? '#ecfdf5' : '#ffffff',
                      color: formData.clothingItemsPerMonth === num ? '#059669' : '#475569',
                      fontWeight: 700
                    }}
                  >
                    {num === 0 ? '0 (Thrift/None)' : `${num}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Thrifting & Secondhand Preference</label>
              <select
                value={formData.thriftingPref}
                onChange={(e) => update('thriftingPref', e.target.value)}
                className="form-select"
              >
                <option value="mostly_thrift">Mostly Thrifted / Vintage / Swapped (Low Carbon)</option>
                <option value="occasional">Occasional Thrifting (Mixed)</option>
                <option value="mostly_new">Primarily New / Brand Retail Stores</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 5: WASTE & RECYCLING */}
        {step === 5 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '0.75rem' }}>
                <Trash2 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Waste & Diversion</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Recycling and waste disposal routines</p>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Trash bags produced weekly (Standard dorm/apt bin):</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 5].map(bags => (
                  <button
                    key={bags}
                    type="button"
                    onClick={() => update('wasteBagsPerWeek', bags)}
                    style={{
                      flex: 1,
                      padding: '0.625rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${formData.wasteBagsPerWeek === bags ? '#059669' : '#e2e8f0'}`,
                      backgroundColor: formData.wasteBagsPerWeek === bags ? '#ecfdf5' : '#ffffff',
                      color: formData.wasteBagsPerWeek === bags ? '#059669' : '#475569',
                      fontWeight: 700
                    }}
                  >
                    {bags} {bags === 1 ? 'bag' : 'bags'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f8fafc'
            }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9375rem' }}>
                  Do you routinely sort paper, plastic & cans?
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  Cuts landfill methane and virgin production impact by ~40%
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.recyclesRegularly}
                onChange={(e) => update('recyclesRegularly', e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem', accentColor: '#059669' }}
              />
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #f1f5f9'
        }}>
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn-secondary"
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="btn-primary"
            >
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="btn-primary"
              style={{ backgroundColor: '#059669' }}
            >
              <Sparkles size={16} /> Generate My Footprint Hub
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
