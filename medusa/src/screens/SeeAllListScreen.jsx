// src/screens/SeeAllListScreen.jsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SeeAllListScreen({ sectionTitle, onBackPress, onSongSelect }) {
  // Sample data featuring local and international tracks with dates
  const songsList = [
    { id: 'sa1', title: 'Ayoo', artist: 'Shatta Wale', date: 'Added Oct 8, 2026', duration: '3:15', image: require('../../assets/images/medusa_3.png') },
    { id: 'sa2', title: 'On God', artist: 'Shatta Wale', date: 'Added Oct 5, 2026', duration: '2:58', image: require('../../assets/images/medusa_3.png') },
    { id: 'sa3', title: 'Last Last', artist: 'Burna Boy', date: 'Added Oct 2, 2026', duration: '2:52', image: require('../../assets/images/medusa_3.png') },
    { id: 'sa4', title: 'fukumean', artist: 'Gunna', date: 'Added Sep 28, 2026', duration: '2:05', image: require('../../assets/images/medusa_3.png') },
    { id: 'sa5', title: 'Blinding Lights', artist: 'The Weeknd', date: 'Added Sep 20, 2026', duration: '3:20', image: require('../../assets/images/medusa_3.png') },
    { id: 'sa6', title: 'City Boys', artist: 'Burna Boy', date: 'Added Sep 15, 2026', duration: '2:33', image: require('../../assets/images/medusa_3.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {sectionTitle || 'Recent Songs'}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Song List */}
      <FlatList
        data={songsList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.songCard} 
            activeOpacity={0.7}
            onPress={() => onSongSelect && onSongSelect(item)}
          >
            <Image source={item.image} style={styles.albumArt} />
            
            <View style={styles.infoContainer}>
              <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.artistName} numberOfLines={1}>{item.artist}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={styles.rightContainer}>
              <Text style={styles.durationText}>{item.duration}</Text>
              <TouchableOpacity style={styles.playIconButton}>
                <Ionicons name="play-circle" size={28} color="#22C55E" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191426',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167, 54, 255, 0.2)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#231D35',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.25)',
    gap: 12,
  },
  albumArt: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#191426',
  },
  infoContainer: {
    flex: 1,
    gap: 3,
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#A736FF',
    fontSize: 13,
    fontWeight: '500',
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
  },
  rightContainer: {
    alignItems: 'flex-end',
    gap: 6,
  },
  durationText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
  },
  playIconButton: {
    padding: 2,
  },
});