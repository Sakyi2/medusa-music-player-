// src/screens/ManagePlaylistsScreen.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ManagePlaylistsScreen({ onBackPress, playlists, onRemovePlaylist }) {
  const [selectedIds, setSelectedIds] = useState([]);

  // Toggle selection for a single playlist
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Select or Deselect all playlists
  const handleSelectAll = () => {
    if (selectedIds.length === playlists.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(playlists.map(p => p.id));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Row */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Title & Subtitle */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Playlists on your profile</Text>
          <Text style={styles.subtitle}>
            Select which playlists to remove from your profile. New playlists are shown by default. <Text style={styles.linkText}>Manage</Text>
          </Text>
        </View>

        {/* Select All Button */}
        <TouchableOpacity style={styles.selectAllBtn} activeOpacity={0.8} onPress={handleSelectAll}>
          <Ionicons 
            name={selectedIds.length === playlists.length ? "checkmark-circle" : "checkmark-circle-outline"} 
            size={18} 
            color="#FFFFFF" 
          />
          <Text style={styles.selectAllText}>Select all</Text>
        </TouchableOpacity>

        {/* Playlists List */}
        <View style={styles.listContainer}>
          {playlists.map((playlist) => {
            const isSelected = selectedIds.includes(playlist.id);
            return (
              <View key={playlist.id} style={styles.playlistRow}>
                {/* Selection Checkbox */}
                <TouchableOpacity onPress={() => toggleSelect(playlist.id)} style={styles.checkboxContainer}>
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Ionicons name="checkmark" size={12} color="#191426" />}
                  </View>
                </TouchableOpacity>

                {/* Thumbnail & Info */}
                <View style={styles.playlistThumb}>
                  <Ionicons name="musical-notes-outline" size={22} color="rgba(255,255,255,0.4)" />
                </View>

                <View style={styles.playlistInfo}>
                  <Text style={styles.playlistName}>{playlist.name}</Text>
                  <Text style={styles.playlistDetails}>
                    <Ionicons name="globe-outline" size={11} color="rgba(255,255,255,0.5)" /> {playlist.visibility} • {playlist.owner}[cite: 6]
                  </Text>
                </View>

                {/* Three Dot Options Menu */}
                <TouchableOpacity 
                  onPress={() => {
                    Alert.alert(
                      "Playlist Options",
                      `Manage "${playlist.name}"`,
                      [
                        { text: "Remove from profile", onPress: () => onRemovePlaylist(playlist.id) },
                        { text: "Remove from your library", style: 'destructive', onPress: () => onRemovePlaylist(playlist.id) },
                        { text: "Cancel", style: "cancel" }
                      ]
                    );
                  }}
                  style={styles.moreButton}
                >
                  <Ionicons name="ellipsis-horizontal" size={20} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191426', // Medusa Dark Purple
  },
  topNav: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 20,
  },
  headerSection: {
    gap: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    lineHeight: 18,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  selectAllText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  listContainer: {
    gap: 16,
    marginTop: 4,
  },
  playlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  checkboxContainer: {
    padding: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  playlistThumb: {
    width: 50,
    height: 50,
    backgroundColor: '#231D35',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.15)',
  },
  playlistInfo: {
    flex: 1,
    gap: 3,
  },
  playlistName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  playlistDetails: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  moreButton: {
    padding: 8,
  },
});