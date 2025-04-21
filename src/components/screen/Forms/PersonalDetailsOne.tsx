import appStyle from "@/AppStyles";
import DateOfBirthInput from "@/components/common/DateOfBirthInput";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BASE_URL } from "@/components/util/api_url";
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


      const jsonValue = await AsyncStorage.getItem('userData');
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;



      setPhoneNumber(parsedValue)


      const profileResponse = await axios.get(
        `${BASE_URL}/api/otp/get-profile?phoneNumber=${parsedValue}`
      );





      if (profileResponse.data.firstName === null || profileResponse.data.lastName === null || profileResponse.data.email === null) {
        setProfileExists(true);
        console.log("Hello")
      } else {
        setProfileExists(false);
      }

      if (profileResponse.data) {
        setFirstName(profileResponse.data.firstName || "");
        setLastName(profileResponse.data.lastName || "");
        setEmail(profileResponse.data.email || "");
        // setDob(profileResponse.data.dob || "");
        const apiDob = profileResponse.data.dob;
        if (apiDob) {
          const [yyyy, mm, dd] = apiDob.split(/[-/]/); // supports both - and /
          const formattedDob = `${dd}/${mm}/${yyyy}`;
          setDob(formattedDob);
        }
      } else {
        console.log("Profile not found, user will need to create one.");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };


  // const handleContinue = async () => {
  //   if (!validate()) return;


  //   try {
  //       console.log("📤 Fetching Phone Number...");
  //       const otpResponse = await fetch(`${BASE_URL}/api/otp/get-phone-number`);
  //       const otpData = await otpResponse.json();

  //       console.log("📌 Phone Number Data:", otpData);

  //       if (!otpResponse.ok || !otpData.phoneNumber) {
  //           console.error("❌ Error: Failed to retrieve phone number.");
  //           Alert.alert("Error", "Failed to retrieve phone number.");
  //           return;
  //       }



  //       const requestData = {
  //           phoneNumber: phoneNumber,
  //           firstName,
  //           lastName,
  //           email,
  //           dob,
  //       };


  //       const methodType = profileExists ? "PUT" : "POST";
  //       const response = await fetch(
  //           `${BASE_URL}/api/loan-application/personal-details`,
  //           {
  //               method: methodType,
  //               headers: { 
  //                   "Content-Type": "application/json",
  //                   "Accept": "application/json"
  //               },
  //               body: JSON.stringify(requestData),
  //           }
  //       );

  //       console.log("🔍 API Response Status:", response.status);

  //       // Read response as text first
  //       const responseText = await response.text();
  //       console.log("🔍 Raw API Response:", responseText);

  //       let data;
  //       try {
  //           data = JSON.parse(responseText);
  //       } catch (jsonError) {
  //           console.error("❌ API returned invalid JSON:", responseText);
  //           return;
  //       }

  //       if (response.ok) {
  //           console.log("✅ API Success: Navigating to next screen...");
  //           navigation.navigate("PanLocationInformation");
  //       } else {
  //           console.error("❌ API Error:", data.message);
  //           Alert.alert("Error", data.message || "Something went wrong");
  //       }
  //   } catch (error) {
  //       console.error("❌ Error in handleContinue:", error);
  //       Alert.alert("Error", "Failed to connect to the server");
  //   }
  // };


  const handleContinue = async () => {
    if (!validate()) return;

    try {
      console.log("📤 Fetching Phone Number...");
      const otpResponse = await fetch(`${BASE_URL}/api/otp/get-phone-number`);
      const otpData = await otpResponse.json();

      console.log("📌 Phone Number Data:", otpData);

      if (!otpResponse.ok || !otpData.phoneNumber) {
        console.error("❌ Error: Failed to retrieve phone number.");
        Alert.alert("Error", "Failed to retrieve phone number.");
        return;
      }

      // ✅ Convert DD/MM/YYYY to YYYY-MM-DD for API
      const [dd, mm, yyyy] = dob.split('/');
      const dobForAPI = `${yyyy}-${mm}-${dd}`;

      const requestData = {
        phoneNumber: phoneNumber,
        firstName,
        lastName,
        email,
        dob: dobForAPI,
      };

      const methodType = profileExists ? "PUT" : "POST";
      const response = await fetch(
        `${BASE_URL}/api/loan-application/personal-details`,
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
      const responseText = await response.text();
      console.log("🔍 Raw API Response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("❌ API returned invalid JSON:", responseText);
        return;
      }

      if (response.ok) {
        console.log("✅ API Success: Navigating to next screen...");
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
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={{ fontSize: 18, fontWeight: "bold" }}>Personal Details</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
              <ThemedText style={styles.subHeader}>Let’s get started with your personal details</ThemedText>
            </View>

<View style={styles.row}>
            <ThemedTextInput label="First Name" placeHolder="First name as per PAN" value={firstName} onChangeText={(text) => { const alphabetOnly = text.replace(/[^a-zA-Z. ]/g, ''); setFirstName(alphabetOnly); }} error={errors.firstName} />
            <ThemedTextInput label="Last Name" placeHolder="Last name as per PAN" value={lastName} onChangeText={(text) => { const alphabetOnly = text.replace(/[^a-zA-Z. ]/g, ''); setLastName(alphabetOnly); }} error={errors.lastName} />
            </View>
            <ThemedTextInput label="Email Address" placeHolder="Enter your email address" keyboardType="email-address" value={email}
              onChangeText={(text) => {
                const noSpaces = text.replace(/\s/g, '');
                setEmail(noSpaces);
              }}
              error={errors.email}
            />

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
  row: { flexDirection: "row", width: "100%", gap: 20 },
});

export default PersonalDetailsOne;
