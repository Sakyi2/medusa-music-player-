// src/components/SongRow.jsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SongRow({ 
  ghanaSongs = [], 
  africaSongs = [], 
  globalSongs = [], 
  activeSongId, 
  isPlaying, 
  onSongPress, 
  onSeeAllPress 
}) {
  // Define the dynamic card lists configuration
  const chartCards = [
    {
      id: 'ghana',
      categoryTitle: 'Top 100 Ghana',
      songs: ghanaSongs,
    },
    {
      id: 'africa',
      categoryTitle: 'Top 100 Africa',
      songs: africaSongs,
    },
    {
      id: 'global',
      categoryTitle: 'Top 100 Global',
      songs: globalSongs,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Main Section Header */}
      <View style={styles.mainHeaderRow}>
        <Text style={styles.mainSectionTitle}>Charts</Text>
        <TouchableOpacity 
          style={styles.morePillButton}
          activeOpacity={0.7}
          onPress={() => onSeeAllPress && onSeeAllPress('All Charts')}
        >
          <Text style={styles.morePillText}>MORE</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Cards ScrollView */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.horizontalScrollContent}
        snapToInterval={316} // Snaps smoothly between cards
        decelerationRate="fast"
      >
        {chartCards.map((card) => (
          <View key={card.id} style={styles.chartCard}>
            {/* Inner Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{card.categoryTitle}</Text>
              <TouchableOpacity 
                style={styles.cardMoreButton}
                activeOpacity={0.7}
                onPress={() => onSeeAllPress && onSeeAllPress(card.categoryTitle)}
              >
                <Text style={styles.cardMoreText}>MORE</Text>
              </TouchableOpacity>
            </View>

            {/* Song Items List */}
            <View style={styles.songList}>
              {card.songs.slice(0, 5).map((song, index) => {
                const isThisActive = activeSongId === song.id;
                const isThisPlaying = isThisActive && isPlaying;

                return (
                  <TouchableOpacity 
                    key={song.id || index} 
                    style={styles.songRow} 
                    activeOpacity={0.7}
                    onPress={() => onSongPress && onSongPress(song)}
                  >
                    {/* Rank Number */}
                    <View style={styles.rankContainer}>
                      <Text style={[styles.rankText, isThisPlaying && styles.activeRankText]}>
                        {index + 1}
                      </Text>
                      <Text style={styles.rankDash}>-</Text>
                    </View>

                    {/* Cover Artwork */}
                    <Image 
                      source={song.albumCover ? { uri: song.albumCover } : require('../../assets/images/medusa_3.png')} 
                      style={styles.coverImage} 
                    />

                    {/* Song Title & Artist */}
                    <View style={styles.songInfo}>
                      <View style={styles.titleRow}>
                        <Text 
                          style={[styles.songTitle, isThisPlaying && styles.activeSongTitle]} 
                          numberOfLines={1}
                        >
                          {song.title}
                        </Text>
                      </View>
                      <Text 
                        style={[styles.artistName, isThisPlaying && styles.activeArtistName]} 
                        numberOfLines={1}
                      >
                        {song.artist}
                      </Text>
                    </View>

                    {/* Play or Status Icon */}
                    <View style={styles.actionIconButton}>
                      <Ionicons 
                        name={isThisPlaying ? "pause-circle" : "play-circle-outline"} 
                        size={22} 
                        color={isThisPlaying ? '#A736FF' : '#8E8E93'} 
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  mainHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainSectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  morePillButton: {
    backgroundColor: '#2A2A2E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  morePillText: {
    color: '#8E8E93',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  horizontalScrollContent: {
    gap: 16,
    paddingRight: 20,
  },
  chartCard: {
    width: 300,
    backgroundColor: '#1E1E22',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardMoreButton: {
    backgroundColor: '#2A2A2E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardMoreText: {
    color: '#8E8E93',
    fontSize: 10,
    fontWeight: 'bold',
  },
  songList: {
    gap: 14,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  activeRankText: {
    color: '#A736FF',
  },
  rankDash: {
    fontSize: 10,
    color: '#55555C',
    marginTop: -2,
  },
  coverImage: {
    width: 46,
    height: 46,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#2A2A2E',
  },
  songInfo: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  activeSongTitle: {
    color: '#A736FF',
  },
  artistName: {
    color: '#8E8E93',
    fontSize: 13,
  },
  activeArtistName: {
    color: '#A736FF',
  },
  actionIconButton: {
    padding: 6,
    marginLeft: 8,
  },
});