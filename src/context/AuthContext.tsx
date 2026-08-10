import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
  completeOnboardingFlow: () => Promise<void>;
  exitGuestToLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isGuest: false,
  isLoading: true,
  hasSeenOnboarding: false,
  login: async () => {},
  logout: async () => {},
  continueAsGuest: async () => {},
  completeOnboardingFlow: async () => {},
  exitGuestToLogin: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkInitialState();
  }, []);

  const checkInitialState = async () => {
    try {
      const guestStatus = await AsyncStorage.getItem('is_guest');
      if (guestStatus === 'true') {
        setIsGuest(true);
      }

      const loginTimestamp = await AsyncStorage.getItem('login_timestamp');
      if (loginTimestamp) {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Failed to load initial state', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      await AsyncStorage.setItem('login_timestamp', Date.now().toString());
      await AsyncStorage.removeItem('is_guest');
      setIsAuthenticated(true);
      setIsGuest(false);
    } catch (e) {
      console.error('Failed to save auth status', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('login_timestamp');
      await AsyncStorage.removeItem('is_guest');
      await AsyncStorage.removeItem('has_seen_onboarding');
      setIsAuthenticated(false);
      setIsGuest(false);
      setHasSeenOnboarding(false);
    } catch (e) {
      console.error('Failed to clear auth status', e);
    }
  };

  const continueAsGuest = async () => {
    try {
      await AsyncStorage.setItem('is_guest', 'true');
      setHasSeenOnboarding(true);
      setIsGuest(true);
    } catch (e) {
      console.error('Failed to save guest status', e);
    }
  };

  const completeOnboardingFlow = async () => {
    try {
      setHasSeenOnboarding(true);
    } catch (e) {
      console.error('Failed to save onboarding status', e);
    }
  };

  const exitGuestToLogin = async () => {
    try {
      await AsyncStorage.removeItem('is_guest');
      setIsGuest(false);
      setHasSeenOnboarding(true); // Keep true so we skip onboarding and go straight to login
    } catch (e) {
      console.error('Failed to exit guest mode', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isGuest, isLoading, hasSeenOnboarding, login, logout, continueAsGuest, completeOnboardingFlow, exitGuestToLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
