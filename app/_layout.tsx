import { Stack } from "expo-router";
import {AuthProvider} from '../context/AuthContext';
import "./globals.css";
import { AudioEngineProvider } from "../context/AudioEngineContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AudioEngineProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AudioEngineProvider>
    </AuthProvider>
  );
}
