import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Appearance,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/components/util/api_url";

const PanLocationInformation = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pan, setPan] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  

  /** ✅ Fetch user profile data if already available */
const fetchProfileData = async () => {
  try {
    // ✅ Fetch the phone number from the OTP model
    const otpResponse = await axios.get(`${BASE_URL}/api/otp/get-phone-number`);

    if (!otpResponse.data.phoneNumber) {
      Alert.alert("Error", "Phone number not found. Verify OTP first.");
      return;
    }



    const jsonValue = await AsyncStorage.getItem('userData');
    const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
   
    setPhoneNumber(parsedValue);


    // ✅ Fetch Profile using Phone Number
    const profileResponse = await axios.get(
      `${BASE_URL}/api/otp/get-profile?phoneNumber=${parsedValue}`
    );


    if(profileResponse.data.pan === null || profileResponse.data.pinCode === null ){
      setProfileExists(true);
      
    }else{
      setProfileExists(false);
    }

    if (profileResponse.data) {
      setPan(profileResponse.data.pan || "");
      setPinCode(profileResponse.data.pinCode || "");
      setCity(profileResponse.data.city || "");
      setState(profileResponse.data.state || "");
   
    } else {
      console.log("Profile not found, user will need to create one.");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

useEffect(() => {
  fetchProfileData();
}, []);



  /** ✅ Auto-fetch city & state when user enters 6-digit PIN code */
  const fetchCityState = async (pin: string) => {
    if (pin.length === 6) {
      try {
        const response = await axios.get(`${BASE_URL}/api/pincode/${pin}`);
        if (response.data) {
          setCity(response.data.city || "");
          setState(response.data.state || "");
        } else {
          Alert.alert("Invalid Pin Code", "No data found for the entered pin code.");
          setCity("");
          setState("");
        }
      } catch (error) {
        console.error("Error fetching city and state:", error);
        Alert.alert("Error", "Unable to fetch data for the entered pin code.");
        setCity("");
        setState("");
      }
    }
  };

  // /** ✅ Validate PAN & PIN code */
  // const validateInputs = () => {
  //   const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  //   const pinRegex = /^[0-9]{6}$/; // Pin Code validation

  //   if (!panRegex.test(pan)) {
  //     Alert.alert("Invalid PAN", "Enter a valid 10-character PAN (ABCDE1234F)");
  //     return false;
  //   }
  //   if (!pinRegex.test(pinCode)) {
  //     Alert.alert("Invalid Pin Code", "Enter a valid 6-digit Pin Code");
  //     return false;
  //   }
  //   if (!city.trim()) {
  //     Alert.alert("Invalid City", "City Cannot Be Empty");
  //     return false;
  //   }
  //   if (!state.trim()) {
  //     Alert.alert("Invalid State", "State Cannot Be Empty");
  //     return false;
  //   }
  //   return true;
  // };



  const validate = () => {
    let valid = true;
    let errorObj = {};
  
    const pinRegex = /^[0-9]{6}$/;
  
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!pan.trim() || !panRegex.test(pan)) {
      errorObj.pan = "Enter A Valid 10-character PAN (ABCDE1234F)";
      valid = false;
    }
  
    if (!pinCode.trim() || !pinRegex.test(pinCode)) {
      errorObj.pinCode = "Enter A Valid 6-digit Pin Code";
      valid = false;
    }
  
    if (!city.trim()) {
      errorObj.city = "City Cannot Be Empty";
      valid = false;
    }
  
    if (!state.trim()) {
      errorObj.state = "State Cannot Be Empty";
      valid = false;
    }
  
    setErrors(errorObj);
    console.log("🔍 Validation Errors:", errorObj);
  
    return valid;
  };
  

  /** ✅ Submit or update PAN & location details */
  const handleContinue = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const requestData = { phoneNumber, pan, pinCode, city, state };

      const response = await axios.put(
        `${BASE_URL}/api/loan-application/pan-location`,
        requestData
      );

      if (response.status === 200) {
        navigation.navigate("AddressInformation");
      } else {
      }
    } catch (error) {
      console.error("Error Updating PAN & Location:", error);
    } finally {
      setLoading(false);
    }
  };

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles]}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={appStyle.HeadingTitle}>
          <ThemedHeadingText style={styles.header}>PAN & Location Information</ThemedHeadingText>
          <ThemedView style={appStyle.headerLine}></ThemedView>
          <ThemedText style={styles.subHeader}>Verify your PAN & location details</ThemedText>
        </View>

        {/* PAN */}
        {/* <ThemedTextInput
          label="PAN"
          placeHolder="Permanent account number"
          maxLength={10}
          value={pan}
          onChangeText={(text) => setPan(text)}
          error={errors.pan}
        /> */}


<ThemedTextInput
  label="PAN"
  placeHolder="Permanent Account Number"
  maxLength={10}
  value={pan}
  autoCapitalize="characters"
  onChangeText={(text) => {
    const cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setPan(cleaned);
  }}
  error={errors.pan}
/>



        {/* Pin Code */}
        <ThemedTextInput
          label="Pin Code"
          maxLength={6}
          placeHolder="Enter Your Area Code"
          keyboardType="number-pad"
          value={pinCode}
          onChangeText={(text) => {
            setPinCode(text);
            fetchCityState(text);
          }}
          error={errors.pinCode}
        />

        {/* City & State */}
        <View style={styles.row}>
          <ThemedTextInput
            label="City"
            value={city}
            placeHolder="City"
            editable={false}
            error={errors.city}
            disable={false}
            containerStyle={{ flex: 1 }}
            // style={{ backgroundColor:"#ccc",  borderRadius: 5 }}
          />
          <ThemedTextInput
            label="State"
            value={state ? state.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : ""}
            placeHolder="State"
            editable={false}
            disable={false}
            error={errors.state}
            containerStyle={{ flex: 1 }}
          />
        </View>
      </ScrollView>

      <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.8 }
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>{profileExists === false ? "Next" : "Continue"}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  subHeader: { fontSize: 12 },
  headerLine: { width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 },
  row: { flexDirection: "row", width: "100%", gap: 20 },
  buttonContainer: { left: 0, right: 0, alignItems: "center" },
  button: { backgroundColor: "#FF4800", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 5, width: "90%" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default PanLocationInformation;
