// src/components/Header.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({
  title,         // Used for the user's name/initial in the avatar (e.g. "Emmanuel" -> "E")
  profileImage,
  avatarUri,     
  onProfilePress,
  onSearchPress,
  onAddPress
}) {
  const imageSource = avatarUri || profileImage;
  const initial = title ? title.trim()[0].toUpperCase() : 'M';

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {/* Profile Avatar / Initial Letter */}
        <TouchableOpacity
          onPress={onProfilePress}
          activeOpacity={0.7}
          style={styles.touchableAvatar}
        >
          {imageSource ? (
            <Image source={{ uri: imageSource }} style={styles.profileImg} />
          ) : (
            <View style={styles.defaultAvatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Unique Branded Heading */}
        <View style={styles.brandContainer}>
          <Ionicons name="pulse" size={20} color="#A736FF" style={styles.brandIcon} />
          <Text style={styles.brandText}>MEDUSA</Text>
        </View>
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
    backgroundColor: '#191426',
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
    marginRight: 12,
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
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIcon: {
    marginRight: 6,
  },
  brandText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
});