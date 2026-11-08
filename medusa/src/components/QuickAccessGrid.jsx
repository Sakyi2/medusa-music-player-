//src/components/QuickAccessGrid.jsx

import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { fetchMusicByGenre, fetchTopCharts } from '../services/musicApi';



export default function QuickAccessGrid({ onPlaylistPress, onSeeAllPress }) {

  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const loadDynamicData = async () => {

      setLoading(true);

      try {

        // Fetch real tracks across different popular global genres & charts from Deezer

        const [afrobeats, synthwave, latin, kpop, charts] = await Promise.all([

          fetchMusicByGenre('Afrobeats'),

          fetchMusicByGenre('Synthwave'),

          fetchMusicByGenre('Latin'),

          fetchMusicByGenre('K-Pop'),

          fetchTopCharts(),

        ]);



        const dynamicSections = [

          {

            title: 'Jump Back In',

            items: charts.slice(0, 3).map(t => ({ id: t.id, title: t.title, subtitle: t.artist, image: { uri: t.albumCover }, audioUrl: t.audioUrl }))

          },

          {

            title: 'Afrobeat & Global Grooves',

            items: afrobeats.slice(0, 4).map(t => ({ id: t.id, title: t.title, subtitle: t.artist, image: { uri: t.albumCover }, audioUrl: t.audioUrl }))

          },

          {

            title: 'Favourite Artists',

            isCircular: true,

            items: charts.slice(4, 8).map(t => ({ id: t.id, title: t.artist, subtitle: 'Artist', image: { uri: t.albumCover } }))

          },

          {

            title: 'Midnight Synthwave',

            items: synthwave.slice(0, 4).map(t => ({ id: t.id, title: t.title, subtitle: t.artist, image: { uri: t.albumCover }, audioUrl: t.audioUrl }))

          },

          {

            title: 'Latin & Reggaeton Beats',

            items: latin.slice(0, 4).map(t => ({ id: t.id, title: t.title, subtitle: t.artist, image: { uri: t.albumCover }, audioUrl: t.audioUrl }))

          },

          {

            title: 'K-Pop Sensations',

            items: kpop.slice(0, 4).map(t => ({ id: t.id, title: t.title, subtitle: t.artist, image: { uri: t.albumCover }, audioUrl: t.audioUrl }))

          }

        ];



        setSections(dynamicSections);

      } catch (error) {

        console.error('Error loading QuickAccessGrid data:', error);

      } finally {

        setLoading(false);

      }

    };



    loadDynamicData();

  }, []);



  if (loading) {

    return (

      <View style={styles.loaderContainer}>

        <ActivityIndicator size="large" color="#A736FF" />

      </View>

    );

  }



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

  loaderContainer: {

    paddingVertical: 40,

    alignItems: 'center',

    justifyContent: 'center',

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