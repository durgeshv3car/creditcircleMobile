// import React, { useEffect } from 'react';
// import { View, Text, Button, Alert, StyleSheet } from 'react-native';
// import ReactNativeBiometrics from 'react-native-biometrics';

// const rnBiometrics = new ReactNativeBiometrics();

// const FingerprintAuthScreen = () => {


  
// useEffect(() => { 
 
//   handleFingerprintAuth()

// }, []); // Empty dependency array to run only once on mount


// const handleFingerprintAuth = async () => {
//   const { available, biometryType } = await rnBiometrics.isSensorAvailable();

//   if (!available) {
//     Alert.alert('Error', 'Biometrics not supported or set up on this device.');
//     return;
//   }

//   rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
//     .then((result) => {
//       const { success } = result;

//       if (success) {
//         Alert.alert('Success', 'Fingerprint recognized!');
//         // Navigate or perform your secured action here
//       } else {
//         Alert.alert('Failure', 'Fingerprint authentication failed.');
//       }
//     })
//     .catch(() => {
//       Alert.alert('Error', 'Fingerprint authentication cancelled or failed.');
//     });
// };



//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Fingerprint Authentication</Text>
//       <Button title="Authenticate" onPress={handleFingerprintAuth} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18, 
//     marginBottom: 20,
//   },
// });

// export default FingerprintAuthScreen;

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const FingerprintAuthScreen = ({ onAuthSuccess }) => {
  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { available } = await rnBiometrics.isSensorAvailable();

    if (!available) {
      onAuthSuccess(); // fallback if biometric not available
      return;
    }

    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to proceed',
      });

      if (success) {
        onAuthSuccess(); // this moves to LoginScreen or Main
      } else {
        Alert.alert('Authentication Failed', 'Please try again.');
      }
    } catch (error) {
      console.warn('Biometric error:', error);
      onAuthSuccess(); // fallback on error
    }
  };



  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Authenticating...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default FingerprintAuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 20 },
});
