import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface VocalFxGridProps {
  autoTune: boolean;
  reverb: boolean;
  onToggleAutoTune: () => void;
  onToggleReverb: () => void;
}

export function VocalFxGrid({
  autoTune,
  reverb,
  onToggleAutoTune,
  onToggleReverb,
}: VocalFxGridProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>VOCAL FX & MIX</Text>
      <View style={styles.fxGrid}>
        <TouchableOpacity
          style={[styles.fxCard, autoTune && styles.fxCardActive]}
          onPress={onToggleAutoTune}
        >
          <MaterialCommunityIcons
            name="tune-vertical"
            size={24}
            color={autoTune ? '#00F0FF' : '#FFFFFF60'}
          />
          <Text style={styles.fxName}>Auto-Tune</Text>
          <Text style={styles.fxStatus}>{autoTune ? 'ON' : 'OFF'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.fxCard, reverb && styles.fxCardActive]}
          onPress={onToggleReverb}
        >
          <Ionicons
            name="sparkles-outline"
            size={24}
            color={reverb ? '#A736FF' : '#FFFFFF60'}
          />
          <Text style={styles.fxName}>Studio Reverb</Text>
          <Text style={styles.fxStatus}>{reverb ? 'ON' : 'OFF'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 14,
  },
  sectionLabel: {
    color: '#A736FF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },
  fxGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  fxCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  fxCardActive: {
    borderColor: '#A736FF',
    backgroundColor: 'rgba(167, 54, 255, 0.12)',
  },
  fxName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  fxStatus: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
  },
});