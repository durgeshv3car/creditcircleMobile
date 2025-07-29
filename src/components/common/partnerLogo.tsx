import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../util/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appStyle from '@/AppStyles';

const PartnerLogo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`${BASE_URL}/api/banner/images/logo`);

         const token = await AsyncStorage.getItem('userToken');

  const response = await axios.get(`${BASE_URL}/api/banner/images/logo`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

        if (response.data.success && Array.isArray(response.data.images)) {
          setData(response.data.images);
        } else {
          console.warn('Invalid data structure:', response.data);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.logoWrapper}>
      <TouchableOpacity
        style={styles.logoCircle}
        activeOpacity={0.8}
        // onPress={() => OpenInAppBrowser(item.companyUrl)}
      >
        <Image
          source={{ uri: item.thumbnail.web || item.thumbnail.mobile }}
          style={styles.logo}
          onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={appStyle.sectionTitle}>Our Lending Partners</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={4}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
        />
      ) : (
        <Text style={styles.noDataText}>No logos available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:0,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e2c78', // blue
    marginBottom: 20,
    textAlign: 'left',
  },
  grid: {
    justifyContent: 'center',
    gap: 10,
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 0,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default PartnerLogo;
