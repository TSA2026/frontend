// AudioProcessor.h
// Complete C++ DSP Engine - Port of Python main.py
#ifndef AUDIOPROCESSOR_H
#define AUDIOPROCESSOR_H

#include <vector>
#include <cmath>
#include <algorithm>
#include <fftw3.h>

// Constants
#define NUM_BANDS 6
#define SAMPLE_RATE 44100
#define FRAME_SIZE 1024
#define HOP_SIZE 512

// Band edges: [80, 500, 1000, 2000, 4000, 8000, 22050]
static const float BAND_EDGES[NUM_BANDS + 1] = {80.0f, 500.0f, 1000.0f, 2000.0f, 4000.0f, 8000.0f, 22050.0f};

struct BandAGC {
    float gain;
    std::vector<float> rms_buffer;
    size_t rms_buffer_max_size;
    float target_rms;
    float max_gain;
    float attack_coeff;
    float release_coeff;
    float band_noise_rms;
    
    // IIR filter state (Second-Order Sections)
    float sos_state[12]; // 4th order = 2 biquads = 12 states (2 biquads * 6 coefs)
    
    BandAGC() : gain(1.0f), rms_buffer_max_size(20), target_rms(0.15f),
                max_gain(3.0f), attack_coeff(0.005f), release_coeff(0.0005f),
                band_noise_rms(0.0f) {
        rms_buffer.reserve(rms_buffer_max_size);
        memset(sos_state, 0, sizeof(sos_state));
    }
};

struct EngineConfig {
    float noise_threshold_db;
    float gate_floor_db;
    float gate_smoothing;
    float band_targets[NUM_BANDS];
    float band_max_gains[NUM_BANDS];
    float hf_emphasis_db;
    
    EngineConfig() : noise_threshold_db(-8.0f), gate_floor_db(-15.0f),
                     gate_smoothing(0.85f), hf_emphasis_db(3.0f) {
        // Default conversation mode
        float default_targets[NUM_BANDS] = {0.35f, 0.50f, 0.60f, 0.55f, 0.45f, 0.28f};
        float default_gains[NUM_BANDS] = {5.0f, 8.0f, 12.0f, 10.0f, 7.0f, 4.0f};
        memcpy(band_targets, default_targets, sizeof(band_targets));
        memcpy(band_max_gains, default_gains, sizeof(band_max_gains));
    }
};

struct EngineState {
    std::vector<float> noise_profile;
    std::vector<float> gate_prev;
    BandAGC band_agcs[NUM_BANDS];
    float peak_reduction;
    float speech_active_smoothed;
    bool speech_state;
    int silence_frame_count;
    bool speech_onset_detected;
    int transient_hold_frames;
    float prev_energy;
    
    EngineState() : peak_reduction(1.0f), speech_active_smoothed(0.0f),
                    speech_state(false), silence_frame_count(0),
                    speech_onset_detected(false), transient_hold_frames(0),
                    prev_energy(0.0f) {
        noise_profile.resize(FRAME_SIZE/2 + 1, 0.01f);
        gate_prev.resize(FRAME_SIZE/2 + 1, 1.0f);
    }
};

struct Telemetry {
    float snr_db;
    float noise_floor_db;
    float speech_active;
    float gate_avg_db;
    float gate_strength;
    float avg_agc_gain;
    float band_gains[NUM_BANDS];
    int silence_frames;
    float peak_reduction;
    bool speech_onset;
    bool transient_freeze;
    float hf_emphasis_db;
};

class AudioProcessor {
public:
    AudioProcessor(int sampleRate = SAMPLE_RATE, int frameSize = FRAME_SIZE);
    ~AudioProcessor();
    
    // Main processing
    void processFrame(const float* input, float* output, size_t frameCount);
    
    // Calibration
    bool calibrateFrame(const float* input, size_t frameCount);
    bool isCalibrationComplete() const { return calibrationComplete_; }
    void finalizeCalibration();
    
    // Configuration
    void setMode(const char* mode); // "quiet", "conversation", "noisy"
    void applyCustomParams(float noiseThresholdDb, float gateFloorDb,
                           float gateSmoothing, float hfEmphasisDb,
                           const float* bandTargets, const float* bandMaxGains);
    
    // Telemetry
    Telemetry getTelemetry() const { return telemetry_; }
    
private:
    
    class Impl;
    Impl* impl;
    
    // DSP Core
    int sampleRate_;
    int frameSize_;
    int hopSize_;
    
    // FFT
    fftwf_plan fftPlan_;
    fftwf_plan ifftPlan_;
    float* timeBuffer_;
    fftwf_complex* freqBuffer_;
    float* window_;
    float* freqs_;
    
    // State
    EngineConfig config_;
    EngineState state_;
    Telemetry telemetry_;
    
    // Calibration
    bool calibrationComplete_;
    int calibrationFramesCollected_;
    int calibrationTargetFrames_;
    std::vector<float> calibrationAccumulator_;
    
    // Constants
    static constexpr float NOISE_ADAPT_RATE = 0.002f;
    static constexpr float SPEECH_SMOOTHING = 0.7f;
    static constexpr float SPEECH_ON_THRESHOLD = 6.0f;
    static constexpr float SPEECH_OFF_THRESHOLD = 3.0f;
    static constexpr float LIMITER_THRESHOLD = 0.90f;
    static constexpr float LIMITER_RATIO = 10.0f;
    static constexpr float DENORMAL_THRESHOLD = 1e-30f;
    static constexpr int MIN_SILENCE_FRAMES = 20;
    static constexpr int SPEECH_ONSET_HOLD = 5;
    static constexpr float TRANSIENT_THRESHOLD_DB = 15.0f;
    static constexpr int TRANSIENT_HOLD_FRAMES = 10;
    static constexpr float CALIBRATION_SNR_THRESHOLD = 3.0f;
    static constexpr float MULTIBAND_NORM = 0.7f;
    
    // Band filters (Butterworth 4th order bandpass)
    struct BandFilter {
        float sos[12]; // 2 biquads (4th order) = 12 coefficients
    };
    BandFilter bandFilters_[NUM_BANDS];
    
    // Helper methods
    void initFFT();
    void initWindow();
    void initFrequencyArray();
    void initBandFilters();
    void sanitize(float* data, size_t length);
    void sanitizeComplex(fftwf_complex* data, size_t length);
    
    // DSP Methods (matching Python)
    bool detectSpeech(const float* magnitude, float& snr_db, bool& speech_onset);
    void adaptNoiseProfile(const float* magnitude, float speechActive);
    void spectralGate(fftwf_complex* X, const float* magnitude, bool speechOnset, float& gateStrength);
    bool detectTransient(const float* magnitude);
    void applyHFEmphasis(fftwf_complex* X);
    void multibandAGC(const float* input, float* output, size_t length, float speechActive, bool freezeAGC);
    void peakLimiter(float* data, size_t length);
    
    // IIR filter application (sosfilt equivalent)
    void applySOS(const float* input, float* output, size_t length,
                  const float* sos, float* state);
    void designButterworthBandpass(float f_low, float f_high, float fs, float* sos);
};

#endif // AUDIOPROCESSOR_H
