// src/screens/ProfileScreen.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Image,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EditProfileModal from '../components/profile/EditProfileModal';
import ShareProfileModal from '../components/profile/ShareProfileModal';
import SettingsPrivacyModal from '../components/profile/SettingsPrivacyModal';
import ProfileOptionsModal from '../components/profile/ProfileOptionsModal';
import ManagePlaylistsScreen from './ManagePlaylistsScreen'; // <-- Import Manage Playlists Screen

export default function ProfileScreen({ onBackPress }) {
  const [profileName, setProfileName] = useState('iceboy');
  const [avatarUri, setAvatarUri] = useState(null);
  
  // View & Sub-view states
  const [currentSubView, setCurrentSubView] = useState('profile'); // 'profile' or 'managePlaylists'
  
  // Playlists state for dynamic management
  const [playlists, setPlaylists] = useState([
    { id: '1', name: 'Freest', visibility: 'Public', owner: 'iceboy' },
    { id: '2', name: 'WizKid: Morayo', visibility: 'Public', owner: 'WizKid' }
  ]);
  
  // Modals state visibility
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  
  // Extra states
  const [isPreviewMode, setIsPreviewMode] = useState(false); // Shows profile from a viewer's perspective

  // If subview is managing playlists, render that screen
  if (currentSubView === 'managePlaylists') {
    return (
      <ManagePlaylistsScreen 
        onBackPress={() => setCurrentSubView('profile')}
        playlists={playlists}
        onRemovePlaylist={(id) => {
          setPlaylists(playlists.filter(p => p.id !== id));
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Row */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        {isPreviewMode && (
          <View style={styles.previewBadge}>
            <Text style={styles.previewBadgeText}>Viewer Preview Mode</Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* User Info Section */}
        <View style={styles.profileSection}>
          <View style={styles.largeAvatar}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.largeAvatarText}>{profileName ? profileName[0].toUpperCase() : 'I'}</Text>
            )}
          </View>
          <Text style={styles.profileName}>{profileName}</Text>
          <Text style={styles.statsText}>0 followers • 14 following</Text>
        </View>

        {/* Action Buttons Row (Hidden if viewing user preview mode) */}
        {!isPreviewMode && (
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={styles.editButton} 
              activeOpacity={0.8}
              onPress={() => setIsEditModalVisible(true)}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionIconBtn} 
              activeOpacity={0.8}
              onPress={() => setIsShareModalVisible(true)}
            >
              <Ionicons name="share-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionIconBtn} 
              activeOpacity={0.8} 
              onPress={() => setIsSettingsModalVisible(true)}
            >
              <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Three Dots Button Trigger */}
            <TouchableOpacity 
              style={styles.actionIconBtn} 
              activeOpacity={0.8}
              onPress={() => setIsOptionsModalVisible(true)}
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* If in Preview Mode, show a Follow button instead */}
        {isPreviewMode && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.followButton} activeOpacity={0.8}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exitPreviewBtn} onPress={() => setIsPreviewMode(false)}>
              <Text style={styles.exitPreviewText}>Exit Preview</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Playlists Section Header */}
        <View style={styles.playlistHeaderRow}>
          <Text style={styles.sectionTitle}>Playlists</Text>
          {!isPreviewMode && (
            <TouchableOpacity 
              style={styles.manageRow} 
              activeOpacity={0.8}
              onPress={() => setCurrentSubView('managePlaylists')}
            >
              <Ionicons name="pencil-outline" size={14} color="#FFFFFF" />
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Playlist Cards Feed */}
        <View style={styles.playlistsListContainer}>
          {playlists.map((playlist) => (
            <View key={playlist.id} style={styles.playlistCard}>
              <View style={styles.playlistThumb}>
                <Ionicons name="musical-notes-outline" size={24} color="rgba(255,255,255,0.4)" />
              </View>
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistName}>{playlist.name}</Text>
                <Text style={styles.playlistDetails}>0 saves • {playlist.owner}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                Alert.alert(
                  playlist.name,
                  "Playlist options",
                  [
                    { text: "Remove from profile", onPress: () => setPlaylists(playlists.filter(p => p.id !== playlist.id)) },
                    { text: "Cancel", style: "cancel" }
                  ]
                );
              }}>
                <Ionicons name="ellipsis-horizontal" size={20} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Edit Profile Modal Popup */}
      <EditProfileModal 
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        currentName={profileName}
        currentAvatar={avatarUri}
        onSave={(newName, newAvatar) => {
          setProfileName(newName);
          if (newAvatar) setAvatarUri(newAvatar);
        }}
      />

      {/* Share Profile Modal Popup */}
      <ShareProfileModal 
        visible={isShareModalVisible}
        onClose={() => setIsShareModalVisible(false)}
        username={profileName}
      />

      {/* Settings & Privacy Modal Popup */}
      <SettingsPrivacyModal 
        visible={isSettingsModalVisible}
        onClose={() => setIsSettingsModalVisible(false)}
      />

      {/* Three-Dots Options Bottom Sheet Modal */}
      <ProfileOptionsModal 
        visible={isOptionsModalVisible}
        onClose={() => setIsOptionsModalVisible(false)}
        username={profileName}
        onHideActivity={() => {
          Alert.alert("Activity Hidden", "Your listening activity is now hidden from public feeds.");
        }}
        onPreviewProfile={() => {
          setIsPreviewMode(true);
        }}
        onShowMedusaCode={() => {
          Alert.alert("Medusa Code", `Scan this unique audio frequency code for user: @${profileName}`);
        }}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewBadge: {
    backgroundColor: 'rgba(167, 54, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A736FF',
  },
  previewBadgeText: {
    color: '#A736FF',
    fontSize: 11,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 24,
  },
  profileSection: {
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  largeAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  largeAvatarText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  actionIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  followButton: {
    backgroundColor: '#A736FF',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  exitPreviewBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  exitPreviewText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '500',
  },
  playlistHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  manageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  manageText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  playlistsListContainer: {
    gap: 12,
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#231D35',
    padding: 12,
    borderRadius: 12,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.15)',
  },
  playlistThumb: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistInfo: {
    flex: 1,
    gap: 4,
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
});