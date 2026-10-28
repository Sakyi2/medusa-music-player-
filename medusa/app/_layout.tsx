// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false, 
        contentStyle: { backgroundColor: '#120E1F' },
        // Disables edge-swipe globally for all pushed stack screens (Library, Detail, Playlist, etc.)
        gestureEnabled: false, 
      }}
    >
      {/* Starting route / Auth screens */}
      <Stack.Screen name="index" />
      
      {/* Main Bottom Tabs (Home, Search, Library, etc.) */}
      <Stack.Screen name="(tabs)" />

      {/* Category / Detail / Library sub-screens pushed onto stack */}
      <Stack.Screen name="category/[id]" />

      {/* Player Screen - Explicitly overrides the global setting so the modal swipe-down still works smoothly */}
      <Stack.Screen 
        name="player" 
        options={{ 
          presentation: 'modal', 
          animation: 'slide_from_bottom',
          gestureEnabled: true // Allows pulling down to dismiss the player modal safely
        }} 
      />
    </Stack>
  );
}