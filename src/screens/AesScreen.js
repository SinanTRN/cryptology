import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CryptoJS from 'crypto-js';
import { styles } from '../styles/common';

export default function AesScreen() {
  const [plainText, setPlainText] = useState('');
  const [key, setKey] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleEncrypt = () => {
    if (!plainText || !key) {
      Alert.alert('Eksik Bilgi', 'Lütfen metin ve anahtar giriniz.');
      return;
    }
    try {
      const encrypted = CryptoJS.AES.encrypt(plainText, key);
      setCipherText(encrypted.toString()); 
    } catch (e) {
      Alert.alert('Hata', 'Şifreleme sırasında bir hata oluştu.');
    }
  };

  const handleDecrypt = () => {
    if (!cipherText || !key) {
      Alert.alert('Eksik Bilgi', 'Lütfen şifreli metin ve anahtarın bulunduğundan emin olun.');
      return;
    }
    try {
      const decrypted = CryptoJS.AES.decrypt(cipherText, key);
      const originalText = decrypted.toString(CryptoJS.enc.Utf8);
      
      if(!originalText) throw new Error("Anahtar yanlış veya bozuk data.");
      
      setDecryptedText(originalText);
    } catch (error) {
      Alert.alert('Hata', 'Deşifreleme başarısız. Anahtar yanlış olabilir.');
      setDecryptedText('');
    }
  };

  const handleSuggestKey = () => {
    // AES can use 128-bit (16 chars), 192-bit (24 chars), or 256-bit (32 chars) keys.
    // We will generate a 16-character (128-bit) secure key.
    let suggested = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    for (let i = 0; i < 16; i++) {
        suggested += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setKey(suggested);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Advanced Encryption Standard</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Açık Metin (Plaintext):</Text>
        <TextInput
          style={styles.input}
          placeholder="Şifrelenecek metni girin..."
          placeholderTextColor="#9CA3AF"
          value={plainText}
          onChangeText={setPlainText}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8}}>
          <Text style={[styles.label, {marginBottom: 0}]}>Anahtar (Parola):</Text>
          <TouchableOpacity onPress={handleSuggestKey}>
            <Text style={{color: '#3B82F6', fontWeight: 'bold', fontSize: 13}}>+ ANAHTAR ÖNER (16 Karakter)</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Gizli anahtar girin..."
          placeholderTextColor="#9CA3AF"
          value={key}
          onChangeText={setKey}
        />

        <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={handleEncrypt}>
          <Text style={styles.buttonText}>AES İLE ŞİFRELE</Text>
        </TouchableOpacity>
      </View>

      {cipherText !== '' && (
        <View style={styles.card}>
          <Text style={styles.label}>Şifreli Metin (Base64 Formu):</Text>
          <Text style={styles.resultText}>{cipherText}</Text>
          
          <TouchableOpacity style={[styles.button, styles.buttonWarning, {marginTop: 10}]} onPress={handleDecrypt}>
            <Text style={styles.buttonText}>AES İLE DEŞİFRE ET</Text>
          </TouchableOpacity>
        </View>
      )}

      {decryptedText !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Çözülen Metin (Decrypted):</Text>
          <Text style={{fontSize: 18, color: '#047857', fontWeight: 'bold'}}>{decryptedText}</Text>
        </View>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Güvenlik Standardı</Text>
        <Text style={styles.infoText}>AES gelişmiş, endüstri standardı bir Block Cipher algoritmasıdır. DES'in (64-bit) aksine blok boyutu her zaman 128 bit'tir. Anahtar boyutu (ki bu güvenlik seviyesini belirler) 128, 192 veya 256 bit şeklinde olabilir.</Text>
      </View>
    </ScrollView>
  );
}
