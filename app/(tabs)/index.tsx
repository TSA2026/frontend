import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";


export default function Index() {

  const [activeMode, setActiveMode] = useState("Conversation");
  const [deviceConnected, setDeviceConnected] = useState(false); // I feel like the backend should check whether this is true or false, instead of it being defined here
  const [valueOne, setValueOne] = useState(1);
      
  
  return (
    <ScrollView className="bg-black">
      {/* Placeholder View for adjusting placement */}
        <View className='justify-center items-center w-screen  mt-[9em] mr-5'>
          {/* This marks the Bluetooth Section (WORK IN PROGRESS) */}
          <View className='w-[25em] h-[7em] rounded-lg justify-center items-center border-[#292828] border-[0.75px] bg-[#111010] '>
              <Text className='font-bold color-white'>
                  {deviceConnected ? 'Device Paired' : 'No device found'}
              </Text>
              <Text className='font-bold rounded-full  color-[#85FF00]' onPress={() => setDeviceConnected(true)}>
                  {deviceConnected ? "Connected" : "Pair Device?"}
              </Text>
          </View>
          {/* This marks the Mode Selection Section */}
            <View className='w-[30em]'> 
              <View className='mt-[4.5em] items-center'>
                  <Text className='color-gray-500 opacity-[70%] font-semibold text-2xl'>
                      Selected Mode
                  </Text>
                  <Text className='color-white text-4xl mt-[0.25em] font-bold'>
                      {activeMode}
                  </Text>
              </View>
              {/* Mode Buttons */}
              <View className="mt-3 ml-5 items-center w-full flex flex-row flex-wrap p-4">
              <Pressable
                className={`${activeMode === 'Conversation' ? 'bg-[#111010] border-[#7C3AED]' : 'bg-[#111010] border-[#191919]'} rounded-xl border-2 p-[2em] w-[12.5em] h-[6em]  active:opacity-75`}
                style={activeMode === 'Conversation' ? { elevation: 10, shadowColor: '#7C3AED', shadowOpacity: 0.5, shadowRadius: 10 } : {}}
                onPress={() => setActiveMode("Conversation")}
                    >

                    <Text className="color-white text-left font-semibold ">
                        Conversation
                    </Text>
                    <Text className="color-gray-500 text-xs font-semibold">
                        Have a chat
                    </Text>
                </Pressable>
                
                
                
                <Pressable 
               className={`${activeMode === 'Noise Reduction' ? 'bg-[#111010] border-[#7C3AED]' : 'bg-[#111010] border-[#191919]'} rounded-xl border-2 p-[2em] w-[12.5em] h-[6em]  ml-2 active:opacity-75`}
               style={activeMode === 'Noise Reduction' ? { elevation: 10, shadowColor: '#7C3AED', shadowOpacity: 0.5, shadowRadius: 10 } : {}}
               onPress={() => setActiveMode("Noise Reduction")}
                   >

                    <Text className="color-white text-left font-semibold">
                        Noise Reduction
                    </Text>
                    <Text className="color-gray-500 text-xs font-semibold">
                        Bring the silence
                    </Text>
                </Pressable>
                <Pressable 
                    className= {`${activeMode === 'A.I.' ? 'bg-[#111010] border-[#7C3AED]' : 'bg-[#111010] border-[#191919]'} rounded-xl border-2 p-[2em] w-[12.5em] h-[6em]  mt-2 active:opacity-75`}
                        style={activeMode === 'A.I.' ? { elevation: 10, shadowColor: '#7C3AED', shadowOpacity: 0.5, shadowRadius: 10 } : {}}
                            onPress={() => setActiveMode("A.I.")}
                    >
                    <Text className="color-white text-left font-semibold">
                        A.I.
                    </Text>
                    <Text className="color-gray-500 text-xs font-semibold">
                        Does the work
                    </Text>
                </Pressable>
                
                
                <Pressable 
                
                className={`${activeMode === 'Custom' ? 'bg-[#111010] border-[#7C3AED]' : 'bg-[#111010] border-[#191919]'} rounded-xl border-2 p-[2em] w-[12.5em] h-[6em] ml-2 active:opacity-75`}
                style={activeMode === 'Custom' ? { elevation: 10, shadowColor: '#7C3AED', shadowOpacity: 0.5, shadowRadius: 10 } : {}}
                onPress={() => setActiveMode("Custom")}
                >
                    <Text className="color-white text-left font-semibold">
                        Custom
                    </Text>
                    <Text className="color-gray-500 text-left text-xs font-semibold">
                        It's your choice
                    </Text>
                </Pressable>
              </View>
            </View>
            {/* This marks the Sliders for the Mode (Easily interchangable) */}
            <View className="mt-[3em] w-4/5">
                <Text className="color-white text-center font-semibold">
                    Stereo: {valueOne.toFixed(0)}dB
                </Text>
                <Slider
                minimumValue={-10}
                maximumValue={10}
                value={valueOne}
                onValueChange={setValueOne}
                minimumTrackTintColor="#7C3AED"
                maximumTrackTintColor="#333333"
                >
                </Slider>
            </View>
        </View>  
    </ScrollView>
  )
}
