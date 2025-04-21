import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { notification } = route.params || {};

  if (!notification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No notification data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notification.title || 'No Title'}</Text>

      <Text style={styles.description}>
        {notification.description || 'No description provided.'}
      </Text>

      {notification.image ? (
        <Image
          source={{ uri: notification.image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}

      <Text style={styles.time}>
        {notification.time ? `Received at ${notification.time}` : ''}
      </Text>


        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WebviewScreen', { urlName: notification.redirectUrl })
          }
          style={styles.bottomButton}
        >
          <View style={styles.buttoncon}>
          <Text style={styles.buttonText}>asdfasd{notification.buttonType}</Text>
          </View>
        </TouchableOpacity>

    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  time: {
    fontSize: 14,
    color: '#888888',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  buttoncon:{
    width: '90%',
    marginVertical: 10,
    margin: 'auto',
    backgroundColor: '#FF4800',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
 
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
