import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Animated } from 'react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  // Animation value for the pulsing neon glow effect
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
        
        {/* Upper Section: Logo and Tagline */}
        <View style={styles.heroSection}>
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
        </View>

        {/* Lower Section: Action Buttons Pushed Down */}
        <View style={styles.buttonContainer}>
          
          {/* Primary CTA (Purple) - Navigates to Signup Page */}
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.8}
            onPress={() => {
              router.push('/signup');
            }}
          >
            <Text style={styles.primaryButtonText}>Sign up free</Text>
          </TouchableOpacity>

          {/* Secondary CTA - Navigates to Login Page */}
          <TouchableOpacity 
            style={styles.secondaryButton} 
            activeOpacity={0.8}
            onPress={() => {
              router.push('/login');
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    justifyContent: 'space-between', // Pushes hero to top/center and buttons to the bottom
  },
  heroSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 18,
    elevation: 12,
    overflow: 'hidden',
  },
  medusaImage: {
    width: '115%',
    height: '115%',
    borderRadius: 85,
  },
  tagline: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 20, // Adds space from the bottom screen margin
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