import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

<<<<<<< Updated upstream
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
            setCustomModalVisible(true);}}>

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

    <Modal
        animationType='slide' 
        transparent={true} 
        visible={customModalVisible} 
        onRequestClose={() => {setCustomModalVisible(false)}}>
 
        <View className="flex-1 justify-center items-center mt-[6em] "
            style={{ pointerEvents: 'box-none' }}>
          <View className="w-[28em] h-[45em] bg-[#0e0e0e] border-[#191919]' border-2 rounded-lg mb-10">
         
        <Pressable onPress={() => {setCustomModalVisible(false)}}>
            <Text className='color-[#85FF00] h-[23] w-[23] text-right ml-4'>
              x
            </Text>
        </Pressable>

       < Text className="color-white p-2">
              This is a software that automatically adjust audio dependent on the selected mode. Lots of fine tuning had gone into this.
          </Text>
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
=======
export default function Settings() {
  const router = useRouter();
  const { user } = useAuth();

  const SettingRow = ({ 
    icon, 
    title, 
    onPress 
  }: { 
    icon: string; 
    title: string; 
    onPress: () => void;
  }) => (
    <Pressable
      className="flex-row justify-between items-center bg-[#1C1C1E] px-4 py-4 mb-2 rounded-xl active:opacity-70"
      onPress={onPress}
    >
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon as any} size={24} color="#007AFF" />
        <Text className="color-white text-lg font-medium">{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView className="flex-1 bg-black">
        <View className="px-5 pt-5">
          <Text className="text-3xl font-bold color-white mb-6">
            Settings
          </Text>

          {/* User Info Card */}
          <View className="bg-[#1C1C1E] rounded-xl p-4 mb-6">
            <View className="flex-row items-center gap-3">
              <View className="w-14 h-14 bg-[#007AFF] rounded-full items-center justify-center">
                <Ionicons name="person" size={28} color="#FFF" />
              </View>
              <View className="flex-1">
                <Text className="color-white text-lg font-semibold mb-1">
                  {user?.full_name || user?.username || 'User'}
                </Text>
                <Text className="color-gray-400 text-sm">{user?.email || 'Not available'}</Text>
              </View>
            </View>
          </View>

          {/* Settings Menu */}
          <View className="mb-6">
            <Text className="color-gray-500 text-xs font-semibold mb-3 ml-1 tracking-wider">
              ACCOUNT
            </Text>
            <SettingRow
              icon="person-circle-outline"
              title="Account"
              onPress={() => router.push("/account")}
            />
          </View>

          <View className="mb-6">
            <Text className="color-gray-500 text-xs font-semibold mb-3 ml-1 tracking-wider">
              AUDIO
            </Text>
            <SettingRow
              icon="musical-notes"
              title="Audio Profiles"
              onPress={() => router.push("/profiles")}
            />
            <SettingRow
              icon="settings-outline"
              title="Custom Modes"
              onPress={() => console.log("Custom Modes")}
            />
          </View>

          <View className="mb-6">
            <Text className="color-gray-500 text-xs font-semibold mb-3 ml-1 tracking-wider">
              PREFERENCES
            </Text>
            <SettingRow
              icon="accessibility-outline"
              title="Accessibility"
              onPress={() => router.push("/accessibility")}
            />
            <SettingRow
              icon="information-circle-outline"
              title="About"
              onPress={() => router.push("/about")}
            />
          </View>

          {/* App Version */}
          <View className="items-center py-6 mb-24">
            <Text className="color-gray-600 text-xs">
              Audio Enhancement v1.0.0
            </Text>
            <Text className="color-gray-600 text-xs mt-1">
              TSA Competition 2026
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
>>>>>>> Stashed changes
}