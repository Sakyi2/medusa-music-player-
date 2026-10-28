// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#A736FF', // Neon Purple Accent
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Ionicons name={focused ? "search" : "search-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />

      {/* Premium Create Tab (Center Focal Point) */}
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ focused }) => (
            <View style={styles.createButtonOuter}>
              <View style={styles.createButtonInner}>
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </View>
            </View>
          ),
          tabBarLabelStyle: {
            color: '#A736FF',
            fontWeight: 'bold',
          },
        }}
      />

      {/* Library Tab */}
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Ionicons name={focused ? "musical-note" : "musical-note-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />

      {/* Premium Tab */}
      <Tabs.Screen
        name="premium"
        options={{
          title: 'Premium',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Ionicons name={focused ? "flash" : "flash-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#191426', // Deep Dark Purple matching the theme
    borderTopColor: 'rgba(167, 54, 255, 0.25)', // Subtle neon purple border top
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 88 : 70,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingTop: 8,
    position: 'absolute',
    elevation: 0,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(167, 54, 255, 0.12)',
    borderRadius: 12,
  },
  createButtonOuter: {
    top: -12, // Elevates the create button slightly above the tab bar for a modern look
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#191426',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.5)',
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  createButtonInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#A736FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});