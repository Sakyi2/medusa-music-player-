// src/screens/PlayerScreen.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  Image, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlayerScreen({ onBackPress, songData }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  // Fallback song data matching the reference layout
  const song = songData || {
    title: "Medusa's Cry",
    artist: "Medusa",
    image: require('../../assets/images/medusa_3.png'),
    currentTime: "1:28",
    duration: "4:12",
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Header */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MedusaPlayerView</Text>
        <TouchableOpacity onPress={() => Alert.alert("Options", "Track options")} style={styles.iconButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        
        {/* Neon Glowing Album Art */}
        <View style={styles.artworkContainer}>
          <Image source={song.image} style={styles.coverImage} resizeMode="cover" />
        </View>

        {/* Song Meta & Favorite */}
        <View style={styles.metaRow}>
          <View style={styles.textInfo}>
            <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
            <Text style={styles.artistName} numberOfLines={1}>{song.artist}</Text>
          </View>
          <TouchableOpacity onPress={() => setIsLiked(!isLiked)} style={styles.heartButton}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "#22C55E" : "rgba(255,255,255,0.6)"} />
          </TouchableOpacity>
        </View>

        {/* Progress Bar & Timestamps */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
            <View style={styles.progressThumb} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{song.currentTime}</Text>
            <Text style={styles.timeText}>{song.duration}</Text>
          </View>
        </View>

        {/* Main Media Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity onPress={() => setIsShuffled(!isShuffled)}>
            <Ionicons name="shuffle" size={22} color={isShuffled ? "#22C55E" : "rgba(255,255,255,0.5)"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Previous", "Skipping to previous track")}>
            <Ionicons name="play-skip-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playPauseButton} 
            activeOpacity={0.85}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={26} color="#000000" style={styles.playIconOffset} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Alert.alert("Next", "Skipping to next track")}>
            <Ionicons name="play-skip-forward" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLooped(!isLooped)}>
            <Ionicons name="repeat" size={22} color={isLooped ? "#22C55E" : "rgba(255,255,255,0.5)"} />
          </TouchableOpacity>
        </View>

        {/* Bottom Utility Toolbar */}
        <View style={styles.bottomToolbar}>
          <TouchableOpacity onPress={() => Alert.alert("Devices", "Connecting to audio output device")}>
            <Ionicons name="tv-outline" size={20} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
          <View style={styles.toolbarRightGroup}>
            <TouchableOpacity onPress={() => Alert.alert("Share", "Sharing current song")}>
              <Ionicons name="share-outline" size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Queue", "Opening playback queue")}>
              <Ionicons name="list-outline" size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E1F', // Deep Cyberpunk background
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  iconButton: {
    padding: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-evenly',
    paddingBottom: 30,
    alignItems: 'center',
  },
  artworkContainer: {
    width: 270,
    height: 270,
    borderRadius: 20,
    backgroundColor: '#1E172C',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.35)',
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textInfo: {
    flex: 1,
    gap: 4,
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  artistName: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
  heartButton: {
    padding: 4,
  },
  progressContainer: {
    width: '100%',
    gap: 6,
  },
  progressBarBackground: {
    width: '100%',
    height: 4,
    backgroundColor: '#2E2545',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  progressBarFill: {
    width: '35%',
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 2,
  },
  progressThumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: '35%',
    marginLeft: -5,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontWeight: '500',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  playIconOffset: {
    marginLeft: 2,
  },
  bottomToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  toolbarRightGroup: {
    flexDirection: 'row',
    gap: 24,
  },
});