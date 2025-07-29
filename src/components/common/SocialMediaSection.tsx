import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: require('../../assets/images/youtube.png'),
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: require('../../assets/images/facebook.png'),
  },
  {
    name: 'Youtube',
    url: 'https://youtube.com',
    icon: require('../../assets/images/insta.png'),
  },
];

const SocialMedia = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Our social media</Text>
    <View style={styles.iconRow}>
      {socialLinks.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => Linking.openURL(item.url)}>
          <Image source={item.icon} style={styles.icon} />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 15,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 15,
    resizeMode: 'contain',
  },
});

export default SocialMedia;
