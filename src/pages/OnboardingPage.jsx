import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Train, 
  Home, 
  Utensils, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles,
  ArrowRightLeft,
  Info
} from 'lucide-react';
import { useCarbon } from '../context/CarbonContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function OnboardingPage() {
  const { setOnboardingData } = useCarbon();
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form state with separated Going and Coming commute distances
  const [formData, setFormData] = useState({
    commuteMode: 'metro',
    goingDistanceKm: 8,
    comingDistanceKm: 8,
    commuteDaysPerWeek: 5,
    housingType: 'hostel_room',
    electricityKwh: 65,
    dietType: 'pure_veg',
    clothingItemsPerMonth: 1,
    thriftingPref: 'occasional',
    wasteBagsPerWeek: 1.5,
    recyclesRegularly: true // Kabadiwala / raddi recycling
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
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    navigate('/dashboard');
  };

  const roundTripDistance = Number(formData.goingDistanceKm) + Number(formData.comingDistanceKm);

  return (
    <div style={{
      minHeight: 'calc(100vh - 12rem)',
      padding: '3rem 1.5rem',
      background: 'radial-gradient(circle at top, #f0fdf4 0%, #f8fafc 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="card" style={{ maxWidth: '660px', width: '100%', padding: '2.5rem' }}>
        
        {/* Progress header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step {step} of 5
            </span>
            <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
              🇮🇳 Indian Student Lifestyle Audit
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

        {/* STEP 1: COMMUTE (GOING & COMING DISTANCES) */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#e0f2fe', color: '#0284c7', borderRadius: '0.75rem' }}>
                <Train size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>College Commute & Travel</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>How do you travel between home/hostel and college?</p>
              </div>
            </div>

            {/* Mode selection based on India GHG Program Road Transport */}
            <label className="form-label" style={{ marginBottom: '0.5rem' }}>Select Main Travel Mode:</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'metro', label: 'Metro Rail (DMRC/Namma)', desc: '0.0125 kg CO₂/pax-km', icon: '🚇' },
                { id: 'bus_city', label: 'City Bus (DTC/BEST/BMTC)', desc: '0.0152 kg CO₂/pax-km (Govt Factor)', icon: '🚌' },
                { id: 'scooter_petrol', label: 'Petrol Scooter (Activa/Jupiter)', desc: '0.0368 kg CO₂/km (India GHG)', icon: '🛵' },
                { id: 'bike_100cc', label: 'Motorcycle (Splendor/Platina)', desc: '0.0358 kg CO₂/km (India GHG)', icon: '🏍️' },
                { id: 'auto_cng', label: 'Auto Rickshaw (CNG)', desc: '0.1077 kg CO₂/km (India GHG)', icon: '🛺' },
                { id: 'local_train', label: 'Local Suburban Train', desc: '0.009 kg CO₂/pax-km (Low Carbon)', icon: '🚆' },
                { id: 'bicycle', label: 'Cycle / Walking', desc: '0.00 kg CO₂ (Cleanest)', icon: '🚲' },
                { id: 'car_hatchback_petrol', label: 'Car (Swift/i10/Santro)', desc: '0.127 kg CO₂/km (India GHG)', icon: '🚗' },
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => update('commuteMode', item.id)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${formData.commuteMode === item.id ? '#059669' : '#e2e8f0'}`,
                    backgroundColor: formData.commuteMode === item.id ? '#ecfdf5' : '#ffffff',
                    textAlign: 'left',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>{item.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.desc}</div>
                </button>
              ))}
            </div>

            {/* SEPARATED GOING AND COMING DISTANCE CONTROLS */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#0f172a', fontWeight: 700, fontSize: '0.95rem' }}>
                <ArrowRightLeft size={16} color="#059669" /> Daily Commute Distances (Going & Coming)
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {/* Going Distance */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>
                    <span>Going to College:</span>
                    <strong style={{ color: '#059669' }}>{formData.goingDistanceKm} km</strong>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="40"
                    step="0.5"
                    value={formData.goingDistanceKm}
                    onChange={(e) => update('goingDistanceKm', Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#059669' }}
                  />
                </div>

                {/* Coming Distance */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.375rem' }}>
                    <span>Coming Back (Return):</span>
                    <strong style={{ color: '#059669' }}>{formData.comingDistanceKm} km</strong>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="40"
                    step="0.5"
                    value={formData.comingDistanceKm}
                    onChange={(e) => update('comingDistanceKm', Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#059669' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: '#475569', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
                <span>Total Round-Trip: <strong>{roundTripDistance} km / day</strong></span>
                <span style={{ color: '#059669', fontWeight: 600 }}>5 Days / Week</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#64748b' }}>
              <Info size={14} color="#059669" /> Emission factors sourced directly from Govt of India & India GHG Program (2015).
            </div>
          </div>
        )}

        {/* STEP 2: HOSTEL / PG / APARTMENT ELECTRICITY */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#fef3c7', color: '#d97706', borderRadius: '0.75rem' }}>
                <Home size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Hostel / PG & Electricity</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Where do you stay during college semesters?</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'hostel_room', title: 'College Hostel Room (Non-AC)', desc: 'Ceiling fan, LED tubelight, laptop charging (~65 kWh/mo)', kwh: 65 },
                { id: 'hostel_ac_room', title: 'Hostel Room with Air Conditioner', desc: 'Summer cooler / AC in peak months (~140 kWh/mo)', kwh: 140 },
                { id: 'pg_sharing', title: 'Shared PG (Paying Guest Flat)', desc: 'Fridge share, geyser, study room (~90 kWh/mo personal share)', kwh: 90 },
                { id: 'independent_flat', title: 'Rented 1BHK / 2BHK Apartment', desc: 'Kitchen appliances, induction, shared utilities (~180 kWh/mo)', kwh: 180 },
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
              <label className="form-label">Estimated Monthly Units (kWh): {formData.electricityKwh} units</label>
              <input
                type="range"
                min="30"
                max="250"
                value={formData.electricityKwh}
                onChange={(e) => update('electricityKwh', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#059669' }}
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Computed using Central Electricity Authority (CEA) India grid factor (0.720 kg CO₂/kWh).
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: DESI FOOD & MESS HABITS */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '0.75rem' }}>
                <Utensils size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Mess & Food Habits</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>What is your typical diet pattern at the hostel/canteen?</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'pure_veg', title: 'Traditional Indian Vegetarian Thali', factor: '1.8 kg CO₂e / day', desc: 'Roti, Dal, Seasonal Sabzi, Rice, Dahi/Paneer' },
                { id: 'jain_veg', title: 'Jain Vegetarian', factor: '1.6 kg CO₂e / day', desc: 'Plant crops, lentils, dairy without underground roots' },
                { id: 'vegan_indian', title: '100% Plant-Based Vegan', factor: '1.3 kg CO₂e / day', desc: 'No cow milk, dahi, or ghee (lowest emissions)' },
                { id: 'occasional_nonveg', title: 'Eggitarian / Weekend Non-Veg', factor: '2.9 kg CO₂e / day', desc: 'Eggs daily or chicken once/twice a week' },
                { id: 'regular_nonveg', title: 'Regular Non-Vegetarian', factor: '4.8 kg CO₂e / day', desc: 'Chicken/Mutton/Fish in most lunch & dinner meals' }
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

        {/* STEP 4: SHOPPING & TEXTILES */}
        {step === 4 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#f3e8ff', color: '#7c3aed', borderRadius: '0.75rem' }}>
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Clothing & Shopping</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Wardrobe purchasing and thrift market habits</p>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Average new garments purchased per month:</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[0, 1, 2, 4].map(num => (
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
                    {num === 0 ? '0 (Flea/Thrift)' : `${num}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Thrifting & Local Flea Market Habits (Sarojini / Janpath / Street)</label>
              <select
                value={formData.thriftingPref}
                onChange={(e) => update('thriftingPref', e.target.value)}
                className="form-select"
              >
                <option value="mostly_thrift">Frequently thrift / borrow / swap (Low Carbon)</option>
                <option value="occasional">Mix of local street shops and retail malls</option>
                <option value="mostly_new">Fast fashion brands (Zara, H&M, Myntra)</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 5: WASTE & KABADIWALA DIVERSION */}
        {step === 5 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.625rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '0.75rem' }}>
                <Trash2 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Waste & Raddi / Kabadiwala</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Hostel waste disposal and scrap recycling</p>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Weekly dustbin bag count produced:</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3].map(bags => (
                  <button
                    key={bags}
                    type="button"
                    onClick={() => update('wasteBagsPerWeek', bags)}
                    style={{
                      flex: 1,
                      padding: '0.625rem',
                      borderRadius: '0.5rem',
                      border: `1px solid={formData.wasteBagsPerWeek === bags ? '#059669' : '#e2e8f0'}`,
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
                  Do you give paper, exam notes & plastic to the Kabadiwala / Raddi?
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  Recycles virgin material and keeps landfill emissions down by 60%
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
            >
              <Sparkles size={16} /> Compute My Indian Student Footprint
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
