import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Globe, Shield, BookOpen } from 'lucide-react';

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
                <Leaf size={18} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Green<span style={{ color: '#059669' }}>Track</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Empowering university students with scientific, AI-assisted carbon footprint tracking and accessible sustainable lifestyle choices.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.375rem 0.75rem', borderRadius: '9999px', fontWeight: 600 }}>
              <Shield size={14} /> 100% Student Privacy Preserved
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '1rem' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: '#64748b' }}>
              <li><Link to="/dashboard" style={{ color: '#64748b', transition: 'color 0.2s' }}>Student Dashboard</Link></li>
              <li><Link to="/simulator" style={{ color: '#64748b' }}>What-If Scenario Lab</Link></li>
              <li><Link to="/ai-assistant" style={{ color: '#64748b' }}>AI Sustainability Coach</Link></li>
              <li><Link to="/goals" style={{ color: '#64748b' }}>Eco Challenges & Badges</Link></li>
              <li><Link to="/admin" style={{ color: '#64748b' }}>Campus Aggregated Analytics</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '1rem' }}>
              Methodology & Standards
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: '#64748b' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><BookOpen size={14} color="#059669" /> UK DEFRA GHG Conversion Factors</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><BookOpen size={14} color="#059669" /> US EPA eGRID Grid Emissions</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><BookOpen size={14} color="#059669" /> Poore & Nemecek Dietary LCAs</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Globe size={14} color="#059669" /> GHG Protocol Scope 1, 2, 3</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', marginBottom: '1rem' }}>
              Campus Partnership
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>
              GreenTrack is ready for campus-wide climate action plans and student sustainability initiatives.
            </p>
            <div style={{ fontSize: '0.8125rem', color: '#475569', fontWeight: 600 }}>
              Campus Climate Pledge • 2026 Edition
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
            © {new Date().getFullYear()} GreenTrack Platform. Built for Student Climate Action.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            Designed with <Heart size={14} color="#ef4444" fill="#ef4444" /> for a sustainable future.
          </div>
        </div>
      </div>
    </footer>
  );
}
