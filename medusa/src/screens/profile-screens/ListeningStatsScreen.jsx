// src/screens/ListeningStatsScreen.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Image 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ListeningStatsScreen({ 
  onBackPress, 
  onMinutesListenedPress, 
  onTopArtistsPress,
  onArtistPress // <-- Added prop for artist navigation
}) {
  const [timeRange, setTimeRange] = useState('4weeks');

  // Top artists sample data with rich context for detail views
  
   // Top artists sample data with rich context for detail views
  const topArtists = [
    { id: '1', name: 'Shatta Wale', plays: '342 plays', subtitle: 'Top Artist • 2026', image: require('../../../assets/images/medusa_3.png') },
    { id: '2', name: 'Kweku Smoke', plays: '289 plays', subtitle: 'Top Artist • 2026', image: require('../../../assets/images/medusa_3.png') },
    { id: '3', name: 'Burna Boy', plays: '210 plays', subtitle: 'Top Artist • 2026', image: require('../../../assets/images/medusa_3.png') },
    { id: '4', name: 'Gunna', plays: '185 plays', subtitle: 'Top Artist • 2026', image: require('../../../assets/images/medusa_3.png') },
  ];
  

  const topGenres = [
    { name: 'Afrobeats / Highlife', percentage: '42%', color: '#A736FF' },
    { name: 'Cyberpunk Synthwave', percentage: '28%', color: '#22C55E' },
    { name: 'Hip-Hop & Trap', percentage: '18%', color: '#38BDF8' },
    { name: 'Amapiano', percentage: '12%', color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Listening Stats</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Time Period Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterTab, timeRange === '4weeks' && styles.activeFilterTab]}
            onPress={() => setTimeRange('4weeks')}
          >
            <Text style={[styles.filterText, timeRange === '4weeks' && styles.activeFilterText]}>Last 4 Weeks</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterTab, timeRange === '6months' && styles.activeFilterTab]}
            onPress={() => setTimeRange('6months')}
          >
            <Text style={[styles.filterText, timeRange === '6months' && styles.activeFilterText]}>6 Months</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterTab, timeRange === 'allTime' && styles.activeFilterTab]}
            onPress={() => setTimeRange('allTime')}
          >
            <Text style={[styles.filterText, timeRange === 'allTime' && styles.activeFilterText]}>All Time</Text>
          </TouchableOpacity>
        </View>

        {/* Total Minutes Card (Interactive CTA) */}
        <TouchableOpacity 
          style={styles.heroCard}
          activeOpacity={0.8}
          onPress={onMinutesListenedPress}
        >
          <View style={styles.heroHeader}>
            <View style={styles.heroIconBox}>
              <MaterialCommunityIcons name="headphones" size={24} color="#22C55E" />
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.4)" />
          </View>

          <Text style={styles.heroValue}>4,820</Text>
          <Text style={styles.heroLabel}>Minutes Listened</Text>
          <Text style={styles.heroSubtext}>+18% more than last month • Tap for daily breakdown</Text>
        </TouchableOpacity>

        {/* Top Artists Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Artists</Text>
            <TouchableOpacity onPress={onTopArtistsPress}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.artistsGrid}>
            {topArtists.map((artist, index) => (
              <TouchableOpacity 
                key={artist.id} 
                style={styles.artistCard} 
                activeOpacity={0.8}
                onPress={() => onArtistPress && onArtistPress(artist)} // <-- Triggers DetailView/Player transition
              >
                <View style={styles.artistImageWrapper}>
                  <Image source={artist.image} style={styles.artistImage} />
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankBadgeText}>#{index + 1}</Text>
                  </View>
                </View>
                <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
                <Text style={styles.artistPlays}>{artist.plays}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Genres Breakdown */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Genres</Text>
          </View>

          <View style={styles.genresCard}>
            {topGenres.map((genre, index) => (
              <View key={index} style={styles.genreRow}>
                <View style={styles.genreHeader}>
                  <Text style={styles.genreName}>{genre.name}</Text>
                  <Text style={styles.genrePercentage}>{genre.percentage}</Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: genre.percentage, backgroundColor: genre.color }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Studio Remixing Activity */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Remix Studio Activity</Text>
          </View>

          <View style={styles.studioCard}>
            <View style={styles.studioStatRow}>
              <FontAwesome5 name="sliders-h" size={18} color="#A736FF" />
              <View style={styles.studioStatInfo}>
                <Text style={styles.studioStatTitle}>14 Stems Separated</Text>
                <Text style={styles.studioStatSub}>Extracted vocals & beats</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.studioStatRow}>
              <Ionicons name="mic-outline" size={22} color="#22C55E" />
              <View style={styles.studioStatInfo}>
                <Text style={styles.studioStatTitle}>6 Vocal Tracks Recorded</Text>
                <Text style={styles.studioStatSub}>Published to social feed</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
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
  scrollContent: {
    padding: 20,
    gap: 24,
    paddingBottom: 100,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#231D35',
    borderRadius: 12,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeFilterTab: {
    backgroundColor: '#A736FF',
  },
  filterText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  heroCard: {
    backgroundColor: '#231D35',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    gap: 8,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heroLabel: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
  },
  heroSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  sectionContainer: {
    gap: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 12,
    color: '#A736FF',
    fontWeight: '600',
  },
  artistsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  artistCard: {
    alignItems: 'center',
    width: 75,
    gap: 4,
  },
  artistImageWrapper: {
    position: 'relative',
  },
  artistImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: '#A736FF',
  },
  rankBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#A736FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  rankBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  artistPlays: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
  },
  genresCard: {
    backgroundColor: '#231D35',
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
  },
  genreRow: {
    gap: 6,
  },
  genreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genreName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  genrePercentage: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  studioCard: {
    backgroundColor: '#231D35',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
  },
  studioStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  studioStatInfo: {
    gap: 2,
  },
  studioStatTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  studioStatSub: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});