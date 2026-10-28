// src/components/profile/ProfileOptionsModal.jsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileOptionsModal({ 
  visible, 
  onClose, 
  username, 
  onHideActivity, 
  onPreviewProfile, 
  onShowMedusaCode 
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdropTouch} activeOpacity={1} onPress={onClose} />
        
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.safeArea}>
            
            {/* Drag Handle Indicator */}
            <View style={styles.dragHandle} />

            {/* User Info Header Row */}
            <View style={styles.userHeaderRow}>
              <View style={styles.smallAvatar}>
                <Text style={styles.smallAvatarText}>{username ? username[0].toUpperCase() : 'I'}</Text>
              </View>
              <Text style={styles.usernameText}>{username || 'iceboy'}</Text>
            </View>

            <View style={styles.divider} />

            {/* Menu Options */}
            <View style={styles.optionsList}>
              
              {/* Hide Listening Activity */}
              <TouchableOpacity 
                style={styles.optionItem} 
                activeOpacity={0.7} 
                onPress={() => { onClose(); onHideActivity && onHideActivity(); }}
              >
                <Ionicons name="eye-off-outline" size={22} color="#FFFFFF" />
                <Text style={styles.optionText}>Hide my listening activity</Text>
              </TouchableOpacity>

              {/* Preview Profile */}
              <TouchableOpacity 
                style={styles.optionItem} 
                activeOpacity={0.7} 
                onPress={() => { onClose(); onPreviewProfile && onPreviewProfile(); }}
              >
                <Ionicons name="eye-outline" size={22} color="#FFFFFF" />
                <Text style={styles.optionText}>Preview profile</Text>
              </TouchableOpacity>

              {/* Show Medusa Code */}
              <TouchableOpacity 
                style={styles.optionItem} 
                activeOpacity={0.7} 
                onPress={() => { onClose(); onShowMedusaCode && onShowMedusaCode(); }}
              >
                <Ionicons name="barcode-outline" size={22} color="#FFFFFF" />
                <View style={styles.optionRightContent}>
                  <Text style={styles.optionText}>Show Medusa code</Text>
                  <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
                </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  backdropTouch: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#191426',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(167, 54, 255, 0.3)',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  safeArea: {
    gap: 16,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginBottom: 4,
  },
  userHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  smallAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  usernameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 4,
  },
  optionsList: {
    gap: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  optionRightContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});