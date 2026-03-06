import Slider from "@react-native-community/slider";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAudioEngineContext } from '../../context/AudioEngineContext';

export default function Index() {
  const {
    isRunning,
    currentMode,
    telemetry,
    isCalibrated,
    error,
    start,
    stop,
    setMode,
  } = useAudioEngineContext();

  const [activeMode, setActiveMode] = useState("Conversation");
  const [valueOne, setValueOne] = useState(1);

  const handleModeChange = async (uiMode: string) => {
    setActiveMode(uiMode);

    const modeMap: { [key: string]: "quiet" | "conversation" | "noisy" } = {
      Conversation: "conversation",
      "Noise Reduction": "quiet",
      "A.I.": "noisy",
    };

    const engineMode = modeMap[uiMode];
    if (engineMode) {
      await setMode(engineMode);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1 bg-black">
        <View className="px-5 pt-5">
          {/* Error Display */}
          {error && (
            <View className="bg-red-900 rounded-xl p-4 mb-4 flex-row items-center gap-3">
              <Ionicons name="alert-circle" size={24} color="#FFF" />
              <Text className="color-white font-semibold flex-1">Error: {error}</Text>
            </View>
          )}

          {/* Engine Status Card */}
          <View className="bg-[#1C1C1E] rounded-xl p-5 mb-4">
            <View className="flex-row items-center mb-4">
              <Ionicons 
                name={isRunning ? "radio-button-on" : "radio-button-off"} 
                size={28} 
                color={isRunning ? "#34C759" : "#666"} 
              />
              <Text className="color-white text-xl font-bold ml-3">
                {isRunning ? "Engine Running" : "Engine Stopped"}
              </Text>
            </View>

            {isRunning && !isCalibrated && (
              <View className="flex-row items-center mb-4">
                <ActivityIndicator size="small" color="#007AFF" />
                <Text className="color-gray-400 ml-3 text-sm">Calibrating noise floor...</Text>
              </View>
            )}

            {isRunning && isCalibrated && (
              <View className="flex-row items-center mb-4">
                <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                <Text className="color-green-400 ml-2 font-medium">Calibrated & Ready</Text>
              </View>
            )}

            <Pressable
              className={`rounded-xl p-4 flex-row items-center justify-center gap-2 ${
                isRunning ? "bg-red-500" : "bg-[#007AFF]"
              } active:opacity-75`}
              onPress={isRunning ? stop : start}
            >
              <Ionicons name={isRunning ? "stop" : "play"} size={20} color="#FFF" />
              <Text className="color-white font-bold text-lg">
                {isRunning ? "Stop Engine" : "Start Engine"}
              </Text>
            </Pressable>
          </View>

          {/* Telemetry Card */}
          {telemetry && (
            <View className="bg-[#1C1C1E] rounded-xl p-5 mb-4">
              <Text className="color-white text-lg font-semibold mb-4">Live Statistics</Text>
              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <Text className="color-gray-400 text-xs mb-2">SNR</Text>
                  <Text className="color-white text-2xl font-bold">
                    {telemetry.snrDb.toFixed(1)}
                  </Text>
                  <Text className="color-gray-500 text-xs">dB</Text>
                </View>
                <View className="items-center flex-1">
                  <Text className="color-gray-400 text-xs mb-2">Speech</Text>
                  <Text className="color-white text-2xl font-bold">
                    {(telemetry.speechActive * 100).toFixed(0)}
                  </Text>
                  <Text className="color-gray-500 text-xs">%</Text>
                </View>
                <View className="items-center flex-1">
                  <Text className="color-gray-400 text-xs mb-2">AGC Gain</Text>
                  <Text className="color-white text-2xl font-bold">
                    {telemetry.avgAgcGain.toFixed(2)}
                  </Text>
                  <Text className="color-gray-500 text-xs">x</Text>
                </View>
              </View>
            </View>
          )}

          {/* Mode Selection Header */}
          <View className="items-center my-6">
            <Text className="color-gray-500 text-sm font-medium mb-2">
              SELECTED MODE
            </Text>
            <Text className="color-white text-3xl font-bold mb-1">
              {activeMode}
            </Text>
            <Text className="color-gray-600 text-xs">
              Engine: {currentMode}
            </Text>
          </View>

          {/* Mode Buttons Grid */}
          <View className="flex-row flex-wrap justify-between mb-5">
            <Pressable
              className={`w-[48%] mb-3 rounded-xl p-5 items-center border-2 ${
                activeMode === "Conversation" 
                  ? "border-[#007AFF] bg-[#1C3D5A]" 
                  : "border-[#2C2C2E] bg-[#1C1C1E]"
              } active:opacity-70`}
              onPress={() => handleModeChange("Conversation")}
            >
              <Ionicons 
                name="people" 
                size={32} 
                color={activeMode === "Conversation" ? "#007AFF" : "#666"} 
              />
              <Text className={`text-lg font-semibold mt-3 ${
                activeMode === "Conversation" ? "color-[#007AFF]" : "color-white"
              }`}>
                Conversation
              </Text>
              <Text className="color-gray-500 text-xs mt-1">Have a chat</Text>
            </Pressable>

            <Pressable
              className={`w-[48%] mb-3 rounded-xl p-5 items-center border-2 ${
                activeMode === "Noise Reduction" 
                  ? "border-[#007AFF] bg-[#1C3D5A]" 
                  : "border-[#2C2C2E] bg-[#1C1C1E]"
              } active:opacity-70`}
              onPress={() => handleModeChange("Noise Reduction")}
            >
              <Ionicons 
                name="volume-mute" 
                size={32} 
                color={activeMode === "Noise Reduction" ? "#007AFF" : "#666"} 
              />
              <Text className={`text-lg font-semibold mt-3 ${
                activeMode === "Noise Reduction" ? "color-[#007AFF]" : "color-white"
              }`}>
                Quiet Mode
              </Text>
              <Text className="color-gray-500 text-xs mt-1">Bring silence</Text>
            </Pressable>

            <Pressable
              className={`w-[48%] mb-3 rounded-xl p-5 items-center border-2 ${
                activeMode === "A.I." 
                  ? "border-[#007AFF] bg-[#1C3D5A]" 
                  : "border-[#2C2C2E] bg-[#1C1C1E]"
              } active:opacity-70`}
              onPress={() => handleModeChange("A.I.")}
            >
              <Ionicons 
                name="bulb" 
                size={32} 
                color={activeMode === "A.I." ? "#007AFF" : "#666"} 
              />
              <Text className={`text-lg font-semibold mt-3 ${
                activeMode === "A.I." ? "color-[#007AFF]" : "color-white"
              }`}>
                Noisy Mode
              </Text>
              <Text className="color-gray-500 text-xs mt-1">Max clarity</Text>
            </Pressable>

            <Pressable
              className={`w-[48%] mb-3 rounded-xl p-5 items-center border-2 ${
                activeMode === "Custom" 
                  ? "border-[#007AFF] bg-[#1C3D5A]" 
                  : "border-[#2C2C2E] bg-[#1C1C1E]"
              } active:opacity-70`}
              onPress={() => setActiveMode("Custom")}
            >
              <Ionicons 
                name="settings" 
                size={32} 
                color={activeMode === "Custom" ? "#007AFF" : "#666"} 
              />
              <Text className={`text-lg font-semibold mt-3 ${
                activeMode === "Custom" ? "color-[#007AFF]" : "color-white"
              }`}>
                Custom
              </Text>
              <Text className="color-gray-500 text-xs mt-1">Your choice</Text>
            </Pressable>
          </View>

          {/* Stereo Slider */}
          <View className="bg-[#1C1C1E] rounded-xl p-5 mb-24">
            <Text className="color-white text-center text-lg font-semibold mb-3">
              Stereo Adjustment: {valueOne.toFixed(0)}dB
            </Text>
            <Slider
              minimumValue={-10}
              maximumValue={10}
              value={valueOne}
              onValueChange={setValueOne}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#3A3A3C"
              thumbTintColor="#FFF"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}