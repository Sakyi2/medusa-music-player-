/// src/screens/SeeAllListScreen.jsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Image,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchMusicByGenre, fetchTopCharts } from '../services/musicApi';

export default function SeeAllListScreen({ sectionTitle, onBackPress, onSongSelect }) {
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategorySongs = async () => {
      setLoading(true);
      try {
        let data = [];
        const titleLower = sectionTitle?.toLowerCase() || '';

        if (titleLower.includes('ghana')) {
          data = await fetchMusicByGenre('Ghana');
        } else if (titleLower.includes('africa') || titleLower.includes('afrobeat')) {
          data = await fetchMusicByGenre('Afrobeats');
        } else if (titleLower.includes('synthwave')) {
          data = await fetchMusicByGenre('Synthwave');
        } else if (titleLower.includes('latin')) {
          data = await fetchMusicByGenre('Latin');
        } else if (titleLower.includes('k-pop')) {
          data = await fetchMusicByGenre('K-Pop');
        } else if (titleLower.includes('hip-hop') || titleLower.includes('gunna')) {
          data = await fetchMusicByGenre('Hip-Hop');
        } else {
          // Default fallback to global top charts
          data = await fetchTopCharts();
        }

        setSongsList(data);
      } catch (error) {
        console.error('Error fetching see all songs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategorySongs();
  }, [sectionTitle]);

  // Format seconds to mm:ss
  const formatDuration = (seconds) => {
    if (!seconds) return '0:30';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {sectionTitle || 'Charts & Hits'}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Song List or Loading State */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#A736FF" />
        </View>
      ) : (
        <FlatList
          data={songsList}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              style={styles.songCard} 
              activeOpacity={0.7}
              onPress={() => onSongSelect && onSongSelect(item)}
            >
              <Image 
                source={item.albumCover ? { uri: item.albumCover } : require('../../assets/images/medusa_3.png')} 
                style={styles.albumArt} 
              />
              
              <View style={styles.infoContainer}>
                <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.artistName} numberOfLines={1}>{item.artist}</Text>
                <Text style={styles.dateText}>Rank #{index + 1} • Deezer Stream</Text>
              </View>

              <View style={styles.rightContainer}>
                <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
                <View style={styles.playIconButton}>
                  <Ionicons name="play-circle" size={28} color="#A736FF" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191426',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167, 54, 255, 0.2)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#231D35',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.25)',
    gap: 12,
  },
  albumArt: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#191426',
  },
  infoContainer: {
    flex: 1,
    gap: 3,
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#A736FF',
    fontSize: 13,
    fontWeight: '500',
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
  },
  rightContainer: {
    alignItems: 'flex-end',
    gap: 6,
  },
  durationText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
  },
  playIconButton: {
    padding: 2,
  },
});