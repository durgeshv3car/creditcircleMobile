import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, Share, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../util/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const InviteBanner = () => {
  const [bannerUrl, setBannerUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState();



  const fetchBanner = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/api/banner/images/refer`);

       const token = await AsyncStorage.getItem('userToken');

           const decoded = jwtDecode(token);
             const userId = decoded.userID;

            //  console.log('Using BASE_URL:', userId); // Debug: log the BASE_URL

  const response = await axios.get(`${BASE_URL}/api/banner/images/refer`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });


  const responsecode = await axios.get(`${BASE_URL}/api/otp/get-all-profile`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  

    const referData = responsecode.data.find(item => item.id === userId);

      setCode(referData.referralUrl);

      if (response.data.success && response.data.images.length > 0) {
        const image = response.data.images[0];
        setBannerUrl(image.mobileUrl); // Or use image.webUrl if on web
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

const onShare = async () => {
// ${code}
      try {
      const result = await Share.share({
        message: `Join me on Credit Circle! Use my referral code: ${code} and get started today!`,
        title: 'Share Example',
        url: 'https://example.com', // optional
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };




  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2d2d94" />
      </View>
    );
  }

  if (!bannerUrl) {
    return (
      <View style={styles.container}>
        <Text>Banner not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>


       <TouchableOpacity onPress={onShare}>
    <Image
     source={{ uri: bannerUrl }}
        style={styles.bannerImage}
        width={screenWidth - 32} // 16px padding on each side
        height={screenWidth / 3} // Adjust height as needed
        resizeMode="stretch"
    />
  </TouchableOpacity>

      {/* <Image
        source={{ uri: bannerUrl }}
        style={styles.bannerImage}
        width={screenWidth - 32} // 16px padding on each side
        height={screenWidth / 3} // Adjust height as needed
        resizeMode="stretch"
      /> */}
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d2d94',
    marginBottom: 12,
  },
  bannerImage: {

  },
});

export default InviteBanner;
