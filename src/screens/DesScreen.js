import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
      const encrypted = CryptoJS.DES.encrypt(plainText, key);
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Data Encryption Standard</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Açık Metin (Plaintext):</Text>
        <TextInput
          style={styles.input}
          placeholder="Şifrelenecek metni girin..."
          placeholderTextColor="#9CA3AF"
          value={plainText}
          onChangeText={setPlainText}
        />

        <Text style={styles.label}>Anahtar (Parola):</Text>
        <TextInput
          style={styles.input}
          placeholder="Gizli anahtar girin..."
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={key}
          onChangeText={setKey}
        />

        <TouchableOpacity style={[styles.button, {backgroundColor: '#06B6D4'}]} onPress={handleEncrypt}>
          <Text style={styles.buttonText}>DES İLE ŞİFRELE</Text>
        </TouchableOpacity>
      </View>

      {cipherText !== '' && (
        <View style={styles.card}>
          <Text style={styles.label}>Şifreli Metin (Base64 Formu):</Text>
          <Text style={styles.resultText}>{cipherText}</Text>
          
          <TouchableOpacity style={[styles.button, styles.buttonWarning, {marginTop: 10}]} onPress={handleDecrypt}>
            <Text style={styles.buttonText}>DES İLE DEŞİFRE ET</Text>
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
        <Text style={styles.infoTitle}>Block Cipher Bilgisi</Text>
        <Text style={styles.infoText}>DES algoritması 64-bit bloklar halinde çalışır. Eğitici uygulamalarda eğer metniniz tam bloklara oturmazsa sistem tarafından (genellikle PKCS7) padding yani "doldurma" işlemi uygulanarak tam blok boyutuna getirilir.</Text>
      </View>
    </ScrollView>
  );
}
