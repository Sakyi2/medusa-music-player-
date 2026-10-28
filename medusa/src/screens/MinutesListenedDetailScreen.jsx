// src/screens/MinutesListenedDetailScreen.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Switch,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MinutesListenedDetailScreen({ onBackPress }) {
  const [isListeningActivityOn, setIsListeningActivityOn] = useState(true);

  // Current track mock data
  const currentSong = {
    title: "Dangote",
    artist: "Burna Boy",
    duration: "3:45",
  };

  const handleAddFriend = () => {
    Alert.alert("Invite Sent", "Friend invite link generated and sent to your network!");
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minutes listened details</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Total Stats Banner */}
        <View style={styles.bannerCard}>
          <Text style={styles.bannerSubtitle}>Total time this week</Text>
          <Text style={styles.bannerTitle}>359 minutes</Text>
          <Text style={styles.bannerDesc}>You've spent over 5 hours immersing in cyber-audio frequencies.</Text>
        </View>

        {/* Listening Activity Toggle Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Live Session Sharing</Text>
          
          <View style={styles.toggleRowCard}>
            <View style={styles.toggleTextContainer}>
              <Text style={styles.toggleTitle}>Show listening activity</Text>
              <Text style={styles.toggleDesc}>
                Let friends see the exact track you are playing in real-time.
              </Text>
            </View>
            <Switch 
              trackColor={{ false: '#3E3454', true: '#A736FF' }}
              thumbColor={'#FFFFFF'}
              value={isListeningActivityOn}
              onValueChange={setIsListeningActivityOn}
            />
          </View>
        </View>

        {/* Currently Playing Track Widget (Shown if toggled on) */}
        {isListeningActivityOn && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Currently playing on loop</Text>
            
            <View style={styles.nowPlayingCard}>
              <View style={styles.albumArtMock}>
                <Ionicons name="musical-notes" size={24} color="#A736FF" />
              </View>
              <View style={styles.songInfo}>
                <Text style={styles.songTitleText}>{currentSong.title}</Text>
                <Text style={styles.artistNameText}>{currentSong.artist}</Text>
              </View>
              <View style={styles.liveIndicator}>
                <View style={styles.pulsingDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
          </View>
        )}

        {/* Invite Friends Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Jam with others</Text>
          
          <View style={styles.inviteCard}>
            <View style={styles.inviteContent}>
              <Ionicons name="people-outline" size={28} color="#A736FF" />
              <View style={styles.inviteTextContainer}>
                <Text style={styles.inviteTitle}>Add friends to session</Text>
                <Text style={styles.inviteDesc}>Invite friends to listen along and compare stats.</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.addFriendButton} 
              activeOpacity={0.8}
              onPress={handleAddFriend}
            >
              <Ionicons name="person-add-outline" size={16} color="#FFFFFF" />
              <Text style={styles.addFriendButtonText}>Add friends</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191426',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    gap: 24,
  },
  bannerCard: {
    backgroundColor: '#231D35',
    borderRadius: 20,
    padding: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
  },
  bannerSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '600',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  bannerDesc: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    lineHeight: 18,
  },
  sectionContainer: {
    gap: 12,
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleRowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#231D35',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.15)',
    gap: 16,
  },
  toggleTextContainer: {
    flex: 1,
    gap: 4,
  },
  toggleTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  toggleDesc: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    lineHeight: 16,
  },
  nowPlayingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#231D35',
    borderRadius: 16,
    padding: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.25)',
  },
  albumArtMock: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#2E2545',
    alignItems: 'center',
    justifyContent: 'center',
  },
  songInfo: {
    flex: 1,
    gap: 2,
  },
  songTitleText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  artistNameText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(167, 54, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 6,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A736FF',
  },
  liveText: {
    color: '#A736FF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  inviteCard: {
    backgroundColor: '#231D35',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.15)',
  },
  inviteContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  inviteTextContainer: {
    flex: 1,
    gap: 2,
  },
  inviteTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  inviteDesc: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  addFriendButton: {
    backgroundColor: '#A736FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
  },
  addFriendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});