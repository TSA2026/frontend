import Slider from "@react-native-community/slider";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useAudioEngine } from "../../hooks/useAudioEngine";

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
  } = useAudioEngine();

  const [activeMode, setActiveMode] = useState("Conversation");
  const [deviceConnected, setDeviceConnected] = useState(false); // I feel like the backend should check whether this is true or false, instead of it being defined here
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
    <ScrollView className="bg-black">
      {/* Error Display */}
      {error && (
        <View className="bg-red-900 p-4 m-4 rounded-lg">
          <Text className="color-white font-semibold">Error: {error}</Text>
        </View>
      )}
      {/* Placeholder View for adjusting placement */}
      <View className="justify-center items-center w-screen mt-[9em] mr-5">
        {/* This marks the Bluetooth Section (WORK IN PROGRESS) */}
        <View className="w-[18em] h-[6em] rounded-lg justify-center items-center border-white border-[0.25px] mb-4">
          <Text className="font-bold color-white mb-2">
            {isRunning ? "Engine Running" : "Engine Stopped"}
          </Text>

          {isRunning && !isCalibrated && (
            <View className="flex-row items-center">
              <ActivityIndicator size="small" color="#3b82f6" />
              <Text className="color-gray-400 ml-2">Calibrating...</Text>
            </View>
          )}

          {isRunning && isCalibrated && (
            <Text className="color-green-400">Calibrated</Text>
          )}

          <Pressable
            className={`font-bold rounded-full ${isRunning ? "bg-red-500" : "bg-blue-500"} px-6 py-2 mt-2`}
            onPress={isRunning ? stop : start}
          >
            <Text className="color-white font-semibold">
              {isRunning ? "Stop" : "Start"}
            </Text>
          </Pressable>
        </View>

        {/* Telemetry */}
        {telemetry && (
          <View className="w-[18em] rounded-lg justify-center p-4 border-white border-[0.25px] mb-4">
            <Text className="color-white font-semibold mb-2">Live Stats:</Text>
            <Text className="color-gray-400 text-sm">
              SNR: {telemetry.snrDb.toFixed(1)}db
            </Text>
            <Text className="color-gray-400 text-sm">
              Speech: {(telemetry.speechActive * 100).toFixed(0)}%
            </Text>
            <Text className="color-gray-400 text-sm">
              AGC Gain: {telemetry.avgAgcGain.toFixed(2)}x
            </Text>
          </View>
        )}

        {/* Bluetooth Section */}
        <View className="w-[18em] h-[6em] rounded-lg justify-center items-center border-white border-[0.25px] ">
          <Text className="font-bold color-white">
            {deviceConnected ? "Device Paired" : "No device found"}
          </Text>
          <Text
            className="font-bold rounded-full bg-blue-500 color-white"
            onPress={() => setDeviceConnected(true)}
          >
            {deviceConnected ? "Connected" : "Pair Device?"}
          </Text>
        </View>

        {/* This marks the Mode Selection Section */}
        <View className="w-[30em]">
          <View className="mt-[4.5em] items-center">
            <Text className="color-gray-500 opacity-[70%] font-semibold text-2xl">
              Selected Mode
            </Text>
            <Text className="color-white text-4xl mt-[0.25em] font-bold">
              {activeMode}
            </Text>
            <Text className="color-gray-400 text-sm mt-1">
              (Engine: {currentMode})
            </Text>
          </View>
          {/* Mode Buttons */}
          <View className="mt-3 ml-5 items-center w-full flex flex-row flex-wrap p-4">
            <Pressable
              className={`border-2 ${activeMode === "Conversation" ? "border-blue-500" : "border-gray-600"} p-[2em] w-[12.5em] h-[6em] items-center active:opacity-75`}
              onPress={() => handleModeChange("Conversation")}
            >
              <Text className="color-white text-center font-semibold">
                Conversation
              </Text>
              <Text className="color-gray-500 text-xs font-semibold">
                Have a chat
              </Text>
            </Pressable>

            <Pressable
              className={`ml-2 border-2 ${activeMode === "Noise Reduction" ? "border-blue-500" : "border-gray-600"} p-[2em] w-[12.5em] h-[6em] items-center active:opacity-75`}
              onPress={() => handleModeChange("Noise Reduction")}
            >
              <Text className="color-white text-center font-semibold">
                Noise Reduction
              </Text>
              <Text className="color-gray-500 text-xs font-semibold">
                Bring the silence
              </Text>
            </Pressable>

            <Pressable
              className={`mt-4 border-2 ${activeMode === "A.I." ? "border-blue-500" : "border-gray-600"} p-[2em] w-[12.5em] h-[6em] items-center active:opacity-75`}
              onPress={() => handleModeChange("A.I.")}
            >
              <Text className="color-white text-center font-semibold">
                A.I.
              </Text>
              <Text className="color-gray-500 text-xs font-semibold">
                Does the work
              </Text>
            </Pressable>

            <Pressable
              className={`ml-2 border-2 ${activeMode === "Custom" ? "border-blue-500" : "border-gray-600"} p-[2em] w-[12.5em] h-[6em] items-center active:opacity-75`}
              onPress={() => setActiveMode("Custom")}
            >
              <Text className="color-white text-center font-semibold">
                Custom
              </Text>
              <Text className="color-gray-500 text-xs font-semibold">
                It's your choice
              </Text>
            </Pressable>
          </View>
        </View>
        
        {/* This marks the Sliders for the Mode (Easily interchangable) */}
        <View className="mt-[3em] w-4/5">
          <Text className="color-white text-center font-semibold">
            Stereo: {valueOne.toFixed(0)}dB
          </Text>
          <Slider
            minimumValue={-10}
            maximumValue={10}
            value={valueOne}
            onValueChange={setValueOne}
            minimumTrackTintColor="#91fbff"
            maximumTrackTintColor="#d3d3d3"
          ></Slider>
        </View>
      </View>
    </ScrollView>
  );
}
