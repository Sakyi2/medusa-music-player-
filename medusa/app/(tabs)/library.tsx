// app/(tabs)/library.tsx
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import LibraryScreen from '../../src/screens/LibraryScreen';
import ProfileDrawer from '../../src/components/ProfileDrawer';
import RecentsScreen from '../../src/screens/profile-screens/RecentsScreen';
import ListeningStatsScreen from '../../src/screens/profile-screens/ListeningStatsScreen';
import DetailViewScreen from '../../src/screens/DetailViewScreen';
import PlayerScreen from '../../src/screens/PlayerScreen';
import SettingsScreen from '../../src/screens/profile-screens/SettingsScreen';
import UpdatesScreen from '../../src/screens/profile-screens/UpdatesScreen';   // 👈 Import existing Updates screen

function ProfileScreen({ onBackPress }: { onBackPress: () => void }) {
  return (
    <View style={styles.profileScreen}>
      <Pressable onPress={onBackPress} accessibilityRole="button">
        <Text style={styles.backButton}>Back</Text>
      </Pressable>
      <Text style={styles.profileTitle}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileScreen: { flex: 1, padding: 24 },
  backButton: { fontSize: 16, marginBottom: 24 },
  profileTitle: { fontSize: 24, fontWeight: 'bold' },
});

export default function LibraryRoute() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  
  // Local state machine controlling sub-screen views inside Library tab
  const [currentView, setCurrentView] = useState<'main' | 'recents' | 'listeningStats' | 'detail' | 'player' | 'settings' | 'profile' | 'updates'>('main');
  const [selectedItem, setSelectedItem] = useState<{ title: string; subtitle: string; image: string } | null>(null);
  const [activeSong, setActiveSong] = useState<any>(null);

  // 1. Recents View
  if (currentView === 'recents') {
    return (
      <RecentsScreen
        onBackPress={() => setCurrentView('main')}
        onItemPress={(item) => {
          setSelectedItem({ title: item.title, subtitle: item.subtitle, image: item.image });
          setCurrentView('detail');
        }}
      />
    );
  }

  // 2. Listening Stats View
  if (currentView === 'listeningStats') {
    return (
      <ListeningStatsScreen
        onBackPress={() => setCurrentView('main')}
        onArtistPress={(artist) => {
          setSelectedItem({ title: artist.name, subtitle: artist.subtitle || 'Artist', image: artist.image });
          setCurrentView('detail');
        }}
      />
    );
  }

  // 3. Detail View
  if (currentView === 'detail') {
    return (
      <DetailViewScreen
        playlistData={selectedItem}
        onBackPress={() => setCurrentView('main')}
        onSongPress={(song) => {
          setActiveSong(song);
          setCurrentView('player');
        }}
      />
    );
  }

  // 4. Player View
  if (currentView === 'player') {
    return (
      <PlayerScreen
        songData={activeSong}
        onBackPress={() => setCurrentView('main')}
      />
    );
  }

  // 5. Settings & Privacy View
  if (currentView === 'settings') {
    return (
      <SettingsScreen
        onBackPress={() => setCurrentView('main')}
      />
    );
  }

  // 6. User Profile View
  if (currentView === 'profile') {
    return (
      <ProfileScreen
        onBackPress={() => setCurrentView('main')}
      />
    );
  }

  // 7. Updates Screen View
  if (currentView === 'updates') {
    return (
      <UpdatesScreen
        onBackPress={() => setCurrentView('main')}
      />
    );
  }

  // Default: Main Library Screen
  return (
    <>
      <LibraryScreen 
        onProfilePress={() => setDrawerVisible(true)}
        onSongPress={(song: { title: string; subtitle: string; image: string }) => {
          setSelectedItem(song);
          setCurrentView('detail');
        }}
        onItemPress={(item: { title: string; subtitle: string; image: string }) => {
          setSelectedItem(item);
          setCurrentView('detail');
        }}
      />

      {/* Profile Sidebar Drawer */}
      <ProfileDrawer 
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)}
        onViewProfile={() => {
          setDrawerVisible(false);
          setCurrentView('profile');
        }}
        onListeningStats={() => {
          setDrawerVisible(false);
          setCurrentView('listeningStats');
        }}
        onRecents={() => {
          setDrawerVisible(false);
          setCurrentView('recents');
        }}
        onUpdates={() => {
          setDrawerVisible(false);
          setCurrentView('updates'); // 👈 Renders your actual UpdatesScreen!
        }}
        onSettings={() => {
          setDrawerVisible(false);
          setCurrentView('settings');
        }}
        onToggleActivity={() => {
          Alert.alert("Activity", "Toggled listening activity sharing");
        }}
        onInviteFriends={() => {
          Alert.alert("Invite", "Share Medusa link with friends");
        }}
        onNewMessage={() => {
          Alert.alert("Messages", "Starting a new social message");
        }}
        onLogout={() => {
          Alert.alert("Logged Out", "You have been logged out of Medusa");
        }}
      />
    </>
  );
}