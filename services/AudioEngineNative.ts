import { NativeModules } from 'react-native';

interface AudioEngineModule {
  start(): Promise<boolean>;
  stop(): Promise<boolean>;
  setMode(mode: 'quiet' | 'conversation' | 'noisy'): Promise<boolean>;
  getTelemetry(): Promise<Telemetry | null>;
  isCalibrated(): Promise<boolean>;
}

export interface Telemetry {
  snrDb: number;
  speechActive: number;
  avgAgcGain: number;
  bandGains: number[];
  peakReduction: number;
  silenceFrames: number;
  speechOnset: boolean;
}

const { AudioEngineModule: NativeAudioEngine } = NativeModules;

if (!NativeAudioEngine) {
  throw new Error('AudioEngineModule native module not found');
}

export const AudioEngine: AudioEngineModule = NativeAudioEngine;