/**
 * profileService.ts
 * 
 * API service for managing audio profiles
 */

const API_BASE_URL = __DEV__ ? 'http://192.168.1.100:8000' : 'YOUR_PRODUCTION_URL';

export type ProcessingMode = 'quiet' | 'conversation' | 'noisy';

export interface CustomParams {
  noise_threshold_db?: number;
  gate_floor_db?: number;
  gate_smoothing?: number;
  hf_emphasis_db?: number;
  band_targets?: number[];
  band_max_gains?: number[];
  [key: string]: any;
}

export interface AudioProfile {
  profile_id: string;
  user_id: string;
  name: string;
  description?: string;
  mode: ProcessingMode;
  custom_params?: CustomParams;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileCreate {
  name: string;
  description?: string;
  mode: ProcessingMode;
  custom_params?: CustomParams;
}

export interface ProfileUpdate {
  name?: string;
  description?: string;
  mode?: ProcessingMode;
  custom_params?: CustomParams;
}

export interface ProfileList {
  profiles: AudioProfile[];
}

class ProfileService {
  private getHeaders(token: string | null) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🔑 Sending request with token:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No token provided to profile service!');
    }
    
    return headers;
  }

  async createProfile(token: string | null, profile: ProfileCreate): Promise<AudioProfile> {
    console.log('📤 Creating profile:', profile.name);
    
    const response = await fetch(`${API_BASE_URL}/api/profiles/`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      console.error('❌ Create profile failed:', error);
      throw new Error(error.detail || 'Failed to create profile');
    }

    const result = await response.json();
    console.log('✅ Profile created:', result);
    return result;
  }

  async getProfiles(token: string | null): Promise<AudioProfile[]> {
    console.log('📥 Fetching profiles...');
    
    const response = await fetch(`${API_BASE_URL}/api/profiles/`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      const status = response.status;
      console.error(`❌ Get profiles failed with status: ${status}`);
      
      if (status === 401) {
        throw new Error('Not authenticated. Please log in again.');
      }
      
      throw new Error('Failed to load profiles');
    }

    const data: ProfileList = await response.json();
    console.log(`✅ Loaded ${data.profiles.length} profiles`);
    return data.profiles;
  }

  async getProfile(token: string | null, profileId: string): Promise<AudioProfile> {
    const response = await fetch(`${API_BASE_URL}/api/profiles/${profileId}`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Failed to load profile');
    }

    return response.json();
  }

  async updateProfile(
    token: string | null,
    profileId: string,
    updates: ProfileUpdate
  ): Promise<AudioProfile> {
    const response = await fetch(`${API_BASE_URL}/api/profiles/${profileId}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || 'Failed to update profile');
    }

    return response.json();
  }

  async deleteProfile(token: string | null, profileId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/profiles/${profileId}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Failed to delete profile');
    }
  }

  async setDefaultProfile(token: string | null, profileId: string): Promise<AudioProfile> {
    const response = await fetch(
      `${API_BASE_URL}/api/profiles/${profileId}/set-default`,
      {
        method: 'POST',
        headers: this.getHeaders(token),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to set default profile');
    }

    return response.json();
  }

  async applyProfile(token: string | null, profileId: string): Promise<{
    success: boolean;
    message: string;
    mode: ProcessingMode;
    custom_params: CustomParams;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/profiles/${profileId}/apply`,
      {
        method: 'POST',
        headers: this.getHeaders(token),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to apply profile');
    }

    return response.json();
  }
}

export const profileService = new ProfileService();