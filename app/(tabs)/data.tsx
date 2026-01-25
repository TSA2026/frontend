import React from "react";
import { ScrollView, Text, View } from "react-native";

const Data = () => {
  return (
    <ScrollView className="bg-black">
      {/* Title (can be removed) */}
      <Text className="text-2xl font-extrabold color-gray-700 mt-[2.75em] opacity-55">
        Logistics
      </Text>
      {/* The Views underneath are used for showing data */}
    <View className="w-11/12 rounded-lg h-[12em] mt-[3em] border-2 border-gray-600 justify-center">
      <Text className="color-violet-300 text-center">
        Real Time Log
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
