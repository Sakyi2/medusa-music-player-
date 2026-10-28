// src/screens/SettingsScreen.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ onBackPress, onLogout }) {
  const [isDataSaver, setIsDataSaver] = useState(true);
  const [isPrivateSession, setIsPrivateSession] = useState(false);

  const handleSettingPress = (title, description) => {
    Alert.alert(title, `Opening settings for: ${description}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Header */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity onPress={() => Alert.alert("Search", "Search settings")} style={styles.iconButton}>
          <Ionicons name="search" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Quick Toggles Grid */}
        <View style={styles.topTogglesRow}>
          <TouchableOpacity 
            style={[styles.toggleCard, isDataSaver && styles.toggleCardActive]} 
            onPress={() => setIsDataSaver(!isDataSaver)}
            activeOpacity={0.8}
          >
            <Ionicons name="stats-chart" size={22} color="#FFFFFF" />
            <Text style={styles.toggleCardTitle}>Data Saver mode</Text>
            <Text style={styles.toggleCardSub}>{isDataSaver ? "Automatic" : "Off"}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toggleCard, isPrivateSession && styles.toggleCardActive]} 
            onPress={() => setIsPrivateSession(!isPrivateSession)}
            activeOpacity={0.8}
          >
            <Ionicons name="eye-off" size={22} color="#FFFFFF" />
            <Text style={styles.toggleCardTitle}>Private session</Text>
            <Text style={styles.toggleCardSub}>{isPrivateSession ? "On" : "Off"}</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Options List */}
        <View style={styles.optionsList}>
          
          <TouchableOpacity style={styles.optionRow} onPress={() => handleSettingPress("Account", "Username • Premium plans")}>
            <Ionicons name="person-outline" size={24} color="rgba(255,255,255,0.8)" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Account</Text>
              <Text style={styles.optionSub}>Username • Premium plans</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => handleSettingPress("Content and display", "Canvas • Allow explicit content")}>
            <Ionicons name="musical-note-outline" size={24} color="rgba(255,255,255,0.8)" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Content and display</Text>
              <Text style={styles.optionSub}>Canvas • Allow explicit content</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => handleSettingPress("Privacy and social", "Private session • Public playlists")}>
            <Ionicons name="lock-closed-outline" size={24} color="rgba(255,255,255,0.8)" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Privacy and social</Text>
              <Text style={styles.optionSub}>Private session • Public playlists</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => handleSettingPress("Playback", "Gapless playback • Autoplay")}>
            <Ionicons name="volume-high-outline" size={24} color="rgba(255,255,255,0.8)" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Playback</Text>
              <Text style={styles.optionSub}>Gapless playback • Autoplay</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => handleSettingPress("Notifications", "Push • Email")}>
            <Ionicons name="notifications-outline" size={24} color="rgba(255,255,255,0.8)" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Notifications</Text>
              <Text style={styles.optionSub}>Push • Email</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => handleSettingPress("Apps and devices", "Google Maps • Import from other apps")}>
            <Ionicons name="phone-portrait-outline" size={24} color="rgba(255,255,255,0.8)" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Apps and devices</Text>
              <Text style={styles.optionSub}>Google Maps • Import from other apps</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => handleSettingPress("Data-saving and offline", "Data Saver mode • Downloads over cellular")}>
            <Ionicons name="arrow-down-circle-outline" size={24} color="rgba(255,255,255,0.8)" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Data-saving and offline</Text>
              <Text style={styles.optionSub}>Data Saver mode • Downloads over cellular</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => handleSettingPress("Media quality", "Wi-Fi streaming quality • Audio download quality")}>
            <Ionicons name="bar-chart-outline" size={24} color="rgba(255,255,255,0.8)" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Media quality</Text>
              <Text style={styles.optionSub}>Wi-Fi streaming quality • Audio download quality</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} onPress={() => handleSettingPress("Advertising", "Tailored ads")}>
            <Ionicons name="tv-outline" size={24} color="rgba(255,255,255,0.8)" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Advertising</Text>
              <Text style={styles.optionSub}>Tailored ads</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>

        </View>

        {/* Logout Button Section */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={onLogout}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    gap: 20,
  },
  topTogglesRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  toggleCard: {
    flex: 1,
    backgroundColor: '#1E172C',
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.15)',
  },
  toggleCardActive: {
    borderColor: '#22C55E',
    backgroundColor: '#201B2E',
  },
  toggleCardTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  toggleCardSub: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  optionsList: {
    gap: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  optionTextContainer: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  optionSub: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});