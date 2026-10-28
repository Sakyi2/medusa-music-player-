import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import DiscoverPlayerModal from './DiscoverPlayerModal';

const { width } = Dimensions.get('window');

export default function DiscoverSection() {
  const [modalVisible, setModalVisible] = useState(false);

  const discoverCards = [
    { id: '1', tag: '#afrobeats', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7' },
    { id: '2', tag: '#igbotrap', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad' },
    { id: '3', tag: '#trap', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f' },
  
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Discover something new</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.discoverScroll}>
        {discoverCards.map((card) => (
          <TouchableOpacity 
            key={card.id} 
            style={styles.discoverCard} 
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
          >
            <Image source={{ uri: card.image }} style={styles.discoverImage} />
            <Text style={styles.discoverTag}>{card.tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Immersive Reel Player Modal */}
      <DiscoverPlayerModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  discoverScroll: {
    gap: 12,
    paddingBottom: 16,
  },
  discoverCard: {
    width: width * 0.38,
    height: 220,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  discoverImage: {
    width: '100%',
    height: '100%',
  },
  discoverTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});