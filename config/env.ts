// frontend/config/env.ts

/**
 * Environment Configuration
 * Centralized place for all environment-specific settings
 */

// Determine if running in development or production
const isDevelopment = __DEV__;

// Backend API Configuration
const DEV_API_URL = 'http://192.168.1.86:8000';  // Your local IP
const PROD_API_URL = 'https://your-production-url.com'; // Future production URL

export const config = {
  // API Base URL
  API_URL: isDevelopment ? DEV_API_URL : PROD_API_URL,
  
  // API Endpoints
  endpoints: {
    auth: {
      login: '/token',
      register: '/register',
      changePassword: '/users/me/change-password',
    },
    profiles: {
      base: '/api/profiles',
      apply: (id: string) => `/api/profiles/${id}/apply`,
      setDefault: (id: string) => `/api/profiles/${id}/set-default`,
    },
  },
  
  // Audio Engine Settings
  audio: {
    sampleRate: 44100,
    frameSize: 1024,
    hopSize: 512,
  },
  
  // App Metadata
  app: {
    name: 'Audio Enhancement',
    version: '1.0.0',
    buildNumber: '1',
  },
};

/**
 * Helper to build full API URL
 */
export const getApiUrl = (endpoint: string): string => {
  return `${config.API_URL}${endpoint}`;
};

export default config;