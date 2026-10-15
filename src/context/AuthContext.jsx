import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, getStoredData, setStoredData } from '../services/storageService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return getStoredData('user', INITIAL_USER);
  });

  useEffect(() => {
    setStoredData('user', currentUser);
  }, [currentUser]);

  const login = (email, password, role = 'student') => {
    const user = {
      id: role === 'admin' ? 'adm_01' : 'usr_01',
      name: role === 'admin' ? 'Prof. Radhika Iyer (Campus Sustainability Dean)' : 'Aarav Sharma',
      email: email || (role === 'admin' ? 'sustainability@iitd.ac.in' : 'aarav.sharma@iitd.ac.in'),
      role: role,
      university: 'Indian Institute of Technology (IIT Delhi)',
      major: role === 'admin' ? 'Dean of Green Campus & Infrastructure' : 'B.Tech in Computer Science & Environmental Systems',
      joinedDate: '2024-08-01',
      avatarUrl: role === 'admin' 
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      hasCompletedOnboarding: true
    };
    setCurrentUser(user);
    return user;
  };

  const register = (name, email, password, role = 'student') => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      university: 'Indian Institute of Technology (IIT Delhi)',
      major: 'First Year Engineering',
      joinedDate: new Date().toISOString().split('T')[0],
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      hasCompletedOnboarding: false
    };
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const completeOnboarding = () => {
    if (currentUser) {
      const updated = { ...currentUser, hasCompletedOnboarding: true };
      setCurrentUser(updated);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
