import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Keyboard,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Deezer API service functions
import * as musicApi from '../../src/services/musicApi';

import DiscoverSection from '../../src/components/search/DiscoverSection';
import BrowseGrid from '../../src/components/search/BrowseGrid';
import ScannerModal from '../../src/components/search/ScannerModal';
import ProfileDrawer from '../../src/components/ProfileDrawer';
import { supabase } from '../../src/api/supabase';

type Song = {
  id: string | number;
  title: string;
  artist: string;
  albumCover?: string | null;
  audioUrl?: string | null;
  duration?: number;
};

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const recentSearches: Song[] = [
    { id: '1', title: 'Nasty C', artist: 'Artist', albumCover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
    { id: '2', title: 'Best of Kwesi Arthur', artist: 'Playlist', albumCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' },
  ];

  // Live Deezer Search API Handler
  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      // Check if searchTracks exists in musicApi, fallback to fetchMusicByGenre or fetch
      const searchFn = (musicApi as any).searchTracks || (musicApi as any).fetchMusicByGenre;
      let rawResults = [];

      if (typeof searchFn === 'function') {
        rawResults = await searchFn(text);
      } else {
        // Fallback directly to Deezer public API endpoint
        const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(text)}`);
        const json = await response.json();
        rawResults = json.data || [];
      }

      // Map raw Deezer track data into normalized Medusa song objects
      const formattedSongs: Song[] = rawResults.map((item: any) => ({
        id: item.id,
        title: item.title || item.name || 'Unknown Track',
        artist: typeof item.artist === 'object' ? item.artist?.name : (item.artist || 'Unknown Artist'),
        albumCover: item.albumCover || item.album?.cover_medium || item.album?.cover || item.image || item.picture,
        audioUrl: item.audioUrl || item.preview || item.uri,
        duration: item.duration || 30,
      }));

      setSearchResults(formattedSongs);
    } catch (error) {
      console.error('Error searching Deezer API:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  // Play track and pass full search result array as queue for Next/Prev skipping
  const playTrackFromSearch = (selectedSong: Song) => {
    const serializedPlaylist = JSON.stringify(searchResults);

    router.push({
      pathname: '/player',
      params: {
        id: selectedSong.id,
        title: selectedSong.title,
        artist: selectedSong.artist,
        albumCover: selectedSong.albumCover || '',
        audioUrl: selectedSong.audioUrl || '',
        duration: selectedSong.duration || 30,
        playlist: serializedPlaylist, // Keeps queue skipping active for search
      },
    });
  };

  const safeNavigate = (path: string) => {
    setIsDrawerOpen(false);
    try {
      router.push(path as any);
    } catch (err) {
      console.warn(`Route ${path} is not defined in your app directory yet.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      {!isFocused && (
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={() => setIsDrawerOpen(true)} 
              activeOpacity={0.7}
              style={styles.avatarContainer}
            >
              <Text style={styles.avatarText}>I</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Search</Text>
          </View>
          <TouchableOpacity onPress={() => setShowScanner(true)} style={styles.cameraBtn}>
            <Feather name="camera" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Cyber Search Bar */}
      <View style={styles.searchBarRow}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={22} color="#A736FF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="What do you want to listen to?"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={searchQuery}
            onChangeText={handleSearch}
            onFocus={() => setIsFocused(true)}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearIcon}>
              <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          )}
        </View>
        {isFocused && (
          <TouchableOpacity onPress={cancelSearch} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content Area */}
      {searchQuery.trim() === '' ? (
        isFocused ? (
          <View style={styles.recentContainer}>
            <Text style={styles.sectionTitle}>Recent searches</Text>
            <FlatList
              data={recentSearches}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.songRow}>
                  <Image source={{ uri: item.albumCover || '' }} style={styles.thumbnailCircle} />
                  <View style={styles.songDetails}>
                    <Text style={styles.rowTitle}>{item.title}</Text>
                    <Text style={styles.rowSubtitle}>{item.artist}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <DiscoverSection />
            <BrowseGrid />
          </ScrollView>
        )
      ) : (
        <View style={styles.recentContainer}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#A736FF" />
              <Text style={styles.infoText}>Searching live frequency...</Text>
            </View>
          ) : searchResults.length === 0 ? (
            <Text style={styles.infoText}>No tracks found for "{searchQuery}"</Text>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item, idx) => `${item.id}-${idx}`}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.songRow} onPress={() => playTrackFromSearch(item)}>
                  <Image source={{ uri: item.albumCover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' }} style={styles.thumbnailSquare} />
                  <View style={styles.songDetails}>
                    <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.rowSubtitle} numberOfLines={1}>{item.artist}</Text>
                  </View>
                  <Ionicons name="play-circle-outline" size={26} color="#A736FF" />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}

      {/* Camera Modal */}
      <ScannerModal visible={showScanner} onClose={() => setShowScanner(false)} />

      {/* Profile Drawer */}
      <ProfileDrawer 
        visible={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onViewProfile={() => safeNavigate('/profile')}
        onListeningStats={() => safeNavigate('/drawer/stats')}
        onRecents={() => safeNavigate('/drawer/recents')}
        onUpdates={() => safeNavigate('/drawer/updates')}
        onSettings={() => safeNavigate('/drawer/settings')}
        onLogout={async () => {
          setIsDrawerOpen(false);
          await supabase.auth.signOut();
          router.replace('/');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#120E1F' },
  topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarContainer: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#A736FF', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  cameraBtn: { padding: 4 },
  searchBarRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16, width: '100%' },
  searchInputWrapper: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#1E172C', 
    borderRadius: 10, 
    paddingHorizontal: 12, 
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)'
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 15, fontWeight: '500', height: '100%' },
  clearIcon: { padding: 4 },
  cancelBtn: { marginLeft: 12, paddingVertical: 6 },
  cancelText: { color: '#A736FF', fontSize: 15, fontWeight: '600' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  sectionTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 14 },
  recentContainer: { flex: 1, paddingHorizontal: 16 },
  songRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 8 },
  thumbnailCircle: { width: 48, height: 48, borderRadius: 24 },
  thumbnailSquare: { width: 48, height: 48, borderRadius: 6, backgroundColor: '#261E38' },
  songDetails: { marginLeft: 14, flex: 1, gap: 2 },
  rowTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  rowSubtitle: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 13 },
  loaderContainer: { alignItems: 'center', gap: 8, marginTop: 24 },
  infoText: { color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', fontSize: 14, marginTop: 8 },
});