/**
 * RegisterScreen.tsx
 * 
 * User registration screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Validation
    if (!username || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    const success = await register(username, email, fullName, password);
    
    if (success) {
      // Auto-login after registration
      router.replace('/(tabs)');
    } else {
      setError('Registration failed. Username or email may already exist.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-black"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-black"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center px-8 py-12">
          
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold color-white text-center mb-2">
              Create Account
            </Text>
            <Text className="text-base color-gray-400 text-center">
              Join HearingAid today
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View className="bg-red-900 rounded-lg p-4 mb-6 w-full">
              <Text className="color-white text-center">{error}</Text>
            </View>
          ) : null}

          {/* Input Fields */}
          <View className="w-full mb-4">
            <Text className="color-gray-400 mb-2 ml-1">Username *</Text>
            <TextInput
              className="bg-gray-900 color-white p-4 rounded-lg border border-gray-700 text-base"
              placeholder="Choose a username"
              placeholderTextColor="#6b7280"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className="w-full mb-4">
            <Text className="color-gray-400 mb-2 ml-1">Email *</Text>
            <TextInput
              className="bg-gray-900 color-white p-4 rounded-lg border border-gray-700 text-base"
              placeholder="your.email@example.com"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className="w-full mb-4">
            <Text className="color-gray-400 mb-2 ml-1">Full Name (optional)</Text>
            <TextInput
              className="bg-gray-900 color-white p-4 rounded-lg border border-gray-700 text-base"
              placeholder="John Doe"
              placeholderTextColor="#6b7280"
              value={fullName}
              onChangeText={setFullName}
              autoCorrect={false}
            />
          </View>

          <View className="w-full mb-4">
            <Text className="color-gray-400 mb-2 ml-1">Password *</Text>
            <TextInput
              className="bg-gray-900 color-white p-4 rounded-lg border border-gray-700 text-base"
              placeholder="Minimum 6 characters"
              placeholderTextColor="#6b7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View className="w-full mb-8">
            <Text className="color-gray-400 mb-2 ml-1">Confirm Password *</Text>
            <TextInput
              className="bg-gray-900 color-white p-4 rounded-lg border border-gray-700 text-base"
              placeholder="Re-enter password"
              placeholderTextColor="#6b7280"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Register Button */}
          <Pressable
            className={`w-full rounded-lg p-4 mb-4 ${
              isLoading ? 'bg-blue-700' : 'bg-blue-600'
            }`}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="color-white text-center font-semibold text-lg">
                Create Account
              </Text>
            )}
          </Pressable>

          {/* Login Link */}
          <View className="flex-row items-center mt-4">
            <Text className="color-gray-400">Already have an account? </Text>
            <Pressable onPress={() => router.back()}>
              <Text className="color-blue-400 font-semibold">Log In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}