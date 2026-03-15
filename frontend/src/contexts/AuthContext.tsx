import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, getStoredToken, setStoredToken, clearStoredToken, type User } from '../api/client';

const API_BASE = import.meta.env.VITE_API_URL || '';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  providers: { google: boolean; facebook: boolean };
  loginWithGoogle: () => void;
  loginWithFacebook: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState({ google: false, facebook: false });

  const fetchUser = () => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    api.auth
      .me()
      .then(setUser)
      .catch(() => {
        clearStoredToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    api.auth.providers().then(setProviders).catch(() => {});
  }, []);

  useEffect(() => {
    const onTokenSet = () => fetchUser();
    window.addEventListener('truestory-token-set', onTokenSet);
    return () => window.removeEventListener('truestory-token-set', onTokenSet);
  }, []);

  const loginWithGoogle = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
  };

  const loginWithFacebook = () => {
    window.location.href = `${API_BASE}/api/auth/facebook`;
  };

  const logout = () => {
    clearStoredToken();
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    loading,
    providers,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function handleAuthCallback(token: string): void {
  setStoredToken(token);
  window.dispatchEvent(new Event('truestory-token-set'));
}
