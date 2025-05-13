import React from 'react';
import { StyleSheet, View, Dimensions, Image, SafeAreaView, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
 <FastImage
        style={styles.bgTop}
        source={require('../../assets/images/splashscreenBG.png')}
        resizeMode={FastImage.resizeMode.contain}
      />


      <FastImage
        style={styles.image}
        source={require('../../assets/images/logoanication.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />



    <FastImage
        style={styles.bgBottom}
        source={require('../../assets/images/splashscreenBG.png')}
        resizeMode={FastImage.resizeMode.contain}
      />

      <Text style={{bottom:50}}>www.creditcircle.in</Text>
      </SafeAreaView>
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

  bgTop: {
    flex: 1, 
    width:"130%",
    height: 300,
    position: 'absolute',
    top: -180 ,
},

  bgBottom: {
    flex: 1, 
    width:"180%",
    height: 400,
    position: 'absolute',
    bottom: -320 ,
  },

});

export default SplashScreen;
