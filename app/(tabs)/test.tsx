import { AudioEngine } from '../../services/AudioEngineNative';
import { Button, Text, View } from 'react-native';
import { useState } from 'react';

export default function TestScreen() {
  const [running, setRunning] = useState(false);
  const [telemetry, setTelemetry] = useState<any>(null);

  const start = async () => {
    await AudioEngine.start();
    setRunning(true);
    
    // Poll telemetry every second
    const interval = setInterval(async () => {
      const data = await AudioEngine.getTelemetry();
      setTelemetry(data);
    }, 1000);
  };

  const stop = async () => {
    await AudioEngine.stop();
    setRunning(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button 
        title={running ? "Stop" : "Start"} 
        onPress={running ? stop : start} 
      />
      
      {telemetry && (
        <Text style={{ marginTop: 20 }}>
          SNR: {telemetry.snrDb.toFixed(1)}dB{'\n'}
          Speech: {(telemetry.speechActive * 100).toFixed(0)}%{'\n'}
          AGC Gain: {telemetry.avgAgcGain.toFixed(2)}x
        </Text>
      )}
    </View>
  );
}