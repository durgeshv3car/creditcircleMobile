import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../util/api_url';

const InviteBanner = () => {
  const [bannerUrl, setBannerUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/banner/images/refer`);
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
      
      <Image
        source={{ uri: bannerUrl }}
        style={styles.bannerImage}
        width={screenWidth - 32} // 16px padding on each side
        height={screenWidth / 3} // Adjust height as needed
        resizeMode="stretch"
      />
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
