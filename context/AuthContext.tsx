/**
 * AuthContext.tsx
 * 
 * Authentication context with secure token storage
 * Handles login, register, logout, and token management
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';

// const API_BASE_URL = __DEV__ ? 'http://localhost:8000' : 'YOUR_PRODUCTION_URL';
const API_BASE_URL = __DEV__ ? 'http://192.168.1.100:8000' : 'YOUR_PRODUCTION_URL';

interface User {
  username: string;
  email: string | null;
  full_name: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, fullName: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Load token on app start
  useEffect(() => {
    loadToken();
  }, []);

  // Protect routes
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (!token && !inAuthGroup) {
      // Redirect to login
      router.replace('/login');
    } else if (token && inAuthGroup) {
      // Redirect to app
      router.replace('/(tabs)');
    }
  }, [token, segments, isLoading]);

  const loadToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('auth_token');
      const storedUser = await SecureStore.getItemAsync('user_data');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Login to get token
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(`${API_BASE_URL}/token`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setIsLoading(false);
        return false;
      }

      const data = await response.json();
      const accessToken = data.access_token;

      // Get user info
      const userResponse = await fetch(`${API_BASE_URL}/users/me/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!userResponse.ok) {
        setIsLoading(false);
        return false;
      }

      const userData = await userResponse.json();

      // Save to secure storage
      await SecureStore.setItemAsync('auth_token', accessToken);
      await SecureStore.setItemAsync('user_data', JSON.stringify(userData));

      setToken(accessToken);
      setUser(userData);
      setIsLoading(false);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    username: string,
    email: string,
    fullName: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Register user
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          full_name: fullName || null,
          password,
        }),
      });

      if (!response.ok) {
        setIsLoading(false);
        return false;
      }

      // Auto-login after registration
      const loginSuccess = await login(username, password);
      return loginSuccess;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('user_data');
      setToken(null);
      setUser(null);
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}