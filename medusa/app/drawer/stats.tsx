import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import ListeningStatsScreen from '../../src/screens/profile-screens/ListeningStatsScreen';
import MinutesListenedDetailScreen from '../../src/screens/MinutesListenedDetailScreen';
import TopArtistsDetailScreen from '../../src/screens/TopArtistsDetailScreen';
import DetailViewScreen from '../../src/screens/DetailViewScreen';

export default function StatsRoute() {
  const router = useRouter();
  const [subView, setSubView] = useState('main'); // 'main', 'minutes', 'topArtists', 'artistDetail'
  const [selectedArtist, setSelectedArtist] = useState<{
    title: string;
    subtitle: string;
    image: unknown;
  } | null>(null);

  // Helper to safely go back from sub-views
  const handleBackToMain = () => {
    setSubView('main');
  };

  // 1. Detailed Minutes Listened View (4,820 Mins)
  if (subView === 'minutes') {
    return (
      <MinutesListenedDetailScreen 
        onBackPress={handleBackToMain} 
      />
    );
  }

  // 2. Top Artists Full List View
  if (subView === 'topArtists') {
    return (
      <TopArtistsDetailScreen 
        onBackPress={handleBackToMain} 
      />
    );
  }

  // 3. Artist Detail View (when clicking a specific top artist)
  if (subView === 'artistDetail') {
    return (
      <DetailViewScreen
        onBackPress={handleBackToMain}
        onSongPress={() => {}}
        playlistData={selectedArtist}
      />
    );
  }

  // Main Listening Stats Screen
  return (
    <ListeningStatsScreen
      onBackPress={() => router.back()}
      onMinutesListenedPress={() => setSubView('minutes')}
      onTopArtistsPress={() => setSubView('topArtists')}
      onArtistPress={(artist: { name: string; subtitle?: string; image: unknown }) => {
        setSelectedArtist({ 
          title: artist.name, 
          subtitle: artist.subtitle || 'Artist Radio', 
          image: artist.image 
        });
        setSubView('artistDetail');
      }}
    />
  );
}