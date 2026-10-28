// src/screens/LibraryScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// --- Animated Create Menu Modal Component ---
function CreatePlaylistModal({ visible, onClose, onSelectOption }) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, damping: 20, stiffness: 90, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: height, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const options = [
    { id: 'playlist', title: 'Playlist', subtitle: 'Build a custom mix of your favorite tracks', icon: 'musical-notes-outline', color: '#A736FF' },
    { id: 'collaborative', title: 'Collaborative Playlist', subtitle: 'Build a playlist with friends in real-time', icon: 'people-outline', color: '#00F0FF' },
    { id: 'blend', title: 'Blend', subtitle: 'Combine tastes with another music junkie', icon: 'git-compare-outline', color: '#FF007F' },
    { id: 'folder', title: 'Folder', subtitle: 'Organize your playlists neatly into sections', icon: 'folder-outline', color: '#FFB800' },
  ];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.handleBar} />
          <Text style={styles.modalHeaderTitle}>Create New</Text>
          <View style={styles.optionsList}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => {
                  onSelectOption(opt.id);
                  onClose();
                }}
              >
                <View style={[styles.iconBox, { borderColor: opt.color, backgroundColor: `${opt.color}15` }]}>
                  <Ionicons name={opt.icon} size={22} color={opt.color} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{opt.title}</Text>
                  <Text style={styles.optionSubtitle}>{opt.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="rgba(255, 255, 255, 0.3)" />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// --- Main Library Screen Component ---
export default function LibraryScreen({ onItemPress, onSongPress, onProfilePress }) {
  const [activeTab, setActiveTab] = useState('playlists'); // 'playlists', 'artists', 'albums', 'downloaded'
  const [isGrid, setIsGrid] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  
  // Search state variables
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Animated fade & slide value for top section load
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  // Mock Library Data
  const playlists = [
    { id: 'liked', title: 'Liked Songs', subtitle: 'Playlist • 128 songs', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', isPinned: true, isLiked: true },
    { id: 'cyberpunk_radio', title: 'Cyberpunk Synthwave 2077', subtitle: 'Playlist • Medusa Audio', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad' },
    { id: 'heavy_rotation', title: 'High Voltage Bass', subtitle: 'Playlist • 42 tracks', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
    { id: 'afro_future', title: 'Afro-Futurism Beats', subtitle: 'Playlist • Updated yesterday', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
  ];

  const artists = [
    { id: 'art_1', title: 'SAINt JHN', subtitle: 'Artist • 3.2M Followers', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', isArtist: true },
    { id: 'art_2', title: 'The Weeknd', subtitle: 'Artist • 85M Monthly Listeners', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', isArtist: true },
  ];

  const handleSelect = (item) => {
    if (onItemPress) {
      onItemPress(item);
    }
  };

  const currentList = activeTab === 'artists' ? artists : playlists;

  // Filter items based on live search query
  const filteredList = currentList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Top Header or Search Input Header */}
      {!isSearching ? (
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity onPress={onProfilePress} style={styles.profileAvatar}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' }} style={styles.avatarImg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Library</Text>
          
          <View style={styles.headerRightActions}>
            {/* Search Icon Toggles Search Bar */}
            <TouchableOpacity style={styles.iconBtn} onPress={() => setIsSearching(true)}>
              <Ionicons name="search" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconBtn} onPress={() => setCreateModalVisible(true)}>
              <Ionicons name="add" size={26} color="#A736FF" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <View style={styles.searchHeader}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={18} color="#A736FF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search in Library..."
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            onPress={() => {
              setIsSearching(false);
              setSearchQuery('');
            }} 
            style={styles.cancelBtn}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Filter Category Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
        {['playlists', 'artists', 'albums', 'downloaded'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.chip, activeTab === tab && styles.activeChip]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipText, activeTab === tab && styles.activeChipText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Layout Toolbar (Sort & Grid/List Switcher) */}
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.sortBtn}>
          <Ionicons name="swap-vertical" size={16} color="rgba(255,255,255,0.6)" />
          <Text style={styles.sortText}>Recents</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsGrid(!isGrid)} style={styles.iconBtn}>
          <Ionicons name={isGrid ? 'list' : 'grid-outline'} size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      {/* Main Content List / Grid */}
      <ScrollView contentContainerStyle={[styles.scrollContent, isGrid && styles.gridContent]} showsVerticalScrollIndicator={false}>
        {filteredList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="rgba(255, 255, 255, 0.2)" />
            <Text style={styles.emptyText}>No matching items found</Text>
          </View>
        ) : (
          filteredList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={isGrid ? styles.gridCard : styles.listRow}
              activeOpacity={0.7}
              onPress={() => handleSelect(item)}
            >
              <View style={isGrid ? styles.gridImageWrapper : styles.listImageWrapper}>
                <Image
                  source={{ uri: item.image }}
                  style={[isGrid ? styles.gridImage : styles.listImage, item.isArtist && styles.artistCircle]}
                />
                {item.isLiked && (
                  <View style={styles.likedBadge}>
                    <Ionicons name="heart" size={12} color="#FFFFFF" />
                  </View>
                )}
              </View>

              <View style={isGrid ? styles.gridDetails : styles.listDetails}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.subRow}>
                  {item.isPinned && (
                    <Ionicons name="pin" size={12} color="#A736FF" style={{ marginRight: 4 }} />
                  )}
                  <Text style={styles.itemSubtitle} numberOfLines={1}>{item.subtitle}</Text>
                </View>
              </View>

              {!isGrid && (
                <TouchableOpacity style={styles.moreIcon}>
                  <Ionicons name="ellipsis-vertical" size={18} color="rgba(255,255,255,0.4)" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Animated Create Playlist / Folder Modal */}
      <CreatePlaylistModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSelectOption={(optionId) => {
          console.log('Selected creation option:', optionId);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E1F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E172C',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  cancelBtn: {
    paddingVertical: 6,
  },
  cancelText: {
    color: '#A736FF',
    fontSize: 14,
    fontWeight: '600',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#A736FF',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  chipScroll: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 10,
    maxHeight: 52,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
  },
  activeChip: {
    backgroundColor: '#A736FF',
    borderColor: '#A736FF',
  },
  chipText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 100,
    gap: 16,
  },
  gridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 8,
  },
  listImageWrapper: {
    position: 'relative',
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  gridCard: {
    width: (width - 48) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.15)',
  },
  gridImageWrapper: {
    width: '100%',
    height: (width - 48) / 2 - 20,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  artistCircle: {
    borderRadius: 50,
  },
  likedBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#22C55E',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listDetails: {
    flex: 1,
    marginLeft: 14,
    gap: 4,
  },
  gridDetails: {
    marginTop: 10,
    gap: 4,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  moreIcon: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 15,
  },
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    backgroundColor: '#161026',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(167, 54, 255, 0.35)',
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  optionsList: {
    gap: 14,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 14,
    gap: 2,
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  optionSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});