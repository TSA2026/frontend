import React from "react";
import { Text, View } from "react-native";

const profile = () => {
  return (
    <View className="flex-1  bg-black ">


      <View className="mt-20">
        <Text className="font-bold text-5xl items-end color-white mt-10">Settings</Text>
      </View>
        
        {/*
          <View className=" w-[65vh] h-[75vh] bg-[#191818] rounded-md ">
        */}
          <View className=" flex items-center justify-center w-30em h-30em -top-20 space-between">
            <View className="flex flex-row  justify-center-safe relative ">
              <Text className=" text-white">Account Center</Text>
              <Text className=" text-white"> Bluetooth</Text>
            </View>
            <View className="flex flex-row justify-between center relative ">
              <Text className= "text-white">Modes</Text>
              <Text className="text-white"> Voices</Text>
            </View>
          </View>
      
      
      
      </View>
  
 
  );
};

export default profile;
