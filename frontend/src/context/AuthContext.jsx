import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [token, setToken] = useState(() => authService.getToken());
  const [loading, setLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    // If token exists, refresh user profile to ensure status/KYC is fresh
    if (token) {
      authService.getMe()
        .then((res) => {
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('krishi_user', JSON.stringify(res.data));
          }
        })
        .catch(() => {
          // Token expired or invalid
          authService.logout();
          setUser(null);
          setToken(null);
        });
    }
  }, [token]);

  const login = async (loginOrPhone, password) => {
    setLoading(true);
    try {
      const data = await authService.login(loginOrPhone, password);
      setUser(data);
      setToken(data.token);
      setAuthModalOpen(false);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (registrationData) => {
    setLoading(true);
    try {
      const data = await authService.register(registrationData);
      setUser(data);
      setToken(data.token);
      setAuthModalOpen(false);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const role = user?.role || null;
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        authModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        setAuthModalTab,
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
