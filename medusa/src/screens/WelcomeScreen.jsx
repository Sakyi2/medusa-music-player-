import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Animated } from 'react-native';
import { router } from 'expo-router'; // <-- Import expo-router directly

export default function WelcomeScreen() { // You don't need props here anymore!
  // Animation value for the pulsing neon glow effect
  const pulseAnim = useRef(new Animated.Value(1)).setValue ? useRef(new Animated.Value(1)).current : new Animated.Value(1);

  useEffect(() => {
    // Create an infinite pulsing loop animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08, // Scale up slightly
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1, // Scale back down
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
       

        {/* Animated Circular 3D Logo Container */}
        <View style={styles.logoContainer}>
          <Animated.View 
            style={[
              styles.logoCircle, 
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <Image 
              source={require('../../assets/images/medusa_3.png')} 
              style={styles.medusaImage}
              resizeMode="cover"
            />
          </Animated.View>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Music that transforms you.</Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          
          {/* Primary CTA (Purple) - Navigates to Signup Page */}
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.8}
            onPress={() => {
              router.push('/signup'); // Direct file-based navigation for Expo Router
            }}
          >
            <Text style={styles.primaryButtonText}>Sign up free</Text>
          </TouchableOpacity>

          {/* Secondary CTA */}
          <TouchableOpacity 
            style={styles.secondaryButton} 
            activeOpacity={0.8}
            onPress={() => {
              // Add Google sign-in logic here if needed
            }}
          >
            <Text style={styles.secondaryButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Tertiary CTA - Navigates to Login Page */}
          <TouchableOpacity 
            style={styles.secondaryButton} 
            activeOpacity={0.8}
            onPress={() => {
              router.push('/login'); // Direct file-based navigation for Expo Router
            }}
          >
            <Text style={styles.secondaryButtonText}>Log in</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191426', // Deep Dark Purple Background
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    gap: 20,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  logoCircle: {
    width: 170, // Size of the circular badge
    height: 170,
    borderRadius: 85, // Makes the container perfectly round
    backgroundColor: '#191426',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#A736FF', // Neon Purple Ring Border
    // High-end multi-layer glow shadow for Android & iOS
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 18,
    elevation: 12,
    overflow: 'hidden', // Clips the image strictly inside the circular shape
  },
  medusaImage: {
    width: '115%', // Fills the circle nicely while retaining proportions
    height: '115%',
    borderRadius: 85,
  },
  tagline: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#A736FF', // Medusa Neon Purple Accent
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});