// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import { ThemedHeadingText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { BASE_URL } from "@/components/util/api_url";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import {
//     View,
//     SafeAreaView,
//     KeyboardAvoidingView,
//     ScrollView,
//     Keyboard,
//     TouchableWithoutFeedback,
//     Appearance,
//     Pressable,
//     Alert,
//     StyleSheet,
//     ActivityIndicator,
//     Text,
// } from "react-native";

// const API_BASE_URL = `${BASE_URL}/api`;
// const PINCODE_API_URL = `${BASE_URL}/api/pincode/`;

// const OfficeAddressInformation = ({ navigation }) => {
//     const [applicationId, setApplicationId] = useState("");
//     const [officeLocation, setOfficeLocation] = useState("");
//     const [streetAddress, setStreetAddress] = useState("");
//     const [pinCode, setPinCode] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [isKeyboardVisible, setKeyboardVisible] = useState(false);

//     useEffect(() => {
//         fetchApplicationId();

//         const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
//             setKeyboardVisible(true)
//         );
//         const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
//             setKeyboardVisible(false)
//         );

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     const fetchApplicationId = async () => {
//         try {
    
//             const jsonValue = await AsyncStorage.getItem('appIdData');
//             const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//             setApplicationId(parsedValue);
//             console.log(parsedValue)

//         } catch (error) {
//             console.error("❌ Error fetching phone number:", error);
//         }
//     };

//     const fetchCityAndState = async (pin) => {
//         try {
//             const response = await axios.get(`${PINCODE_API_URL}${pin}`);
//             if (response.data) {
//                 setCity(response.data.city);
//                 setState(response.data.state);
//             } else {
//                 setCity("");
//                 setState("");
//                 Alert.alert("Error", "Invalid Pin Code. Please check again.");
//             }
//         } catch (error) {
//             Alert.alert("Error", "Invalid Pin Code. Please check again.");
//             setCity("");
//             setState("");
          
//         }
//     };

//     const handlePinCodeChange = (value) => {
//         setPinCode(value);
//         if (value.length === 6) {
//             fetchCityAndState(value);
//         }
//     };

//   const validateInputs = () => {
//     let valid = true;
//     let errorObj = {};

//     if (!officeLocation.trim()) {
//         errorObj.officeLocation = "Office Location Is Required";
//         valid = false;
//     }
//     if (!streetAddress.trim()) {
//         errorObj.streetAddress = "Street Address Is Required";
//         valid = false;
//     }
//     if (!pinCode.trim() || pinCode.length !== 6 || isNaN(pinCode)) {
//         errorObj.pinCode = "Valid 6-digit Pin Code Is Required";
//         valid = false;
//     }
//     if (!city.trim()) {
//         errorObj.city = "City Is Required";
//         valid = false;
//     }
//     if (!state.trim()) {
//         errorObj.state = "State Is Required";
//         valid = false;
//     }

//     console.log("✅ Validation Errors:", errorObj);
//     setErrors(errorObj);
//     return valid;
// };

// const handleSubmit = async () => {
//     console.log("📌 Debugging Form Data Before API Call:");
//     console.log("Application ID:", applicationId);
//     console.log("Office Location:", officeLocation);
//     console.log("Street Address:", streetAddress);
//     console.log("Pin Code:", pinCode);
//     console.log("City:", city);
//     console.log("State:", state);

//     if (!validateInputs()) return;

//     setIsLoading(true);
//     try {
//         const requestData = {
//             applicationId: applicationId?.toString(), // Ensure it's a string
//             officeLocation: officeLocation.trim(),
//             officeStreet: streetAddress.trim(),
//             officePinCode: pinCode.trim(),
//             officeCity: city.trim(),
//             officeState: state.trim(),
//         };

//         console.log("📤 Sending Data to API:", JSON.stringify(requestData, null, 2));

//         const response = await axios.post(
//             `${API_BASE_URL}/loan-application/office-address`,
//             requestData
//         );

//         console.log("✅ API Response:", response.data);

//         if (response.status === 200) {
//             // Alert.alert("Success", "Office address updated successfully.");
//             navigation.navigate("SalariedReasontoApplyforLoan");
//         } else {
//             Alert.alert("Error", response.data.message || "Failed to update office address.");
//         }
//     } catch (error) {
//         console.log("🔍 API Response Data:", error.response?.data); // Log response data
        
//     } finally {
//         setIsLoading(false);
//     }
// };

    

//     return (
//         <SafeAreaView style={appStyle.gstcraeccontainer}>
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <KeyboardAvoidingView style={{ flex: 1 }}
//                 //  behavior={Platform.OS === "ios" ? "padding" : "height"}
//                  >
//                     <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//                         <View style={appStyle.HeadingTitle}>
//                             <ThemedHeadingText style={[styles.header]}>Office Address Information</ThemedHeadingText>
//                             <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
//                         </View>

//                         <ThemedTextInput label="Office Location" placeHolder="Office No. / Building" value={officeLocation} onChangeText={setOfficeLocation} error={errors.officeLocation} />
//                         <ThemedTextInput label="Street Address / Area" placeHolder="Road Name, Area, Sector" value={streetAddress} onChangeText={setStreetAddress} error={errors.streetAddress} />
//                         <ThemedTextInput label="Pin Code" placeHolder="Enter Your Area Code" keyboardType="number-pad" maxLength={6} value={pinCode} onChangeText={handlePinCodeChange} error={errors.pinCode} />
//                         <View style={{ flexDirection: "row", gap: 20 }}>
//                             <ThemedTextInput label="City" placeHolder="City" disable={false} value={city} editable={false} error={errors.city} />
//                             <ThemedTextInput label="State" placeHolder="State" disable={false} 
//                             value={state ? state.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : ""}
//                             editable={false} error={errors.state} />
//                         </View>
//                     </ScrollView>
//                     <View style={styles.buttonContainer}>
//                         <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>{isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}</Pressable>
//                     </View>
//                 </KeyboardAvoidingView>
//             </TouchableWithoutFeedback>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
    
//     scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
//     header: { fontSize: 18, fontWeight: "bold" },
//     buttonContainer: { left: 0, right: 0, bottom: 20, alignItems: "center" },
//     button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
//     buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
//     errorText: { color: "red", fontSize: 12, marginTop: 5 },
// });

// export default OfficeAddressInformation;

import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedHeadingText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BASE_URL } from "@/components/util/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Appearance,
  Pressable,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Text,
  Platform,
} from "react-native";

const API_BASE_URL = `${BASE_URL}/api`;
const PINCODE_API_URL = `${BASE_URL}/api/pincode/`;

const OfficeAddressInformation = ({ navigation }) => {
  const [applicationId, setApplicationId] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const parseStoredPhone = (raw) => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return typeof parsed === "string" ? parsed : parsed?.phoneNumber;
    } catch {
      return raw;
    }
  };

  const fetchCityAndState = async (pin) => {
    try {
      const response = await axios.get(`${PINCODE_API_URL}${pin}`);
      setCity(response.data?.city || "");
      setState(response.data?.state || "");
    } catch {
      setCity("");
      setState("");
      Alert.alert("Error", "Invalid Pin Code. Please check again.");
    }
  };

  const handlePinCodeChange = (value) => {
    setPinCode(value);
    if (value.length === 6 && /^\d{6}$/.test(value)) {
      fetchCityAndState(value);
    } else {
      setCity("");
      setState("");
    }
  };

  const prefillFromApp = async (app) => {
    const id = app?.id || app?.applicationId;
    if (!id) throw new Error("Missing application ID.");
    setApplicationId(String(id));

    if (app.officeLocation) setOfficeLocation(app.officeLocation);
    if (app.officeStreet) setStreetAddress(app.officeStreet);

    if (app.officePinCode) {
      const pin = String(app.officePinCode).replace(/\D/g, "");
      setPinCode(pin);
      if (app.officeCity) setCity(app.officeCity);
      if (app.officeState) setState(app.officeState);
      if ((!app.officeCity || !app.officeState) && /^\d{6}$/.test(pin)) {
        await fetchCityAndState(pin);
      }
    } else {
      setCity(app.officeCity || "");
      setState(app.officeState || "");
    }
  };
const init = useCallback(async () => {
  try {
    const userRaw = await AsyncStorage.getItem("userData");
    const appIdData = await AsyncStorage.getItem("appIdData");
    const phone = parseStoredPhone(userRaw);
    
    if (!phone) {
      Alert.alert("Error", "Phone number not found. Please verify OTP first.");
      navigation.navigate("LoginScreen");
      return;
    }

    const { data } = await axios.get(`${API_BASE_URL}/single-loan-application-mobileprefill/${encodeURIComponent(phone)}`);
    const applications = Array.isArray(data?.data) ? data.data : [data.data];

    // First try to find exact match using saved appId
    let matchedApp = applications.find(app =>
      app.id?.toString() === appIdData || app.applicationId?.toString() === appIdData
    );

    // If not found, try to fallback to latest incomplete app
    if (!matchedApp) {
      matchedApp = applications
        .filter(app => app.loanCompletion === false)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
    }

    if (!matchedApp) {
      await AsyncStorage.removeItem("appIdData");
      Alert.alert("Info", "No matching application found. Please start again.");
      navigation.replace("LoanRequirements");
      return;
    }

    // Save the correct appId
    const matchedId = matchedApp.id || matchedApp.applicationId;
    setApplicationId(matchedId);
    await AsyncStorage.setItem("appIdData", String(matchedId));

    // Prefill fields
    if (matchedApp.officeLocation) setOfficeLocation(matchedApp.officeLocation);
    if (matchedApp.officeStreet) setStreetAddress(matchedApp.officeStreet);

    if (matchedApp.officePinCode) {
      const pin = String(matchedApp.officePinCode).replace(/\D/g, "");
      setPinCode(pin);

      if (matchedApp.officeCity) setCity(matchedApp.officeCity);
      if (matchedApp.officeState) setState(matchedApp.officeState);
      if ((!matchedApp.officeCity || !matchedApp.officeState) && /^\d{6}$/.test(pin)) {
        await fetchCityAndState(pin);
      }
    } else {
      setCity(matchedApp.officeCity || "");
      setState(matchedApp.officeState || "");
    }

  } catch (error) {
    console.error("❌ Prefill init error:", error?.response?.data || error.message);
    Alert.alert("Error", "Unable to fetch your application. Please try again.");
  } finally {
    setInitLoading(false);
  }
}, [navigation]);


  useEffect(() => {
    init();
  }, [init]);

  const validateInputs = () => {
    const err = {};
    if (!officeLocation.trim()) err.officeLocation = "Office Location is required";
    if (!streetAddress.trim()) err.streetAddress = "Street Address is required";
    if (!pinCode.trim() || pinCode.length !== 6 || isNaN(pinCode)) err.pinCode = "Valid 6-digit Pin Code is required";
    if (!city.trim()) err.city = "City is required";
    if (!state.trim()) err.state = "State is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    if (!applicationId) {
      Alert.alert("Error", "No active application. Please restart.");
      navigation.replace("LoanRequirements");
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
        applicationId: applicationId,
        officeLocation: officeLocation.trim(),
        officeStreet: streetAddress.trim(),
        officePinCode: pinCode.trim(),
        officeCity: city.trim(),
        officeState: state.trim(),
      };

      const response = await axios.post(`${API_BASE_URL}/loan-application/office-address`, requestData);
      if (response.status === 200) {
        navigation.navigate("SalariedReasontoApplyforLoan");
      } else {
        Alert.alert("Error", response.data?.message || "Failed to submit.");
      }
    } catch (error) {
      console.error("❌ Submit error:", error?.response?.data || error.message);
      Alert.alert("Error", error?.response?.data?.message || "Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  if (initLoading) {
    return (
      <SafeAreaView style={[appStyle.gstcraeccontainer, dynamicStyles]}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[appStyle.gstcraeccontainer, dynamicStyles]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={[styles.header]}>Office Address Information</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
            </View>

            <ThemedTextInput label="Office Location" placeHolder="Office No. / Building" value={officeLocation} onChangeText={setOfficeLocation} error={errors.officeLocation} />
            <ThemedTextInput label="Street Address / Area" placeHolder="Road Name, Area, Sector" value={streetAddress} onChangeText={setStreetAddress} error={errors.streetAddress} />
            <ThemedTextInput label="Pin Code" placeHolder="Enter Your Area Code" keyboardType="number-pad" maxLength={6} value={pinCode} onChangeText={handlePinCodeChange} error={errors.pinCode} />

            <View style={{ flexDirection: "row", gap: 20 }}>
              <ThemedTextInput label="City" placeHolder="City" disable={false} value={city} editable={false} error={errors.city} />
              <ThemedTextInput label="State" placeHolder="State" disable={false} value={state} editable={false} error={errors.state} />
            </View>
          </ScrollView>

          <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
            <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
  header: { fontSize: 18, fontWeight: "bold" },
  buttonContainer: { left: 0, right: 0, bottom: 20, alignItems: "center" },
  button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default OfficeAddressInformation;
