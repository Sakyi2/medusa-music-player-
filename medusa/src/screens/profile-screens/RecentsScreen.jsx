// src/screens/profile-screens/RecentSScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchTopCharts } from '../../services/musicApi';

export default function RecentSScreen({ onBackPress, onItemPress, onSongPress }) {
  const [filter, setFilter] = useState('all'); // 'all', 'music', 'podcasts'
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real tracks from Deezer for the recents history list
  useEffect(() => {
    const loadRecents = async () => {
      setLoading(true);
      try {
        const tracks = await fetchTopCharts();
        if (tracks.length > 0) {
          // Format Deezer tracks to match the Recents layout structure
          const formatted = tracks.slice(0, 10).map((track, index) => ({
            id: track.id,
            title: track.title,
            artist: track.artist,
            subtitle: `Artist • ${track.artist}`,
            type: 'music',
            isArtist: index % 2 === 0, // Alternate between circular artist avatar and square album art
            image: track.albumCover,
            audioUrl: track.audioUrl,
            duration: track.duration,
          }));
          setRecentItems(formatted);
        }
      } catch (error) {
        console.error('Error loading recents data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecents();
  }, []);

  const handleItemPress = (item) => {
    // Pass song/item details back to HomeScreen to trigger audio playback and view transition
    if (onSongPress && item.audioUrl) {
      onSongPress(item);
    } else if (onItemPress) {
      onItemPress(item);
    }
  };

  const renderItem = (item) => {
    if (filter === 'podcasts' && item.type !== 'podcasts') return null;
    if (filter === 'music' && item.type !== 'music') return null;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.itemRow}
        activeOpacity={0.7}
        onPress={() => handleItemPress(item)}
      >
        <Image
          source={{ uri: item.image }}
          style={[styles.itemImage, item.isArtist && styles.artistImageCircle]}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
          <View style={styles.subtitleRow}>
            {item.isLiked && (
              <Ionicons
                name="checkmark-circle"
                size={14}
                color="#22C55E"
                style={{ marginRight: 4 }}
              />
            )}
            <Text style={styles.itemSubtitle} numberOfLines={1}>{item.subtitle}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreBtn}>
          <Ionicons name="arrow-forward-circle-outline" size={22} color="#A736FF" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recents</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Filter Tabs (Music / Podcasts) */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, filter === 'music' && styles.activeChip]}
          onPress={() => setFilter(filter === 'music' ? 'all' : 'music')}
        >
          <Text style={[styles.filterText, filter === 'music' && styles.activeFilterText]}>
            Music
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filter === 'podcasts' && styles.activeChip]}
          onPress={() => setFilter(filter === 'podcasts' ? 'all' : 'podcasts')}
        >
          <Text style={[styles.filterText, filter === 'podcasts' && styles.activeFilterText]}>
            Podcasts
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>Today</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#A736FF" style={{ marginVertical: 40 }} />
        ) : (
          recentItems.map((item) => renderItem(item))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#120E1F' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  filterChip: {
    backgroundColor: '#231D35',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
  },
  activeChip: { backgroundColor: '#A736FF', borderColor: '#A736FF' },
  filterText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
  activeFilterText: { color: '#FFFFFF', fontWeight: 'bold' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#231D35',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.1)',
  },
  itemImage: { width: 56, height: 56, borderRadius: 8 },
  artistImageCircle: { borderRadius: 28 },
  itemDetails: { flex: 1, marginLeft: 14 },
  itemTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  subtitleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  itemSubtitle: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  moreBtn: { padding: 6 },
});