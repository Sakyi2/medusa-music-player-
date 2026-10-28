// src/screens/profile-screens/RecentSScreen.jsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { playTrack } from '../../../src/services/audioService';

export default function RecentSScreen({ onBackPress, onItemPress }) {
  const [filter, setFilter] = useState('all'); // 'all', 'music', 'podcasts'

  // Mock data formatted after Spotify / Medusa recents screen with working sample MP3s
  const todayItems = [
    {
      id: '1',
      title: 'SAINt JHN',
      subtitle: 'Artist • 24 songs played',
      type: 'music',
      isArtist: true,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: '2',
      title: 'Liked Songs',
      subtitle: '1 song added',
      type: 'music',
      isLiked: true,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: '3',
      title: 'Nasty C',
      subtitle: 'Artist • 8 songs played',
      type: 'music',
      isArtist: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      id: '4',
      title: 'Burna Boy',
      subtitle: 'Artist • 3 songs played',
      type: 'music',
      isArtist: true,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
  ];

  const pastItems = [
    {
      id: '5',
      title: '14 songs played',
      subtitle: 'Playlist • High Rotation',
      type: 'music',
      isArtist: false,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
    {
      id: '6',
      title: 'Kodak Black',
      subtitle: 'Artist • 8 songs played',
      type: 'music',
      isArtist: true,
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
  ];

  const handleItemPress = (item) => {
    // 1. Play audio if stream URL exists
    if (item.audioUrl) {
      playTrack(item.audioUrl);
    }

    // 2. Safely pass item details back to HomeScreen to switch views via state
    if (onItemPress) {
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
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.subtitleRow}>
            {item.isLiked && (
              <Ionicons
                name="checkmark-circle"
                size={14}
                color="#22C55E"
                style={{ marginRight: 4 }}
              />
            )}
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreBtn}>
          <Ionicons name="arrow-down-circle-outline" size={22} color="#B3B3B3" />
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
        {todayItems.map((item) => renderItem(item))}

        <Text style={styles.sectionHeader}>11 Oct 2026</Text>
        {pastItems.map((item) => renderItem(item))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
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
    backgroundColor: '#282828',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeChip: { backgroundColor: '#A736FF' },
  filterText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
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
  },
  itemImage: { width: 56, height: 56, borderRadius: 8 },
  artistImageCircle: { borderRadius: 28 },
  itemDetails: { flex: 1, marginLeft: 14 },
  itemTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  subtitleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  itemSubtitle: { color: '#B3B3B3', fontSize: 13 },
  moreBtn: { padding: 6 },
});