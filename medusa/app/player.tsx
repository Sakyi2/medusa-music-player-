// app/player.tsx
import React, { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import PlayerScreen from '../src/screens/PlayerScreen';

export default function PlayerRoute() {
  const router = useRouter();
  const songData = useLocalSearchParams();

  const audioStream = (songData.audioUrl as string) || (songData.preview as string) || (songData.uri as string);

  // Parse playlist if passed from category/search screens
  let parsedPlaylist: any[] = [];
  try {
    if (songData.playlist && typeof songData.playlist === 'string') {
      parsedPlaylist = JSON.parse(songData.playlist);
    }
  } catch (e) {
    console.error("Error parsing playlist queue:", e);
  }

  const player = useAudioPlayer(audioStream ? { uri: audioStream } : null, {
    downloadFirst: true,
  });
  const playerStatus = useAudioPlayerStatus(player);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await setAudioModeAsync({ playsInSilentMode: true });
        if (player && audioStream) {
          await player.replace({ uri: audioStream });
          await player.seekTo(0);
          await player.play();
        }
      } catch (err) {
        console.error('Player route audio setup error:', err);
      }
    };
    setupAudio();
  }, [audioStream, player]);

  // Handle Next Song via Queue or 10s Skip Fallback
  const handleFastForward = async () => {
    if (!player) return;

    try {
      // If a playlist queue exists, find the next song index
      if (parsedPlaylist.length > 0) {
        const currentIndex = parsedPlaylist.findIndex(
          (s: any) => String(s.id) === String(songData.id)
        );

        if (currentIndex !== -1 && currentIndex < parsedPlaylist.length - 1) {
          const nextSong = parsedPlaylist[currentIndex + 1];
          // Push or replace route with the next track in the queue
          router.replace({
            pathname: '/player',
            params: {
              id: nextSong.id,
              title: nextSong.title,
              artist: nextSong.artist,
              albumCover: nextSong.albumCover,
              audioUrl: nextSong.audioUrl,
              duration: nextSong.duration,
              playlist: songData.playlist, // Keep queue context alive
            },
          });
          return;
        }
      }

      // Fallback: 10-second fast forward if no queue exists (e.g. Home screen songs)
      const current = playerStatus?.currentTime || 0;
      const duration = 30000; 
      const target = Math.min(duration, current + 10000);
      await player.seekTo(target);
      await player.play();
    } catch (err) {
      console.error("Fast forward error:", err);
    }
  };

  // Handle Previous Song via Queue or 10s Rewind Fallback
  const handleRewind = async () => {
    if (!player) return;

    try {
      if (parsedPlaylist.length > 0) {
        const currentIndex = parsedPlaylist.findIndex(
          (s: any) => String(s.id) === String(songData.id)
        );

        if (currentIndex > 0) {
          const prevSong = parsedPlaylist[currentIndex - 1];
          router.replace({
            pathname: '/player',
            params: {
              id: prevSong.id,
              title: prevSong.title,
              artist: prevSong.artist,
              albumCover: prevSong.albumCover,
              audioUrl: prevSong.audioUrl,
              duration: prevSong.duration,
              playlist: songData.playlist,
            },
          });
          return;
        }
      }

      // Fallback: 10-second rewind
      const current = playerStatus?.currentTime || 0;
      const target = Math.max(0, current - 10000);
      await player.seekTo(target);
      await player.play();
    } catch (err) {
      console.error("Rewind error:", err);
    }
  };

  return (
    <PlayerScreen 
      onBackPress={() => router.back()} 
      songData={songData} 
      player={player}
      playerStatus={playerStatus}
      playlist={parsedPlaylist as never[]}
      onNextPress={handleFastForward}
      onPrevPress={handleRewind}
      onSelectQueueSong={(selectedSong: any) => {
        router.replace({
          pathname: '/player',
          params: {
            id: selectedSong.id,
            title: selectedSong.title,
            artist: selectedSong.artist,
            albumCover: selectedSong.albumCover,
            audioUrl: selectedSong.audioUrl,
            duration: selectedSong.duration,
            playlist: songData.playlist,
          },
        });
      }}
    />
  );
}