import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from "expo-router";
import {useAuth} from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const {login, isLoading} = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }

    setError('');
    const success = await login(username, password);

    if (success) {
      router.replace('/(tabs)');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-black"
    >
      <ScrollView
        contentContainerStyle={{flexGrow: 1 }}
        className="bg-black"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center px-8">
          {/* Login Form */}
          <View className="mb-12">
            <Text className="text-4xl font-bold color-white text-center">
              Digital HearingAid
            </Text>
            <Text className="text-lg color-gray-400 text-center">
              Audio Enhancement System
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View className="bg-red-900 rounded-lg p-4 mb-6 w-full">
              <Text className="color-white text-center">{error}</Text>
            </View>
          ): null}

          {/* Input */}
          <View className="w-full mb-6">
            <Text className="color-gray-400 mb-2 ml-1">Username</Text>
            <TextInput
              className="bg-gray-900 color-white p-4 rounded-lg border border-gray-700 text-base"
              placeholder="Enter username"
              placeholderTextColor="#6b7280"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className="w-full mb-8">
            <Text className="color-gray-400 mb-2 ml-1">Password</Text>
            <TextInput
              className="bg-gray-900 color-white p-4 rounded-lg border border-gray-700 text-base"
              placeholder="Enter password"
              placeholderTextColor="#6b7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Login Button */}
          <Pressable
            className={`w-full rounded-lg p-4 mb-4 ${
              isLoading ? 'bg-blue-700' : 'bg-blue-600'
            }`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="color-white text-center font-semibold text-lg">
                Log In
              </Text>
            )}
          </Pressable>

          {/* Register Link */}
          <View className="flex-row items-center mt-4">
            <Text className="color-gray-400">Don't have an account? </Text>
            <Pressable onPress={() => router.push('/register')}>
              <Text className="color-blue-400 font-semibold">Sign Up</Text>
            </Pressable>
          </View>

          {/* Forgot Password */}
          <Pressable className="mt-4">
            <Text className="color-gray-500">Forgot password?</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}