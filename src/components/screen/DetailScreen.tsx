import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RenderHTML from 'react-native-render-html';

const DetailScreen = ({ route, navigation }) => {
  const { notification } = route.params || {};


  console.log("Noti", notification)

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

         {notification.offer?.offerBanner.banner ? (
        <Image
          source={{ uri: notification.offer?.offerBanner.banner }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : null}

      <Text>{notification.body || 'No Title'}</Text>

      <Text style={styles.description}>
<RenderHTML
  source={{ html: notification.description || notification.detailDescription || 'No description provided.' }}
/>

      </Text>

      

   

    {notification.buttonType ? 
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WebviewScreen', { urlName: notification.url })
          }
          style={styles.bottomButton}
        >
          <View style={styles.buttoncon}>
          <Text style={styles.buttonText}>{notification.buttonType}</Text>
          </View>
        </TouchableOpacity>
        : null}

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
    width: "100%",
    height: 180,
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
