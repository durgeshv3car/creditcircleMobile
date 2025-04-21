import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../util/api_url';

const API_BASE_URL = `${BASE_URL}/api/otp/`;

const AuthGuard = ({ children }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthToken = async () => {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        navigation.navigate('LoginScreen');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/verify-token`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          await AsyncStorage.removeItem('userToken');
          Alert.alert('Session Expired', 'Please log in again.');
          navigation.navigate('LoginScreen');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('LoginScreen');
      }
    };

    checkAuthToken();
  }, [navigation]);

  return <>{children}</>;
};

export default AuthGuard;
