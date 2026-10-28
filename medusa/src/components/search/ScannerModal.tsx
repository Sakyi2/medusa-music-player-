import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity, 
  Dimensions, 
  Animated, 
  PanResponder,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

const { width, height } = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ScannerModal({ visible, onClose }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const panY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && (!permission || !permission.granted)) {
      requestPermission();
    }
    if (visible) {
      panY.setValue(0);
    }
  }, [visible]);

  // PanResponder to enable drag-down to close gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          Animated.timing(panY, {
            toValue: height,
            duration: 200,
            useNativeDriver: true,
          }).start(() => onClose());
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      transparent={true} 
      onRequestClose={onClose}
    >
      {/* Dark background overlay letting the previous screen peek from the top */}
      <View style={styles.backdrop}>
        
        {/* Animated Card Sheet Container */}
        <Animated.View 
          style={[styles.cardContainer, { transform: [{ translateY: panY }] }]}
          {...panResponder.panHandlers}
        >
          {/* Top Grabber Handle */}
          <View style={styles.grabber} />

          {/* Close Button */}
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.closeBtn} 
            activeOpacity={0.7}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="close" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          {permission?.granted ? (
            <View style={styles.contentArea}>
              {/* Camera Viewfinder Card Frame */}
              <View style={styles.viewfinderBox}>
                <CameraView style={StyleSheet.absoluteFill} facing="back" />
              </View>

              {/* Sound Wave / Audio Icon Line */}
              <View style={styles.soundWaveContainer}>
                <View style={[styles.bar, { height: 16 }]} />
                <View style={[styles.bar, { height: 28 }]} />
                <View style={[styles.bar, { height: 38 }]} />
                <View style={[styles.bar, { height: 28 }]} />
                <View style={[styles.bar, { height: 16 }]} />
              </View>

              <Text style={styles.hint}>Point your camera at a medusa code.</Text>

              <TouchableOpacity style={styles.photosBtn} activeOpacity={0.8}>
                <Text style={styles.photosBtnText}>Select from photos</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.permissionContainer}>
              <Text style={styles.permissionText}>Camera access is required to scan codes.</Text>
              <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
                <Text style={styles.permissionBtnText}>Grant Permission</Text>
              </TouchableOpacity>
            </View>
          )}

        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  cardContainer: {
    height: '82%',
    backgroundColor: '#121212',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 20,
  },
  grabber: {
    width: 36,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 99,
    padding: 4,
  },
  contentArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  viewfinderBox: {
    width: width * 0.65,
    height: width * 0.85,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#000',
    marginBottom: 20,
  },
  soundWaveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  bar: {
    width: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  hint: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  photosBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  photosBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  permissionText: {
    color: '#B3B3B3',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionBtn: {
    backgroundColor: '#A736FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  permissionBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});