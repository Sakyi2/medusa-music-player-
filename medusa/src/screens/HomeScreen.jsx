// src/screens/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import SettingsScreen from './profile-screens/SettingsScreen';
import SeeAllListScreen from './SeeAllListScreen';
import ChartsHubScreen from './ChartsHubScreen';
import RecentsScreen from './profile-screens/RecentsScreen';
import UpdatesScreen from './profile-screens/UpdatesScreen';
import { fetchTopCharts, fetchMusicByGenre } from '../services/musicApi';

export default function HomeScreen() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 
  const [previousView, setPreviousView] = useState('home');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [activeSong, setActiveSong] = useState(null);
  const [seeAllTitle, setSeeAllTitle] = useState('');
  
  // Profile persistence states
  const [profileName, setProfileName] = useState('iceboy');
  const [avatarUri, setAvatarUri] = useState(null);
  
  // Separate states for the swipeable chart categories in SongRow
  const [ghanaSongs, setGhanaSongs] = useState([]);
  const [africaSongs, setAfricaSongs] = useState([]);
  const [globalSongs, setGlobalSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize Audio Player Hook with expo-audio
  const player = useAudioPlayer(activeSong?.audioUrl ? { uri: activeSong.audioUrl } : null);
  const playerStatus = useAudioPlayerStatus(player);

  const loadSavedProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem('user_profile_name');
      const savedAvatar = await AsyncStorage.getItem('user_profile_avatar');
      if (savedName) setProfileName(savedName);
      if (savedAvatar) setAvatarUri(savedAvatar);
    } catch (error) {
      console.error('Error loading saved profile in HomeScreen:', error);
    }
  };

  useEffect(() => {
    loadSavedProfile();

    const loadCharts = async () => {
      setLoading(true);
      try {
        const [ghanaData, africaData, globalData] = await Promise.all([
          fetchMusicByGenre('Ghana'),
          fetchMusicByGenre('Afrobeats'),
          fetchTopCharts(),
        ]);

        setGhanaSongs(ghanaData);
        setAfricaSongs(africaData);
        setGlobalSongs(globalData);

        if (globalData.length > 0) {
          setActiveSong(globalData[0]);
        }
      } catch (error) {
        console.error('Error loading charts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCharts();
  }, [drawerVisible]);

  // Handle Play/Pause and Song Switch using expo-audio
  const handlePlaySong = (song) => {
    if (!song?.audioUrl) {
      Alert.alert('Playback Error', 'Audio stream not available for this track.');
      return;
    }

    if (activeSong?.id === song.id) {
      if (playerStatus.isPlaying) {
        player.pause();
      } else {
        if (playerStatus.currentTime >= playerStatus.duration) {
          player.seekTo(0);
        }
        player.play();
      }
    } else {
      setActiveSong(song);
      player.replace({ uri: song.audioUrl });
      player.play();
    }
  };

  // --- Helper to open full-screen player route matching Search page ---
  const openPlayerScreen = (song, currentList = globalSongs) => {
    if (!song) return;
    handlePlaySong(song);

    // Serialize queue list for Next/Prev skipping
    const serializedPlaylist = JSON.stringify(currentList.map(s => ({
      id: s.id,
      title: s.title || s.name,
      artist: s.artist,
      albumCover: s.albumCover || s.image,
      audioUrl: s.audioUrl || s.preview,
      duration: s.duration || 30,
    })));

    router.push({
      pathname: '/player',
      params: {
        id: song.id,
        title: song.title || song.name,
        artist: song.artist,
        albumCover: song.albumCover || song.image || '',
        audioUrl: song.audioUrl || song.preview || '',
        duration: song.duration || 30,
        playlist: serializedPlaylist,
      },
    });
  };

  // --- Sub-screens routing ---
  if (currentView === 'profile') {
    return <ProfileScreen onBackPress={() => setCurrentView('home')} onSettingsPress={() => setCurrentView('settings')} />;
  }
  if (currentView === 'recents') {
    return (
      <RecentsScreen 
        onBackPress={() => setCurrentView('home')} 
        onSongPress={(song) => openPlayerScreen(song, globalSongs)}
        onItemPress={(item) => { setSelectedPlaylist({ title: item.title, subtitle: item.subtitle, image: item.image }); setPreviousView('recents'); setCurrentView('detailView'); }}
      />
    );
  }
  if (currentView === 'updates') return <UpdatesScreen onBackPress={() => setCurrentView('home')} />;
  if (currentView === 'listeningStats') {
    return (
      <ListeningStatsScreen 
        onBackPress={() => setCurrentView('home')} 
        onMinutesListenedPress={() => setCurrentView('minutesDetails')}
        onTopArtistsPress={() => setCurrentView('topArtists')}
        onArtistPress={(artist) => { setSelectedPlaylist({ title: artist.name, subtitle: artist.subtitle, image: artist.image }); setPreviousView('listeningStats'); setCurrentView('detailView'); }}
      />
    );
  }
  if (currentView === 'minutesDetails') {
    return (
      <MinutesListenedDetailScreen 
        onBackPress={() => setCurrentView('listeningStats')} 
        activeSong={activeSong} 
      />
    );
  }
  if (currentView === 'topArtists') return <TopArtistsDetailScreen onBackPress={() => setCurrentView('listeningStats')} />;
  if (currentView === 'settings') return <SettingsScreen onBackPress={() => setCurrentView('home')} />;
  if (currentView === 'chartsHub') {
    return (
      <ChartsHubScreen 
        onBackPress={() => setCurrentView('home')}
        onChartSelect={(chart) => { setSelectedPlaylist({ title: chart.title, subtitle: chart.subtitle }); setPreviousView('home'); setCurrentView('detailView'); }}
        onArtistSelect={(artist) => { setSelectedPlaylist({ title: artist.name, subtitle: 'Artist Radio' }); setPreviousView('home'); setCurrentView('detailView'); }}
      />
    );
  }
  if (currentView === 'seeAll') {
    return (
      <SeeAllListScreen 
        sectionTitle={seeAllTitle}
        onBackPress={() => setCurrentView('home')}
        onSongSelect={(song) => { openPlayerScreen(song, globalSongs); }}
      />
    );
  }
  if (currentView === 'detailView') {
    return (
      <DetailViewScreen 
        onBackPress={() => setCurrentView(previousView)}
        playlistData={selectedPlaylist}
        onSongPress={(song) => openPlayerScreen(song, selectedPlaylist?.tracks || globalSongs)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={profileName} 
        avatarUri={avatarUri}
        onProfilePress={() => setDrawerVisible(true)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Featured MixCard */}
        <MixCard 
          title={activeSong?.title}
          artist={activeSong?.artist}
          image={activeSong?.albumCover}
          isPlaying={playerStatus.isPlaying}
          onPress={() => {
            if (activeSong) {
              openPlayerScreen(activeSong, globalSongs);
            }
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

        {/* Live Charts SongRow */}
        {loading ? (
          <ActivityIndicator size="large" color="#A736FF" style={{ marginVertical: 20 }} />
        ) : (
          <SongRow 
            ghanaSongs={ghanaSongs}
            africaSongs={africaSongs}
            globalSongs={globalSongs}
            activeSongId={activeSong?.id}
            isPlaying={playerStatus.isPlaying}
            onSongPress={(song) => openPlayerScreen(song, globalSongs)}
            onSeeAllPress={(title) => {
              setSeeAllTitle(title);
              setCurrentView('seeAll');
            }}
          />
        )}
      </ScrollView>

      {/* Profile Sidebar Drawer */}
      <ProfileDrawer 
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)}
        onViewProfile={() => { setDrawerVisible(false); setCurrentView('profile'); }}
        onListeningStats={() => { setDrawerVisible(false); setCurrentView('listeningStats'); }}
        onRecents={() => { setDrawerVisible(false); setCurrentView('recents'); }}
        onUpdates={() => { setDrawerVisible(false); setCurrentView('updates'); }}
        onSettings={() => { setDrawerVisible(false); setCurrentView('settings'); }}
        onToggleActivity={() => Alert.alert("Activity", "Toggled listening activity sharing")}
        onInviteFriends={() => Alert.alert("Invite", "Share Medusa link with friends")}
        onNewMessage={() => Alert.alert("Messages", "Starting a new social message")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191426',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 24,
    paddingBottom: 100,
  },
});