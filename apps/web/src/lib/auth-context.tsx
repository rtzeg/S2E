import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { hasToken, logout as authLogout } from './auth';
import { logout as apiLogout } from './api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Проверка токена при загрузке
    setIsAuthenticated(hasToken());
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    console.log("DEBUG: Starting logout process");
    try {
      console.log("DEBUG: Calling apiLogout");
      await apiLogout();
      console.log("DEBUG: apiLogout completed");
    } catch (error) {
      console.log("DEBUG: apiLogout error:", error);
      // Ignore errors
    }
    console.log("DEBUG: Calling authLogout");
    authLogout();
    console.log("DEBUG: Setting isAuthenticated to false");
    setIsAuthenticated(false);
    console.log("DEBUG: Invalidating profile queries");
    queryClient.invalidateQueries({ queryKey: ["profile"] });
    console.log("DEBUG: Logout process completed");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};