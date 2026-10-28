// src/components/MixCard.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MixCard({ onPress }) {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerContent}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>FEATURED ALBUM</Text>
        </View>
        <Text style={styles.bannerTitle}>Turn Beats Into Obsession</Text>
        <Text style={styles.bannerSubtitle}>Experience high-end spatial audio tuned for Medusa.</Text>
        
        <TouchableOpacity 
          style={styles.playButton} 
          activeOpacity={0.8}
          onPress={onPress} // <-- Now triggers navigation to PlayerScreen
        >
          <Ionicons name="play" size={18} color="#FFFFFF" />
          <Text style={styles.playButtonText}>Play Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#231D35',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.4)',
    padding: 20,
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  bannerContent: {
    gap: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(167, 54, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#A736FF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: '#A736FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});