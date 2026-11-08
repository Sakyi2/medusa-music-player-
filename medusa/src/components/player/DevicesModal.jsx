// src/components/player/DevicesModal.jsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DevicesModal({ visible, onClose, selectedDevice, onSelectDevice }) {
  const devices = ['Medusa Built-in Speaker', 'AirPlay / Bluetooth Audio', 'Medusa Web Desktop Client'];

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Connect to a Device</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {devices.map((device) => (
            <TouchableOpacity 
              key={device} 
              style={styles.deviceItem}
              onPress={() => {
                onSelectDevice(device);
                onClose();
              }}
            >
              <Ionicons 
                name={device.includes('Speaker') ? 'phone-portrait-outline' : 'bluetooth-outline'} 
                size={20} 
                color={selectedDevice === device ? '#A736FF' : '#FFFFFF'} 
              />
              <Text style={[styles.deviceText, selectedDevice === device && { color: '#A736FF', fontWeight: 'bold' }]}>
                {device}
              </Text>
              {selectedDevice === device && <Ionicons name="checkmark" size={18} color="#A736FF" />}
            </TouchableOpacity>
          ))}
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
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  deviceText: {
    color: '#FFFFFF',
    fontSize: 15,
    flex: 1,
  },
});