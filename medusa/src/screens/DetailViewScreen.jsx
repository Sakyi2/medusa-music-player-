// src/screens/DetailViewScreen.jsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Image, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { fetchMusicByGenre, fetchTopCharts } from '../services/musicApi';

export default function DetailViewScreen({ onBackPress, onSongPress, playlistData }) {
  const router = useRouter();
  const params = useLocalSearchParams(); 

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract playlist/category details
  const playlist = {
    title: playlistData?.title || params.title || "Medusa's Choice",
    subtitle: playlistData?.subtitle || params.subtitle || "Playlist • Live Streaming",
    image: playlistData?.image 
      ? (typeof playlistData.image === 'string' ? { uri: playlistData.image } : playlistData.image)
      : params.image ? { uri: String(params.image) } : require('../../assets/images/medusa_3.png'),
  };

  // Fetch real tracks matching the category title from Deezer API
  useEffect(() => {
    const loadPlaylistTracks = async () => {
      setLoading(true);
      try {
        let data = [];
        const titleLower = playlist.title.toLowerCase();

        if (titleLower.includes('ghana')) {
          data = await fetchMusicByGenre('Ghana');
        } else if (titleLower.includes('africa') || titleLower.includes('afro')) {
          data = await fetchMusicByGenre('Afrobeats');
        } else if (titleLower.includes('synth') || titleLower.includes('cyber')) {
          data = await fetchMusicByGenre('Synthwave');
        } else if (titleLower.includes('latin')) {
          data = await fetchMusicByGenre('Latin');
        } else if (titleLower.includes('k-pop')) {
          data = await fetchMusicByGenre('K-Pop');
        } else if (titleLower.includes('gunna') || titleLower.includes('hip-hop') || titleLower.includes('drake')) {
          data = await fetchMusicByGenre(playlist.title);
        } else {
          data = await fetchTopCharts();
        }

        setTracks(data);
      } catch (error) {
        console.error('Error fetching detail view tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylistTracks();
  }, [playlist.title]);

  // Format seconds to mm:ss
  const formatDuration = (seconds) => {
    if (!seconds) return '0:30';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Helper function to handle playing a track safely
  const handleTrackPress = (track) => {
    if (onSongPress) {
      onSongPress(track);
    } else {
      router.push({
        pathname: '/player',
        params: {
          title: track.title,
          artist: track.artist,
          image: track.albumCover || playlist.image?.uri || '',
          audioUrl: track.audioUrl || ''
        },
      });
    }
  };

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Header Back Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Cover Art Container */}
        <View style={styles.artworkContainer}>
          <Image source={playlist.image} style={styles.coverImage} resizeMode="cover" />
        </View>

        {/* Playlist Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.playlistTitle}>{playlist.title}</Text>
          <Text style={styles.playlistSubtitle}>{playlist.subtitle}</Text>
        </View>

        {/* Action Controls Row */}
        <View style={styles.actionRow}>
          <View style={styles.leftActions}>
            <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.8}>
              <Ionicons name="heart" size={20} color="#A736FF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon} activeOpacity={0.8}>
              <Ionicons name="arrow-down-circle-outline" size={26} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>

          <View style={styles.rightActions}>
            <TouchableOpacity 
              style={styles.playButton} 
              activeOpacity={0.8}
              onPress={() => tracks.length > 0 && handleTrackPress(tracks[0])}
            >
              <Ionicons name="play" size={20} color="#000000" />
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Secondary Action Toolbar */}
        <View style={styles.secondaryToolbar}>
          <TouchableOpacity><Ionicons name="shuffle-outline" size={20} color="rgba(255,255,255,0.6)" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="download-outline" size={20} color="rgba(255,255,255,0.6)" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="ellipsis-horizontal" size={20} color="rgba(255,255,255,0.6)" /></TouchableOpacity>
        </View>

        {/* Tracklist Section */}
        {loading ? (
          <ActivityIndicator size="large" color="#A736FF" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.trackList}>
            {tracks.map((track, index) => (
              <TouchableOpacity 
                key={track.id || index} 
                style={styles.trackRow} 
                activeOpacity={0.7}
                onPress={() => handleTrackPress(track)}
              >
                <Text style={styles.trackNumber}>{index + 1}</Text>
                
                <Image 
                  source={track.albumCover ? { uri: track.albumCover } : require('../../assets/images/medusa_3.png')} 
                  style={styles.trackThumb} 
                />

                <View style={styles.trackInfo}>
                  <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
                  <Text style={styles.trackArtist} numberOfLines={1}>{track.artist}</Text>
                </View>

                <Text style={styles.trackDuration}>{formatDuration(track.duration)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E1F',
  },
  topNav: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    gap: 20,
    alignItems: 'center',
  },
  artworkContainer: {
    width: 220,
    height: 220,
    borderRadius: 20,
    backgroundColor: '#1E172C',
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.4)',
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    alignItems: 'center',
    gap: 6,
    width: '100%',
  },
  playlistTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playlistSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  favoriteButton: {
    padding: 2,
  },
  actionIcon: {
    padding: 2,
  },
  playButton: {
    backgroundColor: '#A736FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondaryToolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 24,
    width: '100%',
    paddingHorizontal: 4,
    marginVertical: 4,
  },
  trackList: {
    width: '100%',
    gap: 14,
    marginTop: 10,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(35, 29, 53, 0.5)',
    padding: 8,
    borderRadius: 12,
  },
  trackNumber: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '600',
    width: 20,
    textAlign: 'center',
  },
  trackThumb: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#1E172C',
  },
  trackInfo: {
    flex: 1,
    gap: 2,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  trackArtist: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  trackDuration: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
  },
});