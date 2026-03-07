import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Application from 'expo-application';

export default function AboutScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const InfoRow = ({ 
    label, 
    value 
  }: { 
    label: string; 
    value: string 
  }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const LinkRow = ({ 
    icon, 
    title, 
    url 
  }: { 
    icon: string; 
    title: string; 
    url: string 
  }) => (
    <TouchableOpacity 
      style={styles.linkRow}
      onPress={() => openLink(url)}
    >
      <View style={styles.linkLeft}>
        <Ionicons name={icon as any} size={20} color="#007AFF" />
        <Text style={styles.linkTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

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
          <View style={styles.iconContainer}>
            <Ionicons name="headset" size={60} color="#007AFF" />
          </View>
          <Text style={styles.title}>Audio Enhancement</Text>
          <Text style={styles.subtitle}>TSA Competition Project</Text>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APP INFORMATION</Text>
          
          <InfoRow 
            label="Version" 
            value={Application.nativeApplicationVersion || '1.0.0'} 
          />
          <InfoRow 
            label="Build" 
            value={Application.nativeBuildVersion || '1'} 
          />
          <InfoRow 
            label="Platform" 
            value={Application.applicationName || 'iOS/Android'} 
          />
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              This application provides real-time audio processing designed to assist individuals with moderate hearing loss. 
              Using advanced DSP techniques including multi-band compression, spectral gating, and adaptive noise reduction, 
              the app enhances speech intelligibility in challenging acoustic environments.
            </Text>
            
            <Text style={[styles.description, { marginTop: 16 }]}>
              The core audio engine implements professional-grade algorithms including FFTW3-based spectral processing, 
              formant-preserving noise reduction, and speech-aware automatic gain control.
            </Text>
          </View>
        </View>

        {/* Technology Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TECHNOLOGY STACK</Text>
          
          <View style={styles.techContainer}>
            <TechItem icon="logo-react" title="React Native" />
            <TechItem icon="code-slash" title="TypeScript" />
            <TechItem icon="speedometer" title="C++ DSP Engine" />
            <TechItem icon="analytics" title="FFTW3" />
            <TechItem icon="cloud" title="FastAPI Backend" />
            <TechItem icon="server" title="MongoDB" />
          </View>
        </View>

        {/* Team Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TEAM</Text>
          
          <View style={styles.teamContainer}>
            <Text style={styles.teamMember}>Max - Audio Processing & Mobile Development</Text>
            <Text style={styles.teamMember}>Teammate - iOS Integration & DSP</Text>
          </View>
        </View>

        {/* Links Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RESOURCES</Text>
          
          <LinkRow 
            icon="logo-github"
            title="GitHub Repository"
            url="https://github.com"
          />
          <LinkRow 
            icon="document-text-outline"
            title="Documentation"
            url="https://docs.anthropic.com"
          />
          <LinkRow 
            icon="mail-outline"
            title="Contact Support"
            url="mailto:support@example.com"
          />
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL</Text>
          
          <LinkRow 
            icon="document-outline"
            title="Privacy Policy"
            url="https://example.com/privacy"
          />
          <LinkRow 
            icon="shield-checkmark-outline"
            title="Terms of Service"
            url="https://example.com/terms"
          />
          <LinkRow 
            icon="folder-open-outline"
            title="Open Source Licenses"
            url="https://example.com/licenses"
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Built for TSA 2026 Competition
          </Text>
          <Text style={styles.footerText}>
            © 2026 Audio Enhancement Team
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const TechItem = ({ icon, title }: { icon: string; title: string }) => (
  <View style={styles.techItem}>
    <Ionicons name={icon as any} size={24} color="#007AFF" />
    <Text style={styles.techTitle}>{title}</Text>
  </View>
);

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
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  infoLabel: {
    fontSize: 16,
    color: '#FFF',
  },
  infoValue: {
    fontSize: 16,
    color: '#999',
  },
  descriptionContainer: {
    padding: 16,
  },
  description: {
    fontSize: 15,
    color: '#CCC',
    lineHeight: 22,
  },
  techContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '45%',
  },
  techTitle: {
    fontSize: 14,
    color: '#FFF',
  },
  teamContainer: {
    padding: 16,
    gap: 12,
  },
  teamMember: {
    fontSize: 15,
    color: '#CCC',
    lineHeight: 20,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkTitle: {
    fontSize: 16,
    color: '#FFF',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});