/// src/screens/DetailViewScreen.jsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { playTrack } from '../services/audioService'; 

export default function DetailViewScreen({ onBackPress, onSongPress, playlistData }) {
  const router = useRouter();
  const params = useLocalSearchParams(); // Grabs route parameters if accessed via file route

  // Use passed playlistData prop if available, otherwise fall back to route params or defaults
  const playlist = {
    title: playlistData?.title || params.title || "Medusa's Choice",
    subtitle: playlistData?.subtitle || "Playlist • 50 songs • 3h 42m",
    image: playlistData?.image 
      ? (typeof playlistData.image === 'string' ? { uri: playlistData.image } : playlistData.image)
      : params.image ? { uri: String(params.image) } : require('../../assets/images/medusa_3.png'),
  };

  const tracks = [
    { id: '1', number: '1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:45', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: '2', number: '2', title: 'Enter Sandman', artist: 'Metallica', duration: '5:31', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: '3', number: '3', title: 'Don\'t Start Now', artist: 'Dua Lipa', duration: '3:03', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: '4', number: '4', title: 'Medusa\'s Cry', artist: 'Medusa', duration: '4:12', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  ];

  // Helper function to handle playing a track safely
  const handleTrackPress = (track) => {
    if (track.audioUrl) {
      playTrack(track.audioUrl);
    }
    
    // If a custom song press handler is passed (state-driven), use it. Otherwise, use router.push
    if (onSongPress) {
      onSongPress(track);
    } else {
      router.push({
        pathname: '/player',
        params: {
          title: track.title,
          artist: track.artist,
          image: playlist.image?.uri || '',
          audioUrl: track.audioUrl || ''
        },
      });
    }
  };

  // Safe back handler: uses local state prop if provided, otherwise falls back to router
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
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
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
              <Ionicons name="heart" size={20} color="#22C55E" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon} activeOpacity={0.8}>
              <Ionicons name="arrow-down-circle-outline" size={26} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>

          <View style={styles.rightActions}>
            <TouchableOpacity 
              style={styles.playButton} 
              activeOpacity={0.8}
              onPress={() => handleTrackPress(tracks[0])}
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
        <View style={styles.trackList}>
          {tracks.map((track) => (
            <TouchableOpacity 
              key={track.id} 
              style={styles.trackRow} 
              activeOpacity={0.7}
              onPress={() => handleTrackPress(track)}
            >
              <Text style={styles.trackNumber}>{track.number}</Text>
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
                <Text style={styles.trackArtist} numberOfLines={1}>{track.artist}</Text>
              </View>
              <Text style={styles.trackDuration}>{track.duration}</Text>
            </TouchableOpacity>
          ))}
        </View>

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
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  playButtonText: {
    color: '#000000',
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
    gap: 16,
    marginTop: 10,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 4,
  },
  trackNumber: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '600',
    width: 16,
    textAlign: 'center',
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