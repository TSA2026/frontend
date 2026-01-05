import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const profile = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isPressed, setIsPressed] = useState(false)

  // if the user is logged in, it will go this route
  if (loggedIn) {
    return (
      <View className="bg-black flex-1 justify-center items-center">
        <Text className="color-white twxt-3xl">
          Yea it wasn't exactly working
        </Text>
      </View>
    )
  }

  // otherwise it will go this route
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <View className="w-[14em] h-[22em] rounded-lg py-2 items-center">
        <Text className="color-white text-1xl font-semibold pb-2">To Access Settings...</Text>
        <View className="w-full py-2">
          <TextInput className="color-black w-full min-h-8 bg-white rounded-lg mb-1" value={emailValue} onChangeText={setEmailValue} placeholder="Email"/>
          <TextInput className="color-black w-full min-h-8 bg-white rounded-lg" value={passwordValue} onChangeText={setPasswordValue} placeholder="Password"/>
        </View>
        <Pressable
          onPress={() => {console.log("You're in"); setLoggedIn(true);}}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          className={`bg-[#007AFF] py-4 px-10 rounded-xl items-center w-4/5 mt-6 ${
            isPressed ? 'opacity-80' : 'opacity-100'
          }`}
        >
          {/* This Text underneath must validate that the emailValue and passwordValue are within the database, otherwise prompt an error to the user stating the info is incorrect */}
          <Text className="color-white text-lg font-bold">Log In</Text>
        </Pressable>
        <View className="items-center">
        <Text className="color-white w-full font-semibold mt-2">Don't have an account?</Text>
        {/* This Text underneath must lead to a account creation page, which will then input the email and password (AFTER ENCRYPTION) into the database */}
        <Text className="color-blue-500 w-full font-semibold" onPress={() => {console.log("Signing up...")}}>Sign up!</Text>
        </View>
      </View>
    </View>
  );
};

export default profile;
