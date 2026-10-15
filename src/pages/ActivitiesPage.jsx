import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Download,
  AlertCircle,
  Train,
  ArrowRightLeft
} from 'lucide-react';
import { useCarbon } from '../context/CarbonContext';
import { calculateActivityEmission, INDIA_EMISSION_FACTORS } from '../services/carbonEngine';

export default function ActivitiesPage() {
  const { activities, addActivity, updateActivity, deleteActivity } = useCarbon();

  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Commute distance going and coming states for adding/editing commute
  const [isCommuteSplit, setIsCommuteSplit] = useState(true);
  const [goingKm, setGoingKm] = useState(8);
  const [comingKm, setComingKm] = useState(8);

  // Form State
  const [form, setForm] = useState({
    category: 'transport',
    subtype: 'metro',
    label: '',
    quantity: 16,
    unit: 'km',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setGoingKm(8);
    setComingKm(8);
    setForm({
      category: 'transport',
      subtype: 'metro',
      label: '',
      quantity: 16,
      unit: 'km',
      date: new Date().toISOString().split('T')[0],
      note: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (act) => {
    setEditingId(act.id);
    setForm({
      category: act.category,
      subtype: act.subtype,
      label: act.label,
      quantity: act.quantity,
      unit: act.unit,
      date: act.date,
      note: act.note || ''
    });
    setModalOpen(true);
  };

  const handleCategoryChange = (cat) => {
    let sub = 'metro';
    let unit = 'km';
    let qty = 16;
    if (cat === 'food') { sub = 'pure_veg'; unit = 'day'; qty = 1; }
    if (cat === 'energy') { sub = 'hostel_room'; unit = 'kWh'; qty = 15; }
    if (cat === 'shopping') { sub = 'thrift_clothes'; unit = 'item'; qty = 1; }
    if (cat === 'waste') { sub = 'kabadiwala_recycled'; unit = 'kg'; qty = 3; }

    setForm(prev => ({
      ...prev,
      category: cat,
      subtype: sub,
      unit,
      quantity: qty
    }));
  };

  const handleDistanceSplitChange = (going, coming) => {
    setGoingKm(going);
    setComingKm(coming);
    setForm(prev => ({ ...prev, quantity: Number(going) + Number(coming) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateActivity(editingId, form);
    } else {
      addActivity(form);
    }
    setModalOpen(false);
  };

  const filteredActivities = activities.filter(act => {
    const matchesCat = selectedCategory === 'all' || act.category === selectedCategory;
    const matchesSearch = act.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (act.note && act.note.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const totalFilteredEmissions = filteredActivities.reduce((acc, curr) => acc + (Number(curr.co2Kg) || 0), 0);

  const exportCSV = () => {
    const headers = ['ID,Category,Subtype,Label,Quantity,Unit,CO2_kg,Date,Note\n'];
    const rows = filteredActivities.map(a => 
      `"${a.id}","${a.category}","${a.subtype}","${a.label}",${a.quantity},"${a.unit}",${a.co2Kg},"${a.date}","${a.note || ''}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ecosphere_activities_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
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
            College Ledger
          </span>
          <h1 style={{ fontSize: '2.25rem', color: '#0f172a' }}>Activity Management</h1>
          <p style={{ fontSize: '0.9375rem', color: '#64748b' }}>
            Log and audit commute trips (going & coming), hostel mess thalis, and recycling entries.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={exportCSV} className="btn-secondary">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={handleOpenAdd} className="btn-primary">
            <Plus size={18} /> Add Activity
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search metro trips, mess meals, notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="#64748b" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select"
            >
              <option value="all">All Categories</option>
              <option value="transport">Transportation / Commute</option>
              <option value="food">Hostel Mess & Food</option>
              <option value="energy">Electricity (CEA)</option>
              <option value="shopping">Clothing & Notes</option>
              <option value="waste">Kabadiwala & Waste</option>
            </select>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#64748b' }}>
            Showing <strong>{filteredActivities.length}</strong> records (Total: <strong style={{ color: '#059669' }}>{totalFilteredEmissions.toFixed(2)} kg CO₂</strong>)
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 600 }}>
              <tr>
                <th style={{ padding: '1rem 1.25rem' }}>Category</th>
                <th style={{ padding: '1rem 1.25rem' }}>Description</th>
                <th style={{ padding: '1rem 1.25rem' }}>Quantity</th>
                <th style={{ padding: '1rem 1.25rem' }}>Calculated CO₂</th>
                <th style={{ padding: '1rem 1.25rem' }}>Date</th>
                <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    <AlertCircle size={32} style={{ margin: '0 auto 0.5rem auto', color: '#cbd5e1' }} />
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: '#64748b' }}>No activities found</p>
                    <p style={{ fontSize: '0.8125rem' }}>Try clearing your search or add a new record.</p>
                  </td>
                </tr>
              ) : (
                filteredActivities.map((act) => (
                  <tr key={act.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className={`badge ${
                        act.category === 'transport' ? 'badge-blue' :
                        act.category === 'food' ? 'badge-emerald' :
                        act.category === 'energy' ? 'badge-amber' :
                        act.category === 'shopping' ? 'badge-purple' : 'badge-rose'
                      }`}>
                        {act.category}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{act.label}</div>
                      {act.note && (
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{act.note}</div>
                      )}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#334155' }}>
                      {act.quantity} {act.unit}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ fontWeight: 700, color: act.co2Kg === 0 ? '#059669' : '#0f172a' }}>
                        {act.co2Kg} kg
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#64748b' }}>
                      {act.date}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleOpenEdit(act)}
                          style={{ padding: '0.375rem', color: '#64748b', borderRadius: '0.375rem' }}
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${act.label}"?`)) {
                              deleteActivity(act.id);
                            }
                          }}
                          style={{ padding: '0.375rem', color: '#ef4444', borderRadius: '0.375rem' }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL WITH GOING AND COMING CONTROLS */}
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
          <div className="card" style={{ maxWidth: '520px', width: '100%', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: '#0f172a' }}>
              {editingId ? 'Edit Activity Record' : 'Record New Carbon Activity'}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Calculated using India GHG Program 2015 & CEA factors
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="form-select"
                >
                  <option value="transport">Transportation / Travel</option>
                  <option value="food">Hostel Mess & Canteen</option>
                  <option value="energy">Hostel / PG Electricity</option>
                  <option value="shopping">Clothing & Notes</option>
                  <option value="waste">Kabadiwala & Recycling</option>
                </select>
              </div>

              {/* Specific Subtypes */}
              <div className="form-group">
                <label className="form-label">Mode / Type</label>
                <select
                  value={form.subtype}
                  onChange={(e) => setForm({ ...form, subtype: e.target.value })}
                  className="form-select"
                >
                  {form.category === 'transport' && (
                    <>
                      <option value="metro">Metro Rail (0.0125 kg/pax-km)</option>
                      <option value="bus_city">City Bus - DTC/BEST (0.0152 kg/pax-km)</option>
                      <option value="scooter_petrol">Petrol Scooter - Activa/Jupiter (0.0368 kg/km)</option>
                      <option value="bike_100cc">Bike - Splendor/Platina (0.0358 kg/km)</option>
                      <option value="bike_150cc">Bike - Pulsar/Apache 150cc (0.0458 kg/km)</option>
                      <option value="bike_bullet">Bike - Royal Enfield 350cc (0.0597 kg/km)</option>
                      <option value="auto_cng">Auto Rickshaw CNG (0.1077 kg/km)</option>
                      <option value="auto_petrol">Auto Rickshaw Petrol (0.1135 kg/km)</option>
                      <option value="local_train">Suburban Local Train (0.009 kg/pax-km)</option>
                      <option value="car_small_cng">Small Car CNG (0.068 kg/km)</option>
                      <option value="car_hatchback_petrol">Hatchback Petrol - Swift/i10 (0.127 kg/km)</option>
                      <option value="car_sedan_petrol">Sedan Petrol - Dzire/City (0.153 kg/km)</option>
                      <option value="bicycle">Bicycle / Walking (0.00 kg/km)</option>
                    </>
                  )}
                  {form.category === 'food' && (
                    <>
                      <option value="pure_veg">Indian Vegetarian Mess Thali (1.8 kg/day)</option>
                      <option value="jain_veg">Jain Vegetarian Day (1.6 kg/day)</option>
                      <option value="vegan_indian">100% Plant-Based Vegan Day (1.3 kg/day)</option>
                      <option value="occasional_nonveg">Eggitarian / Occasional Chicken Day (2.9 kg/day)</option>
                      <option value="regular_nonveg">Regular Non-Vegetarian Day (4.8 kg/day)</option>
                    </>
                  )}
                  {form.category === 'energy' && (
                    <>
                      <option value="hostel_room">College Hostel Room (0.720 kg/kWh)</option>
                      <option value="hostel_ac_room">Hostel AC Room (0.720 kg/kWh)</option>
                      <option value="pg_sharing">PG Room Shared (0.720 kg/kWh)</option>
                      <option value="rooftop_solar">Campus Solar (0.045 kg/kWh)</option>
                    </>
                  )}
                  {form.category === 'shopping' && (
                    <>
                      <option value="thrift_clothes">Thrifted / Secondhand Clothes (0.9 kg/item)</option>
                      <option value="clothing_desi">New Kurta / Cotton Shirt (8.5 kg/item)</option>
                      <option value="books_photocopy">Notes & Standard Textbooks (1.2 kg/bundle)</option>
                    </>
                  )}
                  {form.category === 'waste' && (
                    <>
                      <option value="kabadiwala_recycled">Sorted to Kabadiwala (0.06 kg/kg)</option>
                      <option value="hostel_compost">Mess Wet Waste Composted (0.04 kg/kg)</option>
                      <option value="municipal_dump">Municipal Landfill Dump (0.62 kg/kg)</option>
                    </>
                  )}
                </select>
              </div>

              {/* If Transport, allow Going and Coming separation */}
              {form.category === 'transport' && (
                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                    <ArrowRightLeft size={15} color="#059669" /> Commute Distance (Going & Coming)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>Going (km):</label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={goingKm}
                        onChange={(e) => handleDistanceSplitChange(e.target.value, comingKm)}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>Coming (km):</label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={comingKm}
                        onChange={(e) => handleDistanceSplitChange(goingKm, e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginTop: '0.5rem', textAlign: 'right' }}>
                    Round-Trip Total: {form.quantity} km
                  </div>
                </div>
              )}

              {form.category !== 'transport' && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      min="0.1"
                      step="any"
                      required
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Unit</label>
                    <input
                      type="text"
                      disabled
                      value={form.unit}
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
                  required
                  placeholder="e.g. Metro from Rajiv Chowk to Hauz Khas"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="form-input"
                />
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
                  {editingId ? 'Update Activity' : 'Save Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
