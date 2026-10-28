// app/src/search/browse.tsx (or your current file path)
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function BrowseGrid() {
  const router = useRouter();

  const browseCategories = [
    { id: '1', title: 'Music', color: '#E91E63', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' },
    { id: '2', title: 'Podcasts', color: '#00897B', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc' },
    { id: '3', title: 'Live Events', color: '#8E24AA', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
    { id: '4', title: 'Made For You', color: '#7E57C2', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
    { id: '5', title: 'Music', color: '#E91E63', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' },
    { id: '6', title: 'Podcasts', color: '#00897B', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc' },
    { id: '7', title: 'Live Events', color: '#8E24AA', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
    { id: '8', title: 'Made For You', color: '#7E57C2', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
    { id: '9', title: 'upcoming releases', color: '#E91E63', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' },
    { id: '10', title: 'New Releases', color: '#00897B', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc' },
    { id: '11', title: 'Afro', color: '#8E24AA', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
    { id: '12', title: 'Hip hop', color: '#7E57C2', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
    { id: '13', title: 'Charts', color: '#E91E63', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' },
    { id: '14', title: 'educational', color: '#00897B', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc' },
    { id: '15', title: 'Mood', color: '#8E24AA', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
    { id: '16', title: 'comedy', color: '#7E57C2', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
  ];

  return (
    <View style={styles.grid}>
      {browseCategories.map((category, index) => (
        <TouchableOpacity 
          key={`${category.id}-${index}`} 
          style={[styles.categoryCard, { backgroundColor: category.color }]}
          activeOpacity={0.8}
          onPress={() => 
            router.push({
              pathname: '/category/[id]',
              params: { id: category.id, title: category.title },
            })
          }
        >
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Image source={{ uri: category.image }} style={styles.categoryThumbnail} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    height: 100,
    borderRadius: 6,
    padding: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: '70%',
  },
  categoryThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
    position: 'absolute',
    bottom: -5,
    right: -10,
    transform: [{ rotate: '25deg' }],
  },
});