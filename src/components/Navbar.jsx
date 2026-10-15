import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  LayoutDashboard, 
  Activity, 
  Sliders, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  LogOut, 
  User, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, protected: true },
    { name: 'Activities', path: '/activities', icon: Activity, protected: true },
    { name: 'What-If Simulator', path: '/simulator', icon: Sliders, protected: true },
    { name: 'AI Coach', path: '/ai-assistant', icon: Sparkles, protected: true },
    { name: 'Goals & Badges', path: '/goals', icon: Target, protected: true },
    { name: 'Campus Admin', path: '/admin', icon: ShieldCheck, adminOnly: true }
  ];

  const visibleLinks = navLinks.filter(item => {
    if (!currentUser) return false;
    if (item.adminOnly) return currentUser.role === 'admin';
    return true;
  });

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.25rem' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.75rem',
            backgroundColor: '#ecfdf5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(5, 150, 105, 0.15)'
          }}>
            <Leaf size={22} strokeWidth={2.5} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Green<span style={{ color: '#059669' }}>Track</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '-2px' }}>
              Student Eco Hub
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {visibleLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.875rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isActive ? '#059669' : '#475569',
                  backgroundColor: isActive ? '#ecfdf5' : 'transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#059669' : '#64748b'} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* User / Auth Actions */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1rem' }} className="desktop-auth">
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', objectFit: 'cover', border: '2px solid #a7f3d0' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {currentUser.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {currentUser.role === 'admin' ? 'Campus Admin' : 'Student'}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                title="Log Out"
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  color: '#64748b',
                  backgroundColor: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Log In
              </Link>
              <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1.125rem', fontSize: '0.875rem' }}>
                Get Started Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger toggle */}
        <div style={{ display: 'block' }} className="mobile-toggle">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ padding: '0.5rem', color: '#334155', display: 'flex', alignItems: 'center' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {currentUser ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{currentUser.email}</div>
                </div>
              </div>
              {visibleLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.625rem 0',
                    fontWeight: 600,
                    color: location.pathname === item.path ? '#059669' : '#334155'
                  }}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0',
                  color: '#dc2626',
                  fontWeight: 600,
                  marginTop: '0.5rem'
                }}
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center' }}>
                Log In
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
                Create Free Student Account
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Media query styling inline helper */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-auth { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
