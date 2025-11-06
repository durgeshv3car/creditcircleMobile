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




// --------------------------------Step 2 ----------------------------------



// import { ThemedHeadingText, ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { useEffect, useState } from 'react';

// import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';

// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// // import { Image } from 'expo-image';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASE_URL } from '../util/api_url';



// const SideMenuScreen = () => {



//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     progress: 0,
//   });



//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/otp/get-profile`, {
//           params: { phoneNumber: '8010444461' }
//         });
//         const data = response.data;

//         setProfileData({
//           firstName: data.firstName,
//           lastName: data.lastName,
//           phoneNumber: data.phoneNumber,
//           progress: data.percentage || 0,
//         });
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);


//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const [type, setType] = useState('');

//   console.log('Loan Type:', type);

//   const logout = async () => {
//     await AsyncStorage.removeItem('userToken');
//     await AsyncStorage.removeItem('userData');
//     await AsyncStorage.removeItem('appIdData');
//     navigation.navigate('LoginScreen')
//   };

//   // Main menu with submenu options
//   const menuOptions = [
//     {
//       id: 1, name: 'Loan & Credit',
//       submenu: [
//         { id: 1, name: 'Personal Loan', screen: 'PersonalDetailsOne', loantype:"PersonalLoan" },
//         { id: 2, name: 'Business Loan', screen: 'PersonalDetailsOne', loantype:"BusinessLoan"  },
//         { id: 3, name: 'Credit Card', screen: 'PersonalDetailsOne' }
//       ],
//       icon: require('../../assets/icons/Loan-Credit.png'), 
//     },
//     {
//       id: 2,
//       name: 'Investment',
//       submenu: [
//         { id: 1, name: 'Income Plans', screen: 'OtpScreen', loantype:"PersonalLoan" },
//         { id: 2, name: 'Stock Market', screen: 'PersonalDetailsTwo', loantype:"PersonalLoan" },
//         { id: 3, name: 'Mutual Funds', screen: 'PersonalDetailsOne', loantype:"PersonalLoan" }
//       ],
//       icon: require('../../assets/icons/Investment.png')
//     },
//     {
//       id: 3, name: 'Insurance',
//       submenu: [
//         { id: 1, name: 'Health Insurance', screen: 'LoginScreen', loantype:"PersonalLoan" },
//         { id: 2, name: 'Life Insurance', screen: 'LoginScreen', loantype:"PersonalLoan" },
//         { id: 3, name: 'Car Insurance', screen: 'PersonalDetailsOne', loantype:"PersonalLoan" },

//       ],
//       icon: require('../../assets/icons/Insurance.png')
//     },
//     {
//       id: 4,
//       name: 'Money Smarts',
//       submenu: [],
//       icon: require('../../assets/icons/Money-Smarts.png')
//     },
//     { id: 5, name: 'EMI Calculator', submenu: [], icon: require('../../assets/icons/Tax-Calculator.png'), screen: 'EMICalculatorScreen' },
//     { id: 6, name: 'FAQs', submenu: [], icon: require('../../assets/icons/FAQs.png'), screen: 'FAQScreen' },
//     { id: 7, name: 'Privacy Policy', submenu: [], icon: require('../../assets/icons/Privacy-Policy.png'), screen:'PrivacyPolicyScreen' },
//     { id: 8, name: 'Help', submenu: [], icon: require('../../assets/icons/Help.png'), screen:'ContactUsScreen' },
//   ];

//   // Toggle submenu visibility
//   const toggleMenu = (id: any) => {
//     setExpandedMenu(expandedMenu === id ? null : id);
//   };

//   const navigation = useNavigation();




//   return (
//     <View style={styles.container}>

//       <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { width: 30, height: 30 }]}>
//         <Image source={require('../../assets/images/backArrow.png')} style={{ width: 10, height: 18 }}></Image>
//       </TouchableOpacity>

//       {/* Profile Section */}
//       {/* <ThemedView style={[styles.profileSection, { marginTop: 60 }]}>

//         <View style={{ position: 'relative', margin: 'auto', left: 0, right: 10, width: 250, alignItems: 'center' }}>

//           <View style={{ position: 'absolute', top: 10, justifyContent: 'center' }}>
//             <CircularProgress
//               value={35}
//               radius={54}
//               activeStrokeColor={'#FF4800'}
//               inActiveStrokeColor={'#273283'}
//               activeStrokeWidth={8}
//               inActiveStrokeWidth={8}
//             />
//             <View style={{ width: 80, backgroundColor: '#FF4800', marginTop: -30, zIndex: 30, margin: 'auto', justifyContent: 'center', paddingTop: 6, paddingBottom: 6, alignItems: 'center', borderRadius: 100, }}>
//               <ThemedText style={[styles.profileImageText, { color: '#ffffff', textAlign: 'center', fontSize: 16 }]}>35%</ThemedText>
//             </View>
//           </View>



//           <View style={[styles.profileImageContainer, { marginTop: 24 }]}>
//             <ThemedText style={[styles.profileImageText, { color: '#000000' }]}>DK</ThemedText>
//           </View>
//         </View>

//         <ThemedHeadingText style={[styles.name]}>Durgesh Prajapati</ThemedHeadingText>
//         <ThemedText style={styles.mobileNumber}>+91 8010444461</ThemedText>
//       </ThemedView> */}

// <ThemedView style={[styles.profileSection, { marginTop: 60 }]}>
//   <View style={{ position: 'relative', margin: 'auto', left: 0, right: 10, width: 250, alignItems: 'center' }}>
//     <View style={{ position: 'absolute', top: 10, justifyContent: 'center' }}>
//       <CircularProgress
//         value={profileData.progress}
//         radius={54}
//         activeStrokeColor={'#FF4800'}
//         inActiveStrokeColor={'#273283'}
//         activeStrokeWidth={8}
//         inActiveStrokeWidth={8}
//       />
//       <View style={{ width: 80, backgroundColor: '#FF4800', marginTop: -30, zIndex: 30, margin: 'auto', justifyContent: 'center', paddingTop: 6, paddingBottom: 6, alignItems: 'center', borderRadius: 100 }}>
//         <ThemedText style={[styles.profileImageText, { color: '#ffffff', textAlign: 'center', fontSize: 16 }]}>
//           {profileData.progress}%
//         </ThemedText>
//       </View>
//     </View>

//     <View style={[styles.profileImageContainer, { marginTop: 24 }]}>
//       <ThemedText style={[styles.profileImageText, { color: '#000000', textTransform: 'uppercase' }]}>  
//         {profileData.firstName[0]}{profileData.lastName[0]}
//       </ThemedText>
//     </View>
//   </View>

//   <ThemedHeadingText style={[styles.name]}>
//     {profileData.firstName} {profileData.lastName}
//   </ThemedHeadingText>
//   <ThemedText style={styles.mobileNumber}>
//     +91 {profileData.phoneNumber} 
//   </ThemedText>
// </ThemedView>


//       {/* Scrollable Menu */}
//       <ScrollView style={styles.menuList}>
//         {menuOptions.map((item) => (
//           <ThemedView key={item.id} style={styles.menuItemContainer}>
//             <TouchableOpacity
//               onPress={() =>
//                 item.screen
//                   ? navigation.navigate(item.screen) // Navigate if screen exists
//                   : toggleMenu(item.id) // Toggle submenu otherwise
//               }
//               style={[styles.menuItem, { flexDirection: 'row', alignItems: 'center' }]}>
//               <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
//                 <Image source={item.icon} style={{ width: 14, height: 14, marginRight: 10 }} />
//                 <ThemedText style={styles.menuText}>{item.name}</ThemedText>
//               </View>
//               <View>
//                 {item.submenu.length > 0 ? (
//                   null
//                 ) : <Image
//                   source={require('../../assets/images/menuArrow.png')}
//                   style={{ width: 8, height: 14 }}
//                 />}

//               </View>
//               {item.submenu.length > 0 ? (
//                 <Image
//                   source={
//                     expandedMenu === 0
//                       ? require('../../assets/images/menuArrow-down.png')
//                       : require('../../assets/images/menuArrow.png')
//                   }
//                   style={{ width: 8, height: 14 }}
//                 />
//               ) : null}
//             </TouchableOpacity>
//             {expandedMenu === item.id && item.submenu.length > 0 && (
//               <View style={{ borderBottomWidth: 1, borderTopWidth: 1, marginTop: 16, marginBottom: 16, borderColor: '#F4F5F6', marginLeft: 20 }}>
//                 {item.submenu.map((submenuItem, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => {
//                       if (submenuItem.loantype === 'PersonalLoan' || submenuItem.loantype === 'BusinessLoan') {
//                         setType(submenuItem.loantype);
//                         AsyncStorage.setItem('loanType', submenuItem.loantype);
//                       }
//                       navigation.navigate(submenuItem.screen);
//                     }}
//                     style={styles.submenuItem}>
//                     <ThemedView style={styles.submenuText}>
//                       <ThemedText style={styles.bus}>{submenuItem.name} </ThemedText>
//                       {/* <ThemedText style={styles.arrow}>▸</ThemedText> */}

//                       <Image
//                         source={require('../../assets/images/menuArrow.png')} style={styles.arrow} />

//                     </ThemedView>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
//           </ThemedView>
//         ))}

//       </ScrollView>


//       {/* Logout Button */}
//       <View style={{ position: 'relative' }}>
//         <TouchableOpacity style={styles.logoutButton} onPress={logout}>
//           <ThemedText style={styles.logoutText}>Logout</ThemedText>
//         </TouchableOpacity>

//         <ThemedText style={{ left: 20, bottom: 10, position: 'absolute', fontSize: 12 }}>Version 0.0.1</ThemedText>

//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   profileImageContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   profileImageText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: 'bold'
//   },
//   mobileNumber: {
//     fontSize: 16,
//     marginTop: 5,
//     color: "#FF4800"
//   },
//   menuList: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   menuItemContainer: {
//     marginBottom: 10,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomColor: '#eee',
//   },
//   menuText: {
//     fontSize: 16,
//     flex: 1,
//     justifyContent: 'space-between',

//   },
//   arrow: {
//     fontSize: 16,
//     width: 8,
//     height: 14,
//     tintColor: '#505050'
//   },
//   submenuItem: {
//     paddingVertical: 10,
//     paddingLeft: 20,
//   },
//   submenuText: {
//     fontSize: 14,
//     flex: 1,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     tintColor: '#505050'
//   },
//   logoutButton: {
//     padding: 15,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   logoutText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: "#FF4800"
//   },

//   backButton: {
//     position: "absolute",
//     top: 50,
//     textAlign: 'center',
//     justifyContent: 'center',
//     zIndex: 20,
//     left: 16

//   },

// });

// export default SideMenuScreen;






// import { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, BackHandler, Appearance } from 'react-native';
// import CircularProgress from 'react-native-circular-progress-indicator';
// import axios from 'axios';
// import {CommonActions, useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ThemedHeadingText, ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { BASE_URL } from '../util/api_url';
// import DeviceInfo from 'react-native-device-info';

// const SideMenuScreen = () => {
//   const navigation = useNavigation();

//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     email: '',
//     dob: '',
//     address: '',
//     progress: 0,
//   });

//   console.log("profileData",  profileData)


//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const [type, setType] = useState('');

//   const calculateProfilePercentage = (data) => {
//     const fields = [
//       data.firstName,
//       data.lastName,
//       data.phoneNumber,
//       data.email,
//       data.dob,
//       data.address,
//       data.firstName,
//       data.lastName,
//       data.email,
//       data.dob,
//       data.pan,
//       data.pinCode,
//       data.city,
//       data.state,
//       data.houseNo,
//       data.streetAddress,
//       data.landmark,
//       data.gender,
//       data.education,
//       data.maritalStatus,
//       data.liveWith,
//       data.ownsFourWheeler,
//       data.ownsTwoWheeler,
//       data.companyName,
//       data.employmentLevel,
//       data.officeNo,
//       data.officeStreet,
//       data.officePinCode,
//       data.officeCity,
//       data.officeState,
//       data.netMonthlyIncome,
//       data.modeOfIncome,
//       data.bankAccount,
//       data.hasCreditCard,
//       data.insurancePlans,
//       data.investmentOptions,
//       data.earningMembers,
//       data.shoppingFrequency,
//       data.rewardInterests,
//       data.exploreIndiaFrequency,
//       data.travelAbroadFrequency,
//       data.passions,
//       data.movieGenres,

//     ];

//     const totalFields = fields.length;
//     const filledFields = fields.filter((field) => field && field.trim() !== '').length;

//     return Math.round((filledFields / totalFields) * 100);
//   };


//   useEffect(() => {
//     const fetchProfile = async () => {

//       const jsonValue = await AsyncStorage.getItem('userData');
//       const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
      

//       try {
//         const response = await axios.get(`${BASE_URL}/api/otp/get-profile`, {
//           params: { phoneNumber: parsedValue }
//         });

        

//         const data = response.data;

//       console.log("profileDataneen",  data)

//         const percentage = calculateProfilePercentage(data);

//         setProfileData({
//           firstName: data.firstName || '',
//           lastName: data.lastName || '',
//           phoneNumber: data.phoneNumber || '',
//           email: data.email || '',
//           dob: data.dob || '',
//           address: data.address || '',
//           progress: percentage,
//         });

//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // const logout = async () => {
//   //   await AsyncStorage.removeItem('userToken');
//   //   await AsyncStorage.removeItem('userData');
//   //   await AsyncStorage.removeItem('appIdData');
//   //   navigation.navigate('LoginScreen');
//   // };

//   // const logout = async () => {
//   //   try {
//   //     await AsyncStorage.clear();
//   //     Alert.alert('Logout', 'You have been logged out successfully.');
  
//   //     navigation.reset({
//   //       index: 0,
//   //       routes: [{ name: 'LoginScreen' }],
//   //     });
//   //   } catch (error) {
//   //     console.error('Error clearing storage: ', error);
//   //   }
//   // };

//   const logout = async () => {
//     try {
//       await AsyncStorage.clear();
//       Alert.alert('Logout', 'You have been logged out successfully.');
  
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{ name: 'LoginScreen' }],
//         })
//       );
//     } catch (error) {
//       console.error('Error clearing storage: ', error);
//     }
//   };
  

//   const toggleMenu = (id) => {
//     setExpandedMenu(expandedMenu === id ? null : id);
//   };

//   const menuOptions = [
//     {
//       id: 1, name: 'Loan & Credit',
//       submenu: [
//         { id: 1, name: 'Personal Loan', screen: 'PersonalDetailsOne', loantype: 'PersonalLoan' },
//         { id: 2, name: 'Business Loan', screen: 'PersonalDetailsOne', loantype: 'BusinessLoan' },
//         { id: 3, name: 'Credit Card', screen: 'QuickListing', loantype: 'CreditCard',  investmentType: 'creditcard' }
//       ],
//       icon: require('../../assets/icons/Loan-Credit.png'),
//     },
//     {
//       id: 2, name: 'Investment',
//       submenu: [
//         { id: 1, name: 'Income Plans', screen: 'QuickListing', loantype: 'Incomeplans',  investmentType: 'incomeplan' },
//         { id: 2, name: 'Stock Market', screen: 'QuickListing', loantype: 'Stockmarket',  investmentType: 'stockmarket'  },
//         { id: 3, name: 'Mutual Funds', screen: 'QuickListing', loantype: 'Mutualfunds',  investmentType: 'mutualfund'  }
//       ],
//       icon: require('../../assets/icons/Investment.png'),
//     },
//     {
//       id: 3, name: 'Insurance',
//       submenu: [
//         { id: 1, name: 'Health Insurance', screen: 'QuickListing', loantype: 'Healthinsurance',  investmentType: 'healthinsurance'  },
//         { id: 2, name: 'Life Insurance', screen: 'QuickListing', loantype: 'Lifeinsurance',  investmentType: 'lifeinsurance'  },
//         { id: 3, name: 'Car Insurance', screen: 'QuickListing', loantype: 'Carinsurance',  investmentType: 'carinsurance'  }
//       ],
//       icon: require('../../assets/icons/Insurance.png'),
//     },
//     { id: 4, name: 'Money Smarts', screen: 'MoneySmartListing', submenu: [], icon: require('../../assets/icons/Money-Smarts.png') },
//     { id: 5, name: 'EMI Calculator', submenu: [], icon: require('../../assets/icons/Tax-Calculator.png'), screen: 'EMICalculatorScreen' },
//     { id: 5, name: 'Wallet Point', submenu: [], icon: require('../../assets/icons/Tax-Calculator.png'), screen: 'WalletPoint' },
//     { id: 6, name: 'FAQs', submenu: [], icon: require('../../assets/icons/FAQs.png'), screen: 'FAQScreen' },
//     { id: 7, name: 'Privacy Policy', submenu: [], icon: require('../../assets/icons/Privacy-Policy.png'), screen: 'PrivacyPolicyScreen' },
//     { id: 8, name: 'Help', submenu: [], icon: require('../../assets/icons/Help.png'), screen: 'ContactUsScreen' },
//   ];

//     const theme = Appearance.getColorScheme();
//     const dynamicStyles = {
//       backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//       shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//     };

//   return (
//     <View style={[styles.container, dynamicStyles]}> 
//       <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { width: 30, height: 30 }]}>
//         <Image source={require('../../assets/images/backArrow.png')} style={{ width: 10, height: 18 }} />
//       </TouchableOpacity>

//       {/* Profile Section */}
//       <ThemedView style={[styles.profileSection, { marginTop: 60 }]}>
//         <View style={{ position: 'relative', margin: 'auto', left: 0, right: 10, width: 250, alignItems: 'center' }}>
//           <View style={{ position: 'absolute', top: 10, justifyContent: 'center' }}>
//             <CircularProgress
//               value={profileData.progress}
//               radius={54}
//               activeStrokeColor={'#FF4800'}
//               inActiveStrokeColor={'#273283'}
//               activeStrokeWidth={8}
//               inActiveStrokeWidth={8}
//               showProgressValue={false}
//             />
//             {/* <View style={{
//               width: 80,
//               backgroundColor: '#FF4800',
//               marginTop: -30,
//               zIndex: 30,
//               margin: 'auto',
//               justifyContent: 'center',
//               paddingTop: 6,
//               paddingBottom: 6,
//               alignItems: 'center',
//               borderRadius: 100
//             }}>
//               <ThemedText style={{ color: '#ffffff', textAlign: 'center', fontSize: 16 }}>
//                 {profileData.progress}%
//               </ThemedText>
//             </View> */}


//             <TouchableOpacity
//   onPress={() => navigation.navigate('ProfileScreen')}
//   style={{
//     width: 80,
//     backgroundColor: '#FF4800',
//     marginTop: -30,
//     zIndex: 30,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     justifyContent: 'center',
//     paddingTop: 6,
//     paddingBottom: 6,
//     alignItems: 'center',
//     borderRadius: 100,
//   }}
// >
//   <ThemedText style={{ color: '#ffffff', textAlign: 'center', fontSize: 16 }}>
//     {profileData.progress}%
//   </ThemedText>
// </TouchableOpacity>
//           </View>

//           <View style={[styles.profileImageContainer, { marginTop: 24 }]}>
//             <ThemedText style={[styles.profileImageText]}>
//               {profileData.firstName[0]}{profileData.lastName[0]}
//             </ThemedText>
//           </View>
//         </View>

//         <ThemedHeadingText style={styles.name}>
//           {profileData.firstName} {profileData.lastName}
//         </ThemedHeadingText>
//         <ThemedText style={styles.mobileNumber}>
//           +91 {profileData.phoneNumber}
//         </ThemedText>
//       </ThemedView>

//       {/* Scrollable Menu */}
//       <ScrollView style={styles.menuList}>
//         {menuOptions.map((item) => (
//           <ThemedView key={item.id} style={styles.menuItemContainer}>
//             <TouchableOpacity
//               onPress={() =>
//                 item.screen
//                   ? navigation.navigate(item.screen)
//                   : toggleMenu(item.id)
//               }
//               style={[styles.menuItem, { flexDirection: 'row', alignItems: 'center' }]}>
//               <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
//                 <Image source={item.icon} style={{ width: 14, height: 14, marginRight: 10 }} />
//                 <ThemedText style={styles.menuText}>{item.name}</ThemedText>
//               </View>
//               {item.submenu.length === 0 && (
//                 <Image source={require('../../assets/images/menuArrow.png')} style={{ width: 8, height: 14 }} />
//               )}
//               {item.submenu.length > 0 && (
//                 <Image
//                   source={
//                     expandedMenu === item.id
//                       ? require('../../assets/images/menuArrow-down.png')
//                       : require('../../assets/images/menuArrow.png')
//                   }
//                   style={{ width: 8, height: 14 }}
//                 />
//               )}
//             </TouchableOpacity>

//             {expandedMenu === item.id && item.submenu.length > 0 && (
//               <View style={{
//                 borderBottomWidth: 1,
//                 borderTopWidth: 1,
//                 marginTop: 16,
//                 marginBottom: 16,
//                 borderColor: '#F4F5F6',
//                 marginLeft: 20
//               }}>
//                 {item.submenu.map((submenuItem, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => {
//                       if (submenuItem.loantype) {
//                         setType(submenuItem.loantype);
//                         AsyncStorage.setItem('loanType', submenuItem.loantype);
//                       }
//                       navigation.navigate(submenuItem.screen, { investmentType: submenuItem.investmentType });
//                     }}
//                     style={styles.submenuItem}>
//                     <ThemedView style={styles.submenuText}>
//                       <ThemedText style={styles.bus}>{submenuItem.name}</ThemedText>
//                       <Image source={require('../../assets/images/menuArrow.png')} style={styles.arrow} />
//                     </ThemedView>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
//           </ThemedView>
//         ))}
//       </ScrollView>

//       {/* Logout Button */}
//       <View style={{ position: 'relative' }}>
//         <TouchableOpacity style={styles.logoutButton} onPress={logout}>
//           <ThemedText style={styles.logoutText}>Logout</ThemedText>
//         </TouchableOpacity>
        

// <ThemedText style={{ left: 20, bottom: 10, position: 'absolute', fontSize: 12 }}>
//   Version {DeviceInfo.getVersion()}
// </ThemedText>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   profileSection: { alignItems: 'center', marginVertical: 20 },
//   profileImageContainer: {
//     width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 30
//   },
//   profileImageText: { fontSize: 24, fontWeight: 'bold' },
//   name: { fontSize: 20, fontWeight: 'bold' },
//   mobileNumber: { fontSize: 16, marginTop: 5, color: "#FF4800" },
//   menuList: { flex: 1, paddingHorizontal: 20 },
//   menuItemContainer: { marginBottom: 10 },
//   menuItem: {
//     flexDirection: 'row', justifyContent: 'space-between',
//     alignItems: 'center', paddingVertical: 8, borderBottomColor: '#eee'
//   },
//   menuText: { fontSize: 16, flex: 1 },
//   arrow: { width: 8, height: 14, tintColor: '#505050' },
//   submenuItem: { paddingVertical: 10, paddingLeft: 20 },
//   submenuText: {
//     flexDirection: 'row', justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   bus: { fontSize: 14 },
//   logoutButton: {
//     padding: 15, alignItems: 'center',
//     marginHorizontal: 20, borderRadius: 5, marginBottom: 20
//   },
//   logoutText: { fontSize: 16, fontWeight: 'bold', color: "#FF4800" },
//   backButton: {
//     position: "absolute", top: 50, justifyContent: 'center', zIndex: 20, left: 16
//   }
// });

// export default SideMenuScreen;



import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Appearance,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import axios from 'axios';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedHeadingText, ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BASE_URL } from '../util/api_url';
import DeviceInfo from 'react-native-device-info';

const SideMenuScreen = () => {
  const navigation = useNavigation();

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dob: '',
    address: '',
    progress: 0,
  });

  const [expandedMenu, setExpandedMenu] = useState<number | null>(null);
  const [type, setType] = useState('');

  const calculateProfilePercentage = (data: Record<string, any> = {}) => {
    const keys = [
      'firstName',
      'lastName',
      'phoneNumber',
      'email',
      'dob',
      'address',
      'pan',
      'pinCode',
      'city',
      'state',
      'houseNo',
      'streetAddress',
      'landmark',
      'gender',
      'education',
      'maritalStatus',
      'liveWith',
      'ownsFourWheeler',
      'ownsTwoWheeler',
      'companyName',
      'employmentLevel',
      'officeNo',
      'officeStreet',
      'officePinCode',
      'officeCity',
      'officeState',
      'netMonthlyIncome',
      'modeOfIncome',
      'bankAccount',
      'hasCreditCard',
      'insurancePlans',
      'investmentOptions',
      'earningMembers',
      'shoppingFrequency',
      'rewardInterests',
      'exploreIndiaFrequency',
      'travelAbroadFrequency',
      'passions',
      'movieGenres',
    ];

    const total = keys.length;

    const filled = keys.reduce((count, key) => {
      const v = data?.[key];
      if (v === null || v === undefined) return count;

      if (typeof v === 'string') return count + (v.trim() ? 1 : 0);
      if (typeof v === 'number') return count + 1;
      if (typeof v === 'boolean') return count + 1;
      if (Array.isArray(v)) return count + (v.length ? 1 : 0);

      return count;
    }, 0);

    const pct = Math.round((filled / total) * 100);
    return Math.max(0, Math.min(100, pct));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
        const phone =
          typeof parsedValue === 'string'
            ? parsedValue
            : parsedValue?.phoneNumber ?? '';

        const response = await axios.get(`${BASE_URL}/api/otp/get-profile`, {
          params: { phoneNumber: phone },
        });

        const data = response.data ?? {};
        const percentage = calculateProfilePercentage(data);

        setProfileData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phoneNumber: data.phoneNumber || phone || '',
          email: data.email || '',
          dob: data.dob || '',
          address: data.address || '',
          progress: Number.isFinite(percentage) ? percentage : 0,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logout', 'You have been logged out successfully.');

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' as never }],
        })
      );
    } catch (error) {
      console.error('Error clearing storage: ', error);
    }
  };

  const toggleMenu = (id: number) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const menuOptions = [
    {
      id: 1,
      name: 'Loan & Credit',
      submenu: [
        {
          id: 1,
          name: 'Personal Loan',
          screen: 'PersonalDetailsOne',
          loantype: 'PersonalLoan',
        },
        {
          id: 2,
          name: 'Business Loan',
          screen: 'PersonalDetailsOne',
          loantype: 'BusinessLoan',
        },
        {
          id: 3,
          name: 'Credit Card',
          screen: 'QuickListing',
          loantype: 'CreditCard',
          investmentType: 'creditcard',
        },
      ],
      icon: require('../../assets/icons/Loan-Credit.png'),
    },
    {
      id: 2,
      name: 'Investment',
      submenu: [
        {
          id: 1,
          name: 'Income Plans',
          screen: 'QuickListing',
          loantype: 'Incomeplans',
          investmentType: 'incomeplan',
        },
        {
          id: 2,
          name: 'Stock Market',
          screen: 'QuickListing',
          loantype: 'Stockmarket',
          investmentType: 'stockmarket',
        },
        {
          id: 3,
          name: 'Mutual Funds',
          screen: 'QuickListing',
          loantype: 'Mutualfunds',
          investmentType: 'mutualfund',
        },
      ],
      icon: require('../../assets/icons/Investment.png'),
    },
    {
      id: 3,
      name: 'Insurance',
      submenu: [
        {
          id: 1,
          name: 'Health Insurance',
          screen: 'QuickListing',
          loantype: 'Healthinsurance',
          investmentType: 'healthinsurance',
        },
        {
          id: 2,
          name: 'Life Insurance',
          screen: 'QuickListing',
          loantype: 'Lifeinsurance',
          investmentType: 'lifeinsurance',
        },
        {
          id: 3,
          name: 'Car Insurance',
          screen: 'QuickListing',
          loantype: 'Carinsurance',
          investmentType: 'carinsurance',
        },
      ],
      icon: require('../../assets/icons/Insurance.png'),
    },
    {
      id: 4,
      name: 'Money Smarts',
      screen: 'MoneySmartListing',
      submenu: [],
      icon: require('../../assets/icons/Money-Smarts.png'),
    },
    {
      id: 5,
      name: 'EMI Calculator',
      submenu: [],
      icon: require('../../assets/icons/Tax-Calculator.png'),
      screen: 'EMICalculatorScreen',
    },
    {
      id: 6,
      name: 'Wallet Point',
      submenu: [],
      icon: require('../../assets/icons/Tax-Calculator.png'),
      screen: 'WalletPoint',
    },
    {
      id: 7,
      name: 'FAQs',
      submenu: [],
      icon: require('../../assets/icons/FAQs.png'),
      screen: 'FAQScreen',
    },
    {
      id: 8,
      name: 'Privacy Policy',
      submenu: [],
      icon: require('../../assets/icons/Privacy-Policy.png'),
      screen: 'PrivacyPolicyScreen',
    },
    {
      id: 9,
      name: 'Help',
      submenu: [],
      icon: require('../../assets/icons/Help.png'),
      screen: 'ContactUsScreen',
    },
  ];

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
    shadowColor: theme === 'dark' ? '#FFFFFF' : '#000000',
  };

  return (
    <View style={[styles.container, dynamicStyles]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { width: 30, height: 30 }]}
      >
        <Image
          source={require('../../assets/images/backArrow.png')}
          style={{ width: 10, height: 18 }}
        />
      </TouchableOpacity>

      {/* Profile Section */}
      <ThemedView style={[styles.profileSection, { marginTop: 60 }]}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 250,
          }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress
              value={
                Number.isFinite(profileData.progress)
                  ? profileData.progress
                  : 0
              }
              radius={54}
              activeStrokeColor={'#FF4800'}
              inActiveStrokeColor={'#273283'}
              activeStrokeWidth={8}
              inActiveStrokeWidth={8}
              showProgressValue={false}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen' as never)}
              style={styles.progressPill}
            >
              <ThemedText style={{ color: '#ffffff', fontSize: 16 }}>
                {Number.isFinite(profileData.progress)
                  ? profileData.progress
                  : 0}
                %
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={[styles.profileImageContainer, { marginTop: -90 }]}>
            <ThemedText style={styles.profileImageText}>
              {(profileData.firstName?.[0] ?? '').toUpperCase()}
              {(profileData.lastName?.[0] ?? '').toUpperCase()}
            </ThemedText>
          </View>
        </View>

        <ThemedHeadingText style={styles.name}>
          {profileData.firstName} {profileData.lastName}
        </ThemedHeadingText>
        <ThemedText style={styles.mobileNumber}>
          +91 {profileData.phoneNumber}
        </ThemedText>
      </ThemedView>

      {/* Scrollable Menu */}
      <ScrollView style={styles.menuList}>
        {menuOptions.map((item) => (
          <ThemedView key={item.id} style={styles.menuItemContainer}>
            <TouchableOpacity
              onPress={() =>
                item.screen
                  ? navigation.navigate(item.screen as never)
                  : toggleMenu(item.id)
              }
              style={[
                styles.menuItem,
                { flexDirection: 'row', alignItems: 'center' },
              ]}
            >
              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              >
                <Image
                  source={item.icon}
                  style={{ width: 14, height: 14, marginRight: 10 }}
                />
                <ThemedText style={styles.menuText}>{item.name}</ThemedText>
              </View>
              {item.submenu.length === 0 && (
                <Image
                  source={require('../../assets/images/menuArrow.png')}
                  style={{ width: 8, height: 14 }}
                />
              )}
              {item.submenu.length > 0 && (
                <Image
                  source={
                    expandedMenu === item.id
                      ? require('../../assets/images/menuArrow-down.png')
                      : require('../../assets/images/menuArrow.png')
                  }
                  style={{ width: 8, height: 14 }}
                />
              )}
            </TouchableOpacity>

            {expandedMenu === item.id && item.submenu.length > 0 && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  marginTop: 16,
                  marginBottom: 16,
                  borderColor: '#F4F5F6',
                  marginLeft: 20,
                }}
              >
                {item.submenu.map((submenuItem, index) => (
                  <TouchableOpacity
                    key={`${item.id}-${submenuItem.id}-${index}`}
                    onPress={async () => {
                      if (submenuItem.loantype) {
                        setType(submenuItem.loantype);
                        await AsyncStorage.setItem(
                          'loanType',
                          submenuItem.loantype
                        );
                      }
                      navigation.navigate(submenuItem.screen as never, {
                        investmentType: submenuItem.investmentType,
                      } as never);
                    }}
                    style={styles.submenuItem}
                  >
                    <ThemedView style={styles.submenuText}>
                      <ThemedText style={styles.bus}>
                        {submenuItem.name}
                      </ThemedText>
                      <Image
                        source={require('../../assets/images/menuArrow.png')}
                        style={styles.arrow}
                      />
                    </ThemedView>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ThemedView>
        ))}
      </ScrollView>

      {/* Logout Button & Version */}
      <View style={{ position: 'relative' }}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>

        <ThemedText
          style={{ left: 20, bottom: 10, position: 'absolute', fontSize: 12 }}
        >
          Version {DeviceInfo.getVersion()}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileSection: { alignItems: 'center', marginVertical: 20 },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageText: { fontSize: 24, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold' },
  mobileNumber: { fontSize: 16, marginTop: 5, color: '#FF4800' },
  menuList: { flex: 1, paddingHorizontal: 20 },
  menuItemContainer: { marginBottom: 10 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#eee',
  },
  menuText: { fontSize: 16, flex: 1 },
  arrow: { width: 8, height: 14, tintColor: '#505050' },
  submenuItem: { paddingVertical: 10, paddingLeft: 20 },
  submenuText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bus: { fontSize: 14 },
  logoutButton: {
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: '#FF4800' },
  backButton: {
    position: 'absolute',
    top: 50,
    justifyContent: 'center',
    zIndex: 20,
    left: 16,
  },
  progressPill: {
    position: 'absolute',
    bottom: -8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: '#FF4800',
  },
});

export default SideMenuScreen;
