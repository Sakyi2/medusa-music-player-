// src/components/Profile/ProfileWidgets.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileWidgets({ onToggleActivity, onInviteFriends, onNewMessage }) {
  return (
    <View style={styles.container}>
      {/* Activity & Friends Card Box */}
      <View style={styles.cardBox}>
        <TouchableOpacity 
          style={styles.cardColumn} 
          activeOpacity={0.8}
          onPress={onToggleActivity}
        >
          <View style={styles.subAvatarContainer}>
            <Text style={styles.subAvatarText}>I</Text>
          </View>
          <Text style={styles.cardTitle}>Activity</Text>
          <Text style={styles.cardSubtitle}>Turn on</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cardColumn} 
          activeOpacity={0.8}
          onPress={onInviteFriends}
        >
          <View style={styles.plusIconContainer}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.cardTitle}>Invite friends</Text>
        </TouchableOpacity>
      </View>

      {/* Messages Card */}
      <View style={styles.messagesBox}>
        <View style={styles.messagesHeaderRow}>
          <Text style={styles.messagesHeading}>Messages</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" />
        </View>
        <Text style={styles.messagesDesc}>Share what you love with friends directly on Medusa.</Text>
        
        <TouchableOpacity 
          style={styles.newMessageButton} 
          activeOpacity={0.8}
          onPress={onNewMessage}
        >
          <Ionicons name="create-outline" size={16} color="#FFFFFF" />
          <Text style={styles.newMessageText}>New message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  cardBox: {
    flexDirection: 'row',
    backgroundColor: '#231D35',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
    padding: 16,
    gap: 12,
  },
  cardColumn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(25, 20, 38, 0.5)',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 6,
  },
  subAvatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subAvatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  plusIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
  },
  messagesBox: {
    backgroundColor: '#231D35',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.2)',
    padding: 16,
    gap: 10,
  },
  messagesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagesHeading: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messagesDesc: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    lineHeight: 16,
  },
  newMessageButton: {
    flexDirection: 'row',
    backgroundColor: '#191426',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  newMessageText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});