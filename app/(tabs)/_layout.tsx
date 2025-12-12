import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({ focused, title }: any) => {
    if (focused) {
        return (
        <ImageBackground
            source={images.highlight}
            className="flex flex-row w-full flex-1 min-w-[122px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
            <Image tintColor="#151312" className="size-5" />
            <Text>{title}</Text>
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
                <TabIcon focused={focused} title="Home"/>
            ),
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
            title: "Data",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} title="Data"/>
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} title="Profile"/>
            ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
