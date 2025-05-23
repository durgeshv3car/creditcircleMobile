import { ThemedTextInput } from '@/components/ThemedInput';
import { ThemedHeadingText, ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BASE_URL } from '@/components/util/api_url';
import { requestFcmToken } from '@/components/util/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
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
  BackHandler,
} from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const withY = Dimensions.get("window").width;
const CELL_COUNT = 4;
const API_BASE_URL = `${BASE_URL}/api/otp/`;

console.log(API_BASE_URL)

const LoginScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isWhatsAppEnabled, setIsWhatsAppEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyboardOn, setKeyboardOn] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const clearByFocusCell = useClearByFocusCell({ value, setValue });

  const handleGetOtp = async () => {
    const sanitizedNumber = mobileNumber.replace(/\D/g, '').toString();

    if (sanitizedNumber.length !== 10 || !/^[6-9]\d{9}$/.test(sanitizedNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: sanitizedNumber })
      });

      const data = await response.json();
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
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true // Disable hardware back
    );
  
    return () => backHandler.remove();
  }, []);

  const handleVerifyOTP = async () => {


    if (value.length !== CELL_COUNT) {
      Alert.alert('Invalid OTP', 'Please enter the full OTP.');
      return;
    }

    setValue("")
    const sanitizedNumber = mobileNumber.replace(/\D/g, '').toString();

    try {
      const token = await requestFcmToken();

      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: sanitizedNumber,
          otp: value,
          whatsApp: isWhatsAppEnabled,
          fcm_token: token
        })
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Error', data.message || 'Invalid OTP. Please try again.');
        return;
      }

      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(sanitizedNumber));



      // Reset navigation stack
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home' }],
      // });

      const profileResponse = await fetch(`${API_BASE_URL}/get-profile?phoneNumber=${sanitizedNumber}`);
      const profileData = await profileResponse.json();

      console.log("Profile Data", profileData)


      if (profileData.isCompleted === "1") {
        navigation.navigate('Home');
      } else {
        navigation.navigate('PersonalDetailsOne');
      }

      
      // setTimeout(() => {
      //   if (profileData.isCompleted === "1") {
      //     navigation.navigate('Home');
      //   } else {
      //     navigation.navigate('PersonalDetailsOne');
      //   }
      // }, 500);
      


    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = () => {
    setTimer(30);
    handleGetOtp();
    setValue("")
  };


  

  useEffect(() => {
 
    
    if (modalVisible && timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
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
          <ThemedText style={styles.countryCode}>+91 -</ThemedText>
          <TextInput
            style={[styles.input]}
            // keyboardType="number-pad"
            keyboardType="number-pad"
            maxLength={10}
            placeholder="Your 10-digit number"
            value={mobileNumber}
            onChangeText={(text) => setMobileNumber(text.replace(/\D/g, ''))}
          />
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={handleGetOtp} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Get OTP'}</Text>
        </TouchableOpacity>

        <ThemedView style={styles.switchContainer}>
          <Image source={require("../../../assets/icons/whatsapp.png")} style={{ width: 22, height: 21, marginRight: 3 }} />
          <ThemedText style={styles.switchText}>Get updates on Whatsapp</ThemedText>
          <Switch value={isWhatsAppEnabled} onValueChange={setIsWhatsAppEnabled} />

          {/* <Switch
    trackColor={{ false: "#767577", true: "#81b0ff" }}
    thumbColor={isWhatsAppEnabled ? "#f5dd4b" : "#f4f3f4"}
    onValueChange={setIsWhatsAppEnabled}
    value={isWhatsAppEnabled}
    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Adjust size
        height: 50 }} // Set track height
/> */}

        </ThemedView>

      </ThemedView>



      <TouchableOpacity onPress={() => navigation.navigate("TermsandConditions")}>
        <ThemedText style={styles.termsText}>Terms and Conditions</ThemedText>
      </TouchableOpacity>

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
    fontSize: 16
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
    marginLeft:10,
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
  cell: {
    width: '22%',
    height: 40,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#e5e5e5',
    justifyContent: 'center',
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
  },
  resendText: {
    color: '#999',
    textAlign: 'center',
  },
  resendLink: {
    color: '#007BFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#FF5722',
    marginTop: 30,
  },
});

export default LoginScreen;
