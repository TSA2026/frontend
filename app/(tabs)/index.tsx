import Slider from "@react-native-community/slider";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="justify-center items-center flex-1 bg-black">
        <View className="w-[22em] h-[16em] bg-[#0f0D23] mb-[12em] rounded-full justify-center items-center">
          <Text className="color-white font-bold text-2xl">Bluetooth holder</Text>
        </View>
        <View className="w-[22rem] h-[2.5em] bg-[#0f0D23] rounded-full mb-[16em] flex-row items-center justify-center">
          <Text className="color-white font-bold">
            Mode 1
          </Text>
          <Text className="color-white font-bold ml-12">
            Mode 2
          </Text>
        </View>
        <View className="justify-center items-center flex-1">
          <Slider className="w-[16em]" minimumValue={0} maximumValue={1} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000"/>
        </View>
    </View>
  );
}
