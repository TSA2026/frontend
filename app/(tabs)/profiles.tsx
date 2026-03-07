import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import {
  profileService,
  AudioProfile,
  ProfileCreate,
  ProcessingMode,
  CustomParams
} from '../../services/profileService';
import Slider from '@react-native-community/slider';
import AudioEngineNative from '../../services/AudioEngineNative';


export default function Profiles() {
  const router = useRouter();
  const { token } = useAuth();
  
  const [profiles, setProfiles] = useState<AudioProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState<ProcessingMode>('conversation');
  const [noiseThreshold, setNoiseThreshold] = useState(-8);
  const [gateFloor, setGateFloor] = useState(-15);
  const [gateSmoothing, setGateSmoothing] = useState(0.85);
  const [hfEmphasis, setHfEmphasis] = useState(3);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const data = await profileService.getProfiles(token);
      setProfiles(data);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    if (!token) return;
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a profile name');
      return;
    }

    try {
      const customParams: CustomParams = {
        noise_threshold_db: noiseThreshold,
        gate_floor_db: gateFloor,
        gate_smoothing: gateSmoothing,
        hf_emphasis_db: hfEmphasis,
        band_targets: mode === 'noisy' 
          ? [0.40, 0.70, 0.85, 0.80, 0.60, 0.35]
          : mode === 'quiet'
          ? [0.25, 0.30, 0.35, 0.30, 0.25, 0.18]
          : [0.35, 0.50, 0.60, 0.55, 0.45, 0.28],
        band_max_gains: mode === 'noisy'
          ? [4.0, 12.0, 18.0, 15.0, 10.0, 6.0]
          : mode === 'quiet'
          ? [3.0, 4.0, 5.0, 4.0, 3.0, 2.0]
          : [5.0, 8.0, 12.0, 10.0, 7.0, 4.0],
      };

      const newProfile: ProfileCreate = {
        name: name.trim(),
        description: description.trim() || undefined,
        mode,
        custom_params: customParams,
      };

      await profileService.createProfile(token, newProfile);
      resetForm();
      await loadProfiles();
      Alert.alert('Success', 'Profile created successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setMode('conversation');
    setNoiseThreshold(-8);
    setGateFloor(-15);
    setGateSmoothing(0.85);
    setHfEmphasis(3);
    setShowCreateForm(false);
  };

  const handleDeleteProfile = (profile: AudioProfile) => {
    Alert.alert(
      'Delete Profile',
      `Are you sure you want to delete "${profile.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!token) return;
            try {
              await profileService.deleteProfile(token, profile.profile_id);
              await loadProfiles();
              Alert.alert('Success', 'Profile deleted');
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const handleSetDefault = async (profile: AudioProfile) => {
    if (!token) return;
    
    try {
      await profileService.setDefaultProfile(token, profile.profile_id);
      await loadProfiles();
      Alert.alert('Success', `"${profile.name}" set as default`);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleApplyProfile = async (profile: AudioProfile) => {
  if (!token) return;
  
  try {
    // 1. Mark as active in backend
    await profileService.applyProfile(token, profile.profile_id);
    
    // 2. Apply to ACTUAL audio engine
    if (profile.custom_params) {
      await AudioEngineNative.applyCustomParams({
        noise_threshold_db: profile.custom_params.noise_threshold_db,
        gate_floor_db: profile.custom_params.gate_floor_db,
        gate_smoothing: profile.custom_params.gate_smoothing,
        hf_emphasis_db: profile.custom_params.hf_emphasis_db,
        band_targets: profile.custom_params.band_targets,
        band_max_gains: profile.custom_params.band_max_gains,
      });
      
      Alert.alert(
        'Success', 
        `✅ Applied "${profile.name}"\n\n` +
        `Noise Threshold: ${profile.custom_params.noise_threshold_db}dB\n` +
        `HF Boost: ${profile.custom_params.hf_emphasis_db}dB`
      );
    } else {
      // Fallback to preset mode
      await AudioEngineNative.setMode(profile.mode);
      Alert.alert('Success', `Applied "${profile.name}" (${profile.mode} mode)`);
    }
    
    await loadProfiles();
    
  } catch (error: any) {
    Alert.alert('Error', error.message || 'Failed to apply profile');
  }
};

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black" edges={['top']}>
        <View className="flex-row items-center px-4 py-3 border-b border-[#38383A]">
          <Pressable 
            className="flex-row items-center active:opacity-70"
            onPress={() => router.push("/settings")}
          >
            <Ionicons name="chevron-back" size={28} color="#007AFF" />
            <Text className="color-[#007AFF] text-lg ml-1">Settings</Text>
          </Pressable>
        </View>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      {/* Header with Back Button */}
      <View className="flex-row items-center px-4 py-3 border-b border-[#38383A]">
        <Pressable 
          className="flex-row items-center active:opacity-70"
          onPress={() => router.push("/settings")}
        >
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
          <Text className="color-[#007AFF] text-lg ml-1">Settings</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 bg-black">
        <View className="px-5 pt-5">
          <Text className="text-3xl font-bold color-white mb-5">
            Audio Profiles
          </Text>

          {/* Create Profile Button */}
          {!showCreateForm && (
            <Pressable
              className="bg-[#007AFF] rounded-xl p-4 mb-5 flex-row items-center justify-center gap-2 active:opacity-75"
              onPress={() => setShowCreateForm(true)}
            >
              <Ionicons name="add-circle" size={24} color="#FFF" />
              <Text className="color-white text-lg font-semibold">
                Create New Profile
              </Text>
            </Pressable>
          )}

          {/* Create Profile Form */}
          {showCreateForm && (
            <View className="bg-[#1C1C1E] rounded-xl p-4 mb-5">
              <Text className="color-white text-xl font-bold mb-4">
                New Profile
              </Text>

              <Text className="color-gray-400 text-sm mb-2">Profile Name *</Text>
              <TextInput
                className="bg-[#2C2C2E] color-white p-3 rounded-lg mb-4"
                placeholder="e.g., Coffee Shop"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />

              <Text className="color-gray-400 text-sm mb-2">Description</Text>
              <TextInput
                className="bg-[#2C2C2E] color-white p-3 rounded-lg mb-4 h-20"
                placeholder="Optional notes..."
                placeholderTextColor="#666"
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <Text className="color-gray-400 text-sm mb-2">Base Mode</Text>
              <View className="flex-row mb-4 gap-2">
                {(['quiet', 'conversation', 'noisy'] as ProcessingMode[]).map((m) => (
                  <Pressable
                    key={m}
                    className={`flex-1 border-2 rounded-lg p-3 ${
                      mode === m 
                        ? 'border-[#007AFF] bg-[#1C3D5A]' 
                        : 'border-[#2C2C2E] bg-[#2C2C2E]'
                    } active:opacity-70`}
                    onPress={() => setMode(m)}
                  >
                    <Text className={`text-center font-medium capitalize ${
                      mode === m ? 'color-[#007AFF]' : 'color-white'
                    }`}>
                      {m}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {/* Parameters */}
              <View className="mb-3">
                <Text className="color-white text-sm mb-2">
                  Noise Threshold: {noiseThreshold.toFixed(1)}dB
                </Text>
                <Slider
                  minimumValue={-20}
                  maximumValue={0}
                  value={noiseThreshold}
                  onValueChange={setNoiseThreshold}
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#3A3A3C"
                  thumbTintColor="#FFF"
                  step={0.5}
                />
              </View>

              <View className="mb-3">
                <Text className="color-white text-sm mb-2">
                  Gate Floor: {gateFloor.toFixed(1)}dB
                </Text>
                <Slider
                  minimumValue={-30}
                  maximumValue={0}
                  value={gateFloor}
                  onValueChange={setGateFloor}
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#3A3A3C"
                  thumbTintColor="#FFF"
                  step={0.5}
                />
              </View>

              <View className="mb-3">
                <Text className="color-white text-sm mb-2">
                  Gate Smoothing: {gateSmoothing.toFixed(2)}
                </Text>
                <Slider
                  minimumValue={0}
                  maximumValue={1}
                  value={gateSmoothing}
                  onValueChange={setGateSmoothing}
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#3A3A3C"
                  thumbTintColor="#FFF"
                  step={0.05}
                />
              </View>

              <View className="mb-4">
                <Text className="color-white text-sm mb-2">
                  High Frequency Boost: {hfEmphasis.toFixed(1)}dB
                </Text>
                <Slider
                  minimumValue={0}
                  maximumValue={10}
                  value={hfEmphasis}
                  onValueChange={setHfEmphasis}
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#3A3A3C"
                  thumbTintColor="#FFF"
                  step={0.5}
                />
              </View>

              {/* Form Buttons */}
              <View className="flex-row gap-3">
                <Pressable
                  className="flex-1 bg-[#2C2C2E] rounded-lg p-3 active:opacity-70"
                  onPress={resetForm}
                >
                  <Text className="color-[#007AFF] text-center font-semibold text-base">
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  className="flex-1 bg-[#007AFF] rounded-lg p-3 active:opacity-70"
                  onPress={handleCreateProfile}
                >
                  <Text className="color-white text-center font-semibold text-base">
                    Save Profile
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Profile List */}
          {profiles.length === 0 ? (
            <View className="bg-[#1C1C1E] rounded-xl p-8 items-center">
              <Ionicons name="musical-notes-outline" size={48} color="#666" />
              <Text className="color-white text-lg font-semibold mt-3">
                No profiles yet
              </Text>
              <Text className="color-gray-400 text-sm mt-1">
                Create your first audio profile above
              </Text>
            </View>
          ) : (
            profiles.map((profile) => (
              <View
                key={profile.profile_id}
                className="bg-[#1C1C1E] rounded-xl p-4 mb-3"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="color-white text-lg font-bold flex-1">
                    {profile.name}
                  </Text>
                  {profile.is_default && (
                    <View className="bg-[#1C3D5A] rounded-md px-2 py-1">
                      <Text className="color-[#007AFF] text-xs font-semibold">
                        Default
                      </Text>
                    </View>
                  )}
                </View>

                {profile.description && (
                  <Text className="color-gray-400 text-sm mb-3">
                    {profile.description}
                  </Text>
                )}

                <View className="border-t border-[#2C2C2E] pt-3">
                  <Text className="color-gray-400 text-sm mb-1">
                    Mode: <Text className="color-white capitalize">{profile.mode}</Text>
                  </Text>
                  {profile.custom_params && (
                    <>
                      <Text className="color-gray-400 text-sm mb-1">
                        Noise: <Text className="color-white">
                          {profile.custom_params.noise_threshold_db}dB
                        </Text>
                      </Text>
                      <Text className="color-gray-400 text-sm">
                        HF: <Text className="color-white">
                          {profile.custom_params.hf_emphasis_db}dB
                        </Text>
                      </Text>
                    </>
                  )}
                </View>

                {/* Actions */}
                <View className="flex-row mt-3 gap-2">
                  <Pressable
                    className="flex-1 bg-green-600 rounded-lg p-2 flex-row items-center justify-center gap-1 active:opacity-75"
                    onPress={() => handleApplyProfile(profile)}
                  >
                    <Ionicons name="play" size={16} color="#FFF" />
                    <Text className="color-white text-sm font-semibold">
                      Apply
                    </Text>
                  </Pressable>

                  {!profile.is_default && (
                    <Pressable
                      className="flex-1 bg-[#1C3D5A] rounded-lg p-2 flex-row items-center justify-center gap-1 active:opacity-75"
                      onPress={() => handleSetDefault(profile)}
                    >
                      <Ionicons name="star-outline" size={16} color="#007AFF" />
                      <Text className="color-[#007AFF] text-sm font-semibold">
                        Set Default
                      </Text>
                    </Pressable>
                  )}

                  <Pressable
                    className="bg-[#2C2C2E] rounded-lg p-2 px-3 active:opacity-75"
                    onPress={() => handleDeleteProfile(profile)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                  </Pressable>
                </View>
              </View>
            ))
          )}

          <View className="h-24" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}