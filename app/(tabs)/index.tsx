import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {

  const [value, setValue] = useState(50);

  return (
    <View className="items-center flex-1 bg-black">
        <View className="w-[22em] h-[16em] bg-[#0f0D23] mb-[12em] mt-[6em] rounded-full justify-center items-center">
          <Text className="color-white font-bold text-2xl">Bluetooth holder</Text>
        </View>
        <View className="w-[22rem] h-[2.5em] bg-[#0f0D23] rounded-full mb-[1em] flex-row items-center justify-center">
          <Text className="color-white font-bold">
            Mode 1
          </Text>
          <Text className="color-white font-bold ml-12">
            Mode 2
          </Text>
        </View>
        <View className="w-full px-5">
          <Text className="color-white text-lg text-center mb-5">
            Value: {value.toFixed(0)}
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={value}
            onValueChange={setValue}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1fb28a"
          />
        </View>
    </View>
  );
}
