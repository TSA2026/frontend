import {useState, useEffect, useCallback} from 'react';
import {AudioEngine, Telemetry} from '../services/AudioEngineNative';
import { PermissionsAndroid, Platform } from 'react-native';

type Mode = 'quiet' | 'conversation' | 'noisy';

export function useAudioEngine() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState<Mode>('conversation');
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permsission',
          message: 'This app needs access to your microphone for audio processing',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (e) {
      console.error('Permission request error:', e);
      return false;
    }
  };

  const start = useCallback(async () => {
    try {
      setError(null);

      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setError('Microphone permission denied');
        return;
      }

      await AudioEngine.start();
      setIsRunning(true);

      const interval = setInterval(async () => {
        try {
          const data = await AudioEngine.getTelemetry();
          setTelemetry(data);

          const calibrated = await AudioEngine.isCalibrated();
          setIsCalibrated(calibrated);
        } catch (e) {
          console.error('Telemetry error:', e);
        }
      }, 500);

      (global as any).__audioEngineInterval = interval;
    } catch (e: any) {
      setError(e.message || 'Failed to start audio engine');
      console.error('Start error:', e);
    }
  }, []);

  const stop = useCallback(async () => {
    try {
      await AudioEngine.stop();
      setIsRunning(false);
      setTelemetry(null);

      if ((global as any).__audioEngineInterval) {
        clearInterval((global as any).__audioEngineInterval);
        (global as any).__audioEngineInterval = null;
      }
    } catch (e: any) {
      setError(e.message || 'Failed to stop audio engine');
      console.error('Stop error:', e);
    }
  }, []);

  const setMode = useCallback(async (mode: Mode) => {
    try {
      await AudioEngine.setMode(mode);
      setCurrentMode(mode);
    } catch (e: any) {
      setError(e.message || 'Failed to set mode');
      console.error('Mode error:', e);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (isRunning) {
        AudioEngine.stop().catch(console.error);
      }
      if ((global as any).__audioEngineInterval) {
        clearInterval((global as any).__audioEngineInterval);
      }
    };
  }, [isRunning]);

  return {
    isRunning,
    currentMode,
    telemetry,
    isCalibrated,
    error,
    start,
    stop,
    setMode,
  };
}