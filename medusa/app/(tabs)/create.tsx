// app/(tabs)/create.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  Alert,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { 
  useAudioRecorder, 
  AudioModule, 
  RecordingPresets, 
  createAudioPlayer, 
  setAudioModeAsync, 
  AudioPlayer 
} from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import { StudioHeader } from '../../src/components/studio/StudioHeader';
import { BeatSelector } from '../../src/components/studio/BeatSelector';
import RecordingStudioCard from '../../src/components/studio/RecordingStudioCard';
import { AudioPreviewCard } from '../../src/components/studio/AudioPreviewCard';
import { VocalFxGrid } from '../../src/components/studio/VocalFxGrid';
import { CyberContainer } from '../../src/components/studio/CyberContainer';
import { supabase } from '../../src/api/supabase';

type BeatSample = {
  id: string;
  name: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  genre: string;
  audioUrl?: string;
};

const BEAT_SAMPLES: BeatSample[] = [
  { 
    id: '1', 
    name: 'Cyber Dystopia Beat', 
    title: 'Cyber Dystopia Beat', 
    artist: 'Kavinsky', 
    bpm: 128, 
    key: 'F Minor', 
    genre: 'Synthwave',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  { 
    id: '2', 
    name: 'Starboy Instrumental', 
    title: 'Starboy Instrumental', 
    artist: 'The Weeknd', 
    bpm: 110, 
    key: 'C Major', 
    genre: 'R&B',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  { 
    id: '3', 
    name: 'Midnight City Sample', 
    title: 'Midnight City Sample', 
    artist: 'M83', 
    bpm: 105, 
    key: 'A Minor', 
    genre: 'Cyberpunk',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  { 
    id: '4', 
    name: 'Sicko Mode Beat', 
    title: 'Sicko Mode Beat', 
    artist: 'Travis Scott', 
    bpm: 155, 
    key: 'E Minor', 
    genre: 'Hip Hop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  { 
    id: '5', 
    name: 'Last Last Instrumental', 
    title: 'Last Last Instrumental', 
    artist: 'Burna Boy', 
    bpm: 108, 
    key: 'G Major', 
    genre: 'Afrobeat',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
];

export default function CreateScreen() {
  const router = useRouter();

  const [selectedBeat, setSelectedBeat] = useState<BeatSample>(BEAT_SAMPLES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [autoTune, setAutoTune] = useState(true);
  const [reverb, setReverb] = useState(false);

  // expo-audio player reference for the background beat
  const beatPlayerRef = useRef<AudioPlayer | null>(null);

  // Artist Profile & Song Metadata
  const [artistName, setArtistName] = useState('Iceboy Lego');
  const [artistBio, setArtistBio] = useState('Cyberpunk Sound Architect');
  const [avatarUri, setAvatarUri] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb');
  const [trackTitle, setTrackTitle] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName = await AsyncStorage.getItem('user_profile_name');
        const savedAvatar = await AsyncStorage.getItem('user_profile_avatar');
        if (savedName) setArtistName(savedName);
        if (savedAvatar) setAvatarUri(savedAvatar);
      } catch (err) {
        console.error('Error loading profile in create screen:', err);
      }
    };
    loadProfile();

    // Request microphone permission on mount using expo-audio AudioModule
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permission Required', 'Microphone access is needed to record audio.');
      }
      
      // Initial session setup with fixed 'mixWithOthers' value
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
        interruptionMode: 'mixWithOthers',
      });
    })();

    return () => {
      if (beatPlayerRef.current) {
        beatPlayerRef.current.release();
      }
    };
  }, []);

  // Preload beat whenever selectedBeat changes to eliminate playback delay
  useEffect(() => {
    let activePlayer: AudioPlayer | null = null;
    if (selectedBeat?.audioUrl) {
      if (beatPlayerRef.current) {
        beatPlayerRef.current.release();
      }
      activePlayer = createAudioPlayer({ uri: selectedBeat.audioUrl });
      activePlayer.volume = 1.0;
      beatPlayerRef.current = activePlayer;
    }

    return () => {
      if (activePlayer) {
        activePlayer.release();
      }
    };
  }, [selectedBeat]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 29) {
            toggleRecordingState();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      setRecordingSeconds(0);
      pulseAnim.setValue(0);
    }

    return () => clearInterval(timer);
  }, [isRecording]);

  // Toggle Recording & Play Preloaded Background Beat safely
  const toggleRecordingState = async () => {
    try {
      if (isRecording) {
        // STOP RECORDING & STOP BEAT
        await audioRecorder.stop();
        setIsRecording(false);

        if (beatPlayerRef.current) {
          beatPlayerRef.current.pause();
          beatPlayerRef.current.seekTo(0);
        }

        // CRITICAL: Switch audio mode back to speaker output so preview plays loudly out loud
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: false,
        });

        const uri = audioRecorder.uri;
        if (uri) {
          setRecordingUri(uri);
        }
      } else {
        // START RECORDING & PLAY PRELOADED BEAT
        setRecordingUri(null);

        // Configure session for simultaneous recording and high volume playback using 'mixWithOthers'
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
          interruptionMode: 'mixWithOthers',
        });

        if (beatPlayerRef.current && selectedBeat?.audioUrl) {
          try {
            beatPlayerRef.current.seekTo(0);
            beatPlayerRef.current.loop = true;
            beatPlayerRef.current.volume = 1.0;
            beatPlayerRef.current.play();
          } catch (beatErr) {
            console.log('Beat playback notice:', beatErr);
          }
        }

        // Start microphone recording safely if not already active
        if (!audioRecorder.isRecording) {
          await audioRecorder.prepareToRecordAsync();
          audioRecorder.record();
          setIsRecording(true);
        }
      }
    } catch (err: any) {
      console.error('Audio recording/playback toggle error:', err);
      setIsRecording(false);
      Alert.alert('Studio Error', err.message || 'Could not sync audio recording with beat.');
    }
  };

  // Publish track to Supabase Storage & Database
  const handlePublishTrack = async () => {
    if (!artistName.trim() || !trackTitle.trim()) {
      Alert.alert('Missing Info', 'Please enter both Artist Name and Track Title.');
      return;
    }
    if (!recordingUri) {
      Alert.alert('No Audio', 'Please record your vocals before publishing.');
      return;
    }

    setIsPublishing(true);
    try {
      const fileName = `custom_track_${Date.now()}.m4a`;

      const response = await fetch(recordingUri);
      const blob = await response.blob();

      // 1. Upload audio file to Supabase Storage Bucket
      const { error: storageError } = await supabase.storage
        .from('user-audio')
        .upload(fileName, blob, { contentType: 'audio/m4a' });

      if (storageError) throw storageError;

      // 2. Get Public Storage URL
      const { data: urlData } = supabase.storage
        .from('user-audio')
        .getPublicUrl(fileName);

      const audioUrl = urlData.publicUrl;

      // 3. Save track record along with artist details into database
      const { error: dbError } = await supabase.from('custom_tracks').insert([
        {
          artist_name: artistName.trim(),
          artist_bio: artistBio.trim(),
          artist_avatar: avatarUri,
          track_title: trackTitle.trim(),
          audio_url: audioUrl,
          beat_name: selectedBeat.name || selectedBeat.title,
          cover_url: avatarUri,
          play_count: 0,
        },
      ]);

      if (dbError) throw dbError;

      await AsyncStorage.setItem('user_profile_name', artistName.trim());

      Alert.alert('🎉 Published!', `"${trackTitle}" by ${artistName} is live on Medusa!`, [
        {
          text: 'View Dashboard',
          onPress: () => {
            setRecordingUri(null);
            setTrackTitle('');
            router.push('/artist-dashboard');
          },
        },
      ]);
    } catch (error: any) {
      console.error('Publish error:', error);
      Alert.alert('Publish Failed', error.message || 'Error uploading track.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <StudioHeader isRecording={isRecording} />

        {/* 1. Artist Profile Setup Section */}
        <CyberContainer glowColor="#A736FF" style={styles.metadataCard}>
          <Text style={styles.sectionTitle}>Artist Profile Setup</Text>
          <View style={styles.profileEditRow}>
            <TouchableOpacity onPress={() => router.push('/artist-dashboard')} activeOpacity={0.8}>
              <Image source={{ uri: avatarUri }} style={styles.avatarPreview} />
            </TouchableOpacity>

            <View style={{ flex: 1, gap: 8 }}>
              <TextInput
                style={styles.input}
                placeholder="Artist Name (e.g. Iceboy Lego)"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={artistName}
                onChangeText={setArtistName}
              />
              <TextInput
                style={styles.input}
                placeholder="Artist Bio / Vibe"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={artistBio}
                onChangeText={setArtistBio}
              />
            </View>
          </View>
        </CyberContainer>

        {/* 2. Song Details Section */}
        <CyberContainer glowColor="#00F0FF" style={styles.metadataCard}>
          <Text style={styles.sectionTitle}>2. Track Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Track Title (e.g. Neon Horizon)"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            value={trackTitle}
            onChangeText={setTrackTitle}
          />
        </CyberContainer>

        <BeatSelector
          beats={BEAT_SAMPLES}
          selectedBeat={selectedBeat}
          onSelectBeat={setSelectedBeat}
        />

        {/* 3. Recording Studio Card */}
        <CyberContainer glowColor={isRecording ? '#FF007F' : '#00F0FF'} style={{ marginVertical: 12 }}>
          <RecordingStudioCard
            isRecording={isRecording}
            recordingSeconds={recordingSeconds}
            selectedBeat={selectedBeat}
            pulseAnim={pulseAnim}
            onToggleRecording={toggleRecordingState}
            setRecordingUri={setRecordingUri}
          />
        </CyberContainer>

        {recordingUri && (
          <AudioPreviewCard
            recordingUri={recordingUri}
            onDiscard={() => setRecordingUri(null)}
          />
        )}

        <VocalFxGrid
          autoTune={autoTune}
          reverb={reverb}
          onToggleAutoTune={() => setAutoTune(!autoTune)}
          onToggleReverb={() => setReverb(!reverb)}
        />

        {/* Publish Button */}
        <TouchableOpacity
          style={[styles.publishBtn, isPublishing && styles.disabledBtn]}
          onPress={handlePublishTrack}
          disabled={isPublishing}
          activeOpacity={0.8}
        >
          {isPublishing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.publishBtnText}>Publish to Medusa</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E1F',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  metadataCard: {
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    color: '#A736FF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  profileEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarPreview: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#00F0FF',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
    fontSize: 14,
  },
  publishBtn: {
    flexDirection: 'row',
    backgroundColor: '#A736FF',
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});