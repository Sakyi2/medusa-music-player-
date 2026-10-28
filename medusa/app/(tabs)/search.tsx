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
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// 2 levels up from app/(tabs)/ to reach src/
import { supabase } from '../../src/api/supabase';
import { playTrack } from '../../src/services/audioService';

import DiscoverSection from '../../src/components/search/DiscoverSection';
import BrowseGrid from '../../src/components/search/BrowseGrid';
import ScannerModal from '../../src/components/search/ScannerModal';
import ProfileDrawer from '../../src/components/ProfileDrawer';

type Song = {
  id: string | number;
  title: string;
  artist: string;
  artwork_url?: string | null;
  audio_url?: string | null;
  isVerified?: boolean;
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
    { id: '1', title: 'Nasty C', artist: 'Artist', artwork_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', isVerified: true },
    { id: '2', title: 'Best of Kwesi Arthur', artist: 'Playlist', artwork_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' },
  ];

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') return setSearchResults([]);

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .or(`title.ilike.%${text}%,artist.ilike.%${text}%`);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching:', error);
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

  // Helper function to safely navigate only if route exists
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
      {/* Header */}
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

      {/* Search Bar */}
      <View style={styles.searchBarRow}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={22} color="#121212" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="What do you want to listen to?"
            placeholderTextColor="#535353"
            value={searchQuery}
            onChangeText={handleSearch}
            onFocus={() => setIsFocused(true)}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
              <Ionicons name="close-circle" size={18} color="#535353" />
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
                  <Image source={{ uri: item.artwork_url || '' }} style={styles.thumbnailCircle} />
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
          {loading && <Text style={styles.infoText}>Searching...</Text>}
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.songRow} onPress={() => playTrack(item.audio_url || '')}>
                <Image source={{ uri: item.artwork_url || '' }} style={styles.thumbnailSquare} />
                <View style={styles.songDetails}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowSubtitle}>{item.artist}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Scanner Camera Popup */}
      <ScannerModal visible={showScanner} onClose={() => setShowScanner(false)} />

      {/* Profile Drawer Overlay */}
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
  container: { flex: 1, backgroundColor: '#121212' },
  topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarContainer: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#C87D55', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  cameraBtn: { padding: 4 },
  searchBarRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16, width: '100%' },
  searchInputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: 12, height: 48 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#000000', fontSize: 15, fontWeight: '500', height: '100%' },
  clearIcon: { padding: 4 },
  cancelBtn: { marginLeft: 12, paddingVertical: 6 },
  cancelText: { color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  sectionTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 14 },
  recentContainer: { flex: 1, paddingHorizontal: 16 },
  songRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  thumbnailCircle: { width: 48, height: 48, borderRadius: 24 },
  thumbnailSquare: { width: 48, height: 48, borderRadius: 6 },
  songDetails: { marginLeft: 14, flex: 1 },
  rowTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  rowSubtitle: { color: '#B3B3B3', fontSize: 13, marginTop: 2 },
  infoText: { color: '#B3B3B3', textAlign: 'center', fontSize: 14, marginTop: 20 },
});