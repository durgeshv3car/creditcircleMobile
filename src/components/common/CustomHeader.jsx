import { Image, StyleSheet, Text, View, Appearance, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { useNavigation } from '@react-navigation/native';


const CustomHeader = () => {

  const navigation = useNavigation();

  const theme = Appearance.getColorScheme();

  const dynamicStyles = {
    backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
    shadowColor: theme === 'dark' ? '#FFFFFF' : '#000000',
  };


  const tintColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  const color = theme === 'dark' ? '#000000' : '#ffffff';

  return (
    <ThemedView style={[styles.container, dynamicStyles]}>
      <TouchableOpacity onPress={() => navigation.navigate('SideMenuScreen')} style={{padding:10}} >
        <Image
          style={[styles.menuicon, { tintColor }]}
          source={require('../../assets/images/menuIcon.png')}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Home')} >
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/images/logo-full-width.png')}
        />
        </TouchableOpacity>
     
      <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')} style={{ padding: 10, }}>
      <View style={{ position: "relative", justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <View style={{ position: 'absolute', backgroundColor: '#FF4800', top: -18, right: -2, width: 22, height: 22, borderRadius: 100, zIndex: 10, }}>
          <ThemedText style={{ fontSize: 10, color, fontWeight: 'bold', textAlign: 'center' }}>10</ThemedText>
        </View>
        <Image
          style={[styles.bellicon, { tintColor }]}
          source={require('../../assets/images/notificationBell.png')}
        />
        </View>
      </TouchableOpacity>

    </ThemedView>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'row',
    width: 'auto',
    justifyContent: "space-between",
    paddingLeft: "4%",
    paddingRight: "4%",
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: 'green',
    shadowColor: "#000000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 20,
    elevation: 10,

  },
  tinyLogo: {
    width: 200,
    height: 25,
    resizeMode: "contain",
    // backgroundColor:'red'
  },
  menuicon: {
    width: 20,
    height: 14,
    resizeMode: 'contain',
  },
  bellicon: {
    // width: "25%",
    height: 18,
    right: -16,
    resizeMode: 'contain',
  }

})

