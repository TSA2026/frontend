// frontend/services/AudioEngineNative.ts

import { NativeModules } from 'react-native';

const { AudioEngine } = NativeModules;

export interface ProcessingMode {
  mode: 'quiet' | 'conversation' | 'noisy';
}

export interface CustomDSPParams {
  noise_threshold_db: number;
  gate_floor_db: number;
  gate_smoothing: number;
  hf_emphasis_db: number;
  band_targets: number[];      // 6 values
  band_max_gains: number[];    // 6 values
}

export interface Telemetry {
  snrDb: number;
  speechActive: number;
  avgAgcGain: number;
  noiseFloorDb: number;
  peakReduction: number;
  gateStrength: number;
  bandGains: number[];
}

class AudioEngineNative {
  /**
   * Start the audio engine with default settings
   */
  async start(): Promise<void> {
    if (!AudioEngine) {
      throw new Error('AudioEngine native module not available');
    }
    
    try {
      await AudioEngine.start();
      console.log('✅ Audio engine started');
    } catch (error) {
      console.error('❌ Failed to start audio engine:', error);
      throw error;
    }
  }

  /**
   * Stop the audio engine
   */
  async stop(): Promise<void> {
    if (!AudioEngine) {
      throw new Error('AudioEngine native module not available');
    }
    
    try {
      await AudioEngine.stop();
      console.log('✅ Audio engine stopped');
    } catch (error) {
      console.error('❌ Failed to stop audio engine:', error);
      throw error;
    }
  }

  /**
   * Set processing mode (uses preset parameters)
   */
  async setMode(mode: 'quiet' | 'conversation' | 'noisy'): Promise<void> {
    if (!AudioEngine) {
      throw new Error('AudioEngine native module not available');
    }
    
    try {
      await AudioEngine.setMode(mode);
      console.log(`✅ Mode set to: ${mode}`);
    } catch (error) {
      console.error('❌ Failed to set mode:', error);
      throw error;
    }
  }

  /**
   * Apply custom DSP parameters from a profile
   * This is the NEW method for profile integration!
   */
  async applyCustomParams(params: CustomDSPParams): Promise<void> {
    if (!AudioEngine) {
      throw new Error('AudioEngine native module not available');
    }
    
    // Validate parameters
    if (params.band_targets.length !== 6) {
      throw new Error('band_targets must have exactly 6 values');
    }
    if (params.band_max_gains.length !== 6) {
      throw new Error('band_max_gains must have exactly 6 values');
    }
    
    try {
      // Call native method with custom params
      await AudioEngine.applyCustomParams({
        noiseThresholdDb: params.noise_threshold_db,
        gateFloorDb: params.gate_floor_db,
        gateSmoothing: params.gate_smoothing,
        hfEmphasisDb: params.hf_emphasis_db,
        bandTargets: params.band_targets,
        bandMaxGains: params.band_max_gains,
      });
      
      console.log('✅ Custom DSP parameters applied:', params);
    } catch (error) {
      console.error('❌ Failed to apply custom params:', error);
      throw error;
    }
  }

  /**
   * Get current telemetry data
   */
  async getTelemetry(): Promise<Telemetry | null> {
    if (!AudioEngine) {
      return null;
    }
    
    try {
      const data = await AudioEngine.getTelemetry();
      return {
        snrDb: data.snrDb || 0,
        speechActive: data.speechActive || 0,
        avgAgcGain: data.avgAgcGain || 0,
        noiseFloorDb: data.noiseFloorDb || 0,
        peakReduction: data.peakReduction || 0,
        gateStrength: data.gateStrength || 0,
        bandGains: data.bandGains || [0, 0, 0, 0, 0, 0],
      };
    } catch (error) {
      console.error('❌ Failed to get telemetry:', error);
      return null;
    }
  }

  /**
   * Check if engine is calibrated
   */
  async isCalibrated(): Promise<boolean> {
    if (!AudioEngine) {
      return false;
    }
    
    try {
      return await AudioEngine.isCalibrated();
    } catch (error) {
      console.error('❌ Failed to check calibration:', error);
      return false;
    }
  }
}

export default new AudioEngineNative();