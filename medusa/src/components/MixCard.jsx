// src/components/MixCard.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MixCard({ title, artist, image, isPlaying, onPress }) {
  // Use provided image or fallback to a gorgeous default album art
  const imageSource = image ? { uri: image } : require('../../assets/images/medusa_3.png');

  return (
    <ImageBackground 
      source={imageSource} 
      style={styles.bannerContainer}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Dark overlay so text and buttons remain crisp and readable */}
      <View style={styles.overlay}>
        <View style={styles.bannerContent}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>FEATURED TRACK</Text>
          </View>
          <Text style={styles.bannerTitle} numberOfLines={1}>{title || "Medusa's Cry"}</Text>
          <Text style={styles.bannerSubtitle} numberOfLines={1}>{artist || "Medusa"}</Text>
          
          <TouchableOpacity 
            style={styles.playButton} 
            activeOpacity={0.8}
            onPress={onPress}
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={18} color="#FFFFFF" />
            <Text style={styles.playButtonText}>{isPlaying ? "Pause Track" : "Play Now"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.4)',
    overflow: 'hidden',
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    height: 180,
    justifyContent: 'flex-end',
    backgroundColor: '#120E1F',
  },
  backgroundImage: {
    opacity: 0.35,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 14, 31, 0.85)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  bannerContent: {
    gap: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(167, 54, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#A736FF',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 6,
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: '#A736FF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});