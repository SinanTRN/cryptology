import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import CryptoJS from 'crypto-js';
import { styles } from '../styles/common';

export default function DesScreen() {
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
      // CryptoJS AES benzeri yapıları kolayca sağlar. DES de mevcuttur.
      // Eko sistemde genelde CBC modu kullanılır ve PKCS7 padding uygular
      const encrypted = CryptoJS.DES.encrypt(plainText, key);
      setCipherText(encrypted.toString()); // Base64 sonucu
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
      const decrypted = CryptoJS.DES.decrypt(cipherText, key);
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
      <Text style={styles.title}>Data Encryption Standard (DES)</Text>
      
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

      <Button title="DES ile Şifrele" onPress={handleEncrypt} color="#33b5e5" />

      {cipherText !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Şifreli Metin (Ciphertext - Base64):</Text>
          <Text style={styles.text}>{cipherText}</Text>
          <Button title="DES ile Deşifre Et" onPress={handleDecrypt} color="#43a047" />
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
        <Text>DES bir Block Cipher'dır. crypto-js kütüphanesi standart olarak 64-bit bloklar halinde şifreler. Eğer metninizin boyutu tam blok boyutuna uymuyorsa arkaplanda bir "Padding" (Doldurma - genellikle PKCS7) işlemi uygular.</Text>
      </View>
    </ScrollView>
  );
}
