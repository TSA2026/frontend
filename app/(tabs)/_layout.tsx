import { assets } from "@/assets/assets.js";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({ focused, title, icon }: any) => {
    if (focused) {
        return (
        <ImageBackground
            source={images.highlight}
            className="flex flex-row w-full flex-1 min-w-[9.2rem] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
            <Image source={icon} className="" tintColor="#151312"/>
            <Text className="mr-2">{title}</Text>
        </ImageBackground>
        );
    }
    return (
        <View>
            <Text className=" flex size-full justify-center items-center mt-7 rounded-full color-[#A8B5DB]">{title}</Text>
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
                backgroundColor: '#0f0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '0f0D23'
            }
        }}
    >
        
      <Tabs.Screen
        name="index"
        options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} title="Home" icon={assets.home_c}/>
            ),
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
            title: "Data",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} title="Data" icon={assets.data_c}/>
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} title="Profile" icon={assets.settings_c}/>
            ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
