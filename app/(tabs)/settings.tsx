import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const router = useRouter();
  const { user } = useAuth();

  const SettingRow = ({ 
    icon, 
    title, 
    onPress 
  }: { 
    icon: string; 
    title: string; 
    onPress: () => void;
  }) => (
    <Pressable
      className="flex-row justify-between items-center bg-[#1C1C1E] px-4 py-4 mb-2 rounded-xl active:opacity-70"
      onPress={onPress}
    >
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon as any} size={24} color="#007AFF" />
        <Text className="color-white text-lg font-medium">{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1 bg-black">
        <View className="px-5 pt-5">
          <Text className="text-3xl font-bold color-white mb-6">
            Settings
          </Text>

          {/* User Info Card */}
          <View className="bg-[#1C1C1E] rounded-xl p-4 mb-6">
            <View className="flex-row items-center gap-3">
              <View className="w-14 h-14 bg-[#007AFF] rounded-full items-center justify-center">
                <Ionicons name="person" size={28} color="#FFF" />
              </View>
              <View className="flex-1">
                <Text className="color-white text-lg font-semibold mb-1">
                  {user?.full_name || user?.username || 'User'}
                </Text>
                <Text className="color-gray-400 text-sm">{user?.email || 'Not available'}</Text>
              </View>
            </View>
          </View>

          {/* Settings Menu */}
          <View className="mb-6">
            <Text className="color-gray-500 text-xs font-semibold mb-3 ml-1 tracking-wider">
              ACCOUNT
            </Text>
            <SettingRow
              icon="person-circle-outline"
              title="Account"
              onPress={() => router.push("/account")}
            />
          </View>

          <View className="mb-6">
            <Text className="color-gray-500 text-xs font-semibold mb-3 ml-1 tracking-wider">
              AUDIO
            </Text>
            <SettingRow
              icon="musical-notes"
              title="Audio Profiles"
              onPress={() => router.push("/profiles")}
            />
            <SettingRow
              icon="settings-outline"
              title="Custom Modes"
              onPress={() => console.log("Custom Modes")}
            />
          </View>

          <View className="mb-6">
            <Text className="color-gray-500 text-xs font-semibold mb-3 ml-1 tracking-wider">
              PREFERENCES
            </Text>
            <SettingRow
              icon="accessibility-outline"
              title="Accessibility"
              onPress={() => router.push("/accessibility")}
            />
            <SettingRow
              icon="information-circle-outline"
              title="About"
              onPress={() => router.push("/about")}
            />
          </View>

          {/* App Version */}
          <View className="items-center py-6 mb-24">
            <Text className="color-gray-600 text-xs">
              Audio Enhancement v1.0.0
            </Text>
            <Text className="color-gray-600 text-xs mt-1">
              TSA Competition 2026
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}