// frontend/hooks/useFirstTimeUser.ts

import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const FIRST_TIME_KEY = 'has_seen_tutorial';

export const useFirstTimeUser = () => {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkFirstTime();
  }, []);

  const checkFirstTime = async () => {
    try {
      const hasSeenTutorial = await SecureStore.getItemAsync(FIRST_TIME_KEY);
      setIsFirstTime(!hasSeenTutorial);
    } catch (error) {
      console.error('Error checking first time user:', error);
      setIsFirstTime(true); // Default to showing tutorial on error
    } finally {
      setLoading(false);
    }
  };

  const markTutorialSeen = async () => {
    try {
      await SecureStore.setItemAsync(FIRST_TIME_KEY, 'true');
      setIsFirstTime(false);
    } catch (error) {
      console.error('Error marking tutorial as seen:', error);
    }
  };

  return {
    isFirstTime,
    loading,
    markTutorialSeen,
  };
};