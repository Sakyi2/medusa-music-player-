// src/components/ProfileDrawer.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  SafeAreaView,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileHeader from './profile/ProfileHeader';
import ProfileMenuList from './profile/ProfileMenuList';
import ProfileWidgets from './profile/ProfileWidgets';
import AddAccountModal from './profile/AddAccountModal';

export default function ProfileDrawer({ 
  visible, 
  onClose, 
  onViewProfile, 
  onListeningStats, 
  onRecents, 
  onUpdates, 
  onSettings, 
  onToggleActivity, 
  onInviteFriends, 
  onNewMessage, 
  onLogout 
}) {
  // State to control the internal Add Account Modal
  const [isAddAccountVisible, setIsAddAccountVisible] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState(['iceboy']);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop to close drawer when tapping outside */}
        <TouchableOpacity style={styles.backdropTouch} activeOpacity={1} onPress={onClose} />

        {/* Drawer Content Container */}
        <View style={styles.drawerContainer}>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              
              {/* Profile Header Component */}
              <ProfileHeader 
                onPress={() => { onClose(); onViewProfile && onViewProfile(); }} 
              />

              {/* Menu List Component - Properly calling onSettings now */}
              <ProfileMenuList 
                onAddAccount={() => { 
                  setIsAddAccountVisible(true); 
                }}
                onListeningStats={() => { onClose(); onListeningStats && onListeningStats(); }}
                onRecents={() => { onClose(); onRecents && onRecents(); }}
                onUpdates={() => { onClose(); onUpdates && onUpdates(); }}
                onSettings={() => { onClose(); onSettings && onSettings(); }}
              />

              {/* Widgets Component (Activity, Invite, Messages) */}
              <ProfileWidgets 
                onToggleActivity={() => { onToggleActivity && onToggleActivity(); }}
                onInviteFriends={() => { onInviteFriends && onInviteFriends(); }}
                onNewMessage={() => { onClose(); onNewMessage && onNewMessage(); }}
              />

              {/* Logout Button */}
              <TouchableOpacity 
                style={styles.logoutButton} 
                activeOpacity={0.7} 
                onPress={() => { onClose(); onLogout && onLogout(); }}
              >
                <Ionicons name="log-out-outline" size={20} color="#A736FF" />
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>

            </ScrollView>
          </SafeAreaView>
        </View>
      </View>

      {/* Add Account Modal embedded right inside the drawer ecosystem */}
      <AddAccountModal 
        visible={isAddAccountVisible}
        onClose={() => setIsAddAccountVisible(false)}
        onAccountAdded={(newAccount) => {
          setLinkedAccounts([...linkedAccounts, newAccount]);
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
  },
  backdropTouch: {
    flex: 0.25,
  },
  drawerContainer: {
    flex: 0.75,
    backgroundColor: '#191426',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(167, 54, 255, 0.3)',
    height: '100%',
    shadowColor: '#A736FF',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
    paddingVertical: 8,
  },
  logoutText: {
    color: '#A736FF',
    fontSize: 15,
    fontWeight: '600',
  },
});