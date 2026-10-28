// src/components/profile/ProfileHeader.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ProfileHeader({ username = 'iceboy', followers = 0, following = 14, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.userHeader} 
      activeOpacity={0.8} 
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{username ? username[0].toUpperCase() : 'I'}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.statsText}>{followers} followers • {following} following</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    gap: 2,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});