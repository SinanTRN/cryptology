import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uygulamalı Kriptoloji Algoritmaları</Text>
      
      <View style={styles.card}>
        <Text style={styles.description}>Stream ve Block Cipher simülasyonları.</Text>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#3B82F6' }]} 
          onPress={() => navigation.navigate('Otp')}
        >
          <Text style={styles.buttonText}>OTP Uygulaması (Stream Cipher)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#06B6D4' }]} 
          onPress={() => navigation.navigate('Des')}
        >
          <Text style={styles.buttonText}>DES Uygulaması (Block Cipher)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#10B981' }]} 
          onPress={() => navigation.navigate('Aes')}
        >
          <Text style={styles.buttonText}>AES Uygulaması (Block Cipher)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F3F4F6',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1F2937',
    lineHeight: 34,
  },
  description: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 24,
    fontSize: 15,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
