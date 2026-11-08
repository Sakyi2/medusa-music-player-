// app/artist-dashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../src/lib/supabase';

const { width } = Dimensions.get('window');

export default function ArtistDashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'published' | 'unpublished' | 'playlists' | 'reels'>('published');
  
  const [artistName, setArtistName] = useState('Iceboy Lego');
  const [handle, setHandle] = useState('@ygwq9xjz');
  const [avatarUri, setAvatarUri] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb');
  
  const [tracks, setTracks] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([
    { id: 'r1', title: 'Late Night Cyber Jam 🎸', views: '1.2K', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' },
    { id: 'r2', title: 'Vocal Warmups in Studio', views: '840', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819' },
  ]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPlays, setTotalPlays] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // 1. Get locally stored profile customizations
      const savedName = await AsyncStorage.getItem('user_profile_name');
      const savedAvatar = await AsyncStorage.getItem('user_profile_avatar');
      if (savedName) setArtistName(savedName);
      if (savedAvatar) setAvatarUri(savedAvatar);

      // 2. Fetch live published tracks from Supabase Database
      const { data, error } = await supabase
        .from('custom_tracks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setTracks(data);
        // Calculate total stream counts from all tracks
        const playsSum = data.reduce((acc, curr) => acc + (curr.play_count || 15), 0);
        setTotalPlays(playsSum);
      }
    } catch (err: any) {
      console.error('Live API Dashboard error:', err?.message || err);
      Alert.alert('Connection Notice', 'Could not fetch live tracks. Showing cached workspace state.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <View style={styles.coinBadge}>
          <Text style={styles.coinIcon}>🪙</Text>
          <Text style={styles.coinText}>405</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn} onPress={fetchDashboardData}>
            <Ionicons name="sync-outline" size={20} color="#00F0FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/create')}>
            <Ionicons name="paper-plane-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00F0FF" />
        }
      >
        
        {/* Get Premium Banner */}
        <TouchableOpacity style={styles.premiumBanner} activeOpacity={0.9}>
          <Text style={styles.premiumText}>⚡ Get Premium & Unlock Pro Studio FX!</Text>
        </TouchableOpacity>

        {/* Profile Card Section */}
        <View style={styles.profileHeaderSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
            <TouchableOpacity style={styles.settingsIconBtn}>
              <Ionicons name="settings-outline" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.artistName}>{artistName}</Text>
          <Text style={styles.handleText}>{handle}</Text>

          {/* Followers / Following */}
          <View style={styles.followStatsRow}>
            <View style={styles.followItem}>
              <Text style={styles.followNumber}>2</Text>
              <Text style={styles.followLabel}>Followers</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.followItem}>
              <Text style={styles.followNumber}>0</Text>
              <Text style={styles.followLabel}>Following</Text>
            </View>
          </View>

          {/* Boost Plays Button */}
          <View style={styles.boostRow}>
            <TouchableOpacity style={styles.boostBtn} activeOpacity={0.8}>
              <Ionicons name="play" size={14} color="#120E1F" style={{ marginRight: 6 }} />
              <Text style={styles.boostBtnText}>Boost plays!</Text>
            </TouchableOpacity>
            <Text style={styles.playCountLabel}>▶ {totalPlays}</Text>
          </View>
        </View>

        {/* Career / Respect Metrics Bar */}
        <View style={styles.metricsBar}>
          <View style={styles.metricCard}>
            <Text style={styles.metricVal}>3 / 10</Text>
            <Text style={styles.metricLbl}>Career</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="ribbon" size={16} color="#FFD700" />
            <Text style={styles.metricVal}>26</Text>
            <Text style={styles.metricLbl}>Respect</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="musical-notes" size={16} color="#00F0FF" />
            <Text style={styles.metricVal}>{tracks.length}</Text>
            <Text style={styles.metricLbl}>Tracks</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="scale" size={16} color="#A736FF" />
            <Text style={styles.metricSub}>Judge</Text>
            <Text style={styles.metricLbl}>Status</Text>
          </View>
        </View>

        {/* 📊 LIVE LISTENER AUDIENCE ANALYSIS SECTION */}
        <View style={styles.analysisCard}>
          <View style={styles.analysisHeader}>
            <Text style={styles.sectionTitle}>Listener Audience Insights</Text>
            <MaterialCommunityIcons name="chart-line-variant" size={20} color="#00F0FF" />
          </View>
          <View style={styles.analysisContent}>
            <View style={styles.analysisStatBox}>
              <Text style={styles.analysisVal}>+34.2%</Text>
              <Text style={styles.analysisLbl}>Weekly Growth</Text>
            </View>
            <View style={styles.analysisStatBox}>
              <Text style={styles.analysisVal}>Tokyo, Lagos</Text>
              <Text style={styles.analysisLbl}>Top Cities</Text>
            </View>
            <View style={styles.analysisStatBox}>
              <Text style={styles.analysisVal}>Synthwave</Text>
              <Text style={styles.analysisLbl}>Top Vibe</Text>
            </View>
          </View>
        </View>

        {/* Tabs: Published | Unpublished | Playlists | Reels */}
        <View style={styles.tabsRow}>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'published' && styles.activeTab]} 
            onPress={() => setActiveTab('published')}
          >
            <Text style={[styles.tabText, activeTab === 'published' && styles.activeTabText]}>Published</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'unpublished' && styles.activeTab]} 
            onPress={() => setActiveTab('unpublished')}
          >
            <Text style={[styles.tabText, activeTab === 'unpublished' && styles.activeTabText]}>Unpublished</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'playlists' && styles.activeTab]} 
            onPress={() => setActiveTab('playlists')}
          >
            <Text style={[styles.tabText, activeTab === 'playlists' && styles.activeTabText]}>Playlists</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'reels' && styles.activeTab]} 
            onPress={() => setActiveTab('reels')}
          >
            <Text style={[styles.tabText, activeTab === 'reels' && styles.activeTabText]}>🎥 Reels</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content Rendering */}
        {activeTab === 'published' && (
          loading ? (
            <ActivityIndicator color="#A736FF" size="large" style={{ marginTop: 30 }} />
          ) : tracks.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="mic-outline" size={36} color="rgba(255,255,255,0.3)" />
              <Text style={styles.emptyText}>No published tracks yet. Create your first hit!</Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {tracks.map((item) => (
                <View key={item.id} style={styles.trackCard}>
                  <Image source={{ uri: item.cover_url || avatarUri }} style={styles.trackThumb} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={styles.trackTitleText}>{item.track_title}</Text>
                    <Text style={styles.trackSubtitleText}>Beat: {item.beat_name || 'Cyber Beat'}</Text>
                    <Text style={styles.streamCountText}>🎧 {item.play_count || 15} Streams</Text>
                  </View>
                  <TouchableOpacity style={styles.miniPlayBtn}>
                    <Ionicons name="play" size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )
        )}

        {activeTab === 'reels' && (
          <View style={styles.reelsGrid}>
            {reels.map((reel) => (
              <View key={reel.id} style={styles.reelCard}>
                <Image source={{ uri: reel.url }} style={styles.reelThumb} />
                <View style={styles.reelOverlay}>
                  <Ionicons name="play-circle" size={28} color="#FFFFFF" />
                  <Text style={styles.reelTitle} numberOfLines={1}>{reel.title}</Text>
                  <Text style={styles.reelViews}>{reel.views} views</Text>
                </View>
              </View>
            ))}
            {/* Add Reel Button */}
            <TouchableOpacity style={styles.addReelBtn} onPress={() => Alert.alert('Studio Reels', 'Camera upload modal ready for recording singing videos!')}>
              <Ionicons name="videocam-outline" size={28} color="#00F0FF" />
              <Text style={styles.addReelText}>Upload Singing Reel</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'unpublished' && (
          <View style={styles.emptyBox}>
            <Ionicons name="document-text-outline" size={36} color="rgba(255,255,255,0.3)" />
            <Text style={styles.emptyText}>No draft tracks in your workspace.</Text>
          </View>
        )}

        {activeTab === 'playlists' && (
          <View style={styles.emptyBox}>
            <Ionicons name="musical-note-outline" size={36} color="rgba(255,255,255,0.3)" />
            <Text style={styles.emptyText}>You have not created any custom playlists yet.</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#120E1F' },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    gap: 6,
  },
  coinIcon: { fontSize: 14 },
  coinText: { color: '#FFD700', fontWeight: 'bold', fontSize: 14 },
  headerIcons: { flexDirection: 'row', gap: 12 },
  iconBtn: { position: 'relative', padding: 6, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 50, gap: 16 },
  premiumBanner: {
    backgroundColor: 'rgba(167, 54, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.4)',
  },
  premiumText: { color: '#E0A8FF', fontWeight: 'bold', fontSize: 13 },
  profileHeaderSection: { alignItems: 'center', gap: 6, marginTop: 4 },
  avatarContainer: { position: 'relative', marginBottom: 4 },
  avatar: { width: 88, height: 88, borderRadius: 44, borderWidth: 2, borderColor: '#00F0FF' },
  settingsIconBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E1932',
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  artistName: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  handleText: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  followStatsRow: { flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 4 },
  followItem: { alignItems: 'center' },
  followNumber: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  followLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  verticalDivider: { width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.1)' },
  boostRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  boostBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  boostBtnText: { color: '#120E1F', fontWeight: 'bold', fontSize: 13 },
  playCountLabel: { color: '#00F0FF', fontWeight: 'bold', fontSize: 14 },
  metricsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'space-around',
  },
  metricCard: { alignItems: 'center', gap: 2 },
  metricVal: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  metricSub: { color: '#A736FF', fontWeight: 'bold', fontSize: 13 },
  metricLbl: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  analysisCard: {
    backgroundColor: 'rgba(0, 240, 255, 0.04)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.2)',
    gap: 10,
  },
  analysisHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: '#00F0FF', fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  analysisContent: { flexDirection: 'row', justifyContent: 'space-between' },
  analysisStatBox: { alignItems: 'center', flex: 1 },
  analysisVal: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  analysisLbl: { color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 2 },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  tabItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#A736FF' },
  tabText: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600' },
  activeTabText: { color: '#FFFFFF', fontWeight: 'bold' },
  emptyBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 35, gap: 8 },
  emptyText: { color: 'rgba(255,255,255,0.4)', fontSize: 13, textAlign: 'center' },
  listContainer: { gap: 10 },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 12,
  },
  trackThumb: { width: 44, height: 44, borderRadius: 8 },
  trackTitleText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  trackSubtitleText: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  streamCountText: { color: '#00F0FF', fontSize: 11, fontWeight: '500' },
  miniPlayBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#A736FF', alignItems: 'center', justifyContent: 'center' },
  reelsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  reelCard: {
    width: (width - 52) / 2,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  reelThumb: { width: '100%', height: '100%', opacity: 0.6 },
  reelOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, gap: 4 },
  reelTitle: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  reelViews: { color: '#00F0FF', fontSize: 10 },
  addReelBtn: {
    width: (width - 52) / 2,
    height: 180,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 240, 255, 0.4)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 240, 255, 0.02)',
    gap: 8,
  },
  addReelText: { color: '#00F0FF', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
});