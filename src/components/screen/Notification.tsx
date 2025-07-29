import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../util/api_url';

dayjs.extend(relativeTime);

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.error('No user token found');
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.userID; // Adjust this key if needed

        console.log('Using BASE_URL:', BASE_URL); 

        const response = await fetch(`${BASE_URL}/api/getnotifications/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();
        console.log('API response:', json); // Debug: log actual structure

        // Handle various possible structures
        const notificationsArray =
          json?.notifications || json?.data?.notifications || (Array.isArray(json) ? json : []);

        if (Array.isArray(notificationsArray)) {
          setNotifications(notificationsArray);
        } else {
          console.warn('Unexpected API structure:', json);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const formatNotificationTime = (timestamp) => {
    const now = dayjs();
    const time = dayjs(timestamp);

    const minutesAgo = now.diff(time, 'minute');
    if (minutesAgo < 1) return 'Just now';
    if (minutesAgo < 60) return `${minutesAgo} min ago`;
    if (now.isSame(time, 'day')) return `Today at ${time.format('h:mm A')}`;
    if (now.subtract(1, 'day').isSame(time, 'day')) return `Yesterday at ${time.format('h:mm A')}`;
    if (now.diff(time, 'hour') < 24) return time.fromNow();
    return time.format('D MMM, YYYY');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailScreen', { notification: item })}
    >
     <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.body} asdfasd</Text>
      {item.offer?.offerBanner.banner && <Image source={{ uri: item.offer?.offerBanner.banner }} style={styles.image} />}
      <Text style={styles.time}>{formatNotificationTime(item.createdAt)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={[...notifications].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  card: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  listContainer: {
    padding: 16,
  },
});
