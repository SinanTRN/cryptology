import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import OtpScreen from './src/screens/OtpScreen';
import DesScreen from './src/screens/DesScreen';
import AesScreen from './src/screens/AesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Kriptoloji Projesi' }} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{ title: 'OTP (Stream Cipher)' }} />
        <Stack.Screen name="Des" component={DesScreen} options={{ title: 'DES (Block Cipher)' }} />
        <Stack.Screen name="Aes" component={AesScreen} options={{ title: 'AES (Block Cipher)' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}