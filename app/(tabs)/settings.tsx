import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

export default function profile() {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  return (
    <ScrollView className='bg-black'>
      <Text className="text-2xl font-extrabold color-gray-700 mt-[2.75em] opacity-55">
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
        <Pressable className="flex-row justify-between pt-4 pb-4 border-b-[1px] border-gray-900 items-center" onPress={() => {console.log("About Pressed"); setAboutModalVisible(true);}}>
          <Text className="color-white text-2xl font-semibold">About</Text>
          <Text className="color-white">{'>'}</Text>
        </Pressable>
      </View>
      <Modal animationType='slide' transparent={true} visible={aboutModalVisible} onRequestClose={() => {setAboutModalVisible(!aboutModalVisible)}}>
        <View className="flex-1 justify-center items-center mt-[8em]">
          <View className='rounded-lg w-[15em] h-[12em] bg-black'>
            <Text className="color-white p-2">
              This is a software that automatically adjust audio dependent on the selected mode. Lots of fine tuning had gone into this.
            </Text>
            <Pressable className='bg-blue-400 rounded-full' onPress={() => {setAboutModalVisible(!aboutModalVisible)}}>
              <Text className='color-white text-center'>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}