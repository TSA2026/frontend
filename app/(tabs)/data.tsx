import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useAudioEngine } from "../../hooks/useAudioEngine";

const Data = () => {
  const { telemetry, isCalibrated, isRunning } = useAudioEngine();

  return (
    <ScrollView className="bg-black">
      <Text className="text-2xl font-extrabold color-gray-700 mt-[2.75em] opacity-55 ">
        Telemetry
      </Text>

      <View className="w-11/12 rounded-lg p-4 mt-[3em] border-2 border-gray-600">
        <Text className="color-violet-300 text-xl font-bold mb-3">
          System Status
        </Text>
        <Text className="color-white mb-1">
          Engine: {isRunning ? 'Running' : 'Stopped'}
        </Text>
        <Text className="color-white mb-1 ">
          Calibrated: {isCalibrated ? 'Yes' : 'No'}
        </Text>
      </View>

      {telemetry && (
        <>
          <View className="w-11/12 rounded-lg p-4 mt-[1em] border-2 border-gray-600">
            <Text className="color-violet-300 text-xl font-bold mb-3">
              Speech Detection
            </Text>
            <Text className="color-white mb-1">
              SNR: {telemetry.snrDb.toFixed(1)}dB
            </Text>
            <Text className="color-white mb-1">
              Speech Active: {(telemetry.speechActive * 100).toFixed(0)}%
            </Text>
            <Text className="color-white mb-1">
              Speech Onset: {telemetry.speechOnset ? 'Yes' : 'No'}
            </Text>
            <Text className="color-white">
              Silence Frame: {telemetry.silenceFrames}
            </Text>
          </View>

          <View className="w-11/12 rounded-lg p-4 mt-[1em] border-2 border-gray-600">
            <Text className="color-violet-300 text-xl font-bold mb-3">
              AGC (Auto Gain Control)
            </Text>
            <Text className="color-white mb-1">
              Average Gain: {telemetry.avgAgcGain.toFixed(2)}x
            </Text>
            <Text className="color-white mb-1">
              Peak Reduction: {telemetry.peakReduction.toFixed(2)}x
            </Text>
            {telemetry.bandGains.map((gain, i) => (
              <Text key={i} className="color-gray-400 text-sm">
                Band (i + 1): {gain.toFixed(2)}x
              </Text>
            ))}
          </View>
        </>
      )}

      {!telemetry && (
        <View className="w-11/12 rounded-lg p-4 mt-[1em] border-2 border-gray-600 justify-center items-center h-[12em]">
          <Text className="color-gray-500 text-center">
            Start the engine to see live data
          </Text>
        </View>
      )}

      <View className="h-20" />
    </ScrollView>
  )
};

export default Data;