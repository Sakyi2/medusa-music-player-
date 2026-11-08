import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CyberContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: '#00F0FF' | '#FF007F' | '#A736FF';
}

export function CyberContainer({ children, style, glowColor = '#00F0FF' }: CyberContainerProps) {
  return (
    <View style={[styles.container, { borderColor: glowColor, shadowColor: glowColor }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
});