// app/category/[id].tsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchMusicByGenre, fetchTopCharts } from '../../src/services/musicApi';

export default function CategoryDetailScreen() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams();
  const categoryTitle = Array.isArray(title) ? title[0] : (title || 'Collection');

  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch live music data from Deezer API based on the category title
  useEffect(() => {
    let isMounted = true;
    const loadCategoryContent = async () => {
      setLoading(true);
      try {
        const [genreTracks, topCharts, afroTracks] = await Promise.all([
          fetchMusicByGenre(categoryTitle),
          fetchTopCharts(),
          fetchMusicByGenre('Afrobeats'),
        ]);

        if (isMounted) {
          setSections([
            {
              title: `${categoryTitle} Trending`,
              data: genreTracks.length > 0 ? genreTracks : topCharts,
            },
            {
              title: `Popular Hits & Playlists`,
              data: topCharts,
            },
            {
              title: `Global Cyber Selection`,
              data: afroTracks.length > 0 ? afroTracks : genreTracks,
            },
          ]);
        }
      } catch (error) {
        console.error('Error loading category detail data from Deezer:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCategoryContent();
    return () => { isMounted = false; };
  }, [categoryTitle]);

  const handleCardPress = (item: any, sectionData: any[]) => {
    // Safely map and serialize the playlist queue so the player can skip tracks properly
    const serializedPlaylist = JSON.stringify(sectionData.map(song => ({
      id: song.id,
      title: song.title || song.name,
      artist: song.artist || song.artistName,
      albumCover: song.albumCover || song.image || song.coverImage,
      audioUrl: song.audioUrl || song.preview || song.uri,
      duration: song.duration || 30,
    })));

    router.push({
      pathname: '/player', 
      params: { 
        id: item.id,
        title: item.title || item.name, 
        artist: item.artist || item.artistName,
        albumCover: item.albumCover || item.image || item.coverImage, 
        audioUrl: item.audioUrl || item.preview || item.uri,
        duration: item.duration || 30,
        playlist: serializedPlaylist, // Passes queue context securely
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header bar with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{categoryTitle}</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#A736FF" />
          <Text style={styles.loaderText}>Syncing Cyber Frequency...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Category Banner Title */}
          <Text style={styles.heroTitle}>{categoryTitle}</Text>
          <Text style={styles.heroSubtitle}>Top curated live streams in {categoryTitle}</Text>

          {/* Dynamic Horizontal Rows */}
          {sections.map((section, sIndex) => (
            <View key={sIndex} style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <FlatList
                horizontal
                data={section.data}
                keyExtractor={(item, idx) => `${item.id}-${idx}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.card} 
                    activeOpacity={0.8}
                    onPress={() => handleCardPress(item, section.data)}
                  >
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: item.albumCover || item.image }} style={styles.cardImage} />
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>PLAY</Text>
                      </View>
                    </View>
                    <Text style={styles.cardText} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.cardSubText} numberOfLines={1}>{item.artist}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E1F',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loaderText: {
    color: '#A736FF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#191426',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167, 54, 255, 0.15)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  horizontalList: {
    gap: 14,
  },
  card: {
    width: 145,
  },
  imageContainer: {
    width: 145,
    height: 145,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#261E38',
    marginBottom: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(167, 54, 255, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cardSubText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
});