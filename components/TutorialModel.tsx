// frontend/components/TutorialModal.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TutorialStep {
  icon: string;
  title: string;
  description: string;
}

const steps: TutorialStep[] = [
  {
    icon: 'headset',
    title: 'Connect Headphones',
    description: 'Always use headphones or earbuds to prevent feedback. AirPods work great!',
  },
  {
    icon: 'volume-mute',
    title: 'Stay Silent',
    description: 'When you first start the engine, stay silent for 3 seconds. This calibrates the noise floor.',
  },
  {
    icon: 'musical-notes',
    title: 'Choose a Profile',
    description: 'Select or create a profile that matches your environment: Quiet, Conversation, or Noisy.',
  },
  {
    icon: 'play',
    title: 'Start Processing',
    description: 'Press "Start Engine" and speak normally. You\'ll hear enhanced audio through your headphones.',
  },
  {
    icon: 'settings',
    title: 'Adjust Settings',
    description: 'Switch modes or create custom profiles to fine-tune the processing for different situations.',
  },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<Props> = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
    setCurrentStep(0);
  };

  const step = steps[currentStep];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <Pressable style={styles.closeButton} onPress={handleSkip}>
            <Ionicons name="close" size={24} color="#FFF" />
          </Pressable>

          <ScrollView contentContainerStyle={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons name={step.icon as any} size={64} color="#007AFF" />
            </View>

            {/* Step Counter */}
            <Text style={styles.stepCounter}>
              {currentStep + 1} of {steps.length}
            </Text>

            {/* Title */}
            <Text style={styles.title}>{step.title}</Text>

            {/* Description */}
            <Text style={styles.description}>{step.description}</Text>

            {/* Progress Dots */}
            <View style={styles.dotsContainer}>
              {steps.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentStep && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          </ScrollView>

          {/* Navigation */}
          <View style={styles.navigation}>
            {currentStep > 0 && (
              <Pressable style={styles.navButton} onPress={handlePrev}>
                <Text style={styles.navButtonText}>Back</Text>
              </Pressable>
            )}

            <View style={{ flex: 1 }} />

            <Pressable style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 8,
  },
  content: {
    padding: 32,
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1C3D5A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepCounter: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2C2C2E',
  },
  dotActive: {
    backgroundColor: '#007AFF',
    width: 24,
  },
  navigation: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TutorialModal;