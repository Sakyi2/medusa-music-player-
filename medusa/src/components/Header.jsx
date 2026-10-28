// src/components/Header.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title, profileImage, onProfilePress, onSearchPress, onAddPress }) {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity 
          onPress={onProfilePress} 
          activeOpacity={0.7}
          style={styles.touchableAvatar}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImg} />
          ) : (
            <View style={styles.defaultAvatar}>
              <Text style={styles.avatarText}>{title ? title[0] : 'M'}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        {onSearchPress && (
          <TouchableOpacity onPress={onSearchPress} style={styles.iconButton} activeOpacity={0.7}>
            <Ionicons name="search-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
        {onAddPress && (
          <TouchableOpacity onPress={onAddPress} style={styles.iconButton} activeOpacity={0.7}>
            <Ionicons name="add" size={28} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#191426', // Matching Medusa dark purple background
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167, 54, 255, 0.15)',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.4)',
  },
  defaultAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#231D35',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.4)',
  },
  avatarText: {
    color: '#A736FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
});