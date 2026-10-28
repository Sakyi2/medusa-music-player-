// src/components/profile/ProfileMenuList.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileMenuList({ 
  onAddAccount, 
  onListeningStats, 
  onRecents, 
  onUpdates, 
  onSettings 
}) {
  const menuItems = [
    { id: '1', title: 'Add account', icon: 'add-circle-outline', onPress: onAddAccount },
    { id: '2', title: 'Listening stats', icon: 'stats-chart-outline', onPress: onListeningStats },
    { id: '3', title: 'Recents', icon: 'time-outline', onPress: onRecents },
    { id: '4', title: 'Your Updates', icon: 'megaphone-outline', onPress: onUpdates },
    { id: '5', title: 'Settings and privacy', icon: 'settings-outline', onPress: onSettings },
  ];

  return (
    <View style={styles.menuList}>
      {menuItems.map((item) => (
        <TouchableOpacity 
          key={item.id}
          style={styles.menuItem} 
          activeOpacity={0.7}
          onPress={item.onPress}
        >
          <Ionicons name={item.icon} size={22} color="#FFFFFF" />
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuList: {
    gap: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
});