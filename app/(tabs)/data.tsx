import React from "react";
import { ScrollView, Text, View } from "react-native";

const Data = () => {
  return (
    <ScrollView className="bg-black">
      {/* Title (can be removed) */}
      <Text className="text-4xl color-white font-extrabold mt-[1.5em]">
        Logistics
      </Text>
      {/* The Views underneath are used for showing data */}
    <View className="bg-[##141414] w-11/12 rounded-lg h-[12em] mt-[3em] ">
      <Text className="color-violet-300">
        Placeholder
      </Text>
    </View>
    <View className="bg-[##141414] w-11/12 rounded-lg h-[12em] mt-[1em] ">
      <Text className="color-violet-300">
        Placeholder
      </Text>
    </View>
    <View className="bg-[##141414] w-11/12 rounded-lg h-[12em] mt-[1em] ">
      <Text className="color-violet-300">
        Placeholder
      </Text>
    </View>
    </ScrollView>
  );
};

export default Data;
