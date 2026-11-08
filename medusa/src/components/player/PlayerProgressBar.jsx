// src/components/player/PlayerProgressBar.jsx
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function PlayerProgressBar({ player, playerStatus }) {
  const formatTime = (millis) => {
    if (!millis || isNaN(millis)) return "0:00";
    const totalSeconds = Math.floor(millis / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalDuration = 30000; // Strict 30s Deezer preview cap in milliseconds

  // Handle case where expo-audio returns currentTime in seconds vs milliseconds
  const rawCurrent = playerStatus?.currentTime || 0;
  const currentMillis = rawCurrent < 1000 ? rawCurrent * 1000 : rawCurrent;

  const progressPercentRatio = totalDuration > 0 
    ? Math.min(1, Math.max(0, currentMillis / totalDuration))
    : 0;
  
  const progressPercentText = `${progressPercentRatio * 100}%`;

  const handleProgressBarPress = async (event) => {
    if (!player) return;
    const { locationX, width } = event.nativeEvent;
    if (width > 0) {
      const seekRatio = Math.max(0, Math.min(1, locationX / width));
      const seekPositionMillis = seekRatio * totalDuration;
      try {
        await player.seekTo(seekPositionMillis);
        await player.play();
      } catch (err) {
        console.error("Seek error:", err);
      }
    }
  };

  return (
    <View style={styles.progressContainer}>
      <Pressable style={styles.progressBarBackground} onPress={handleProgressBarPress}>
        {/* Background track rail */}
        <View style={styles.progressTrack} />
        {/* Active purple fill line */}
        <View style={[styles.progressBarFill, { width: progressPercentText }]} />
        {/* White thumb indicator */}
        <View style={[styles.progressThumb, { left: progressPercentText }]} />
      </Pressable>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(currentMillis)}</Text>
        <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    width: '100%',
    gap: 6,
  },
  progressBarBackground: {
    width: '100%',
    height: 20, // Tappable touch area height
    justifyContent: 'center',
    position: 'relative',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Visible background trace line
    borderRadius: 2,
    position: 'absolute',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#A736FF', // Cyberpunk neon purple
    borderRadius: 2,
    position: 'absolute',
    left: 0,
  },
  progressThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 4, // Center aligned with the 4-height track inside the 20-height container
    marginLeft: -6,
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
});