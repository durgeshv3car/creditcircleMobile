// import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
// import React from 'react'
// import { ThemedView } from '@/components/ThemedView'
// import { ThemedText } from '@/components/ThemedText'
// import { useNavigation } from '@react-navigation/native';
// import WebView from 'react-native-webview';
// import { Image } from 'expo-image';
// const DetailsScreen = () => {
//   const navigation = useNavigation();
//   return (

// <View>
// {/* <Image
//         source={require('../assets/images/logoanication.gif')}
//         style={styles.webView}

//       /> */}

{/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
         <Text style={{ fontSize: 18, color: '#000000' }}>Back</Text>
      </TouchableOpacity>  */}

// <Image source={require('../assets/images/logoanication.gif')} style={{ width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height, resizeMode: 'contain', }} />



// </View>


//   )
// }


// const styles = StyleSheet.create({
//   webView: {
//     position:'relative',
//     flex: 1,
//     resizeMode: 'cover', // This applies if the WebView or image needs adjustment
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },

//   backButton: {
//     position:"absolute",
//     top:50,
//     textAlign:'center',
//     backgroundColor:'red',
//     justifyContent:'center',
//     zIndex:20,
//     right:0

//   },
// });

// export default DetailsScreen

import { ThemedHeadingText, ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';

import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
// import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SideMenuScreen = () => {
  const [expandedMenu, setExpandedMenu] = useState(null);


  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('LoginScreen'),
    Alert.alert("Logout", "You have been logged out successfully.");
  };

  // Main menu with submenu options
  const menuOptions = [
    {
      id: 1, name: 'Loan & Credit',
      submenu: [
        { id: 1, name: 'Personal Loan', screen: 'PersonalDetailsOne' },
        { id: 2, name: 'Business Loan', screen: 'PersonalDetailsOne' },
        { id: 3, name: 'Credit Card', screen: 'PersonalDetailsOne' }
      ],
      icon: require('../../assets/icons/Loan-Credit.png'), 
    },
    {
      id: 2,
      name: 'Investment',
      submenu: [
        { id: 1, name: 'Income Plans', screen: 'OtpScreen' },
        { id: 2, name: 'Stock Market', screen: 'PersonalDetailsTwo' },
        { id: 3, name: 'Mutual Funds', screen: 'PersonalDetailsOne' }
      ],
      icon: require('../../assets/icons/Investment.png')
    },
    {
      id: 3, name: 'Insurance',
      submenu: [
        { id: 1, name: 'Health Insurance', screen: 'LoginScreen' },
        { id: 2, name: 'Life Insurance', screen: 'LoginScreen' },
        { id: 3, name: 'Car Insurance', screen: 'PersonalDetailsOne' }

      ],
      icon: require('../../assets/icons/Insurance.png')
    },
    {
      id: 4,
      name: 'Money Smarts',
      submenu: [],
      icon: require('../../assets/icons/Money-Smarts.png')
    },
    { id: 5, name: 'EMI Calculator', submenu: [], icon: require('../../assets/icons/Tax-Calculator.png'), screen: 'EMICalculatorScreen' },
    { id: 6, name: 'FAQs', submenu: [], icon: require('../../assets/icons/FAQs.png'), screen: 'FAQScreen' },
    { id: 7, name: 'Privacy Policy', submenu: [], icon: require('../../assets/icons/Privacy-Policy.png'), screen:'PrivacyPolicyScreen' },
    { id: 8, name: 'Help', submenu: [], icon: require('../../assets/icons/Help.png'), screen:'ContactUsScreen' },
  ];

  // Toggle submenu visibility
  const toggleMenu = (id: any) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { width: 30, height: 30 }]}>
        <Image source={require('../../assets/images/backArrow.png')} style={{ width: 10, height: 18 }}></Image>
      </TouchableOpacity>

      {/* Profile Section */}
      <ThemedView style={[styles.profileSection, { marginTop: 60 }]}>

        <View style={{ position: 'relative', margin: 'auto', left: 0, right: 10, width: 250, alignItems: 'center' }}>

          <View style={{ position: 'absolute', top: 10, justifyContent: 'center' }}>
            <CircularProgress
              value={35}
              radius={54}
              activeStrokeColor={'#FF4800'}
              inActiveStrokeColor={'#273283'}
              activeStrokeWidth={8}
              inActiveStrokeWidth={8}
            />
            <View style={{ width: 80, backgroundColor: '#FF4800', marginTop: -30, zIndex: 30, margin: 'auto', justifyContent: 'center', paddingTop: 6, paddingBottom: 6, alignItems: 'center', borderRadius: 100, }}>
              <ThemedText style={[styles.profileImageText, { color: '#ffffff', textAlign: 'center', fontSize: 16 }]}>35%</ThemedText>
            </View>
          </View>



          <View style={[styles.profileImageContainer, { marginTop: 24 }]}>
            <ThemedText style={[styles.profileImageText, { color: '#000000' }]}>DK</ThemedText>
          </View>
        </View>

        <ThemedHeadingText style={[styles.name]}>Durgesh Prajapati</ThemedHeadingText>
        <ThemedText style={styles.mobileNumber}>+91 8010444461</ThemedText>
      </ThemedView>

      {/* Scrollable Menu */}
      <ScrollView style={styles.menuList}>
        {menuOptions.map((item) => (
          <ThemedView key={item.id} style={styles.menuItemContainer}>
            <TouchableOpacity
              onPress={() =>
                item.screen
                  ? navigation.navigate(item.screen) // Navigate if screen exists
                  : toggleMenu(item.id) // Toggle submenu otherwise
              }
              style={[styles.menuItem, { flexDirection: 'row', alignItems: 'center' }]}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={item.icon} style={{ width: 14, height: 14, marginRight: 10 }} />
                <ThemedText style={styles.menuText}>{item.name}</ThemedText>
              </View>
              <View>
                {item.submenu.length > 0 ? (
                  null
                ) : <Image
                  source={require('../../assets/images/menuArrow.png')}
                  style={{ width: 8, height: 14 }}
                />}

              </View>
              {item.submenu.length > 0 ? (
                <Image
                  source={
                    expandedMenu === 0
                      ? require('../../assets/images/menuArrow-down.png')
                      : require('../../assets/images/menuArrow.png')
                  }
                  style={{ width: 8, height: 14 }}
                />
              ) : null}
            </TouchableOpacity>
            {expandedMenu === item.id && item.submenu.length > 0 && (
              <View style={{ borderBottomWidth: 1, borderTopWidth: 1, marginTop: 16, marginBottom: 16, borderColor: '#F4F5F6', marginLeft: 20 }}>
                {item.submenu.map((submenuItem, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate(submenuItem.screen)}
                    style={styles.submenuItem}>
                    <ThemedView style={styles.submenuText}>
                      <ThemedText style={styles.bus}>{submenuItem.name} </ThemedText>
                      {/* <ThemedText style={styles.arrow}>▸</ThemedText> */}

                      <Image
                        source={require('../../assets/images/menuArrow.png')} style={styles.arrow} />

                    </ThemedView>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ThemedView>
        ))}

      </ScrollView>


      {/* Logout Button */}
      <View style={{ position: 'relative' }}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>

        <ThemedText style={{ left: 20, bottom: 10, position: 'absolute', fontSize: 12 }}>Version 0.0.1</ThemedText>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  mobileNumber: {
    fontSize: 16,
    marginTop: 5,
    color: "#FF4800"
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItemContainer: {
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    flex: 1,
    justifyContent: 'space-between',

  },
  arrow: {
    fontSize: 16,
    width: 8,
    height: 14,
    tintColor: '#505050'
  },
  submenuItem: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  submenuText: {
    fontSize: 14,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    tintColor: '#505050'
  },
  logoutButton: {
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FF4800"
  },

  backButton: {
    position: "absolute",
    top: 50,
    textAlign: 'center',
    justifyContent: 'center',
    zIndex: 20,
    left: 16

  },

});

export default SideMenuScreen;


