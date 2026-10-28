import React from 'react';
import { useRouter } from 'expo-router';
import DetailViewScreen from '../src/screens/DetailViewScreen';

export default function DetailRoute() {
  const router = useRouter();

  return (
    <DetailViewScreen
      onBackPress={() => router.back()}
      playlistData={{}}
      onSongPress={() => {}}
    />
  );
}