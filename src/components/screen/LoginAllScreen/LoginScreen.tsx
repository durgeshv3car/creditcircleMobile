import { ThemedHeadingText, ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { loginSuccess } from '@/redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';

const withY = Dimensions.get("window").width;

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useDispatch } from 'react-redux';

const CELL_COUNT = 4;
const API_BASE_URL = 'http://192.168.0.18:5000/api/otp/';

const LoginScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isWhatsAppEnabled, setIsWhatsAppEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const clearByFocusCell = useClearByFocusCell({ value, setValue });

  const [keyboardOn, setKeyboardOn] = useState(false);


  const handleGetOtp = async () => {
    const sanitizedNumber = mobileNumber.replace(/\D/g, '').toString(); // Ensure it's a string

    if (sanitizedNumber.length !== 10 || !/^[6-9]\d{9}$/.test(sanitizedNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: sanitizedNumber }) // Ensure string format
      });

      const data = await response.json();
      console.log('Response:', data); // Debug response

      setLoading(false);

      if (response.ok) {
        setModalVisible(true);
        setKeyboardOn(true);
        setTimeout(() => {
          ref?.current?.focus();
        }, 50);
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setLoading(false);
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };


// Final Code
  const handleVerifyOTP = async () => {
    if (value.length !== CELL_COUNT) {
      Alert.alert('Invalid OTP', 'Please enter the full OTP.');
      return;
    }

    const sanitizedNumber = mobileNumber.replace(/\D/g, '').toString(); // Ensure number is a string

    if (!sanitizedNumber || sanitizedNumber.length !== 10) {
      Alert.alert('Error', 'Invalid phone number.');
      return;
    }


      try {
        const jsonValue = JSON.stringify(sanitizedNumber);
        await AsyncStorage.setItem('userData', jsonValue);
        console.log(jsonValue)
       
        console.log('User data saved successfully.');
      } catch (error) {
        console.error('Error saving user data:', error);
      }

     


      try {
        setLoading(true);
      
        const response = await fetch(`${API_BASE_URL}/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: sanitizedNumber, otp: value, whatsApp: isWhatsAppEnabled }),
        });
      
        const data = await response.json();
        setLoading(false);

        await AsyncStorage.setItem('userToken', data.token);

        console.log(data.token);
        
        if (response.ok) {
         

          // await AsyncStorage.setItem('userToken', data.token);

           const isCompleted = await fetch(`${API_BASE_URL}/get-profile?phoneNumber=${sanitizedNumber}`)
           const data = await isCompleted.json();
           console.log(data)
          if (data.isCompleted === "1") {  
            navigation.navigate('Home'); // Redirect to Home if profile is completed
            // console.log("Hello Puria")
          } else {
            navigation.navigate('PersonalDetailsOne'); // Redirect to profile completion screen
          }
        } else {
          console.error('OTP Verification Failed:', data);
          Alert.alert('Error', data.message || 'Invalid OTP. Please try again.');
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'Network error. Please try again.');
      }
      
  };


  const resendOtp = async () => {
    setTimer(30);
    handleGetOtp();
  };

  useEffect(() => {
    if (modalVisible && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, modalVisible]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ alignItems: 'center' }}>
        <Image source={require("../../../assets/images/icon.png")} style={{ width: 136, height: 96, marginTop: 50 }} />
        <ThemedHeadingText style={styles.title}>Enter Mobile Number</ThemedHeadingText>

        <ThemedView style={styles.inputContainer}>
          <Image source={require("../../../assets/icons/flag.png")} style={{ width: 20, height: 14, marginRight: 16 }} />
          <ThemedText style={styles.countryCode}>+91</ThemedText>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={10}
            placeholder="Enter your 10-digit mobile number"
            value={mobileNumber}
            onChangeText={(text) => setMobileNumber(text.replace(/\D/g, ''))}
          />
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={handleGetOtp} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Get OTP'}</Text>
        </TouchableOpacity>

        <ThemedView style={styles.switchContainer}>
          <Image source={require("../../../assets/icons/whatsapp.png")} style={{ width: 22, height: 21, marginRight: 3 }} />
          <ThemedText style={styles.switchText}>Get Updates On WhatsApp</ThemedText>
          <Switch value={isWhatsAppEnabled} onValueChange={setIsWhatsAppEnabled} />
        </ThemedView>
      </ThemedView>

      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(true)}>
        <ThemedView style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.titlenew}>Verify Mobile Number</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.subtitle}>
                Code sent to <Text style={styles.phoneNumber}>{mobileNumber} <Text style={styles.edit}>edit</Text></Text>
              </Text>
            </Pressable>

            <View style={{ paddingHorizontal: 42 }}>
              <CodeField
                ref={ref}
                {...clearByFocusCell}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoFocus={keyboardOn}
                renderCell={({ index, symbol, isFocused }) => (
                  <View key={index} style={[styles.cell, isFocused && styles.focusedCell]}>
                    <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
                  </View>
                )}
              />
            </View>

            <Pressable style={styles.verifyButton} onPress={handleVerifyOTP} disabled={loading}>
              <Text style={styles.verifyText}>{loading ? 'Verifying...' : 'Verify'}</Text>
            </Pressable>

            <View style={{ marginBottom: 20 }}>
              {timer > 0 ? (
                <Text style={styles.resendText}>Resend OTP in {timer} sec</Text>
              ) : (
                <TouchableOpacity onPress={resendOtp}>
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: withY * 0.07,
    marginBottom: 60,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '98%',
  },
  countryCode: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  switchText: {
    fontSize: 16,
    marginRight: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#FF5722',
    marginTop: 30,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  titlenew: {
    fontSize: withY * 0.06,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#273283',
  },
  subtitle: {
    fontSize: 14,
    color: '#273283',
    textAlign: 'center',
    backgroundColor: '#F5F5FA',
    margin: 'auto',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  phoneNumber: {
    fontWeight: 'bold',
  },
  edit: {
    color: '#FF4800',
  },
  codeFieldRoot: {
    marginBottom: 20,
  },
  cell: {
    width: '22%',
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#e5e5e5',
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  cellText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  focusedCell: {
    borderColor: '#007BFF',
  },
  verifyButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resendText: {
    color: '#999',
    textAlign: 'center',
  },
  resendLink: {
    color: '#007BFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationStyle: 'solid',
  },
});

export default LoginScreen;
