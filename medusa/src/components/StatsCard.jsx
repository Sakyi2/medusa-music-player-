// src/components/StatsCard.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function StatCard({ title, value, onPress }) {
  return (
    <TouchableOpacity style={styles.statCard} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
      </View>
      <Text style={styles.statNumber}>{value}</Text>
    </TouchableOpacity>
  );
}

export function StatCardLarge({ title, subtitle, children, onPress }) {
  return (
    <TouchableOpacity style={styles.statCardLarge} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {children}
    </TouchableOpacity>
  );
}

export function StatCardGradient({ title }) {
  return (
    <View style={styles.statCardGradient}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
      </View>
      <View style={styles.mysteryBadgeContainer}>
        <View style={styles.gradientMysteryCircle}>
          <Text style={styles.mysteryQuestionMark}>?</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: '#231D35',
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.15)',
  },
  statCardLarge: {
    backgroundColor: '#231D35',
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.15)',
    alignItems: 'center',
  },
  statCardGradient: {
    backgroundColor: '#231D35',
    borderRadius: 16,
    padding: 16,
    height: 190,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.25)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: -1,
    marginVertical: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  mysteryBadgeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientMysteryCircle: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: '#A736FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  mysteryQuestionMark: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
  },
});