// src/screens/ChartsHubScreen.jsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChartsHubScreen({ onBackPress, onChartSelect, onArtistSelect }) {
  // Weekly Charts Grid Items
  const weeklyCharts = [
    { id: 'w_ghana', title: 'Top 100 Ghana', subtitle: 'Medusa Charts 🇬🇭', color: '#E11D48', tag: 'WEEKLY' },
    { id: 'w_africa', title: 'Top 100 Africa', subtitle: 'Medusa Charts 🌍', color: '#D97706', tag: 'WEEKLY' },
    { id: 'w_global', title: 'Top 100 Global', subtitle: 'Medusa Charts 🌐', color: '#2563EB', tag: 'WEEKLY' },
    { id: 'w_gospel', title: 'Top 100 Gospel', subtitle: 'Medusa Charts 🙌', color: '#9333EA', tag: 'GENRE' },
    { id: 'w_nigeria', title: 'Top 100 Nigeria', subtitle: 'Medusa Charts 🇳🇬', color: '#059669', tag: 'WEEKLY' },
  ];




  // Daily Charts Items
  const dailyCharts = [
    { id: 'd_ghana', title: 'Daily 100 Ghana', subtitle: 'Updated Daily', color: '#84CC16' },
    { id: 'd_new', title: 'Top New Songs', subtitle: 'Ghana Releases', color: '#F59E0B' },
    { id: 'd_rising', title: 'Daily Rising', subtitle: 'Breakthrough Hits', color: '#06B6D4' },
  ];

  // Podium Top Artists
  const podiumArtists = [
    { id: 'a2', rank: 2, name: 'Shatta Wale', color: '#38BDF8', image: require('../../assets/images/medusa_3.png') },
    { id: 'a1', rank: 1, name: 'Kweku Smoke', color: '#F59E0B', isCrown: true, image: require('../../assets/images/medusa_3.png') },
    { id: 'a3', rank: 3, name: 'Black Sherif', color: '#F97316', image: require('../../assets/images/medusa_3.png') },
  ];

  // Ranked List Artists
  const rankedArtists = [
    { id: 'a4', rank: 4, name: 'Daddy Lumba', image: require('../../assets/images/medusa_3.png') },
    { id: 'a5', rank: 5, name: 'Fameye', image: require('../../assets/images/medusa_3.png') },
    { id: 'a6', rank: 6, name: 'Kofi Kinaata', image: require('../../assets/images/medusa_3.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Charts</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* SECTION 1: WEEKLY CHARTS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Charts</Text>
            <View style={styles.neonPill}><Text style={styles.neonPillText}>UPDATED SUNDAY</Text></View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gridList}>
            {weeklyCharts.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.chartSquareCard, { borderColor: item.color }]} 
                activeOpacity={0.8}
                onPress={() => onChartSelect && onChartSelect(item)}
              >
                <View style={[styles.cardGraphic, { backgroundColor: item.color }]}>
                  <Text style={styles.graphicBadge}>{item.tag}</Text>
                  <Text style={styles.graphicTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* SECTION 2: DAILY CHARTS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Charts</Text>
            <TouchableOpacity><Text style={styles.seeAllLink}>See all</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gridList}>
            {dailyCharts.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.chartSquareCard} 
                activeOpacity={0.8}
                onPress={() => onChartSelect && onChartSelect(item)}
              >
                <View style={[styles.cardGraphic, { backgroundColor: item.color }]}>
                  <Text style={styles.graphicTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* SECTION 3: WEEKLY TOP ARTISTS PODIUM */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Top Artists</Text>
          </View>

          {/* Top 3 Podium (1st, 2nd, 3rd) */}
          <View style={styles.podiumContainer}>
            {podiumArtists.map((artist) => (
              <TouchableOpacity 
                key={artist.id} 
                style={[styles.podiumCard, artist.rank === 1 && styles.firstPlaceCard]} 
                activeOpacity={0.8}
                onPress={() => onArtistSelect && onArtistSelect(artist)}
              >
                <View style={styles.imageWrapper}>
                  <Image source={artist.image} style={styles.podiumAvatar} />
                  <View style={[styles.rankBadge, { backgroundColor: artist.color }]}>
                    <Text style={styles.rankBadgeText}>{artist.rank}</Text>
                  </View>
                </View>
                <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Ranked List (#4, #5, #6) */}
          <View style={styles.rankedList}>
            {rankedArtists.map((artist) => (
              <TouchableOpacity 
                key={artist.id} 
                style={styles.rankedRow} 
                activeOpacity={0.8}
                onPress={() => onArtistSelect && onArtistSelect(artist)}
              >
                <Text style={styles.rowRankText}>{artist.rank}</Text>
                <Image source={artist.image} style={styles.rowAvatar} />
                <Text style={styles.rowArtistName}>{artist.name}</Text>
                <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.3)" />
              </TouchableOpacity>
            ))}
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
  backButton: { padding: 4 },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  scrollContent: { padding: 20, gap: 28, paddingBottom: 100 },
  sectionContainer: { gap: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  neonPill: { backgroundColor: 'rgba(34, 197, 94, 0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  neonPillText: { color: '#22C55E', fontSize: 9, fontWeight: 'bold' },
  seeAllLink: { color: '#A736FF', fontSize: 12, fontWeight: '600' },
  gridList: { gap: 14 },
  chartSquareCard: { width: 124, gap: 6 },
  cardGraphic: {
    width: 124,
    height: 124,
    borderRadius: 16,
    padding: 10,
    justifyContent: 'space-between',
    elevation: 4,
  },
  graphicBadge: { color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: 'bold' },
  graphicTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  cardTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  cardSubtitle: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 11 },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  podiumCard: { flex: 1, alignItems: 'center', gap: 6 },
  firstPlaceCard: { marginTop: -14 },
  imageWrapper: { position: 'relative' },
  podiumAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#A736FF' },
  rankBadge: {
    position: 'absolute',
    bottom: -2,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#191426',
  },
  rankBadgeText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 11 },
  artistName: { color: '#FFFFFF', fontSize: 13, fontWeight: '600', marginTop: 4 },
  rankedList: { gap: 10 },
  rankedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#231D35',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
  },
  rowRankText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', width: 28, textAlign: 'center' },
  rowAvatar: { width: 44, height: 44, borderRadius: 22, marginHorizontal: 12 },
  rowArtistName: { flex: 1, color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});