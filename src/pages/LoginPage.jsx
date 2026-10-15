import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe2, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }
    login(email, password, role);
    navigate('/dashboard');
  };

  const handleQuickDemoStudent = () => {
    login('chetan.rao.cs23@bmsce.ac.in', 'demo123', 'student');
    navigate('/dashboard');
  };

  const handleQuickDemoAdmin = () => {
    login('sustainability.dean@bmsce.ac.in', 'admin123', 'admin');
    navigate('/admin');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 12rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      background: 'radial-gradient(circle at center, #f0fdf4 0%, #f8fafc 100%)'
    }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '1rem',
            backgroundColor: '#ecfdf5',
            color: '#059669',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Globe2 size={24} />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.5rem' }}>EcoSphere Login</h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            B.M.S. College of Engineering (BMSCE) Campus Hub
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Sign in as:</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setRole('student')}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${role === 'student' ? '#059669' : '#e2e8f0'}`,
                  backgroundColor: role === 'student' ? '#ecfdf5' : '#ffffff',
                  color: role === 'student' ? '#059669' : '#475569',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${role === 'admin' ? '#059669' : '#e2e8f0'}`,
                  backgroundColor: role === 'admin' ? '#ecfdf5' : '#ffffff',
                  color: role === 'admin' ? '#059669' : '#475569',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                Campus Admin
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">College Email ID</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'sustainability.dean@bmsce.ac.in' : 'chetan.rao.cs23@bmsce.ac.in'}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
            Sign In <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', textAlign: 'center' }}>
            One-Click Instant Demos
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleQuickDemoStudent}
              className="btn-soft"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.8125rem' }}
            >
              <UserCheck size={16} /> Load BMSCE Student (Chetan Rao)
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.8125rem' }}
            >
              Load BMSCE Campus Sustainability Dean
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          New to EcoSphere?{' '}
          <Link to="/register" style={{ color: '#059669', fontWeight: 600 }}>
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}
