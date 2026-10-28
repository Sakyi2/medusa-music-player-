import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView, 
  ImageBackground,
  StatusBar,
  Image,
  PanResponder
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type DiscoverItem = {
  id: string;
  tag: string;
  title: string;
  artist: string;
  followers: string;
  image: string;
};

interface Props {
  visible: boolean;
  onClose: () => void;
}

const DISCOVER_REELS: DiscoverItem[] = [
  { id: '1', tag: '#afrobeats', title: '50-50', artist: 'VASA', followers: '36K followers', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7' },
  { id: '2', tag: '#igbotrap', title: 'Nsogbu', artist: 'Zion Lion', followers: '18K followers', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad' },
  { id: '3', tag: '#trap', title: 'Neon Nights', artist: 'CyberK', followers: '54K followers', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f' },
];

export default function DiscoverPlayerModal({ visible, onClose }: Props) {
  const [following, setFollowing] = useState<{ [key: string]: boolean }>({});
  const [activeTag, setActiveTag] = useState('#afrobeats');

  const toggleFollow = (id: string) => {
    setFollowing(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / height);
    if (DISCOVER_REELS[index]) {
      setActiveTag(DISCOVER_REELS[index].tag);
    }
  };

  // PanResponder to detect a downward swipe to exit
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dy > 30 && Math.abs(gestureState.dx) < 50;
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100 || gestureState.vy > 0.5) {
        onClose();
      }
    },
  });

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      transparent={false} 
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.container} {...panResponder.panHandlers}>
        
        {/* Top Header Overlay */}
        <SafeAreaView style={styles.topHeaderOverlay} pointerEvents="box-none">
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.iconBtn}
            activeOpacity={0.6}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.topCenterContainer}>
            <View style={styles.dashContainer}>
              <View style={[styles.dash, styles.activeDash]} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
            </View>
            <Text style={styles.topTag}>{activeTag}</Text>
          </View>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.6}>
            <Feather name="volume-2" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Vertical Swiping Reel Container */}
        <ScrollView
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          style={styles.scrollContainer}
        >
          {DISCOVER_REELS.map((item) => {
            const isFollowing = following[item.id] || false;
            return (
              <View key={item.id} style={styles.reelSlide}>
                <ImageBackground source={{ uri: item.image }} style={styles.reelBackground}>
                  <View style={styles.overlay}>
                    
                    {/* Center Huge Track Title & Director */}
                    <View style={styles.centerContent}>
                      <Text style={styles.bigSongTitle}>{item.title}</Text>
                      <Text style={styles.directorText}>DIRECTED BY CEDONY</Text>
                    </View>

                    {/* Bottom Info Section */}
                    <View style={styles.bottomSection}>
                      <View style={styles.profileRow}>
                        <View style={styles.avatarMini}>
                          <Text style={styles.avatarMiniText}>{item.artist[0]}</Text>
                        </View>
                        <View style={styles.profileMeta}>
                          <Text style={styles.artistName}>{item.artist}</Text>
                          <Text style={styles.followersText}>{item.followers}</Text>
                        </View>
                        <TouchableOpacity 
                          style={[styles.followBtn, isFollowing && styles.followingBtn]} 
                          onPress={() => toggleFollow(item.id)}
                          activeOpacity={0.8}
                        >
                          <Text style={[styles.followText, isFollowing && styles.followingText]}>
                            {isFollowing ? 'Following' : 'Follow'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionIconBtn}>
                          <Feather name="share" size={22} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.tagOptionsRow}>
                        <Text style={styles.hashtags}>#entertaining #afrobeats #afropop #fear100</Text>
                        <TouchableOpacity>
                          <Feather name="more-horizontal" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.trackCard}>
                        <Image source={{ uri: item.image }} style={styles.trackThumb} />
                        <View style={styles.trackInfo}>
                          <Text style={styles.trackTitle}>{item.title}</Text>
                          <Text style={styles.trackArtist}>{item.artist}</Text>
                        </View>
                        <TouchableOpacity style={styles.addActionBtn}>
                          <Ionicons name="add" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    </View>

                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    flex: 1,
  },
  topHeaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  iconBtn: {
    padding: 8,
  },
  topCenterContainer: {
    alignItems: 'center',
  },
  dashContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  dash: {
    width: 14,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 2,
  },
  activeDash: {
    backgroundColor: '#FFFFFF',
    width: 22,
  },
  topTag: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  reelSlide: {
    width: width,
    height: height,
  },
  reelBackground: {
    width: width,
    height: height,
    justifyContent: 'space-between',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'space-between',
    paddingTop: 120,
    paddingBottom: 35,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigSongTitle: {
    color: '#FFD700',
    fontSize: 64,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  directorText: {
    color: '#E0E0E0',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 6,
  },
  bottomSection: {
    paddingHorizontal: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarMini: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A736FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiniText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileMeta: {
    flex: 1,
    marginLeft: 10,
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  followersText: {
    color: '#B3B3B3',
    fontSize: 11,
  },
  followBtn: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  followingBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: '#A736FF',
  },
  followText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  followingText: {
    color: '#A736FF',
  },
  actionIconBtn: {
    padding: 6,
  },
  tagOptionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  hashtags: {
    color: '#E0E0E0',
    fontSize: 13,
    flex: 1,
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.75)',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  trackThumb: {
    width: 42,
    height: 42,
    borderRadius: 8,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  trackArtist: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  addActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
});