import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Bus, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  Trash, 
  Download,
  AlertCircle
} from 'lucide-react';
import { useCarbon } from '../context/CarbonContext';
import { calculateActivityEmission, EMISSION_FACTORS } from '../services/carbonEngine';

export default function ActivitiesPage() {
  const { activities, addActivity, updateActivity, deleteActivity } = useCarbon();

  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [form, setForm] = useState({
    category: 'transport',
    subtype: 'bus',
    label: '',
    quantity: 10,
    unit: 'km',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      category: 'transport',
      subtype: 'bus',
      label: '',
      quantity: 10,
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
    let sub = 'bus';
    let unit = 'km';
    let qty = 10;
    if (cat === 'food') { sub = 'vegetarian'; unit = 'day'; qty = 1; }
    if (cat === 'energy') { sub = 'dorm_room'; unit = 'kWh'; qty = 25; }
    if (cat === 'shopping') { sub = 'clothing_thrift'; unit = 'item'; qty = 1; }
    if (cat === 'waste') { sub = 'recycled_kg'; unit = 'kg'; qty = 3; }

    setForm(prev => ({
      ...prev,
      category: cat,
      subtype: sub,
      unit,
      quantity: qty
    }));
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
    link.download = `greentrack_activities_${new Date().toISOString().split('T')[0]}.csv`;
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
            Data Ledger
          </span>
          <h1 style={{ fontSize: '2.25rem', color: '#0f172a' }}>Activity Management</h1>
          <p style={{ fontSize: '0.9375rem', color: '#64748b' }}>
            Log, verify, edit, and audit all carbon-emitting activities.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={exportCSV} className="btn-secondary">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={handleOpenAdd} className="btn-primary">
            <Plus size={18} /> Add New Entry
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
              placeholder="Search description, notes..."
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
              <option value="transport">Transportation</option>
              <option value="food">Food & Meals</option>
              <option value="energy">Electricity</option>
              <option value="shopping">Shopping</option>
              <option value="waste">Waste & Recycling</option>
            </select>
          </div>

          {/* Aggregate badge */}
          <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#64748b' }}>
            Showing <strong>{filteredActivities.length}</strong> records (Total: <strong style={{ color: '#059669' }}>{totalFilteredEmissions.toFixed(2)} kg CO₂e</strong>)
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
                <th style={{ padding: '1rem 1.25rem' }}>Activity Description</th>
                <th style={{ padding: '1rem 1.25rem' }}>Quantity</th>
                <th style={{ padding: '1rem 1.25rem' }}>Calculated CO₂e</th>
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
                    <p style={{ fontSize: '0.8125rem' }}>Try clearing filters or add a new record.</p>
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
                          title="Edit activity"
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
                          title="Delete activity"
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

      {/* ADD / EDIT MODAL */}
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
          <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: '#0f172a' }}>
              {editingId ? 'Edit Activity Record' : 'Record New Carbon Activity'}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Numerical coefficients based on DEFRA 2023 & EPA factors
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="form-select"
                >
                  <option value="transport">Transportation</option>
                  <option value="food">Food & Diet</option>
                  <option value="energy">Electricity & Power</option>
                  <option value="shopping">Shopping & Goods</option>
                  <option value="waste">Waste & Recycling</option>
                </select>
              </div>

              {/* Subtype depending on category */}
              <div className="form-group">
                <label className="form-label">Activity Type</label>
                <select
                  value={form.subtype}
                  onChange={(e) => setForm({ ...form, subtype: e.target.value })}
                  className="form-select"
                >
                  {form.category === 'transport' && (
                    <>
                      <option value="walking">Walking (0 kg/km)</option>
                      <option value="bicycle">Bicycle (0 kg/km)</option>
                      <option value="ebike">E-Bike (0.015 kg/km)</option>
                      <option value="bus">Campus / City Bus (0.089 kg/km)</option>
                      <option value="metro">Metro / Tram (0.035 kg/km)</option>
                      <option value="carpool">Carpool 2+ (0.096 kg/km)</option>
                      <option value="rideshare">Rideshare Taxi (0.170 kg/km)</option>
                      <option value="car_gasoline">Solo Gas Car (0.192 kg/km)</option>
                      <option value="flight_short">Flight &lt; 3h (0.255 kg/km)</option>
                    </>
                  )}
                  {form.category === 'food' && (
                    <>
                      <option value="vegan">Vegan Day (1.5 kg)</option>
                      <option value="vegetarian">Vegetarian Day (2.5 kg)</option>
                      <option value="pescatarian">Pescatarian Day (3.2 kg)</option>
                      <option value="flexitarian">Flexitarian Day (3.8 kg)</option>
                      <option value="high_meat">High Meat Day (7.2 kg)</option>
                    </>
                  )}
                  {form.category === 'energy' && (
                    <>
                      <option value="dorm_room">Campus Dorm (0.385 kg/kWh)</option>
                      <option value="shared_apt">Shared Apartment (0.385 kg/kWh)</option>
                      <option value="green_tariff">Green Tariff / Solar (0.05 kg/kWh)</option>
                    </>
                  )}
                  {form.category === 'shopping' && (
                    <>
                      <option value="clothing_thrift">Thrifted Clothing (1.2 kg/item)</option>
                      <option value="clothing_new">New Fast-Fashion Item (15.0 kg/item)</option>
                      <option value="electronics_small">Small Device (35.0 kg/item)</option>
                      <option value="laptop_phone">Laptop / Phone (85.0 kg/item)</option>
                      <option value="books_stationery">Books / Supplies (2.5 kg/item)</option>
                    </>
                  )}
                  {form.category === 'waste' && (
                    <>
                      <option value="landfill_kg">Landfill Garbage (0.58 kg/kg)</option>
                      <option value="recycled_kg">Recycled Materials (0.08 kg/kg)</option>
                      <option value="composted_kg">Composted Organics (0.05 kg/kg)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Label / Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bus commute to library"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="form-input"
                />
              </div>

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

              <div className="form-group">
                <label className="form-label">Optional Note</label>
                <input
                  type="text"
                  placeholder="Additional context or passengers..."
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
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
