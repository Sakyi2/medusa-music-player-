// src/screens/PlayerScreen.jsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  Image, 
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PlayerProgressBar from '../components/player/PlayerProgressBar';
import QueueModal from '../components/player/QueueModal';
import DevicesModal from '../components/player/DevicesModal';

export default function PlayerScreen({ 
  onBackPress, 
  songData, 
  player, 
  playerStatus,
  onNextPress,
  onPrevPress,
  playlist = [],
  onSelectQueueSong
}) {
  const [isLiked, setIsLiked] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  const [queueVisible, setQueueVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('Medusa Built-in Speaker');

  const song = songData ? {
    id: songData.id,
    title: songData.title || songData.name || "Medusa's Cry",
    artist: songData.artist || songData.artistName || "Medusa",
    albumCover: songData.albumCover || songData.image || songData.coverImage,
    audioUrl: songData.audioUrl || songData.preview || songData.uri,
    duration: songData.duration,
  } : {
    title: "Medusa's Cry",
    artist: "Medusa",
    albumCover: null,
  };

  const serverIsPlaying = playerStatus?.isPlaying ?? false;
  const [localIsPlaying, setLocalIsPlaying] = useState(serverIsPlaying);

  useEffect(() => {
    setLocalIsPlaying(serverIsPlaying);
  }, [serverIsPlaying]);

  const togglePlayPause = async () => {
    if (!player) return;
    const nextState = !localIsPlaying;
    setLocalIsPlaying(nextState);

    try {
      if (!nextState) {
        await player.pause();
      } else {
        if (playerStatus?.currentTime && playerStatus?.duration && playerStatus.currentTime >= playerStatus.duration) {
          await player.seekTo(0);
        }
        await player.play();
      }
    } catch (error) {
      console.error("Playback control error:", error);
      setLocalIsPlaying(serverIsPlaying);
    }
  };

  const handleDefaultForward = async () => {
    if (onNextPress) {
      onNextPress();
      return;
    }
    if (!player) return;
    try {
      const current = playerStatus?.currentTime || 0;
      const duration = 30000; // Strict 30s preview limit
      const target = Math.min(duration, current + 10000);
      await player.seekTo(target);
      await player.play(); // Force auto-resume
    } catch (err) {
      console.error("Forward seek error:", err);
    }
  };

  const handleDefaultRewind = async () => {
    if (onPrevPress) {
      onPrevPress();
      return;
    }
    if (!player) return;
    try {
      const current = playerStatus?.currentTime || 0;
      const target = Math.max(0, current - 10000);
      await player.seekTo(target);
      await player.play(); // Force auto-resume
    } catch (err) {
      console.error("Rewind seek error:", err);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Listening to "${song.title}" by ${song.artist} on Medusa Streaming 🎶`,
        url: song.audioUrl,
        title: song.title,
      });
    } catch (error) {
      console.error("Error sharing track:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Header */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MedusaPlayerView</Text>
        <TouchableOpacity onPress={() => setQueueVisible(true)} style={styles.iconButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        
        {/* Album Art */}
        <View style={styles.artworkContainer}>
          <Image 
            source={song.albumCover ? { uri: song.albumCover } : require('../../assets/images/medusa_3.png')} 
            style={styles.coverImage} 
            resizeMode="cover" 
          />
        </View>

        {/* Song Meta */}
        <View style={styles.metaRow}>
          <View style={styles.textInfo}>
            <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
            <Text style={styles.artistName} numberOfLines={1}>{song.artist}</Text>
          </View>
          <TouchableOpacity onPress={() => setIsLiked(!isLiked)} style={styles.heartButton}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "#A736FF" : "rgba(255,255,255,0.6)"} />
          </TouchableOpacity>
        </View>

        {/* Progress Bar Component */}
        <PlayerProgressBar 
          player={player} 
          playerStatus={playerStatus} 
          durationFallback={song.duration ? song.duration * 1000 : 30000} 
        />

        {/* Main Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity onPress={() => setIsShuffled(!isShuffled)}>
            <Ionicons name="shuffle" size={22} color={isShuffled ? "#A736FF" : "rgba(255,255,255,0.5)"} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDefaultRewind}>
            <Ionicons name="play-skip-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playPauseButton} 
            activeOpacity={0.85}
            onPress={togglePlayPause}
          >
            <Ionicons name={localIsPlaying ? "pause" : "play"} size={26} color="#000000" style={styles.playIconOffset} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDefaultForward}>
            <Ionicons name="play-skip-forward" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLooped(!isLooped)}>
            <Ionicons name="repeat" size={22} color={isLooped ? "#A736FF" : "rgba(255,255,255,0.5)"} />
          </TouchableOpacity>
        </View>

        {/* Bottom Toolbar */}
        <View style={styles.bottomToolbar}>
          <TouchableOpacity onPress={() => setDeviceVisible(true)}>
            <Ionicons name="tv-outline" size={20} color="#A736FF" />
          </TouchableOpacity>
          
          <View style={styles.toolbarRightGroup}>
            <TouchableOpacity onPress={handleShare}>
              <Ionicons name="share-outline" size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setQueueVisible(true)}>
              <Ionicons name="list-outline" size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      {/* Queue Modal Component */}
      <QueueModal 
        visible={queueVisible} 
        onClose={() => setQueueVisible(false)} 
        playlist={playlist} 
        currentSongId={song.id} 
        onSelectQueueSong={onSelectQueueSong} 
      />

      {/* Devices Modal Component */}
      <DevicesModal 
        visible={deviceVisible} 
        onClose={() => setDeviceVisible(false)} 
        selectedDevice={selectedDevice} 
        onSelectDevice={setSelectedDevice} 
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E1F',
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
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.35)',
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
    backgroundColor: '#A736FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A736FF',
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