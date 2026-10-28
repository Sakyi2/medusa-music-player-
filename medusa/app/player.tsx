import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PlayerScreen from '../src/screens/PlayerScreen'; // adjust if your file lives inside src/screens/profile-screens/

export default function PlayerRoute() {
  const router = useRouter();
  const songData = useLocalSearchParams();

  return <PlayerScreen onBackPress={() => router.back()} songData={songData} />;
}