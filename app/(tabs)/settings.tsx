import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

export default function profile() {
  return (
    <ScrollView className='bg-black'>
      <Text className="text-2xl font-extrabold color-gray-700 mt-[2.75em]">
        Settings
      </Text>
      {/* List of Setting buttons (Pressables) */}
      <View className='mt-5'>
        <Pressable className="flex-row justify-between pt-4 pb-4 border-b-[1px] border-gray-900 items-center" onPress={() => console.log("Account Pressed")}>
          <Text className="color-white text-2xl font-semibold">Account</Text>
          <Text className="color-white ">{'>'}</Text>
        </Pressable>
        <Pressable className="flex-row justify-between pt-4 pb-4 border-b-[1px] border-gray-900 items-center" onPress={() => console.log("Custom Pressed")}>
          <Text className="color-white text-2xl font-semibold">Custom Modes</Text>
          <Text className="color-white ">{'>'}</Text>
        </Pressable>
        <Pressable className="flex-row justify-between pt-4 pb-4 border-b-[1px] border-gray-900 items-center" onPress={() => console.log("Accessibility Pressed")}>
          <Text className="color-white text-2xl font-semibold">Accessibility</Text>
          <Text className="color-white">{'>'}</Text>
        </Pressable>
        <Pressable className="flex-row justify-between pt-4 pb-4 border-b-[1px] border-gray-900 items-center" onPress={() => console.log("About Pressed")}>
          <Text className="color-white text-2xl font-semibold">About</Text>
          <Text className="color-white">{'>'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}