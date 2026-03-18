import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
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
      setHexCipher(toHex(encrypted)); // Görselleştirmek için Hex formatı
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
      // OTP simetrik bir algoritmadır, aynı işlem deşifre eder.
      const decrypted = otpEncryptDecrypt(cipherText, key);
      setDecryptedText(decrypted);
    } catch (error) {
      Alert.alert("Deşifreleme Hatası", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>One Time Pad (OTP)</Text>
      
      <Text style={styles.label}>Açık Metin (Plaintext):</Text>
      <TextInput
        style={styles.input}
        placeholder="Şifrelenecek metni girin..."
        value={plainText}
        onChangeText={(text) => {
          setPlainText(text);
          // PlainText değiştiğinde uzunluk bozulacağı için sıfırlayalım
          setKey('');
          setCipherText('');
          setDecryptedText('');
        }}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
        <Text style={styles.label}>Anahtar (Key):</Text>
        <Button title="Rastgele Üret" onPress={handleGenerateKey} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Anahtar girin veya rastgele üretin"
        value={key}
        onChangeText={setKey}
      />

      <Button title="XOR ile Şifrele" onPress={handleEncrypt} color="#e53935" />

      {cipherText !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Şifreli Metin (Ciphertext):</Text>
          <Text style={styles.text}>{cipherText}</Text>
          
          <Text style={styles.label}>Onyüz Gösterimi (Hex - Stream Cipher Görünümü):</Text>
          <Text style={styles.text}>{hexCipher}</Text>

          <Button title="XOR ile Deşifre Et" onPress={handleDecrypt} color="#43a047" />
        </View>
      )}

      {decryptedText !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Deşifre Edilen Metin:</Text>
          <Text style={{...styles.text, color: 'green', fontWeight: 'bold'}}>{decryptedText}</Text>
        </View>
      )}
    </ScrollView>
  );
}
