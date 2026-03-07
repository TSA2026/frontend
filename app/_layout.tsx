import { Stack } from "expo-router";
import {AuthProvider} from '../context/AuthContext';
import "./globals.css";
import { AudioEngineProvider } from "../context/AudioEngineContext";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AudioEngineProvider>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AudioEngineProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
