// src/components/studio/AudioPreviewCard.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

interface AudioPreviewCardProps {
  recordingUri: string;
  onDiscard: () => void;
}

export function AudioPreviewCard({ recordingUri, onDiscard }: AudioPreviewCardProps) {
  // Initialize expo-audio player with the local recording URI
  const player = useAudioPlayer(recordingUri);
  const status = useAudioPlayerStatus(player);

  // Ensure volume is set to maximum on mount
  useEffect(() => {
    if (player) {
      player.volume = 1.0;
    }
  }, [player]);

  const handlePlayPause = () => {
    if (!player) return;
    
    if (status.playing) {
      player.pause();
    } else {
      // If playback finished or reached the end, reset position to start
      if (status.duration && status.currentTime >= status.duration - 0.1) {
        player.seekTo(0);
      }
      player.play();
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Ionicons name="mic-circle" size={18} color="#00F0FF" />
          <Text style={styles.badgeText}>RECORDED VERSE READY</Text>
        </View>
        <TouchableOpacity onPress={onDiscard} style={styles.trashBtn} activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={18} color="#FF007F" />
        </TouchableOpacity>
      </View>

      <View style={styles.playerRow}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlayPause}
          activeOpacity={0.8}
        >
          <Ionicons
            name={status.playing ? 'pause' : 'play'}
            size={24}
            color="#120E1F"
          />
        </TouchableOpacity>

        <View style={styles.progressInfo}>
          <Text style={styles.statusLabel}>
            {status.playing ? 'Playing back verse...' : 'Tap to preview your verse'}
          </Text>
          <Text style={styles.timeText}>
            {formatTime(status.currentTime)} / {formatTime(status.duration || 0)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    borderRadius: 20,
    padding: 18,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.3)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    color: '#00F0FF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  trashBtn: {
    padding: 4,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInfo: {
    flex: 1,
  },
  statusLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
});