import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  role: Role;
  isLoggedIn: boolean;
  login: (email: string, role?: Role) => boolean;
  register: (name: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  switchRole: (role: Role) => void;
  updateProfile: (updatedData: Partial<User>) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('lavva_clinic_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing user session', e);
      }
    }
    // Default to the demo patient
    return INITIAL_USERS[0];
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lavva_clinic_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lavva_clinic_user');
    }
  }, [currentUser]);

  const login = (email: string, explicitRole?: Role): boolean => {
    // Check if matching initial user or admin
    if (email.toLowerCase().includes('admin') || explicitRole === 'superadmin') {
      setCurrentUser(INITIAL_USERS[1]);
      return true;
    }

    const matched = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setCurrentUser(matched);
      return true;
    }

    // Default fallback patient user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      phone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
      role: 'patient',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      address: 'DKI Jakarta, Indonesia'
    };
    setCurrentUser(newUser);
    return true;
  };

  const register = (name: string, email: string, phone: string): boolean => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role: 'patient',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      address: 'DKI Jakarta'
    };
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (newRole: Role) => {
    if (newRole === 'superadmin') {
      setCurrentUser(INITIAL_USERS[1]);
    } else {
      setCurrentUser(INITIAL_USERS[0]);
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updatedData });
    }
  };

  const role: Role = currentUser ? currentUser.role : 'patient';
  const isLoggedIn = currentUser !== null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isLoggedIn,
        login,
        register,
        logout,
        switchRole,
        updateProfile,
        showAuthModal,
        setShowAuthModal,
        authModalTab,
        setAuthModalTab
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
