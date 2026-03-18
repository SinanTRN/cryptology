import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { generatePad, otpEncryptDecrypt, toHex } from '../utils/otpCipher';
import { styles } from '../styles/common';

export default function OtpScreen() {
  const [plainText, setPlainText] = useState('');
  const [key, setKey] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [hexCipher, setHexCipher] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleGenerateKey = () => {
    if (!plainText) {
      Alert.alert("Hata", "Önce bir metin girmelisiniz.");
      return;
    }
    const generatedKey = generatePad(plainText.length);
    setKey(generatedKey);
  };

  const handleEncrypt = () => {
    try {
      const encrypted = otpEncryptDecrypt(plainText, key);
      setCipherText(encrypted);
      setHexCipher(toHex(encrypted));
    } catch (error) {
      Alert.alert("Şifreleme Hatası", error.message);
    }
  };

  const handleDecrypt = () => {
    try {
      if(!cipherText) {
         Alert.alert("Hata", "Önce şifreleme yapmalısınız.");
         return;
      }
      const decrypted = otpEncryptDecrypt(cipherText, key);
      setDecryptedText(decrypted);
    } catch (error) {
      Alert.alert("Deşifreleme Hatası", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>One Time Pad (OTP)</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Açık Metin (Plaintext):</Text>
        <TextInput
          style={styles.input}
          placeholder="Şifrelenecek metni girin..."
          placeholderTextColor="#9CA3AF"
          value={plainText}
          onChangeText={(text) => {
            setPlainText(text);
            setKey('');
            setCipherText('');
            setDecryptedText('');
          }}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8}}>
          <Text style={[styles.label, {marginBottom: 0}]}>Anahtar (Key):</Text>
          <TouchableOpacity onPress={handleGenerateKey}>
            <Text style={{color: '#3B82F6', fontWeight: 'bold', fontSize: 13}}>+ ANAHTAR ÖNER (Metin Boyutunda)</Text>
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Anahtar girin veya rastgele üretin..."
          placeholderTextColor="#9CA3AF"
          value={key}
          onChangeText={setKey}
        />

        <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={handleEncrypt}>
          <Text style={styles.buttonText}>XOR İLE ŞİFRELE</Text>
        </TouchableOpacity>
      </View>

      {cipherText !== '' && (
        <View style={styles.card}>
          <Text style={styles.label}>Şifreli Metin (Ciphertext):</Text>
          <Text style={styles.resultText}>{cipherText}</Text>
          
          <Text style={styles.label}>Hex Formatı Gösterimi:</Text>
          <Text style={styles.resultText}>{hexCipher}</Text>

          <TouchableOpacity style={[styles.button, styles.buttonWarning, {marginTop: 10}]} onPress={handleDecrypt}>
            <Text style={styles.buttonText}>XOR İLE DEŞİFRE ET</Text>
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
        <Text style={styles.infoTitle}>Stream Cipher Bilgisi</Text>
        <Text style={styles.infoText}>OTP algoritması bloklara ayırmaz. Metninizin her bir harfi, ona denk gelen anahtar harfi ile anlık olarak XOR işlemine girer. Güvenli olması için anahtar tam olarak metin boyutunda olmalı ve sadece bir kez kullanılmalıdır.</Text>
      </View>
    </ScrollView>
  );
}
