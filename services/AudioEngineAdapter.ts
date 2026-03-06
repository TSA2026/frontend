import {Platform} from 'react-native';

let AudioEngine: any;

try {
  AudioEngine = require('./AudioEngineNative').AudioEngine;
  console.log('Using native AudioEngine');
} catch (e) {
  AudioEngine = require('./AudioEngineMock').AudioEngine;
  console.log('Using mock audio engine');
  console.log('Native features are disabled. Build with Xcode for full functionality on IOS or Android Studio for Android.');
}

export { AudioEngine };
export type { Telemetry } from './AudioEngineNative';