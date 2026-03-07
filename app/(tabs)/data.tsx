// frontend/app/(tabs)/data.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAudioEngineContext } from '@/context/AudioEngineContext';

const { width } = Dimensions.get('window');

export default function DataScreen() {
  const { telemetry, isRunning } = useAudioEngineContext();
  const [history, setHistory] = useState<any[]>([]);
  const [maxHistory, setMaxHistory] = useState(50);

  useEffect(() => {
    if (telemetry && isRunning) {
      setHistory(prev => {
        const updated = [...prev, {
          timestamp: Date.now(),
          ...telemetry,
        }];
        return updated.slice(-maxHistory);
      });
    }
  }, [telemetry]);

  const clearHistory = () => {
    setHistory([]);
  };

  const getAverages = () => {
    if (history.length === 0) return null;
    
    const sum = history.reduce((acc, item) => ({
      snrDb: acc.snrDb + item.snrDb,
      speechActive: acc.speechActive + item.speechActive,
      avgAgcGain: acc.avgAgcGain + item.avgAgcGain,
    }), { snrDb: 0, speechActive: 0, avgAgcGain: 0 });

    return {
      snrDb: sum.snrDb / history.length,
      speechActive: sum.speechActive / history.length,
      avgAgcGain: sum.avgAgcGain / history.length,
    };
  };

  const averages = getAverages();

  const StatCard = ({ icon, label, value, unit, color }: any) => (
    <View className="bg-[#1C1C1E] rounded-xl p-4 mb-3">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <Ionicons name={icon} size={20} color={color} />
          <Text className="color-gray-400 text-sm">{label}</Text>
        </View>
        <Text style={{ color }} className="text-xs font-semibold">
          {unit}
        </Text>
      </View>
      <Text className="color-white text-3xl font-bold">{value}</Text>
    </View>
  );

  const SimpleMiniChart = ({ data, color }: { data: number[], color: string }) => {
    if (data.length === 0) return null;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <View className="flex-row items-end h-16 gap-1">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 60;
          return (
            <View
              key={index}
              style={{
                height: Math.max(height, 2),
                width: (width - 80) / data.length,
                backgroundColor: color,
                borderRadius: 2,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1 bg-black">
        <View className="px-5 pt-5">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-3xl font-bold color-white mb-1">
                Telemetry Data
              </Text>
              <Text className="color-gray-400 text-sm">
                {history.length} samples collected
              </Text>
            </View>
            {history.length > 0 && (
              <Pressable
                onPress={clearHistory}
                className="bg-[#2C2C2E] rounded-lg px-4 py-2 active:opacity-70"
              >
                <Text className="color-[#FF3B30] font-semibold">Clear</Text>
              </Pressable>
            )}
          </View>

          {!isRunning && (
            <View className="bg-[#1C1C1E] rounded-xl p-6 items-center mb-4">
              <Ionicons name="pause-circle-outline" size={48} color="#666" />
              <Text className="color-white text-lg font-semibold mt-3 mb-1">
                Engine Stopped
              </Text>
              <Text className="color-gray-400 text-sm text-center">
                Start the audio engine to collect telemetry data
              </Text>
            </View>
          )}

          {/* Current Stats */}
          {telemetry && (
            <>
              <Text className="color-white text-xl font-bold mb-3">
                Current Values
              </Text>

              <StatCard
                icon="analytics"
                label="Signal-to-Noise Ratio"
                value={telemetry.snrDb.toFixed(1)}
                unit="dB"
                color="#34C759"
              />

              <StatCard
                icon="mic"
                label="Speech Activity"
                value={`${(telemetry.speechActive * 100).toFixed(0)}%`}
                unit="%"
                color="#007AFF"
              />

              <StatCard
                icon="volume-high"
                label="AGC Gain"
                value={telemetry.avgAgcGain.toFixed(2)}
                unit="x"
                color="#FF9500"
              />
            </>
          )}

          {/* Averages */}
          {averages && (
            <>
              <Text className="color-white text-xl font-bold mt-6 mb-3">
                Session Averages
              </Text>

              <View className="bg-[#1C1C1E] rounded-xl p-4 mb-3">
                <View className="flex-row justify-between mb-3">
                  <Text className="color-gray-400">Avg SNR</Text>
                  <Text className="color-white font-semibold">
                    {averages.snrDb.toFixed(1)} dB
                  </Text>
                </View>
                <View className="flex-row justify-between mb-3">
                  <Text className="color-gray-400">Avg Speech</Text>
                  <Text className="color-white font-semibold">
                    {(averages.speechActive * 100).toFixed(0)}%
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="color-gray-400">Avg Gain</Text>
                  <Text className="color-white font-semibold">
                    {averages.avgAgcGain.toFixed(2)}x
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* Mini Charts */}
          {history.length > 5 && (
            <>
              <Text className="color-white text-xl font-bold mt-6 mb-3">
                History
              </Text>

              <View className="bg-[#1C1C1E] rounded-xl p-4 mb-3">
                <Text className="color-gray-400 text-sm mb-2">SNR (dB)</Text>
                <SimpleMiniChart
                  data={history.map(h => h.snrDb)}
                  color="#34C759"
                />
              </View>

              <View className="bg-[#1C1C1E] rounded-xl p-4 mb-3">
                <Text className="color-gray-400 text-sm mb-2">
                  Speech Activity
                </Text>
                <SimpleMiniChart
                  data={history.map(h => h.speechActive * 100)}
                  color="#007AFF"
                />
              </View>

              <View className="bg-[#1C1C1E] rounded-xl p-4 mb-3">
                <Text className="color-gray-400 text-sm mb-2">AGC Gain</Text>
                <SimpleMiniChart
                  data={history.map(h => h.avgAgcGain)}
                  color="#FF9500"
                />
              </View>
            </>
          )}

          {/* Band Gains */}
          {telemetry?.bandGains && (
            <>
              <Text className="color-white text-xl font-bold mt-6 mb-3">
                Band Gains
              </Text>
              <View className="bg-[#1C1C1E] rounded-xl p-4 mb-24">
                {['Low', 'LowMid', 'Speech', 'HighMid', 'High', 'Air'].map(
                  (band, index) => (
                    <View key={band} className="flex-row justify-between py-2 border-b border-[#2C2C2E]">
                      <Text className="color-gray-400">{band}</Text>
                      <Text className="color-white font-semibold">
                        {telemetry.bandGains[index]?.toFixed(2) || '0.00'}x
                      </Text>
                    </View>
                  )
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}