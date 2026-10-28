// src/components/profile/AddAccountModal.jsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddAccountModal({ visible, onClose, onAccountAdded }) {
  const [accountHandle, setAccountHandle] = useState('');
  const [password, setPassword] = useState('');

  const handleAddAccount = () => {
    if (!accountHandle.trim()) {
      Alert.alert('Error', 'Please enter a username or email for the account.');
      return;
    }

    // Trigger success callback
    onAccountAdded(accountHandle.trim());
    setAccountHandle('');
    setPassword('');
    onClose();
    Alert.alert('Success', `Account @${accountHandle} added successfully!`);
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
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Add account</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Description */}
            <Text style={styles.descriptionText}>
              Link another Medusa account to easily switch between profiles without signing out.
            </Text>

            {/* Inputs Container */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Username or Email</Text>
                <TextInput 
                  style={styles.textInput}
                  value={accountHandle}
                  onChangeText={setAccountHandle}
                  placeholder="e.g. cyber_artist"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput 
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={handleAddAccount}>
                <Text style={styles.addButtonText}>Link account</Text>
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
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    lineHeight: 18,
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#231D35',
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#A736FF',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});