import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../util/api_url';

const API_BASE_URL = `${BASE_URL}/api/otp/`;

const withAuthCheck = (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuthToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          navigation.navigate('LoginScreen');
          await AsyncStorage.removeItem('userToken');
          return;
        }

        setLoading(false);
      };

      checkAuthToken();
    }, [navigation]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthCheck;
