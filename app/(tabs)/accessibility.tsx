import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'accessibility_settings';

interface AccessibilitySettings {
  reduceMotion: boolean;
  increaseContrast: boolean;
  largeText: boolean;
  boldText: boolean;
  buttonShapes: boolean;
  onOffLabels: boolean;
  fontSize: number;
  audioFeedback: boolean;
  hapticFeedback: boolean;
}

const defaultSettings: AccessibilitySettings = {
  reduceMotion: false,
  increaseContrast: false,
  largeText: false,
  boldText: false,
  buttonShapes: false,
  onOffLabels: false,
  fontSize: 16,
  audioFeedback: true,
  hapticFeedback: true,
};

export default function AccessibilityScreen() {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await SecureStore.getItemAsync(STORAGE_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load accessibility settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: AccessibilitySettings) => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const SettingRow = ({ 
    icon, 
    title, 
    description, 
    settingKey,
  }: {
    icon: string;
    title: string;
    description?: string;
    settingKey: keyof Omit<AccessibilitySettings, 'fontSize'>;
  }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color="#007AFF" />
        <View style={styles.settingText}>
          <Text style={[
            styles.settingTitle,
            settings.boldText && { fontWeight: 'bold' },
            settings.largeText && { fontSize: 18 },
          ]}>
            {title}
          </Text>
          {description && (
            <Text style={[
              styles.settingDescription,
              settings.largeText && { fontSize: 15 },
            ]}>
              {description}
            </Text>
          )}
        </View>
      </View>
      <Switch
        value={settings[settingKey] as boolean}
        onValueChange={(value) => updateSetting(settingKey, value)}
        trackColor={{ 
          false: settings.increaseContrast ? '#555' : '#3A3A3C', 
          true: '#34C759' 
        }}
        thumbColor="#FFF"
        ios_backgroundColor={settings.increaseContrast ? '#555' : '#3A3A3C'}
      />
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.headerBar}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push("/settings")}
          >
            <Ionicons name="chevron-back" size={28} color="#007AFF" />
            <Text style={styles.backText}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#FFF' }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header with Back Button */}
      <View style={styles.headerBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push("/settings")}
        >
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
          <Text style={styles.backText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[
            styles.title,
            settings.boldText && { fontWeight: 'bold' },
            settings.largeText && { fontSize: 36 },
          ]}>
            Accessibility
          </Text>
          <Text style={[
            styles.subtitle,
            settings.largeText && { fontSize: 16 },
          ]}>
            Customize the app to better suit your needs
          </Text>
        </View>

        {/* Display Section */}
        <View style={[
          styles.section,
          settings.increaseContrast && { backgroundColor: '#2C2C2E', borderWidth: 1, borderColor: '#555' },
        ]}>
          <Text style={[
            styles.sectionTitle,
            settings.boldText && { fontWeight: 'bold' },
          ]}>
            DISPLAY
          </Text>

          <SettingRow
            icon="contrast-outline"
            title="Increase Contrast"
            description="Improve distinction between elements"
            settingKey="increaseContrast"
          />

          <SettingRow
            icon="text-outline"
            title="Larger Text"
            description="Make text easier to read"
            settingKey="largeText"
          />

          <SettingRow
            icon="text"
            title="Bold Text"
            description="Make text stand out more"
            settingKey="boldText"
          />

          <SettingRow
            icon="square-outline"
            title="Button Shapes"
            description="Show outlines around buttons"
            settingKey="buttonShapes"
          />

          {/* Font Size Slider */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Ionicons name="text-outline" size={20} color="#007AFF" />
              <Text style={[
                styles.sliderTitle,
                settings.boldText && { fontWeight: 'bold' },
                settings.largeText && { fontSize: 18 },
              ]}>
                Font Size
              </Text>
            </View>
            <View style={styles.sliderRow}>
              <Text style={[styles.sliderLabel, { fontSize: 12 }]}>A</Text>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={24}
                value={settings.fontSize}
                onValueChange={(value) => updateSetting('fontSize', value)}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor={settings.increaseContrast ? '#555' : '#3A3A3C'}
                thumbTintColor="#FFF"
              />
              <Text style={[styles.sliderLabel, { fontSize: 20 }]}>A</Text>
            </View>
            <Text style={styles.sliderValue}>{Math.round(settings.fontSize)}pt</Text>
          </View>
        </View>

        {/* Motion Section */}
        <View style={[
          styles.section,
          settings.increaseContrast && { backgroundColor: '#2C2C2E', borderWidth: 1, borderColor: '#555' },
        ]}>
          <Text style={[
            styles.sectionTitle,
            settings.boldText && { fontWeight: 'bold' },
          ]}>
            MOTION
          </Text>

          <SettingRow
            icon="phone-portrait-outline"
            title="Reduce Motion"
            description="Minimize animations and effects"
            settingKey="reduceMotion"
          />
        </View>

        {/* Feedback Section */}
        <View style={[
          styles.section,
          settings.increaseContrast && { backgroundColor: '#2C2C2E', borderWidth: 1, borderColor: '#555' },
        ]}>
          <Text style={[
            styles.sectionTitle,
            settings.boldText && { fontWeight: 'bold' },
          ]}>
            FEEDBACK
          </Text>

          <SettingRow
            icon="volume-high-outline"
            title="Audio Feedback"
            description="Play sounds for interactions"
            settingKey="audioFeedback"
          />

          <SettingRow
            icon="phone-portrait-outline"
            title="Haptic Feedback"
            description="Vibrate for interactions"
            settingKey="hapticFeedback"
          />

          <SettingRow
            icon="toggle-outline"
            title="On/Off Labels"
            description="Show labels on switches"
            settingKey="onOffLabels"
          />
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#007AFF" />
          <Text style={[
            styles.infoText,
            settings.largeText && { fontSize: 15 },
          ]}>
            Settings are saved automatically and will persist across app restarts.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#38383A',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    fontSize: 17,
    color: '#007AFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  sliderContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  sliderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderTitle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
    marginLeft: 12,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderLabel: {
    color: '#FFF',
    fontWeight: '600',
  },
  sliderValue: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 20,
    padding: 16,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#999',
    lineHeight: 18,
  },
});