// src/screens/profile-screens/UpdatesScreen.jsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UpdatesScreen({ onBackPress }) {
  // Mock changelog/release history data tailored for Medusa
  const releaseNotes = [
    {
      version: 'v1.2.0',
      date: 'October 2026',
      title: 'Hybrid Navigation & Profile Drawer Polish',
      description: 'Integrated local state-driven view management for smooth sub-screen transitions and eliminated edge-swipe routing errors.',
      highlights: [
        'Added Recents history view integration',
        'Refined Player modal swipe-down gestures',
        'Optimized stack performance and memory usage',
      ],
    },
    {
      version: 'v1.1.0',
      date: 'September 2026',
      title: 'Cyberpunk Neon Theme & Audio Engine',
      description: 'Complete visual overhaul featuring signature dark purple styling and robust streaming playback controls.',
      highlights: [
        'Custom neon glowing element design',
        'Background audio streaming support',
        'Interactive profile drawer sub-screens',
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>What's New</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Card / Current Status */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconContainer}>
            <Ionicons name="sparkles" size={32} color="#A736FF" />
          </View>
          <Text style={styles.heroTitle}>Medusa is Up to Date</Text>
          <Text style={styles.heroSubtitle}>
            You are running version 1.2.0. Enjoy the latest cyber-audio experience.
          </Text>
          <TouchableOpacity 
            style={styles.checkButton}
            onPress={() => Alert.alert("Up to Date", "Medusa is running the latest production build!")}
          >
            <Text style={styles.checkButtonText}>Check for Updates</Text>
          </TouchableOpacity>
        </View>

        {/* Release Logs Section */}
        <Text style={styles.sectionHeader}>Release History</Text>

        {releaseNotes.map((item, index) => (
          <View key={index} style={styles.releaseCard}>
            <View style={styles.releaseHeader}>
              <Text style={styles.versionBadge}>{item.version}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.releaseTitle}>{item.title}</Text>
            <Text style={styles.releaseDesc}>{item.description}</Text>

            <View style={styles.highlightsContainer}>
              {item.highlights.map((highlight, hIndex) => (
                <View key={hIndex} style={styles.highlightRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E1F', // Signature Cyberpunk Dark Background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  heroCard: {
    backgroundColor: 'rgba(167, 54, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  heroIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(167, 54, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  checkButton: {
    backgroundColor: '#A736FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  releaseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    padding: 18,
    gap: 10,
  },
  releaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionBadge: {
    backgroundColor: 'rgba(167, 54, 255, 0.25)',
    color: '#D8B4FE',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
  releaseTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  releaseDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    lineHeight: 18,
  },
  highlightsContainer: {
    gap: 6,
    marginTop: 4,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
  },
});