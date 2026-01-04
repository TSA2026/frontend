import { assets } from "@/assets/assets.js";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, View } from "react-native";

const TabIcon = ({ focused, cIcon, uIcon }: any) => {
    if (focused) {
        return (
        <ImageBackground
            source={images.highlight}
            className="flex flex-row flex-1 min-w-[9.2rem] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
            <Image source={cIcon}/>
        </ImageBackground>
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
        name="profile"
        options={{
            title: "Profile",
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
