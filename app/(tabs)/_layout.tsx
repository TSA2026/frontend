import { assets } from "@/assets/assets.js";
import { Tabs } from "expo-router";
import { Image, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({ focused, icon, label }: { focused: boolean; icon: any; label: string }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', minWidth: 80 }}>
      {typeof icon === 'string' ? (
        <Ionicons 
          name={icon as any} 
          size={32} 
          color={focused ? '#007AFF' : '#8E8E93'} 
        />
      ) : (
        <Image 
          source={icon} 
          style={{ 
            width: 32, 
            height: 32,
            tintColor: focused ? '#007AFF' : '#8E8E93',
          }} 
        />
      )}
      <Text 
        numberOfLines={1} // Forces text to stay on one line
        style={{
          fontSize: 12, // Slightly bigger for readability
          color: focused ? '#007AFF' : '#8E8E93',
          marginTop: 4,
          fontWeight: focused ? '600' : '400',
          textAlign: 'center',
          width: '100%', // Ensures text has room to breathe
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1C1C1E',
          borderTopWidth: 0.5,
          borderTopColor: '#38383A',
          height: 85,
          paddingTop: 10,
          paddingBottom: 20,
          paddingHorizontal: 0,
        },
        tabBarItemStyle: {
          margin: 0, // Removes spacing between tab buttons
          padding: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={assets.home_c || "home"} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: "Data",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={assets.data_c || "analytics"} label="Data" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={assets.settings_c || "settings"} label="Settings" />
          ),
        }}
      />
      
      {/* Hidden sub-pages - no tab bar */}
      <Tabs.Screen
        name="profiles"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="accessibility"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
};

export default _layout;