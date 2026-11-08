// src/components/ProfileDrawer.jsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  SafeAreaView,
  Text,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase'; // Adjust path if needed based on your folder structure
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
  onNewMessage
}) {
  // State for profile data loaded from AsyncStorage
  const [profileName, setProfileName] = useState('iceboy');
  const [avatarUri, setAvatarUri] = useState(null);

  // State to control the internal Add Account Modal
  const [isAddAccountVisible, setIsAddAccountVisible] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState(['iceboy']);

  // Load saved profile data whenever the drawer becomes visible
  useEffect(() => {
    if (visible) {
      const loadSavedProfile = async () => {
        try {
          const savedName = await AsyncStorage.getItem('user_profile_name');
          const savedAvatar = await AsyncStorage.getItem('user_profile_avatar');
          if (savedName) setProfileName(savedName);
          if (savedAvatar) setAvatarUri(savedAvatar);
        } catch (error) {
          console.error('Error loading profile data in drawer:', error);
        }
      };
      loadSavedProfile();
    }
  }, [visible]);

  // Direct Logout Handler executing Supabase Sign Out
  const handleLogoutPress = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of Medusa?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive', 
          onPress: async () => {
            try {
              onClose(); // Close the drawer first
              const { error } = await supabase.auth.signOut();
              if (error) throw error;

              // Redirect back to landing page or login screen
              router.replace('/'); 
            } catch (err) {
              Alert.alert('Logout Error', err?.message || 'Failed to log out. Please try again.');
            }
          }
        }
      ]
    );
  };

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
                username={profileName} 
                avatarUri={avatarUri} 
                followers={0} 
                following={14} 
                onPress={() => {
                  onClose();
                  onViewProfile && onViewProfile();
                }} 
              />

              {/* Menu List Component */}
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
                onPress={handleLogoutPress}
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