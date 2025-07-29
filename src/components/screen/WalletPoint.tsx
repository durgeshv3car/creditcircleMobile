import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';

import axios from 'axios';
import { BASE_URL } from '../util/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function WalletPoint() {
  const [walletData, setWalletData] = useState(null);
  const [redeemList, setRedeemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWalletData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const decoded = jwtDecode(token);
      const userId = decoded.userID;

      // Fetch user profile data
      const profileResponse = await axios.get(`${BASE_URL}/api/otp/get-all-profile/`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      const userProfile = profileResponse.data.find(item => item.id === userId);
      setWalletData(userProfile.walletPoints); // Adjust this logic if needed

      // Fetch redeem list data
      const redeemResponse = await axios.get(`${BASE_URL}/api/redeem-list/`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      setRedeemList(redeemResponse.data.data); // Set directly

    } catch (err) {
      console.error('Fetch error:', err?.response?.data || err.message);
      setError('Failed to load wallet or redeem data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
       <Image source={{ uri: item.mobileUrl }} style={{ width: 80, height: 80 }} />
      
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.code}>{item.code}</Text>
        <Text style={styles.points}>{item.points} Points</Text>
      <TouchableOpacity
          style={styles.copyBtn}
          onPress={() => Alert.alert('Copied', `${item.code} copied to clipboard`)}
        >
          <Text style={styles.copyText}>Redeem Point</Text>
        </TouchableOpacity>
      </View>
      
     
        
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  if (error) {
    return <Text style={{ color: 'red', textAlign: 'center', marginTop: 100 }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎉 Wallet Points</Text>
      <Text style={styles.total}>Total Points: {walletData}</Text>
      <Text style={styles.header}>🎁 Redeemable Items</Text>
      <FlatList
        data={Array.isArray(redeemList) ? redeemList : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  total: { fontSize: 16, marginBottom: 16, color: '#555' },
  list: {  flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    flexDirection: 'row',
  },
  title: { fontSize: 16, fontWeight: '600',},
  row: { flexDirection: "column"},
  code: { fontFamily: 'monospace', fontSize: 14 },
  copyBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  copyText: { color: '#fff', fontWeight: '500' },
  points: { marginTop: 8, fontSize: 14, color: '#444' },
});
