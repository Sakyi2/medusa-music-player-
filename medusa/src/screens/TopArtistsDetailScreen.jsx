// src/screens/TopArtistsDetailScreen.jsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Image,
  Modal,
  Share,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchTopArtistsStats } from '../services/musicApi';

export default function TopArtistsDetailScreen({ onBackPress }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load real artist rankings on mount
  useEffect(() => {
    const loadTopArtists = async () => {
      setLoading(true);
      try {
        const data = await fetchTopArtistsStats();
        if (data.length > 0) {
          setArtists(data);
        } else {
          // Safe web fallback if network request returns empty
          setArtists([
            { id: '1', name: 'Burna Boy', subtitle: 'Top Artist • 2026', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop' },
            { id: '2', name: 'Gunna', subtitle: 'Top Artist • 2026', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop' },
            { id: '3', name: 'Kwesi Arthur', subtitle: 'Top Artist • 2026', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop' },
          ]);
        }
      } catch (error) {
        console.error('Error loading top artists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTopArtists();
  }, []);

  // Handle sharing top artists overall stats
  const handleShareStats = async () => {
    try {
      const topNames = artists.map((a) => a.name).join(', ');
      await Share.share({
        message: `Check out my Medusa listening stats! My top artists feature: ${topNames || 'Burna Boy, Gunna, and Kwesi Arthur'}.`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Open action sheet for a specific artist
  const openArtistOptions = (artist) => {
    setSelectedArtist(artist);
    setModalVisible(true);
  };

  // Handle individual actions inside the modal popup
  const handleActionPress = (actionName) => {
    setModalVisible(false);
    switch (actionName) {
      case 'Share':
        Share.share({ message: `Check out ${selectedArtist?.name} on Medusa!` });
        break;
      case 'Follow':
        Alert.alert("Success", `You are now following ${selectedArtist?.name}`);
        break;
      case 'Block':
        Alert.alert("Updated", `Medusa will skip playing music by ${selectedArtist?.name}`);
        break;
      case 'Radio':
        Alert.alert("Go to Radio", `Starting radio station inspired by ${selectedArtist?.name}`);
        break;
      case 'Concerts':
        Alert.alert("Concerts", `Searching for upcoming live shows for ${selectedArtist?.name}`);
        break;
      case 'Report':
        Alert.alert("Report", `Report submitted for ${selectedArtist?.name}`);
        break;
      case 'Code':
        Alert.alert("Medusa Code", `Displaying scannable code profile for ${selectedArtist?.name}`);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top artists</Text>
        <TouchableOpacity onPress={handleShareStats} style={styles.iconButton}>
          <Ionicons name="share-outline" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Date and Summary Banner */}
        <View style={styles.summaryContainer}>
          <Text style={styles.dateRange}>5–11 Oct</Text>
          <Text style={styles.summaryText}>
            You listened to <Text style={styles.highlightText}>{artists.length || 75} top artists</Text> this week
          </Text>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Artist Ranking List */}
        {loading ? (
          <ActivityIndicator size="large" color="#A736FF" style={{ marginVertical: 40 }} />
        ) : (
          <View style={styles.listContainer}>
            {artists.map((artist, index) => (
              <View key={artist.id} style={styles.artistRow}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
                
                <Image 
                  source={{ uri: artist.image }} 
                  style={styles.avatar} 
                  resizeMode="cover" 
                />

                <View style={styles.artistInfo}>
                  <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
                  {artist.subtitle ? (
                    <Text style={styles.artistSubtitle} numberOfLines={1}>{artist.subtitle}</Text>
                  ) : null}
                </View>

                <TouchableOpacity 
                  style={styles.optionsButton} 
                  activeOpacity={0.7}
                  onPress={() => openArtistOptions(artist)}
                >
                  <Ionicons name="ellipsis-horizontal" size={18} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

      </ScrollView>

      {/* Artist Options Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.bottomSheetContainer}>
                
                {/* Drag Handle Bar */}
                <View style={styles.dragHandleBar} />

                {/* Selected Artist Header */}
                {selectedArtist && (
                  <View style={styles.sheetHeader}>
                    <Image source={{ uri: selectedArtist.image }} style={styles.sheetAvatar} />
                    <Text style={styles.sheetArtistName} numberOfLines={1}>{selectedArtist.name}</Text>
                  </View>
                )}

                {/* Action Items List */}
                <ScrollView contentContainerStyle={styles.sheetActionsList} showsVerticalScrollIndicator={false}>
                  
                  <TouchableOpacity style={styles.actionItem} onPress={() => handleActionPress('Share')}>
                    <Ionicons name="share-outline" size={22} color="#FFFFFF" />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItem} onPress={() => handleActionPress('Follow')}>
                    <Ionicons name="person-add-outline" size={22} color="#FFFFFF" />
                    <Text style={styles.actionText}>Follow</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItem} onPress={() => handleActionPress('Block')}>
                    <Ionicons name="ban-outline" size={22} color="#FFFFFF" />
                    <Text style={styles.actionText}>Don't play this artist</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItem} onPress={() => handleActionPress('Radio')}>
                    <Ionicons name="radio-outline" size={22} color="#FFFFFF" />
                    <Text style={styles.actionText}>Go to radio</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItem} onPress={() => handleActionPress('Concerts')}>
                    <Ionicons name="ticket-outline" size={22} color="#FFFFFF" />
                    <Text style={styles.actionText}>Go to artist concerts</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItem} onPress={() => handleActionPress('Report')}>
                    <Ionicons name="alert-circle-outline" size={22} color="#FFFFFF" />
                    <Text style={styles.actionText}>Report</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionItemRow} onPress={() => handleActionPress('Code')}>
                    <View style={styles.actionItemLeft}>
                      <Ionicons name="barcode-outline" size={22} color="#FFFFFF" />
                      <Text style={styles.actionText}>Show Medusa Code</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
                  </TouchableOpacity>

                </ScrollView>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120E1F',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    gap: 16,
  },
  summaryContainer: {
    gap: 6,
    marginTop: 8,
  },
  dateRange: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    fontWeight: '500',
  },
  summaryText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  highlightText: {
    color: '#38BDF8',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 4,
  },
  listContainer: {
    gap: 20,
    marginTop: 4,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rankNumber: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 15,
    fontWeight: '600',
    width: 16,
    textAlign: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
    backgroundColor: '#1E172C',
  },
  artistInfo: {
    flex: 1,
    gap: 2,
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontWeight: '500',
  },
  optionsButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: '#181226',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
  },
  dragHandleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
  },
  sheetAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
  },
  sheetArtistName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  sheetActionsList: {
    gap: 4,
    paddingVertical: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 14,
  },
  actionItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  actionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
});