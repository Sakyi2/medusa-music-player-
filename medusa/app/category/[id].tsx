// app/category/[id].tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data generator for category content with unique item identifiers
const getCategoryData = (title: string) => {
  return {
    title: title || 'Collection',
    subtitle: `Top curated picks in ${title || 'Music'}`,
    sections: [
      {
        title: `African ${title || 'Trending'}`,
        data: [
          { id: 'a1', name: 'Aya Nakamura, Blaqbonez...', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', tag: 'afro bars', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
          { id: 'a2', name: 'Black Sherif, Kweku Smoke...', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc', tag: '+233 Bars', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
          { id: 'a3', name: 'Don Toliver, Mavo, Blaq...', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', tag: 'Exclusive', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
          { id: 'a1', name: 'Aya Nakamura, Blaqbonez...', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', tag: 'afro bars', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
          { id: 'a2', name: 'Black Sherif, Kweku Smoke...', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc', tag: '+233 Bars', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
          { id: 'a3', name: 'Don Toliver, Mavo, Blaq...', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', tag: 'Exclusive', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        ],
      },
      {
        title: `Popular ${title || 'Hits'} Playlists`,
        data: [
          { id: 'p1', name: 'Hustlers Anthems (Sarkodie...)', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', tag: 'Anthem', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
          { id: 'p2', name: 'Asakaa Drill Wave', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', tag: 'Kumasi', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
          { id: 'a1', name: 'Aya Nakamura, Blaqbonez...', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', tag: 'afro bars', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
          { id: 'a2', name: 'Black Sherif, Kweku Smoke...', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc', tag: '+233 Bars', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
          { id: 'a3', name: 'Don Toliver, Mavo, Blaq...', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', tag: 'Exclusive', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        ],
      },
      {
        title: `${title} New Releases`,
        data: [
          { id: 'n1', name: 'Midnight Cyber Vibes', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc', tag: 'New Single', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
          { id: 'n2', name: 'Neon Lights EP', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', tag: 'Album', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
         { id: 'n1', name: 'Midnight Cyber Vibes', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc', tag: 'New Single', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
          { id: 'n2', name: 'Neon Lights EP', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', tag: 'Album', uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
        ],
        

      },
    ],
  };
};

export default function CategoryDetailScreen() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams();
  const categoryInfo = getCategoryData(Array.isArray(title) ? title[0] : title);

  const handleCardPress = (item: any) => {
    // Navigate to your player screen or album detail view, passing track params
    router.push({
      pathname: '/player', // Make sure you have app/player.tsx or similar route set up
      params: { 
        title: item.name, 
        image: item.image, 
        uri: item.uri,
        tag: item.tag 
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
        <Text style={styles.headerTitle} numberOfLines={1}>{categoryInfo.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Category Banner Title */}
        <Text style={styles.heroTitle}>{categoryInfo.title}</Text>
        <Text style={styles.heroSubtitle}>{categoryInfo.subtitle}</Text>

        {/* Dynamic Horizontal Rows */}
        {categoryInfo.sections.map((section, sIndex) => (
          <View key={sIndex} style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            <FlatList
              horizontal
              data={section.data}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.card} 
                  activeOpacity={0.8}
                  onPress={() => handleCardPress(item)}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.tag}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardText} numberOfLines={2}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E1F',
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
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#A736FF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
});