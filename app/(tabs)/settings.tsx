import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

export default function profile() {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [pressedItem, setPressedItem] = useState<string | null>(null);
  const [accessibilityModalVisible, setAccessibilityModalVisible] = useState(false);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [accountModalVisible, setAccountModalVisible] = useState(false);


  return (
    <ScrollView className='bg-black '>
      <Text className="text-2xl ml-5 font-extrabold color-[#85FF00] mt-[4.5em] ">
        Settings
      </Text>
      {/* List of Setting buttons (Pressables) */}

    <View className="ml-5 mr-5">
      <View className='mt-5'>
        <Pressable 
        className="flex-row justify-between pt-4 pb-4 items-center"
        style={{ borderBottomWidth: 1, 
          borderBottomColor: pressedItem === 'Account' ? '#7C3AED' : '#262626'}} 
        onPressIn={() => setPressedItem('Account')}
       onPressOut={() => setPressedItem(null)}
        onPress={() => {console.log("Account Pressed")
          setAccountModalVisible(true);}}>

          <Text className="color-white text-2xl font-semibold">Account</Text>
          <Text className="color-white ">{'>'}</Text>
        </Pressable>
        
        
        <Pressable 
        className="flex-row justify-between pt-4 pb-4 items-center"
        style={{ borderBottomWidth: 1, 
          borderBottomColor: pressedItem === 'Custom' ? '#7C3AED' : '#262626'}} 
          onPressIn={() => setPressedItem('Custom')}
          onPressOut={() => setPressedItem(null)}
          onPress={() => {console.log("Custom Pressed")
            setAccessibilityModalVisible(true);}}>

          <Text className="color-white text-2xl font-semibold">Custom Modes</Text>
          <Text className="color-white ">{'>'}</Text>
        </Pressable>
        
        
        <Pressable
          className="flex-row justify-between pt-4 pb-4 items-center"
          style={{ borderBottomWidth: 1, borderBottomColor: pressedItem === 'Accessibility' ? '#7C3AED' : '#262626' }}
          onPressIn={() => setPressedItem('Accessibility')}
          onPressOut={() => setPressedItem(null)}
          onPress={() => {console.log("Accessibility Pressed");setAccessibilityModalVisible(true);}}
            >
            <Text className="color-white text-2xl font-semibold">Accessibility</Text>
            <Text className="color-white">{'>'}</Text>
        </Pressable>
      
        
        <Pressable 
        
        className="flex-row justify-between pt-4 pb-4 items-center"
        style={{ borderBottomWidth: 1, 
          borderBottomColor: pressedItem === 'About' ? '#7C3AED' : '#262626'}} 
          onPressIn={() => setPressedItem('About')}
          onPressOut={() => setPressedItem(null)}
          onPress={() => {console.log("About Pressed"); setAboutModalVisible(true);}}>
          <Text className="color-white text-2xl font-semibold">About</Text>
          <Text className="color-white">{'>'}</Text>
        </Pressable>
      </View>
    </View>
      
    <Modal
         animationType='slide' 
        transparent={true} 
        visible={accountModalVisible} 
        onRequestClose={() => {setAccountModalVisible(false)}}>
          
        <View className="flex-1 justify-center items-center mt-[8em] "
        style={{ pointerEvents: 'box-none' }}>
          <View className='rounded-lg w-[15em] h-[12em] bg-black'>
            <Text className="color-white p-2">
              This is a software that automatically adjust audio dependent on the selected mode. Lots of fine tuning had gone into this.
            </Text>
            <Pressable onPress={() => {setAccountModalVisible(false)}}>
              <Text className='color-[#85FF00] text-center'>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>



      <Modal animationType='slide' transparent={true} visible={aboutModalVisible} onRequestClose={() => {setAboutModalVisible(!aboutModalVisible)}}>
        <View className="flex-1 justify-center items-center mt-[8em]">
          <View className='rounded-lg w-[15em] h-[12em] bg-black'>
            <Text className="color-white p-2">
              This is a software that automatically adjust audio dependent on the selected mode. Lots of fine tuning had gone into this.
            </Text>
            <Pressable onPress={() => {setAboutModalVisible(!aboutModalVisible)}}>
              <Text className='color-[#85FF00] text-center'>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>



      <Modal
         animationType='slide' 
        transparent={true} 
        visible={customModalVisible} 
        onRequestClose={() => {setCustomModalVisible(false)}}>
          
        <View className="flex-1 justify-center items-center mt-[8em] "
        style={{ pointerEvents: 'box-none' }}>
          <View className='rounded-lg w-[25em] h-[40em] bg-black'>
            <Text className="color-white p-2">
              This is a software that automatically adjust audio dependent on the selected mode. Lots of fine tuning had gone into this.
            </Text>
            <Pressable onPress={() => {setCustomModalVisible(false)}}>
              <Text className='color-[#85FF00] text-center'>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
 



      <Modal
         animationType='slide' 
        transparent={true} 
        visible={accessibilityModalVisible} 
        onRequestClose={() => {setAccessibilityModalVisible(false)}}>
          
        <View className="flex-1 justify-center items-center mt-[8em] "
        style={{ pointerEvents: 'box-none' }}>
          <View className='rounded-lg w-[15em] h-[12em] bg-black'>
            <Text className="color-white p-2">
              This is a software that automatically adjust audio dependent on the selected mode. Lots of fine tuning had gone into this.
            </Text>
            <Pressable onPress={() => {setAccessibilityModalVisible(false)}}>
              <Text className='color-[#85FF00] text-center'>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
 
    </ScrollView>
  )
}