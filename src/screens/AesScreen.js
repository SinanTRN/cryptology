import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
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
      // CryptoJS standart olarak AES'te CBC modunu ve PKCS7 padding'i kullanır.
      // Daha güvenli olan AES-256 standardıyla metni şifreler.
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Advanced Encryption Standard (AES)</Text>
      
      <Text style={styles.label}>Açık Metin (Plaintext):</Text>
      <TextInput
        style={styles.input}
        placeholder="Şifrelenecek metni girin..."
        value={plainText}
        onChangeText={setPlainText}
      />

      <Text style={styles.label}>Anahtar (Parola):</Text>
      <TextInput
        style={styles.input}
        placeholder="Gizli anahtar girin..."
        secureTextEntry
        value={key}
        onChangeText={setKey}
      />

      <Button title="AES ile Şifrele" onPress={handleEncrypt} color="#00C851" />

      {cipherText !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Şifreli Metin (Ciphertext - Base64):</Text>
          <Text style={styles.text}>{cipherText}</Text>
          <Button title="AES ile Deşifre Et" onPress={handleDecrypt} color="#43a047" />
        </View>
      )}

      {decryptedText !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Deşifre Edilen Metin:</Text>
          <Text style={{...styles.text, color: 'green', fontWeight: 'bold'}}>{decryptedText}</Text>
        </View>
      )}

      <View style={{marginTop: 30, padding: 10, backgroundColor: '#eef'}}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Bilgi Kutusu</Text>
        <Text>AES günümüzde en çok kullanılan güvenli blok şifreleme (Block Cipher) algoritmasıdır. Rijndael tasarımına dayanır. DES'in (64-bit) aksine blok boyutu her zaman 128 bit'tir (16 byte). Anahtar boyutu (Key size) ise 128, 192 veya 256 bit şeklinde simüle edilir.</Text>
      </View>
    </ScrollView>
  );
}
