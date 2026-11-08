
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  useAudioRecorder,
  RecordingPresets,
  AudioModule,
  setAudioModeAsync,
} from 'expo-audio';

import type { BeatSample } from '../../types';

interface RecordingStudioCardProps {
  isRecording: boolean;
  recordingSeconds: number;
  selectedBeat: BeatSample;
  pulseAnim: Animated.Value;
  onToggleRecording: () => void;
  setRecordingUri: (uri: string | null) => void;
}

const RecordingStudioCard: React.FC<RecordingStudioCardProps> = ({
  isRecording,
  recordingSeconds,
  selectedBeat,
  pulseAnim,
  onToggleRecording,
  setRecordingUri,
}) => {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isProcessing, setIsProcessing] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    return () => {
      // Clean up animation listeners if needed.
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      setIsProcessing(true);

      const permission =
        await AudioModule.requestRecordingPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Microphone Permission Required',
          'Please allow Medusa to access your microphone in your iPhone settings.'
        );
        return;
      }

      setPermissionGranted(true);

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await recorder.prepareToRecordAsync();
      recorder.record();

      onToggleRecording();
    } catch (error: any) {
      console.error('MEDUSA RECORDING START ERROR:', error);

      Alert.alert(
        'Recording Error',
        error?.message || 'Medusa could not start recording.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const stopRecording = async () => {
    try {
      setIsProcessing(true);

      await recorder.stop();

      const uri = recorder.uri;

      if (uri) {
        setRecordingUri(uri);
        Alert.alert(
          'Recording Saved',
          'Your recording has been saved successfully.'
        );
      } else {
        Alert.alert(
          'Recording Error',
          'Recording stopped, but no audio file was created.'
        );
      }

      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });

      onToggleRecording();
    } catch (error: any) {
      console.error('MEDUSA RECORDING STOP ERROR:', error);

      Alert.alert(
        'Recording Error',
        error?.message || 'Medusa could not stop the recording.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRecording = async () => {
    if (isProcessing) return;

    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Recording Studio</Text>
          <Text style={styles.subtitle}>
            Record your vocals with Medusa
          </Text>
        </View>

        <View style={styles.liveBadge}>
          <View
            style={[
              styles.liveDot,
              { backgroundColor: isRecording ? '#FF3B7A' : '#777' },
            ]}
          />
          <Text style={styles.liveText}>
            {isRecording ? 'RECORDING' : 'STANDBY'}
          </Text>
        </View>
      </View>

      <View style={styles.beatInfo}>
        <Text style={styles.beatLabel}>SELECTED BEAT</Text>
        <Text style={styles.beatName} numberOfLines={1}>
          {selectedBeat?.name || 'No beat selected'}
        </Text>
      </View>

      <View style={styles.recordingArea}>
        <Animated.View
          style={[
            styles.pulseRing,
            {
              transform: [
                {
                  scale: isRecording
                    ? pulseAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.35],
                      })
                    : 1,
                },
              ],
              opacity: isRecording ? 0.5 : 0.15,
            },
          ]}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleRecording}
          disabled={isProcessing}
          style={[
            styles.recordButton,
            {
              backgroundColor: isRecording ? '#FF3B7A' : '#00D9FF',
              opacity: isProcessing ? 0.6 : 1,
            },
          ]}
        >
          {isProcessing ? (
            <ActivityIndicator color="#080818" size="large" />
          ) : (
            <View
              style={[
                styles.recordIcon,
                isRecording && styles.stopIcon,
              ]}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.timer}>
          {formatTime(recordingSeconds)}
        </Text>

        <Text style={styles.recordingHint}>
          {isRecording
            ? 'Tap to stop recording'
            : 'Tap the microphone to start'}
        </Text>
      </View>

      <View style={styles.waveform}>
        {Array.from({ length: 35 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.waveBar,
              {
                height: isRecording
                  ? 8 + Math.abs(Math.sin(index * 0.7)) * 35
                  : 8 + Math.abs(Math.sin(index * 0.7)) * 12,
                backgroundColor: isRecording ? '#FF3B7A' : '#00D9FF',
                opacity: isRecording ? 1 : 0.45,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {isRecording
            ? 'Your voice is being recorded'
            : permissionGranted
            ? 'Microphone access is ready'
            : 'Microphone access will be requested'}
        </Text>
      </View>
    </View>
  );
};

export default RecordingStudioCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111126',
    borderRadius: 24,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#28284A',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },

  subtitle: {
    color: '#9292B5',
    fontSize: 12,
    marginTop: 5,
  },

  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#20203A',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    marginRight: 6,
  },

  liveText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },

  beatInfo: {
    marginTop: 22,
    backgroundColor: '#1A1A35',
    padding: 13,
    borderRadius: 13,
  },

  beatLabel: {
    color: '#7777A0',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  beatName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
  },

  recordingArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 35,
  },

  pulseRing: {
    position: 'absolute',
    width: 115,
    height: 115,
    borderRadius: 100,
    backgroundColor: '#00D9FF',
  },

  recordButton: {
    width: 82,
    height: 82,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },

  recordIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#080818',
  },

  stopIcon: {
    width: 24,
    height: 24,
    borderRadius: 5,
  },

  timer: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 22,
    fontVariant: ['tabular-nums'],
  },

  recordingHint: {
    color: '#9292B5',
    fontSize: 11,
    marginTop: 7,
  },

  waveform: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    overflow: 'hidden',
  },

  waveBar: {
    width: 4,
    borderRadius: 5,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#28284A',
    marginTop: 15,
    paddingTop: 13,
    alignItems: 'center',
  },

  footerText: {
    color: '#7777A0',
    fontSize: 10,
  },
});
