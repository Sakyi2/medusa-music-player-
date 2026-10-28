// src/components/SongRow.jsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function SongRow({ onSongPress, onSeeAllPress }) {
  // Chart categories matching the screenshot structure
  const chartCards = [
    {
      id: 'ghana',
      categoryTitle: 'Top 100 Ghana',
      songs: [
        { id: '1', rank: '1', title: 'Gen Z', artist: 'Fameye', isDownloaded: false, image: require('../../assets/images/medusa_3.png') },
        { id: '2', rank: '2', title: 'Bra', artist: 'Kweku Smoke', isDownloaded: true, isPlaying: true, image: require('../../assets/images/medusa_3.png') },
        { id: '3', rank: '3', title: 'Bombele', artist: 'Kweku Smoke', isDownloaded: true, image: require('../../assets/images/medusa_3.png') },
        { id: '4', rank: '4', title: 'Faith ft. Lasmid', artist: 'Kweku Smoke', isDownloaded: true, image: require('../../assets/images/medusa_3.png') },
        { id: '5', rank: '5', title: 'Jolie', artist: 'Black Sherif', isExplicit: true, isDownloaded: false, image: require('../../assets/images/medusa_3.png') },
      ],
    },
    {
      id: 'africa',
      categoryTitle: 'Top 100 Africa',
      songs: [
        { id: 'a1', rank: '1', title: 'Worship', artist: 'Asake & DJ Snake', isDownloaded: true, image: require('../../assets/images/medusa_3.png') },
        { id: 'a2', rank: '2', title: 'Dem Dey', artist: 'Burna Boy', isDownloaded: false, image: require('../../assets/images/medusa_3.png') },
        { id: 'a3', rank: '3', title: 'Where Do We Go', artist: 'Ayra Starr', isDownloaded: true, image: require('../../assets/images/medusa_3.png') },
        { id: 'a4', rank: '4', title: 'UNAVAILABLE', artist: 'Davido ft. Musa Keys', isDownloaded: false, image: require('../../assets/images/medusa_3.png') },
        { id: 'a5', rank: '5', title: 'Water', artist: 'Tyla', isDownloaded: true, image: require('../../assets/images/medusa_3.png') },
      ],
    },
    {
      id: 'global',
      categoryTitle: 'Top 100 Global',
      songs: [
        { id: 'g1', rank: '1', title: 'fukumean', artist: 'Gunna', isDownloaded: true, image: require('../../assets/images/medusa_3.png') },
        { id: 'g2', rank: '2', title: 'Blinding Lights', artist: 'The Weeknd', isDownloaded: true, image: require('../../assets/images/medusa_3.png') },
        { id: 'g3', rank: '3', title: 'FE!N', artist: 'Travis Scott ft. Playboi Carti', isDownloaded: false, image: require('../../assets/images/medusa_3.png') },
        { id: 'g4', rank: '4', title: 'God\'s Plan', artist: 'Drake', isDownloaded: true, image: require('../../assets/images/medusa_3.png') },
        { id: 'g5', rank: '5', title: 'Starboy', artist: 'The Weeknd', isDownloaded: false, image: require('../../assets/images/medusa_3.png') },
      ],
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
              {card.songs.map((song) => (
                <TouchableOpacity 
                  key={song.id} 
                  style={styles.songRow} 
                  activeOpacity={0.7}
                  onPress={() => onSongPress && onSongPress(song)}
                >
                  {/* Rank Number */}
                  <View style={styles.rankContainer}>
                    <Text style={[styles.rankText, song.isPlaying && styles.activeRankText]}>
                      {song.rank}
                    </Text>
                    <Text style={styles.rankDash}>-</Text>
                  </View>

                  {/* Cover Artwork */}
                  <Image source={song.image} style={styles.coverImage} />

                  {/* Song Title & Artist */}
                  <View style={styles.songInfo}>
                    <View style={styles.titleRow}>
                      {song.isExplicit && (
                        <View style={styles.explicitBadge}>
                          <Text style={styles.explicitText}>E</Text>
                        </View>
                      )}
                      <Text 
                        style={[styles.songTitle, song.isPlaying && styles.activeSongTitle]} 
                        numberOfLines={1}
                      >
                        {song.title}
                      </Text>
                    </View>
                    <Text 
                      style={[styles.artistName, song.isPlaying && styles.activeArtistName]} 
                      numberOfLines={1}
                    >
                      {song.artist}
                    </Text>
                  </View>

                  {/* Status Icon (Checkmark or Download) */}
                  <TouchableOpacity style={styles.actionIconButton}>
                    {song.isDownloaded ? (
                      <Ionicons name="checkmark-circle-outline" size={20} color={song.isPlaying ? '#22D3EE' : '#8E8E93'} />
                    ) : (
                      <Feather name="download" size={18} color="#8E8E93" />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
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
    backgroundColor: '#1E1E22', // Dark grey/black card background
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
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
    color: '#d8dfe0', // Cyan accent for active song
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
  explicitBadge: {
    backgroundColor: '#3A3A3C',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  explicitText: {
    color: '#D1D1D6',
    fontSize: 9,
    fontWeight: 'bold',
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  activeSongTitle: {
    color: '#22D3EE', // Active track accent
  },
  artistName: {
    color: '#8E8E93',
    fontSize: 13,
  },
  activeArtistName: {
    color: '#22D3EE',
  },
  actionIconButton: {
    padding: 6,
    marginLeft: 8,
  },
});