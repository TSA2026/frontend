import { assets } from "@/assets/assets.js";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, View } from "react-native";

const TabIcon = ({ focused, cIcon, uIcon }: any) => {
    if (focused) {
        return (
        <View
    
            className="justify-center items-center rounded-full bg-[#7C3AED] w-10 h-10" 
        >
            <Image source={cIcon} tintColor={"white"}/>
        </View>
        );
    }
    return (
        <View className="mt-4">
            <Image source={uIcon}/>
        </View>
    )
};

const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarStyle: {
                backgroundColor: '#010B13',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#070D0D '
            }
        }}
    >
        
      <Tabs.Screen
        name="index"
        options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} cIcon={assets.home_c} uIcon={assets.home_u}/>
            ),
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
            title: "Data",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} cIcon={assets.data_c} uIcon={assets.data_u}/>
            ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} cIcon={assets.settings_c} uIcon={assets.settings_u}/>
            ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
