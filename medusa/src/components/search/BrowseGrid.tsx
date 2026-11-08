import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import * as musicApi from '../../services/musicApi';

// Neon Cyberpunk Palette Palette Loop
const NEON_COLORS = [
  '#A736FF', // Cyber Purple
  '#00F0FF', // Electric Cyan
  '#FF0055', // Neon Pink
  '#7000FF', // Deep Violet
  '#00FF66', // Matrix Green
  '#FF9900', // Amber Flare
  '#E91E63', // Hot Magenta
  '#00897B', // Teal Pulse
];

const FALLBACK_CATEGORIES = [
  { id: '1', title: 'Music', color: '#A736FF', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' },
  { id: '2', title: 'Afrobeat & Amapiano', color: '#00F0FF', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819' },
  { id: '3', title: 'Live Cyber Sessions', color: '#FF0055', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
  { id: '4', title: 'Made For You', color: '#7000FF', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
  { id: '5', title: 'Upcoming Releases', color: '#00FF66', image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee' },
  { id: '6', title: 'Hip Hop & Drill', color: '#FF9900', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5' },
  { id: '7', title: 'Global Charts', color: '#E91E63', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
  { id: '8', title: 'Mood & Frequency', color: '#00897B', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc' },
];

export default function BrowseGrid() {
  const router = useRouter();
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadBrowseData = async () => {
      try {
        const fetchGenres = (musicApi as any).fetchGenres;
        const deezerGenres = typeof fetchGenres === 'function' ? await fetchGenres() : [];
        if (isMounted && deezerGenres && deezerGenres.length > 0) {
          const formatted = deezerGenres.map((genre: any, idx: number) => ({
            id: String(genre.id || idx + 1),
            title: genre.name || genre.title,
            color: NEON_COLORS[idx % NEON_COLORS.length],
            image: genre.picture_medium || genre.picture || FALLBACK_CATEGORIES[idx % FALLBACK_CATEGORIES.length].image,
          }));
          setCategories(formatted);
        }
      } catch (error) {
        console.error('Error loading Deezer browse categories:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBrowseData();
    return () => { isMounted = false; };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeading}>Browse All</Text>

      {loading ? (
        <ActivityIndicator size="small" color="#A736FF" style={{ marginVertical: 20 }} />
      ) : (
        <View style={styles.grid}>
          {categories.map((category, index) => {
            const cardBgColor = category.color || NEON_COLORS[index % NEON_COLORS.length];

            return (
              <TouchableOpacity 
                key={`${category.id}-${index}`} 
                style={[styles.categoryCard, { backgroundColor: cardBgColor }]}
                activeOpacity={0.85}
                onPress={() => 
                  router.push({
                    pathname: '/category/[id]',
                    params: { id: category.id, title: category.title },
                  })
                }
              >
                {/* Cyber Card Inner Glow / Overlay */}
                <View style={styles.cardGlowOverlay} />

                <Text style={styles.categoryTitle} numberOfLines={2}>
                  {category.title}
                </Text>

                <Image 
                  source={{ uri: category.image }} 
                  style={styles.categoryThumbnail} 
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  sectionHeading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    height: 105,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    // Subtle shadow for elevation
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  cardGlowOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    maxWidth: '68%',
    zIndex: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    textTransform: 'capitalize',
  },
  categoryThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8,
    position: 'absolute',
    bottom: -6,
    right: -10,
    transform: [{ rotate: '25deg' }],
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});