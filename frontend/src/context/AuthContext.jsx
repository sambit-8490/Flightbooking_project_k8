import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (t) setAuthToken(t);
    if (u) setUser(JSON.parse(u));
    setToken(t || null);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setAuthToken(data.token);
    setToken(data.token);
    const sessionUser = { id: data.userId, email, role: data.role };
    setUser(sessionUser);
    localStorage.setItem('user', JSON.stringify(sessionUser));
    return sessionUser;
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem('user');
  };

  const value = useMemo(() => ({ user, token, login, signup, logout, loading }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

