import React, { useState } from "react";
import { Text, View } from "react-native";

const profile = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <View className="w-[12em] h-[8em] justify-center items-center bg-[#0f0D23] rounded-full">
        <Text className="color-white bg-blue-950" onPress={() => {console.log("Tried to make an account");}}>Create Account</Text>
        <Text className="mt-2 color-white bg-blue-950" onPress={() => {console.log("Tried to log in");}}>Log In</Text>
      </View>
    </View>
  );
};

export default profile;
