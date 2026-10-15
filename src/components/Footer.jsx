import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Heart, Shield, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '3.5rem',
      paddingBottom: '2.5rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '0.625rem',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Globe2 size={18} strokeWidth={2.3} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Eco<span style={{ color: '#059669' }}>Sphere</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Empowering Indian university students with scientific carbon tracking based on national emission guidelines.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.375rem 0.75rem', borderRadius: '9999px', fontWeight: 600 }}>
              <Shield size={14} /> 100% Student Privacy Preserved
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '1rem' }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: '#64748b' }}>
              <li><Link to="/dashboard" style={{ color: '#64748b' }}>Student Dashboard</Link></li>
              <li><Link to="/simulator" style={{ color: '#64748b' }}>What-If Scenario Lab</Link></li>
              <li><Link to="/ai-assistant" style={{ color: '#64748b' }}>AI Sustainability Coach</Link></li>
              <li><Link to="/goals" style={{ color: '#64748b' }}>Eco Challenges & Badges</Link></li>
              <li><Link to="/admin" style={{ color: '#64748b' }}>Campus Aggregated Analytics</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '1rem' }}>
              Govt & National Standards
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: '#64748b' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <BookOpen size={14} color="#059669" /> India GHG Program (WRI/TERI/CII)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <BookOpen size={14} color="#059669" /> Central Electricity Authority (CEA)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <BookOpen size={14} color="#059669" /> Automotive Research Assoc. of India (ARAI)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <BookOpen size={14} color="#059669" /> Delhi Metro CDM Railway Factors
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '1rem' }}>
              Campus Climate Action
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>
              Created for Indian institutions aiming for green campus ratings and net-zero student communities.
            </p>
            <div style={{ fontSize: '0.8125rem', color: '#475569', fontWeight: 600 }}>
              National Mission on Sustainable Habitat
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8125rem',
          color: '#94a3b8'
        }}>
          <div>
            © {new Date().getFullYear()} EcoSphere Platform. Built for Indian Student Climate Action.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            Engineered with <Heart size={14} color="#ef4444" fill="#ef4444" /> for a sustainable India.
          </div>
        </div>
      </div>
    </footer>
  );
}
