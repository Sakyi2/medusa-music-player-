// src/components/profile/ProfileHeader.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function ProfileHeader({ 
  username = 'iceboy', 
  avatarUri = null, 
  followers = 0, 
  following = 14, 
  onPress 
}) {
  return (
    <TouchableOpacity 
      style={styles.userHeader} 
      activeOpacity={0.8} 
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarText}>{username ? username[0].toUpperCase() : 'I'}</Text>
        )}
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username} numberOfLines={1}>{username}</Text>
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
    backgroundColor: '#A736FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.4)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
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