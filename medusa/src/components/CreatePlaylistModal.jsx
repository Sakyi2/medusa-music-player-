// src/components/CreatePlaylistModal.jsx
import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function CreatePlaylistModal({ visible, onClose, onSelectOption }) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          stiffness: 90,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const options = [
    {
      id: 'playlist',
      title: 'Playlist',
      subtitle: 'Build a custom mix of your favorite tracks',
      icon: 'musical-notes-outline',
      iconLibrary: Ionicons,
      color: '#A736FF',
    },
    {
      id: 'collaborative',
      title: 'Collaborative Playlist',
      subtitle: 'Build a playlist with friends in real-time',
      icon: 'people-outline',
      iconLibrary: Ionicons,
      color: '#00F0FF', // Neon Cyan
    },
    {
      id: 'blend',
      title: 'Blend',
      subtitle: 'Combine tastes with another music junkie',
      icon: 'git-compare-outline',
      iconLibrary: Ionicons,
      color: '#FF007F', // Neon Pink
    },
    {
      id: 'folder',
      title: 'Folder',
      subtitle: 'Organize your playlists neatly into sections',
      icon: 'folder-outline',
      iconLibrary: Ionicons,
      color: '#FFB800', // Neon Gold/Orange
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        {/* Backdrop overlay */}
        <Pressable style={styles.backdropPressable} onPress={onClose} />

        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Drag Handle Bar */}
          <View style={styles.handleBar} />

          <Text style={styles.modalHeaderTitle}>Create New</Text>

          <View style={styles.optionsList}>
            {options.map((opt) => {
              const IconComponent = opt.iconLibrary;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={styles.optionRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    onSelectOption(opt.id);
                    onClose();
                  }}
                >
                  <View style={[styles.iconBox, { borderColor: opt.color, backgroundColor: `${opt.color}15` }]}>
                    <IconComponent name={opt.icon} size={22} color={opt.color} />
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>{opt.title}</Text>
                    <Text style={styles.optionSubtitle}>{opt.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="rgba(255, 255, 255, 0.3)" />
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    backgroundColor: '#161026',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(167, 54, 255, 0.35)',
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  optionsList: {
    gap: 14,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 14,
    gap: 2,
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  optionSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});