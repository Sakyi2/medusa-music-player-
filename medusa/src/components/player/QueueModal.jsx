// src/components/player/QueueModal.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QueueModal({ visible, onClose, playlist, currentSongId, onSelectQueueSong }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Playback Queue</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={playlist}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => {
              const isCurrent = String(item.id) === String(currentSongId);
              const thumb = item.albumCover || item.image || item.coverImage;
              return (
                <TouchableOpacity 
                  style={[styles.queueItem, isCurrent && styles.activeQueueItem]}
                  onPress={() => {
                    onClose();
                    if (onSelectQueueSong) onSelectQueueSong(item);
                  }}
                >
                  <Image source={{ uri: thumb }} style={styles.queueThumb} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.queueSongTitle, isCurrent && { color: '#A736FF' }]} numberOfLines={1}>
                      {item.title || item.name}
                    </Text>
                    <Text style={styles.queueSongArtist} numberOfLines={1}>
                      {item.artist || item.artistName}
                    </Text>
                  </View>
                  {isCurrent && <Ionicons name="volume-high" size={18} color="#A736FF" />}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={<Text style={styles.emptyQueueText}>No upcoming tracks in queue.</Text>}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#191426',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '60%',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  queueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  activeQueueItem: {
    backgroundColor: 'rgba(167, 54, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  queueThumb: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  queueSongTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  queueSongArtist: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  emptyQueueText: {
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    paddingVertical: 30,
  },
});