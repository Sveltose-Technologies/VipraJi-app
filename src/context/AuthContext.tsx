import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const EXPIRY_TIME_MS = 24 * 60 * 60 * 1000; // 24 hours

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const loginTimestamp = await AsyncStorage.getItem('login_timestamp');
      if (loginTimestamp) {
        const timePassed = Date.now() - parseInt(loginTimestamp, 10);
        if (timePassed < EXPIRY_TIME_MS) {
          // Still valid
          setIsAuthenticated(true);
        } else {
          // Expired
          await logout();
        }
      }
    } catch (e) {
      console.error('Failed to load auth status', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      await AsyncStorage.setItem('login_timestamp', Date.now().toString());
      setIsAuthenticated(true);
    } catch (e) {
      console.error('Failed to save auth status', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('login_timestamp');
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Failed to clear auth status', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
