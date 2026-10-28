// src/screens/HomeScreen.jsx
import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import Header from '../components/Header';
import MixCard from '../components/MixCard';
import QuickAccessGrid from '../components/QuickAccessGrid';
import SongRow from '../components/SongRow';
import ProfileDrawer from '../components/ProfileDrawer';
import ProfileScreen from './ProfileScreen';
import ListeningStatsScreen from './profile-screens/ListeningStatsScreen';
import MinutesListenedDetailScreen from './MinutesListenedDetailScreen';
import TopArtistsDetailScreen from './TopArtistsDetailScreen';
import DetailViewScreen from './DetailViewScreen';
import PlayerScreen from './PlayerScreen';
import SettingsScreen from './profile-screens/SettingsScreen';
import SeeAllListScreen from './SeeAllListScreen';
import ChartsHubScreen from './ChartsHubScreen';
import RecentsScreen from './profile-screens/RecentsScreen';
import UpdatesScreen from './profile-screens/UpdatesScreen'; // 👈 Imported UpdatesScreen

export default function HomeScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 
  const [previousView, setPreviousView] = useState('home'); // 👈 Tracks where we came from for clean back buttons
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [activeSong, setActiveSong] = useState(null);
  const [seeAllTitle, setSeeAllTitle] = useState('');

  // If user navigated to the Profile Screen
  if (currentView === 'profile') {
    return (
      <ProfileScreen 
        onBackPress={() => setCurrentView('home')} 
        onSettingsPress={() => setCurrentView('settings')}
      />
    );
  }

  // If user navigated to the Recents Screen from Profile Drawer
  if (currentView === 'recents') {
    return (
      <RecentsScreen 
        onBackPress={() => setCurrentView('home')} 
        onSongPress={(song) => {
          setActiveSong(song);
          setCurrentView('player');
        }}
        onItemPress={(item) => {
          setSelectedPlaylist({ 
            title: item.title, 
            subtitle: item.subtitle, 
            image: item.image 
          });
          setPreviousView('recents');
          setCurrentView('detailView');
        }}
      />
    );
  }

  // If user navigated to the Updates Screen from Profile Drawer
  if (currentView === 'updates') {
    return (
      <UpdatesScreen 
        onBackPress={() => setCurrentView('home')} 
      />
    );
  }

  // If user navigated to the Listening Stats Screen
  if (currentView === 'listeningStats') {
    return (
      <ListeningStatsScreen 
        onBackPress={() => setCurrentView('home')} 
        onMinutesListenedPress={() => setCurrentView('minutesDetails')}
        onTopArtistsPress={() => setCurrentView('topArtists')}
        onArtistPress={(artist) => {
          setSelectedPlaylist({ title: artist.name, subtitle: artist.subtitle, image: artist.image });
          setPreviousView('listeningStats');
          setCurrentView('detailView');
        }}
      />
    );
  }

  // If user navigated to the Minutes Listened Details Screen
  if (currentView === 'minutesDetails') {
    return (
      <MinutesListenedDetailScreen 
        onBackPress={() => setCurrentView('listeningStats')} 
      />
    );
  }

  // If user navigated to the Top Artists Screen
  if (currentView === 'topArtists') {
    return (
      <TopArtistsDetailScreen 
        onBackPress={() => setCurrentView('listeningStats')} 
      />
    );
  }

  // If user navigated to the Settings Screen
  if (currentView === 'settings') {
    return (
      <SettingsScreen 
        onBackPress={() => setCurrentView('home')} 
        onLogout={() => {
          Alert.alert("Logged Out", "You have been logged out of Medusa");
          setCurrentView('home');
        }}
      />
    );
  }

  // If user navigated to the Charts Hub Screen
  if (currentView === 'chartsHub') {
    return (
      <ChartsHubScreen 
        onBackPress={() => setCurrentView('home')}
        onChartSelect={(chart) => {
          setSelectedPlaylist({ title: chart.title, subtitle: chart.subtitle });
          setPreviousView('home');
          setCurrentView('detailView');
        }}
        onArtistSelect={(artist) => {
          setSelectedPlaylist({ title: artist.name, subtitle: 'Artist Radio' });
          setPreviousView('home');
          setCurrentView('detailView');
        }}
      />
    );
  }

  // If user navigated to the See All List Screen
  if (currentView === 'seeAll') {
    return (
      <SeeAllListScreen 
        sectionTitle={seeAllTitle}
        onBackPress={() => setCurrentView('home')}
        onSongSelect={(song) => {
          setSelectedPlaylist({ title: song.title, subtitle: song.artist, image: song.image });
          setPreviousView('home');
          setCurrentView('detailView');
        }}
      />
    );
  }

  // If user navigated to the Detail View Screen
  if (currentView === 'detailView') {
    return (
      <DetailViewScreen 
        onBackPress={() => setCurrentView(previousView)} // 👈 Dynamically returns back to wherever you came from (Home or Recents)
        playlistData={selectedPlaylist}
        onSongPress={(song) => {
          setActiveSong(song);
          setCurrentView('player');
        }}
      />
    );
  }

  // If user navigated to the Player Screen
  if (currentView === 'player') {
    return (
      <PlayerScreen 
        onBackPress={() => setCurrentView(previousView)} 
        songData={activeSong}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Music Lover" 
        onProfilePress={() => setDrawerVisible(true)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Featured MixCard - Triggers Player Screen */}
        <MixCard 
          onPress={() => {
            setActiveSong({ title: "Medusa's Cry", artist: "Medusa" });
            setPreviousView('home');
            setCurrentView('player');
          }}
        />

        {/* Quick Access Grid */}
        <QuickAccessGrid 
          onPlaylistPress={(playlist) => {
            setSelectedPlaylist(playlist);
            setPreviousView('home');
            setCurrentView('detailView');
          }}
          onSeeAllPress={(title) => {
            setSeeAllTitle(title);
            setCurrentView('seeAll');
          }}
        />

        {/* SongRow (Top Charts Section with MORE trigger) */}
        <SongRow 
          onSongPress={(song) => {
            setActiveSong(song);
            setPreviousView('home');
            setCurrentView('player');
          }}
          onSeeAllPress={() => {
            setCurrentView('chartsHub'); 
          }}
        />
      </ScrollView>

      {/* Profile Sidebar Drawer */}
      <ProfileDrawer 
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)}
        onViewProfile={() => {
          setDrawerVisible(false);
          setCurrentView('profile');
        }}
        onAddAccount={() => {}}
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
          setCurrentView('updates'); // 👈 Opens UpdatesScreen cleanly from drawer
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191426', // Signature Dark Purple
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 24,
    paddingBottom: 100,
  },
});