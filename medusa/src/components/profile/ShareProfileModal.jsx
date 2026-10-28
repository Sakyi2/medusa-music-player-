// src/components/profile/ShareProfileModal.jsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  SafeAreaView,
  Share,
  Clipboard,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ShareProfileModal({ visible, onClose, username }) {
  const profileUrl = `https://medusa.music/profile/${username || 'iceboy'}`;

  // Native share sheet (handles WhatsApp, Messages, etc. automatically)
  const handleNativeShare = async () => {
    try {
      await Share.share({
        message: `Check out my profile on Medusa: ${profileUrl}`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Copy link to clipboard
  const handleCopyLink = () => {
    Clipboard.setString(profileUrl);
    Alert.alert('Copied!', 'Profile link copied to clipboard.');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.safeArea}>
            
            {/* Modal Header */}
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Share profile</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Profile Link Display Box */}
            <View style={styles.linkBox}>
              <Text style={styles.linkText} numberOfLines={1}>{profileUrl}</Text>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink} activeOpacity={0.8}>
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>

            {/* Social Sharing Options Grid */}
            <View style={styles.socialGrid}>
              <TouchableOpacity style={styles.socialItem} onPress={handleNativeShare} activeOpacity={0.8}>
                <View style={[styles.socialIconBg, { backgroundColor: '#25D366' }]}>
                  <Ionicons name="logo-whatsapp" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.socialLabel}>WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialItem} onPress={handleNativeShare} activeOpacity={0.8}>
                <View style={[styles.socialIconBg, { backgroundColor: '#000000' }]}>
                  <Ionicons name="logo-twitter" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.socialLabel}>X (Twitter)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialItem} onPress={handleNativeShare} activeOpacity={0.8}>
                <View style={[styles.socialIconBg, { backgroundColor: '#0088cc' }]}>
                  <Ionicons name="paper-plane" size={22} color="#FFFFFF" />
                </View>
                <Text style={styles.socialLabel}>Telegram</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialItem} onPress={handleNativeShare} activeOpacity={0.8}>
                <View style={[styles.socialIconBg, { backgroundColor: '#A736FF' }]}>
                  <Ionicons name="share-social-outline" size={22} color="#FFFFFF" />
                </View>
                <Text style={styles.socialLabel}>More</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#191426',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(167, 54, 255, 0.3)',
    padding: 24,
    paddingBottom: 40,
  },
  safeArea: {
    gap: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#231D35',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  linkText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  copyButton: {
    backgroundColor: '#A736FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  socialItem: {
    alignItems: 'center',
    gap: 8,
  },
  socialIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  socialLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});