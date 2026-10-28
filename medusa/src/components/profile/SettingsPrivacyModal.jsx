// src/components/profile/SettingsPrivacyModal.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  Switch, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsPrivacyModal({ visible, onClose }) {
  // Toggle states matching the layout preferences
  const [privateSession, setPrivateSession] = useState(false);
  const [listeningActivity, setListeningActivity] = useState(true);
  const [recentArtists, setRecentArtists] = useState(true);
  const [publicPlaylists, setPublicPlaylists] = useState(true);
  const [followersVisible, setFollowersVisible] = useState(true);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.safeArea}>
            
            {/* Header */}
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Privacy and social</Text>
              <View style={{ width: 26 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              
              {/* Listening visibility section */}
              <Text style={styles.sectionHeader}>Listening visibility</Text>

              <View style={styles.settingItem}>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Private session</Text>
                  <Text style={styles.settingDesc}>Temporarily hides your listening activity everywhere, and ends after 6 hours[cite: 3].</Text>
                </View>
                <Switch 
                  trackColor={{ false: '#3E3454', true: '#A736FF' }}
                  thumbColor={'#FFFFFF'}
                  value={privateSession}
                  onValueChange={setPrivateSession}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Listening activity</Text>
                  <Text style={styles.settingDesc}>People on Medusa can see the music you're playing, stats on how your tastes compare[cite: 3].</Text>
                </View>
                <Switch 
                  trackColor={{ false: '#3E3454', true: '#A736FF' }}
                  thumbColor={'#FFFFFF'}
                  value={listeningActivity}
                  onValueChange={setListeningActivity}
                />
              </View>

              <TouchableOpacity style={styles.settingItemRow} activeOpacity={0.7}>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Who can view your activity</Text>
                  <Text style={styles.settingDescValue}>No one[cite: 3]</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>

              <View style={styles.settingItem}>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Recently played artists</Text>
                  <Text style={styles.settingDesc}>People can see who you recently listened to on your profile[cite: 3].</Text>
                </View>
                <Switch 
                  trackColor={{ false: '#3E3454', true: '#A736FF' }}
                  thumbColor={'#FFFFFF'}
                  value={recentArtists}
                  onValueChange={setRecentArtists}
                />
              </View>


              {/* Playlist visibility section */}
              <Text style={[styles.sectionHeader, { marginTop: 10 }]}>Playlist visibility</Text>

              <View style={styles.settingItem}>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Public playlists</Text>
                  <Text style={styles.settingDesc}>New playlists you create will be viewable by others by default and can be added to your profile[cite: 3].</Text>
                </View>
                <Switch 
                  trackColor={{ false: '#3E3454', true: '#25D366' }}
                  thumbColor={'#FFFFFF'}
                  value={publicPlaylists}
                  onValueChange={setPublicPlaylists}
                />
              </View>

              <Text style={styles.footerNote}>
                Only playlists that you make after changing this setting will be affected[cite: 3].
              </Text>


              {/* What others can see section */}
              <Text style={[styles.sectionHeader, { marginTop: 10 }]}>What others can see</Text>

              <View style={styles.settingItem}>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Followers and following</Text>
                  <Text style={styles.settingDesc}>People can see who's following you and who you're following[cite: 4].</Text>
                </View>
                <Switch 
                  trackColor={{ false: '#3E3454', true: '#25D366' }}
                  thumbColor={'#FFFFFF'}
                  value={followersVisible}
                  onValueChange={setFollowersVisible}
                />
              </View>

            </ScrollView>

          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#191426',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(167, 54, 255, 0.3)',
    height: '90%',
    padding: 20,
  },
  safeArea: {
    flex: 1,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 40,
    gap: 20,
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  settingItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  settingTextContainer: {
    flex: 1,
    gap: 4,
  },
  settingTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  settingDesc: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    lineHeight: 16,
  },
  settingDescValue: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
  },
  footerNote: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    lineHeight: 15,
    marginTop: -8,
  },
});