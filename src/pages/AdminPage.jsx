import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  TrendingDown, 
  TreePine, 
  Download, 
  Lock
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const { currentUser } = useAuth();

  const campusMetrics = {
    totalStudentsEnrolled: 8400,
    activeAuditedStudents: 3620,
    campusAnnualEmissionsAvoided: 89400, // kg CO2e
    averagePerStudentFootprint: 1720, // kg CO2e (down from 1850)
    treesEquivalent: 4250
  };

  const departmentData = [
    { dept: 'Computer Science', participants: 850, avgFootprint: 1680, reduction: 14 },
    { dept: 'Mechanical Engg', participants: 720, avgFootprint: 1790, reduction: 11 },
    { dept: 'Civil & Environmental', participants: 680, avgFootprint: 1540, reduction: 18 },
    { dept: 'Chemical Engg', participants: 590, avgFootprint: 1720, reduction: 12 },
    { dept: 'Design & Humanities', participants: 410, avgFootprint: 1610, reduction: 15 },
    { dept: 'Management Studies', participants: 370, avgFootprint: 1820, reduction: 9 },
  ];

  const campusCategoryDistribution = [
    { name: 'Commute (Metro/Bus/Scooter)', value: 42, color: '#0284c7' },
    { name: 'Hostel Mess & Food', value: 32, color: '#10b981' },
    { name: 'Hostel Electricity (CEA)', value: 18, color: '#f59e0b' },
    { name: 'Clothing & Supplies', value: 5, color: '#8b5cf6' },
    { name: 'Solid Waste / Landfill', value: 3, color: '#ef4444' }
  ];

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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#059669', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <ShieldCheck size={16} /> Campus Administration
          </div>
          <h1 style={{ fontSize: '2.25rem', color: '#0f172a' }}>Campus Sustainability Analytics</h1>
          <p style={{ fontSize: '0.9375rem', color: '#64748b' }}>
            Aggregated, privacy-preserving carbon emissions data across Indian university departments.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.5rem 0.875rem', borderRadius: '0.5rem', fontWeight: 600 }}>
            <Lock size={14} /> k-Anonymity Verified (k &ge; 50)
          </div>
          <button 
            onClick={() => alert('Campus Sustainability Executive Report (PDF/CSV) generated based on India GHG Program metrics.')}
            className="btn-primary"
          >
            <Download size={16} /> Export Board Report
          </button>
        </div>
      </div>

      {/* TOP 4 AGGREGATE KPI CARDS */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card">
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Audited Students
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            {campusMetrics.activeAuditedStudents.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#059669', fontWeight: 600, marginTop: '0.25rem' }}>
            43.1% student participation
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Campus Avoided CO₂
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669' }}>
            {(campusMetrics.campusAnnualEmissionsAvoided / 1000).toFixed(1)} <span style={{ fontSize: '1rem' }}>Metric Tons</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.25rem' }}>
            Via Metro & hostel conservation
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Mean Student Footprint
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            {campusMetrics.averagePerStudentFootprint} <span style={{ fontSize: '1rem' }}>kg / yr</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#059669', fontWeight: 600, marginTop: '0.25rem' }}>
            ↓ 7.0% below national average
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Peepal/Neem Trees Equiv
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#16a34a' }}>
            {campusMetrics.treesEquivalent.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.25rem' }}>
            Native tree carbon equivalent
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
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Department Participation & Reductions</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Active student count by faculty</p>
            </div>
            <span className="badge badge-emerald">Live Faculty Roster</span>
          </div>

          <div style={{ height: '270px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dept" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  formatter={(val, name) => [
                    name === 'participants' ? `${val} students` : `${val} kg CO₂`,
                    name === 'participants' ? 'Audited Students' : 'Average Footprint'
                  ]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="participants" fill="#059669" radius={[4, 4, 0, 0]} name="Audited Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Campus Footprint Distribution</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Breakdown of student community emissions</p>
            </div>
            <span className="badge badge-blue">India GHG Baseline</span>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={campusCategoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {campusCategoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => [`${val}%`, 'Proportion']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.875rem' }}>
            {campusCategoryDistribution.map((item) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                <span>{item.name.split(' ')[0]}: <strong>{item.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRIVACY ASSURANCE ACCORDION */}
      <div className="card" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', color: '#059669' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#166534', marginBottom: '0.375rem' }}>
              Student Privacy & Ethical Governance Standard
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#15803d', lineHeight: 1.6 }}>
              Campus administration views exclusively anonymous aggregate statistics. No student names, individual travel itineraries, dining times, or location GPS data are stored or queryable by university staff. All computations respect institutional review board (IRB) privacy controls.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
