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
    const otpResponse = await axios.get("http://192.168.0.18:5000/api/otp/get-phone-number");

    if (!otpResponse.data.phoneNumber) {
      Alert.alert("Error", "Phone number not found. Verify OTP first.");
      return;
    }



    const jsonValue = await AsyncStorage.getItem('userData');
    const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
    console.log(parsedValue, "PUria");
    
    setPhoneNumber(parsedValue);


    // ✅ Fetch Profile using Phone Number
    const profileResponse = await axios.get(
      `http://192.168.0.18:5000/api/otp/get-profile?phoneNumber=${parsedValue}`
    );


    if(profileResponse.data.pan === null || profileResponse.data.pinCode === null ){
      setProfileExists(true);
      console.log("Hello")
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
        const response = await axios.get(`http://192.168.0.18:5000/api/pincode/${pin}`);
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

  /** ✅ Validate PAN & PIN code */
  const validateInputs = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const pinRegex = /^[0-9]{6}$/; // Pin Code validation

    if (!panRegex.test(pan)) {
      Alert.alert("Invalid PAN", "Enter a valid 10-character PAN (ABCDE1234F)");
      return false;
    }
    if (!pinRegex.test(pinCode)) {
      Alert.alert("Invalid Pin Code", "Enter a valid 6-digit Pin Code");
      return false;
    }
    if (!city.trim()) {
      Alert.alert("Invalid City", "City cannot be empty");
      return false;
    }
    if (!state.trim()) {
      Alert.alert("Invalid State", "State cannot be empty");
      return false;
    }
    return true;
  };

  /** ✅ Submit or update PAN & location details */
  const handleContinue = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const requestData = { phoneNumber, pan, pinCode, city, state };

      const response = await axios.put(
        `http://192.168.0.18:5000/api/loan-application/pan-location`,
        requestData
      );

      if (response.status === 200) {
        Alert.alert("Success", "PAN & location details updated successfully", [{ text: "OK" }]);
        navigation.navigate("AddressInformation");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error updating PAN & location:", error);
      Alert.alert("Error", "Failed to update PAN & location details.");
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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={styles.header}>PAN & Location Information</ThemedHeadingText>
              <ThemedView style={styles.headerLine}></ThemedView>
              <ThemedText style={styles.subHeader}>Verify your PAN & location details</ThemedText>
            </View>

            <ThemedTextInput
              label="PAN"
              placeHolder="Permanent account number"
              maxLength={10}
              // style={{ textTransform: "uppercase" }}
              value={pan}
              onChangeText={(text) => setPan(text)}
            />


      
            <ThemedTextInput
              label="Pin Code"
              maxLength={6}
              placeHolder="Enter your area code"
              keyboardType="numeric"
              value={pinCode}
              onChangeText={(text) => {
                setPinCode(text);
                fetchCityState(text);
              }}
            />

            <View style={styles.row}>
              <ThemedTextInput label="City" value={city} placeHolder="City" editable={false} />
              <ThemedTextInput label="State" value={state} placeHolder="State" editable={false} />
            </View>
          </ScrollView>

          <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
            <Pressable style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>{profileExists === false ? "Update Profile" : "Continue"}</Text>
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
  buttonContainer: { position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center" },
  button: { backgroundColor: "#FF4800", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 5, width: "90%" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default PanLocationInformation;
