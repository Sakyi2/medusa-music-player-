import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StudioHeaderProps {
  isRecording: boolean;
}

export function StudioHeader({ isRecording }: StudioHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Vocal Studio</Text>
        <Text style={styles.headerSubtitle}>Record your verse over artist beats</Text>
      </View>
      <View style={styles.statusBadge}>
        <View style={[styles.statusDot, isRecording && styles.statusDotActive]} />
        <Text style={styles.statusText}>{isRecording ? 'LIVE REC' : 'READY'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginRight: 6,
  },
  statusDotActive: {
    backgroundColor: '#FF007F',
  },
  statusText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});