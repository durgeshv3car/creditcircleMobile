import appStyle from "@/AppStyles";
import DateOfBirthInput from "@/components/common/DateOfBirthInput";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Appearance,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";

const PersonalDetailsOne = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");  // Set default value
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [profileExists, setProfileExists] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

  //   const localValue = async () => {
  //   const jsonValue = AsyncStorage.getItem('userData');
  //   jsonValue != null ? JSON.parse(jsonValue) : null;
  //   console.log("GetDatat", jsonValue)
  // }


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

  // ✅ Validate input fields
  const validate = () => {
    let valid = true;
    let errorObj = {};

    if (!firstName.trim()) {
        errorObj.firstName = "First Name is required";
        valid = false;
    }
    if (!lastName.trim()) {
        errorObj.lastName = "Last Name is required";
        valid = false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorObj.email = "Valid Email is required";
        valid = false;
    }
    if (!dob) {
        errorObj.dob = "Date of Birth is required";
        valid = false;
    }

    setErrors(errorObj);

    console.log("🔍 Validation Errors:", errorObj); // Print validation errors

    return valid;
};

useEffect(() => {
  fetchProfileData();
}, []);


const fetchProfileData = async () => {
  try {
    
    const Token = await AsyncStorage.getItem('userToken');

console.log(Token, "Hello Durgesh")
    
    const jsonValue = await AsyncStorage.getItem('userData');
const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;

setPhoneNumber(parsedValue)


const profileResponse = await axios.get(
  `http://192.168.0.18:5000/api/otp/get-profile?phoneNumber=${parsedValue}`
);

console.log(profileResponse, "Hello Durgesh" )


    // // ✅ Fetch the phone number from the OTP model
    // const otpResponse = await axios.get("http://192.168.0.18:5000/api/otp/get-phone-number");

    // if (!otpResponse.data.phoneNumber) {
    //   Alert.alert("Error", "Phone number not found. Verify OTP first.");
    //   return;
    // }

    // setPhoneNumber(otpResponse.data.phoneNumber);

    // ✅ Fetch Profile using Phone Number





    
    if(profileResponse.data.firstName === null || profileResponse.data.lastName === null || profileResponse.data.email === null){
      setProfileExists(true);
      console.log("Hello")
    }else{
      setProfileExists(false);
    }
    
    if (profileResponse.data) {
      setFirstName(profileResponse.data.firstName || "");
      setLastName(profileResponse.data.lastName || "");
      setEmail(profileResponse.data.email || "");
      setDob(profileResponse.data.dob || "");
    } else {
      console.log("Profile not found, user will need to create one.");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};


const handleContinue = async () => {
  if (!validate()) return;
  
  
  try {
      console.log("📤 Fetching Phone Number...");
      const otpResponse = await fetch("http://192.168.0.18:5000/api/otp/get-phone-number");
      const otpData = await otpResponse.json();
      
      console.log("📌 Phone Number Data:", otpData);

      if (!otpResponse.ok || !otpData.phoneNumber) {
          console.error("❌ Error: Failed to retrieve phone number.");
          Alert.alert("Error", "Failed to retrieve phone number.");
          return;
      }



      const requestData = {
          phoneNumber: phoneNumber,
          firstName,
          lastName,
          email,
          dob,
      };

      
      const methodType = profileExists ? "PUT" : "POST";
      const response = await fetch(
          `http://192.168.0.18:5000/api/loan-application/personal-details`,
          {
              method: methodType,
              headers: { 
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              },
              body: JSON.stringify(requestData),
          }
      );

      console.log("🔍 API Response Status:", response.status);

      // Read response as text first
      const responseText = await response.text();
      console.log("🔍 Raw API Response:", responseText);

      let data;
      try {
          data = JSON.parse(responseText);
      } catch (jsonError) {
          console.error("❌ API returned invalid JSON:", responseText);
          Alert.alert("Error", "API returned an invalid response.");
          return;
      }

      if (response.ok) {
          console.log("✅ API Success: Navigating to next screen...");
          Alert.alert(
              "Success",
              profileExists ? "Profile updated successfully" : "Profile created successfully",
              [{ text: "OK" }]
          );
          navigation.navigate("PanLocationInformation");
      } else {
          console.error("❌ API Error:", data.message);
          Alert.alert("Error", data.message || "Something went wrong");
      }
  } catch (error) {
      console.error("❌ Error in handleContinue:", error);
      Alert.alert("Error", "Failed to connect to the server");
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={{ fontSize: 18, fontWeight: "bold" }}>Personal Details</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
              <ThemedText style={styles.subHeader}>Let’s get started with your personal details</ThemedText>
            </View>

            <ThemedTextInput label="First Name" placeHolder="First name as per PAN" value={firstName} onChangeText={setFirstName} error={errors.firstName} />
            <ThemedTextInput label="Last Name" placeHolder="Last name as per PAN" value={lastName} onChangeText={setLastName} error={errors.lastName} />
            <ThemedTextInput label="Email Address" placeHolder="Enter your email address" keyboardType="email-address" value={email} onChangeText={setEmail} error={errors.email} />
            <DateOfBirthInput value={dob} onChange={setDob} error={errors.dob} />
          </ScrollView>

          <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
    <Pressable 
        style={({ pressed }) => [
            styles.button, 
            pressed && { opacity: 0.8 }
        ]} 
        onPress={handleContinue}
    >
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
  subHeader: { fontSize: 12 },
  buttonContainer: { left: 0, right: 0, bottom: 0, alignItems: "center" },
  button: {
    backgroundColor: "#FF4800",
    paddingVertical: 15,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PersonalDetailsOne;
