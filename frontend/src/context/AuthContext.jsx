import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, logoutApi, getCurrentUser } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissionNotice, setPermissionNotice] = useState(null);

  // Initialize session from sessionStorage on mount
  useEffect(() => {
    try {
      const activeUser = getCurrentUser();
      if (activeUser) {
        setUser(activeUser);
      }
    } catch (err) {
      console.error('Failed to restore session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setPermissionNotice(null);
    const authenticatedUser = await loginApi(email, password);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
      setPermissionNotice(null);
    }
  };

  const notifyPermissionDenied = (message = 'Access Denied: You do not have permission to view that page.') => {
    setPermissionNotice(message);
  };

  const clearPermissionNotice = () => {
    setPermissionNotice(null);
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    permissionNotice,
    notifyPermissionDenied,
    clearPermissionNotice
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
