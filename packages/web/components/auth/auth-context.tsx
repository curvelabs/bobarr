import React, { createContext, useContext, useState, useEffect } from 'react';
import { useValidateTokenQuery } from '../../utils/graphql';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load token from localStorage on initial mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Verify the token whenever it changes
  const { data, loading: validationLoading } = useValidateTokenQuery({
    variables: { token: token || '' },
    skip: !token,
  });

  useEffect(() => {
    if (validationLoading) return;

    if (token && data?.validateToken) {
      setIsAuthenticated(true);
    } else if (token) {
      // Token is invalid, remove it
      localStorage.removeItem('authToken');
      setToken(null);
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, [token, data, validationLoading]);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}