import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={require('../../assets/images/logoanication.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SplashScreen;
