// src/screens/PremiumScreen.jsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PremiumScreen() {
  const plans = [
    { id: '1', title: 'Medusa Monthly', price: '$9.99', period: 'month', description: 'Cancel anytime. Billed monthly.' },
    { id: '2', title: 'Medusa Annual', price: '$79.99', period: 'year', description: 'Save 30% with annual billing. Best value.' },
  ];

  const perks = [
    'Ultra HD Spatial Audio & Lossless Streaming',
    'Unlimited Skips & Offline Downloads',
    'Ad-free Immersive Soundscapes',
    'Custom Neon Theme Customization',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Ionicons name="flash" size={14} color="#A736FF" />
            <Text style={styles.badgeText}>MEDUSA PREMIUM</Text>
          </View>
          <Text style={styles.title}>Unlock Pure Sonic Power</Text>
          <Text style={styles.subtitle}>Transform your listening experience with high-end fidelity and zero interruptions.</Text>
        </View>

        {/* Perks List */}
        <View style={styles.perksContainer}>
          {perks.map((perk, index) => (
            <View key={index} style={styles.perkRow}>
              <Ionicons name="checkmark-circle" size={20} color="#A736FF" />
              <Text style={styles.perkText}>{perk}</Text>
            </View>
          ))}
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <TouchableOpacity key={plan.id} style={styles.planCard} activeOpacity={0.8}>
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planPrice}>{plan.price} <Text style={styles.planPeriod}>/ {plan.period}</Text></Text>
              </View>
              <Text style={styles.planDesc}>{plan.description}</Text>
              <TouchableOpacity style={styles.subscribeButton} activeOpacity={0.8}>
                <Text style={styles.subscribeText}>Get Started</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191426',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 24,
    paddingBottom: 100, // Extra space for the bottom tab bar
  },
  header: {
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(167, 54, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
  },
  badgeText: {
    color: '#A736FF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  perksContainer: {
    backgroundColor: '#231D35',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(167, 54, 255, 0.3)',
    padding: 20,
    gap: 14,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  perkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    backgroundColor: '#231D35',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#A736FF',
    padding: 20,
    gap: 12,
    shadowColor: '#A736FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  planPeriod: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontWeight: 'normal',
  },
  planDesc: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
  },
  subscribeButton: {
    backgroundColor: '#A736FF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 6,
  },
  subscribeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});