// app/_layout.tsx

import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';



export default function RootLayout() {

  return (

    <View style={styles.container}>

      <StatusBar style="light" />

      <Stack

        screenOptions={{

          headerShown: false,

          contentStyle: { backgroundColor: '#120E1F' },

          animation: 'slide_from_right',

          // Disables edge-swipe globally for sub-screens

          gestureEnabled: false,

        }}

      >

        {/* Starting route / Auth screens */}

        <Stack.Screen name="index" />

       

        {/* Main Bottom Tabs (Home, Search, Studio, Library) */}

        <Stack.Screen name="(tabs)" />



        {/* Category / Detail / Library sub-screens */}

        <Stack.Screen name="category/[id]" />



        {/* Player Screen - Explicitly allows modal pull-down gesture */}

        <Stack.Screen

          name="player"

          options={{

            presentation: 'modal',

            animation: 'slide_from_bottom',

            gestureEnabled: true, // Pull down to dismiss player modal

          }}

        />

      </Stack>

    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#120E1F',

  },

}); 

