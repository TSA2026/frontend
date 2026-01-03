import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function potato() {
  const [value, setValue] = useState(50);
  const [showSlider, setShowSlider] = useState(true);

  return (
    <View style={{ padding: 20, backgroundColor: "black"}}>
      <Button 
        title={showSlider ? "Hide Slider" : "Show Slider"}
        onPress={() => setShowSlider(!showSlider)}
      />

      {showSlider && (
        <View className="bg-black">
          <Text>Value: {value.toFixed(0)}</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={100}
            value={value}
            onValueChange={setValue}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1fb28a"
          />
        </View>
      )}
      <Text className="color-white">potato</Text>
    </View>
  );
}