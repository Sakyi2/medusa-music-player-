// src/components/DiscoverSection.jsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  ActivityIndicator 
} from 'react-native';
import DiscoverPlayerModal from './DiscoverPlayerModal';

const { width } = Dimensions.get('window');

const fetchGenres = async () => {
  const response = await fetch('https://api.deezer.com/genre');
  if (!response.ok) throw new Error('Unable to fetch genres');
  const result = await response.json();
  return result.data || [];
};

const FALLBACK_CARDS = [
  { id: '1', tag: '#afrobeats', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7' },
  { id: '2', tag: '#igbotrap', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad' },
  { id: '3', tag: '#trap', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f' },
  { id: '4', tag: '#charts', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
];

export default function DiscoverSection({
  onSongSelect,
}: {
  onSongSelect: React.ComponentProps<typeof DiscoverPlayerModal>['onSongSelect'];
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [discoverCards, setDiscoverCards] = useState(FALLBACK_CARDS);
  const [loading, setLoading] = useState(true);

  // Fetch live genres and artwork from Deezer API for horizontal preview cards
  useEffect(() => {
    let isMounted = true;
    const loadDiscoverGenres = async () => {
      try {
        const genres = await fetchGenres();
        if (isMounted && genres && genres.length > 0) {
          const formatted = genres.slice(0, 6).map((item: {
            id?: string | number;
            name?: string;
            title?: string;
            picture_medium?: string;
            picture?: string;
          }, idx: number) => ({
            id: String(item.id || idx),
            tag: `#${(item.name || item.title || 'trending').toLowerCase().replace(/\s+/g, '')}`,
            image: item.picture_medium || item.picture || FALLBACK_CARDS[idx % FALLBACK_CARDS.length].image,
          }));
          setDiscoverCards(formatted);
        }
      } catch (error) {
        console.error('Error fetching discover section genres:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDiscoverGenres();
    return () => { isMounted = false; };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Discover something new</Text>

      {loading ? (
        <ActivityIndicator size="small" color="#A736FF" style={{ marginVertical: 20 }} />
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.discoverScroll}
        >
          {discoverCards.map((card) => (
            <TouchableOpacity 
              key={card.id} 
              style={styles.discoverCard} 
              activeOpacity={0.85}
              onPress={() => setModalVisible(true)}
            >
              <Image source={{ uri: card.image }} style={styles.discoverImage} />
              <View style={styles.cardGradientOverlay} />
              <Text style={styles.discoverTag} numberOfLines={1}>{card.tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Immersive Reel Vertical Swipe Player Modal */}
      <DiscoverPlayerModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onSongSelect={onSongSelect}
      />
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
    letterSpacing: 0.5,
  },
  discoverScroll: {
    gap: 12,
    paddingBottom: 8,
  },
  discoverCard: {
    width: width * 0.38,
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#231D35',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.25)',
  },
  discoverImage: {
    width: '100%',
    height: '100%',
  },
  cardGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  discoverTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});