import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ThemedView } from '../ThemedView';
import NotAvailable from '../../assets/slider/NotAvailable.png';
import { BASE_URL } from '../util/api_url';
import appStyle from '@/AppStyles';

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/banner/images/slider`);
        if (response.data.success) {
          setBanners(response.data.images);
        }
      } catch (error) {
        console.log('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <ThemedView style={styles.bannerContainer}>
      {banners.length > 0 ? (
        <Swiper
          autoplay
          autoplayTimeout={4}
          loop
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          style={{ height: 180 }}
        >
          {banners.map((banner) => (
            <ThemedView key={banner.id}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WebviewScreen', { urlName: banner.companyUrl })
                }
                style={styles.bottomButton}
              >
                <Image
                  source={{ uri: banner.mobileUrl }}
                  style={appStyle.Sliderimage}
                  onError={(error) => console.error('Image Load Error:', error)}
                />
              </TouchableOpacity>
            </ThemedView>
          ))}
        </Swiper>
      ) : (
        <Image
          source={NotAvailable}
          style={styles.image}
          onError={(error) => console.error('Image Load Error:', error.nativeEvent.error)}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginVertical: 0,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'stretch',
    borderRadius: 10,
    marginBottom: 20,
  },
  dot: {
    backgroundColor: '#ccc',
    width: 20,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 20,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default BannerSlider;
