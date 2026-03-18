import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uygulamalı Kriptoloji Projeleri</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="OTP Uygulaması (Stream Cipher)" 
          onPress={() => navigation.navigate('Otp')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="DES Uygulaması (Block Cipher)" 
          color="#33b5e5"
          onPress={() => navigation.navigate('Des')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="AES Uygulaması (Block Cipher)" 
          color="#00C851"
          onPress={() => navigation.navigate('Aes')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333'
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden'
  }
});
