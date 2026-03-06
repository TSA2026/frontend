/**
 * AudioEngineMock.ts
 * 
 * Mock version for testing UI in Expo Go
 * Improved with faster calibration simulation
 */

export interface Telemetry {
  snrDb: number;
  speechActive: number;
  avgAgcGain: number;
  bandGains: number[];
  peakReduction: number;
  silenceFrames: number;
  speechOnset: boolean;
}

class AudioEngineMock {
  private running = false;
  private mode: 'quiet' | 'conversation' | 'noisy' = 'conversation';
  private frameCount = 0;
  private startTime = 0;

  async start(): Promise<boolean> {
    console.log('[MOCK] Audio engine started');
    this.running = true;
    this.frameCount = 0;
    this.startTime = Date.now();
    return true;
  }

  async stop(): Promise<boolean> {
    console.log('[MOCK] Audio engine stopped');
    this.running = false;
    this.frameCount = 0;
    return true;
  }

  async setMode(mode: 'quiet' | 'conversation' | 'noisy'): Promise<boolean> {
    console.log(`[MOCK] Mode set to: ${mode}`);
    this.mode = mode;
    return true;
  }

  async getTelemetry(): Promise<Telemetry | null> {
    if (!this.running) return null;

    this.frameCount++;

    // Realistic telemetry that varies over time
    const t = this.frameCount * 0.1;
    const speechCycle = Math.sin(t * 0.5);
    
    // Mode-specific gains
    const modeGains = {
      quiet: { avg: 3.5, variance: 1.0 },
      conversation: { avg: 6.0, variance: 2.0 },
      noisy: { avg: 8.5, variance: 3.0 },
    };
    
    const { avg, variance } = modeGains[this.mode];
    
    return {
      snrDb: 5 + Math.abs(speechCycle) * 8 + Math.random() * 2,
      speechActive: Math.max(0, Math.min(1, (speechCycle + 1) / 2 + Math.random() * 0.1)),
      avgAgcGain: avg + Math.sin(t * 0.3) * variance,
      bandGains: [
        2.0 + Math.random() * 0.5,
        3.5 + Math.random() * 1.0,
        avg + Math.random() * variance,
        avg * 0.9 + Math.random() * variance,
        3.0 + Math.random() * 0.8,
        1.8 + Math.random() * 0.4,
      ],
      peakReduction: 0.92 + Math.random() * 0.08,
      silenceFrames: speechCycle < 0 ? Math.floor(Math.abs(speechCycle) * 50) : 0,
      speechOnset: this.frameCount % 47 === 0, // Occasional onset detection
    };
  }

  async isCalibrated(): Promise<boolean> {
    if (!this.running) return false;
    
    // Calibrate after 2 seconds
    const elapsed = Date.now() - this.startTime;
    return elapsed > 2000;
  }
}

export const AudioEngine = new AudioEngineMock();