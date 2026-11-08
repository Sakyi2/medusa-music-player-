// src/components/studio/BeatSelector.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export interface BeatSample {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  genre: string;
  audioUrl?: string;
  artworkColor?: string;
}

interface BeatSelectorProps {
  beats: BeatSample[];
  selectedBeat: BeatSample;
  onSelectBeat: (beat: BeatSample) => void;
}

const GENRES = ['All', 'Synthwave', 'Hip Hop', 'R&B', 'Afrobeat', 'Cyberpunk'];

export function BeatSelector({ beats, selectedBeat, onSelectBeat }: BeatSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  
  // Live Deezer API state
  const [deezerTracks, setDeezerTracks] = useState<BeatSample[]>([]);
  const [loadingDeezer, setLoadingDeezer] = useState(false);

  // Real-time debounced search & genre filtering for Deezer API
  useEffect(() => {
    const timer = setTimeout(() => {
      if (modalVisible) {
        let query = searchQuery.trim();
        if (!query && selectedGenre !== 'All') {
          query = selectedGenre;
        } else if (!query) {
          query = 'instrumental beat';
        }
        fetchDeezerTracks(query);
      }
    }, 400); // 400ms delay to smoothly query while typing

    return () => clearTimeout(timer);
  }, [searchQuery, selectedGenre, modalVisible]);

  const fetchDeezerTracks = async (query: string) => {
    try {
      setLoadingDeezer(true);
      const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data && data.data) {
        const formattedTracks: BeatSample[] = data.data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          artist: item.artist.name,
          bpm: item.bpm || 120,
          key: 'Standard',
          genre: selectedGenre === 'All' ? 'Pop/Instrumental' : selectedGenre,
          audioUrl: item.preview, // 30-second audio preview stream
          artworkColor: '#A736FF30',
        }));
        setDeezerTracks(formattedTracks);
      }
    } catch (err) {
      console.error('Deezer API fetch error:', err);
    } finally {
      setLoadingDeezer(false);
    }
  };

  const handleSelect = (beat: BeatSample) => {
    onSelectBeat(beat);
    setModalVisible(false);
  };

  return (
    <View style={styles.section}>
      {/* Section Header with "See All" trigger */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionLabel}>SELECT BEAT SAMPLE</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.seeAllBtn}>
          <Text style={styles.seeAllText}>Explore Deezer Library</Text>
          <Ionicons name="chevron-forward" size={14} color="#00F0FF" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Carousel Preview */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.beatCarousel}>
        {beats.map((beat) => {
          const isSelected = beat.id === selectedBeat.id;
          return (
            <TouchableOpacity
              key={beat.id}
              style={[styles.beatCard, isSelected && styles.beatCardSelected]}
              onPress={() => onSelectBeat(beat)}
              activeOpacity={0.8}
            >
              <View style={styles.beatCardHeader}>
                <Ionicons
                  name="musical-notes"
                  size={20}
                  color={isSelected ? '#00F0FF' : 'rgba(255,255,255,0.4)'}
                />
                <Text style={styles.bpmText}>{beat.bpm} BPM</Text>
              </View>
              <Text style={styles.beatTitle} numberOfLines={1}>
                {beat.title}
              </Text>
              <Text style={styles.beatArtist}>{beat.artist}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Full-Screen Deezer Beat Library Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Ionicons name="close" size={26} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Deezer Music Library</Text>
            <View style={{ width: 26 }} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.4)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Deezer tracks or artists..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>
            )}
          </View>

          {/* Genre Filter Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreRow}>
            {GENRES.map((genre) => (
              <TouchableOpacity
                key={genre}
                style={[styles.genrePill, selectedGenre === genre && styles.genrePillActive]}
                onPress={() => setSelectedGenre(genre)}
              >
                <Text
                  style={[
                    styles.genreText,
                    selectedGenre === genre && styles.genreTextActive,
                  ]}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Beat List / Loading State */}
          {loadingDeezer ? (
            <ActivityIndicator color="#00F0FF" size="large" style={{ marginTop: 50 }} />
          ) : (
            <FlatList
              data={deezerTracks}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.beatList}
              renderItem={({ item }) => {
                const isSelected = item.id === selectedBeat.id;
                return (
                  <TouchableOpacity
                    style={[styles.modalBeatItem, isSelected && styles.modalBeatItemActive]}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.artworkBox,
                        { backgroundColor: item.artworkColor || '#A736FF30' },
                      ]}
                    >
                      <Ionicons name="disc" size={24} color={isSelected ? '#00F0FF' : '#A736FF'} />
                    </View>

                    <View style={styles.beatInfo}>
                      <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                      <Text style={styles.itemArtist} numberOfLines={1}>{item.artist}</Text>
                      <View style={styles.metaRow}>
                        <Text style={styles.metaBadge}>30s Preview</Text>
                        <Text style={styles.metaBadge}>{item.genre}</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.useBeatBtn} onPress={() => handleSelect(item)}>
                      <Text style={[styles.useBeatText, isSelected && styles.useBeatTextActive]}>
                        {isSelected ? 'SELECTED' : 'USE BEAT'}
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    color: '#A736FF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#00F0FF',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  beatCarousel: {
    flexDirection: 'row',
  },
  beatCard: {
    width: width * 0.45,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  beatCardSelected: {
    borderColor: '#00F0FF',
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
  },
  beatCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bpmText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontWeight: '600',
  },
  beatTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  beatArtist: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#120E1F',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeBtn: {
    padding: 4,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 14,
  },
  genreRow: {
    flexGrow: 0,
    marginBottom: 20,
  },
  genrePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  genrePillActive: {
    backgroundColor: '#A736FF',
    borderColor: '#A736FF',
  },
  genreText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  genreTextActive: {
    color: '#FFFFFF',
  },
  beatList: {
    paddingBottom: 40,
  },
  modalBeatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  modalBeatItemActive: {
    borderColor: '#00F0FF',
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
  },
  artworkBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  beatInfo: {
    flex: 1,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemArtist: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 6,
  },
  metaBadge: {
    color: '#A736FF',
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(167, 54, 255, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  useBeatBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  useBeatText: {
    color: '#00F0FF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  useBeatTextActive: {
    color: '#FF007F',
  },
});