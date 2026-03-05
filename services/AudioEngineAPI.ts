const API_BASE_URL = __DEV__ ? 'http://localhost:8000/api' : '...'

export type ProcessingMode = 'quiet' | 'conversation' | 'noisy';

export interface EngineStatus {
  status: string;
  mode: ProcessingMode;
  calibrated: boolean;
  sample_rate: number;
  frame_size: number;
}

export interface Telemetry {
  snr_db: number;
  speech_active: number;
  avg_agc_gain: number;
  noise_floor_db: number;
  gate_avg_db: number;
  peak_reduction: number;
  band_gains: number[];
  silence_frames: number;
  speech_onset: boolean;
  mode: string;
}

export interface SetModeResponse {
  success: boolean;
  mode: string;
  message: string;
}

export interface StartResponse {
  success: boolean;
  status: string;
  mode: string;
  sample_rate: number;
  frame_size: number;
}

// ============================================================================
// API Client
// ============================================================================

class AudioEngineAPIClient {
  private baseUrl: string;
  private telemetryInterval: ReturnType<typeof setInterval> | null = null;
  private telemetryCallbacks: ((data: Telemetry[]) => void)[] = [];
  private statusCallbacks: ((status: EngineStatus) => void)[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // --------------------------------------------------------------------------
  // Core HTTP helper
  // --------------------------------------------------------------------------

  private async request<T>(
    method: 'GET' | 'POST',
    path: string,
    body?: object
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // --------------------------------------------------------------------------
  // Engine Control
  // --------------------------------------------------------------------------

  async getStatus(): Promise<EngineStatus> {
    return this.request<EngineStatus>('GET', '/engine/status');
  }

  async start(mode?: ProcessingMode): Promise<StartResponse> {
    return this.request<StartResponse>('POST', '/engine/start', 
      mode ? { mode } : {}
    );
  }

  /**
   * Stop audio processing.
   */
  async stop(): Promise<{ success: boolean; status: string }> {
    return this.request('POST', '/engine/stop');
  }

  /**
   * Set processing mode.
   * @param mode 'quiet' | 'conversation' | 'noisy'
   */
  async setMode(mode: ProcessingMode): Promise<SetModeResponse> {
    return this.request<SetModeResponse>('POST', '/engine/mode', { mode });
  }

  /**
   * Reset engine state (clears calibration).
   */
  async reset(): Promise<{ success: boolean; message: string }> {
    return this.request('POST', '/engine/reset');
  }

  /**
   * Get latest telemetry frames.
   * @param maxFrames Max number of frames to return
   */
  async getTelemetry(maxFrames: number = 10): Promise<Telemetry[]> {
    return this.request<Telemetry[]>(
      'GET',
      `/engine/telemetry?max_frames=${maxFrames}`
    );
  }

  /**
   * Start polling for telemetry updates.
   * @param intervalMs Poll interval in milliseconds (default: 500)
   */
  startPolling(intervalMs: number = 500): void {
    if (this.telemetryInterval) return;

    this.telemetryInterval = setInterval(async () => {
      try {
        // Poll telemetry
        const frames = await this.getTelemetry(5);
        if (frames.length > 0) {
          this.telemetryCallbacks.forEach(cb => cb(frames));
        }

        // Poll status
        const status = await this.getStatus();
        this.statusCallbacks.forEach(cb => cb(status));
      } catch (err) {
        // Silently ignore polling errors
      }
    }, intervalMs);
  }

  /**
   * Stop polling for updates.
   */
  stopPolling(): void {
    if (this.telemetryInterval) {
      clearInterval(this.telemetryInterval);
      this.telemetryInterval = null;
    }
  }

  /**
   * Subscribe to telemetry updates.
   * @param callback Function called with telemetry data
   * @returns Unsubscribe function
   */
  onTelemetry(callback: (data: Telemetry[]) => void): () => void {
    this.telemetryCallbacks.push(callback);
    return () => {
      this.telemetryCallbacks = this.telemetryCallbacks.filter(
        cb => cb !== callback
      );
    };
  }

  /**
   * Subscribe to status updates.
   * @param callback Function called with status data
   * @returns Unsubscribe function
   */
  onStatus(callback: (status: EngineStatus) => void): () => void {
    this.statusCallbacks.push(callback);
    return () => {
      this.statusCallbacks = this.statusCallbacks.filter(
        cb => cb !== callback
      );
    };
  }
}

// Export singleton
const AudioEngineAPI = new AudioEngineAPIClient(API_BASE_URL);
export default AudioEngineAPI;