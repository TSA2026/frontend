import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const test_home = () => {

    const [activeMode, setActiveMode] = useState("Conversation")
    const [deviceConnected, setDeviceConnected] = useState(false); // I feel like the backend should check whether this is true or false, instead of it being defined here
    

  return (
    <ScrollView className="bg-black">
        {/* Placeholder View for adjusting placement */}
        <View className='justify-center items-center w-screen  mt-[9em] mr-5'>
            {/* Bluetooth View (WORK IN PROGRESS) */}
            <View className='w-[18em] h-[6em] rounded-lg justify-center items-center border-white border-[0.25px] '>
                <Text className='font-bold color-white'>
                    {deviceConnected ? 'Device Paired' : 'Pair a device?'}
                </Text>
                <Text className='font-semibold color-blue-400' onPress={() => setDeviceConnected(true)}>
                    {deviceConnected ? "Connected" : "Pair?"}
                </Text>
            </View>
            {/* This marks the Mode Selection Section */}
            <View className='w-[18em]'> 
                <View className='mt-[4.5em] items-center'>
                    <Text className='color-gray-500 opacity-[70%] font-semibold text-2xl'>
                        Selected Mode
                    </Text>
                    <Text className='color-white text-4xl mt-[0.25em] font-bold'>
                        {activeMode}
                    </Text>
                </View>
                <View className='flex-row h-[10em] w-[18.5em] justify-center items-center mt-3'>
                    {/* Conversation button */}
                    <View className='w-[12em] h-[6em] border-2 border-gray-600 rounded-lg items-center p-[2em] hover:bg-gray-700'>
                        <Text className='color-white opacity-70' onPress={() => setActiveMode("Conversation")}>
                            Conversation
                        </Text>
                        <Text className='color-gray-500 text-xs'>Have a chat</Text>
                    </View>
                    {/* Noise Reduction button */}
                    <View className='w-[12em] h-[6em] border-2 border-gray-600 rounded-lg items-center p-[2em] ml-6 focus:bg-blue-400'>
                        <Text className='color-white opacity-70' onPress={() => setActiveMode("Noise Reduction")}>
                            Noise Reduction
                        </Text>
                        <Text className='color-gray-500 text-xs'>
                            Bring the silence
                        </Text>
                    </View>
                </View>
            </View>
        </View>
        
    </ScrollView>


  )
}


export default test_home