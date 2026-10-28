// app/recents.jsx (or RecentsRoute component)
import React from 'react';
import { useRouter } from 'expo-router';
import RecentsScreen from '../../src/screens/profile-screens/RecentsScreen';

export default function RecentsRoute() {
  const router = useRouter();

  return (
    <RecentsScreen 
      onBackPress={() => router.back()} // 👈 Fixes the back button!
      onItemPress={(item: { title: string; subtitle: string; image: string }) => {
        // Navigate to detail view if a playlist or album is tapped
        router.push({
          pathname: '/detail',
          params: { title: item.title, subtitle: item.subtitle, image: item.image }
        });
      }}
    />
  );
}