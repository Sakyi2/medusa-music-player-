// src/components/QuickAccessGrid.jsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function QuickAccessGrid({ onPlaylistPress, onSeeAllPress }) {
  // Categories with rich classic & cyberpunk items
  const sections = [
    {
      title: 'Jump Back In',
      items: [
        { id: 'jb1', title: 'Cyber Pulse Vol. 4', subtitle: 'Recent Session', image: require('../../assets/images/medusa_3.png') },
        { id: 'jb2', title: 'Neon Obsession', subtitle: 'Heavy Bass Mix', image: require('../../assets/images/medusa_3.png') },
        { id: 'jb3', title: 'Underground Glitch', subtitle: 'Playlist • 42 songs', image: require('../../assets/images/medusa_3.png') },
      ]
    },
    {
      title: 'Your Top Mixes',
      items: [
        { id: 'tm1', title: 'Gunna & Friends Mix', subtitle: 'Curated weekly', image: require('../../assets/images/medusa_3.png') },
        { id: 'tm2', title: 'Midnight Synthwave', subtitle: 'Darksynth & Cyber', image: require('../../assets/images/medusa_3.png') },
        { id: 'tm3', title: 'Afro-Cyber Grooves', subtitle: 'Burna Boy, Wizkid & more', image: require('../../assets/images/medusa_3.png') },
      ]
    },

     {
      title: 'Recents',
      isCircular: true,
      items: [
        { id: 'fa1', title: 'Gunna', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
        { id: 'fa2', title: 'Burna Boy', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
        { id: 'fa3', title: 'The Weeknd', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
        { id: 'fa4', title: 'Travis Scott', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
      ]
    },

    {
      title: 'Recommended For Today',
      items: [
        { id: 'rec1', title: 'Neon Rain', subtitle: 'Chill cyberpunk beats', image: require('../../assets/images/medusa_3.png') },
        { id: 'rec2', title: 'System Override', subtitle: 'High energy workout', image: require('../../assets/images/medusa_3.png') },
        { id: 'rec3', title: 'Holographic Dreams', subtitle: 'Ambient soundscapes', image: require('../../assets/images/medusa_3.png') },
      ]
    },
    {
      title: 'Favourite Artists',
      isCircular: true,
      items: [
        { id: 'fa1', title: 'Gunna', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
        { id: 'fa2', title: 'Burna Boy', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
        { id: 'fa3', title: 'The Weeknd', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
        { id: 'fa4', title: 'Travis Scott', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
      ]
    },

    {
      title: 'Today\'s biggest hits',
      items: [
        { id: 'rec1', title: 'Neon Rain', subtitle: 'Chill cyberpunk beats', image: require('../../assets/images/medusa_3.png') },
        { id: 'rec2', title: 'System Override', subtitle: 'High energy workout', image: require('../../assets/images/medusa_3.png') },
        { id: 'rec3', title: 'Holographic Dreams', subtitle: 'Ambient soundscapes', image: require('../../assets/images/medusa_3.png') },
      ]
    },

  
    {
      title: 'Popular Artists',
      isCircular: true,
      items: [
        { id: 'pa1', title: 'Drake', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
        { id: 'pa2', title: 'Rema', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
        { id: 'pa3', title: 'Kendrick Lamar', subtitle: 'Artist', image: require('../../assets/images/medusa_3.png') },
      ]
    },
    {
      title: 'Albums Featuring Songs You Like',
      items: [
        { id: 'alb1', title: 'African Giant', subtitle: 'Burna Boy • 2019', image: require('../../assets/images/medusa_3.png') },
        { id: 'alb2', title: 'Wunna', subtitle: 'Gunna • 2020', image: require('../../assets/images/medusa_3.png') },
        { id: 'alb3', title: 'After Hours', subtitle: 'The Weeknd • 2020', image: require('../../assets/images/medusa_3.png') },
      ]
    },
    {
      title: 'Fresh new music',
      items: [
        { id: 'rec1', title: 'Neon Rain', subtitle: 'Chill cyberpunk beats', image: require('../../assets/images/medusa_3.png') },
        { id: 'rec2', title: 'System Override', subtitle: 'High energy workout', image: require('../../assets/images/medusa_3.png') },
        { id: 'rec3', title: 'Holographic Dreams', subtitle: 'Ambient soundscapes', image: require('../../assets/images/medusa_3.png') },
      ]
    },




  ];

  return (
    <View style={styles.container}>
      {sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => onSeeAllPress && onSeeAllPress(section.title)}
            >
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {section.items.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.card} 
                activeOpacity={0.8}
                onPress={() => onPlaylistPress && onPlaylistPress(item)}
              >
                <Image 
                  source={item.image} 
                  style={[
                    styles.cardImage, 
                    section.isCircular && styles.circularImage
                  ]} 
                  resizeMode="cover" 
                />
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 28,
  },
  sectionContainer: {
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A736FF',
  },
  horizontalList: {
    gap: 16,
  },
  card: {
    width: 140,
    gap: 6,
  },
  cardImage: {
    width: 140,
    height: 140,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
    backgroundColor: '#231D35',
  },
  circularImage: {
    borderRadius: 70, // Makes artist cards perfectly circular
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
  },
});