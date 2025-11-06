// import appStyle from '@/AppStyles';
// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Animated,
//   Platform,
//   Dimensions,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // ✅ Step 1

// const NotAvailable = ({ title = 'Data not available', uris }) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const navigation = useNavigation(); // ✅ Step 2

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 600,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const handleAllOfferPress = () => {
//     console.log('All Offer button pressed');
//     navigation.navigate('DealsScreen'); // ✅ Step 3
//   };

//   return (
//     <SafeAreaView style={[styles.container, appStyle.gstcraeccontainer]}>
//       <Animated.View style={[styles.shadowWrapper, { opacity: fadeAnim }]}>
//         <View style={styles.card}>
//           <Image
//             style={styles.not_available}
//             source={require('../../assets/images/not_available.png')}
//           />
//           <Text style={styles.text}>{title}</Text>
//         </View>
//       </Animated.View>

//       <TouchableOpacity style={styles.bottomButton} onPress={handleAllOfferPress}>
//         <Text style={styles.buttonText}>All Offer</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };


// export default NotAvailable;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//     justifyContent: "space-evenly",
//     alignItems: 'center',
//     height: '100%',
//   },
//   shadowWrapper: {
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.15,
//         shadowRadius: 10,
//       },
//       android: {
//         elevation: 10,
//       },
//     }),
//     borderRadius: 16,
//     backgroundColor: 'transparent',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 16,
//     alignItems: 'center',
//     width: Dimensions.get('window').width * 0.8,
//   },
//   text: {
//     fontSize: 14,
//     color: '#999',
//     fontWeight: '500',
//     textAlign: 'center',
//     marginTop: 16,
//   },
//   not_available: {
//     width: 250,
//     height: 250,
//     borderRadius: 12,
//   },
//   bottomButton: {
//     top: 40,
//     left: 0,
//     right: 0,
//     width: '90%',
//     borderRadius: 12,
//     backgroundColor: '#FF3B30',
//     paddingVertical: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });


import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotAvailable = ({ title = 'Data not available', uris }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAllOfferPress = () => {
    console.log('All Offer button pressed');
    navigation.navigate('DealsScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.shadowWrapper, { opacity: fadeAnim }]}>
        <View style={styles.card}>
          <Image
            style={styles.notAvailableImage}
            source={require('../../assets/images/not_available.png')}
          />
          <Text style={styles.text}>{title}</Text>
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.bottomButton} onPress={handleAllOfferPress}>
        <Text style={styles.buttonText}>All Offer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NotAvailable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  text: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
  },
  notAvailableImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  bottomButton: {
    top: 40,
    left: 0,
    right: 0,
    width: '90%',
    borderRadius: 12,
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  buttonText: {
    color: '#fff',
    backgroundColor:"#FF3B30",
    fontWeight: '600',
    fontSize: 16,
    height: 60,
        paddingVertical: 32,
  },
});
