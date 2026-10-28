// app/index.tsx
import React, { useEffect, useState } from 'react';
import SplashScreen from '../src/screens/SplashScreen';
import WelcomeScreen from '../src/screens/WelcomeScreen';

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 1. Show the splash screen first when the app opens
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // 2. Once the splash timer finishes, render your polished WelcomeScreen
  return <WelcomeScreen />;
}