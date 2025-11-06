// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { useNavigation } from "@react-navigation/native";
// import React, { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// import {
//     View,
//     Text,
//     StyleSheet,
//     SafeAreaView,
//     KeyboardAvoidingView,
//     ScrollView,
//     Keyboard,
//     TouchableWithoutFeedback,
//     Appearance,
//     Pressable,
//     Alert,
//     ActivityIndicator,
//     Platform,
// } from "react-native";
// import { BASE_URL } from "@/components/util/api_url";
// import { ThemedView } from "@/components/ThemedView";

// const API_BASE_URL = `${BASE_URL}/api/loan-application`;
// const PINCODE_API_URL = `${BASE_URL}/api/pincode/`;

// const NoGSTBusinessDetail = ({ navigation }) => {
//     const [applicationId, setApplicationId] = useState("");
//     const [businessName, setBusinessName] = useState("");
//     const [natureOfBusiness, setNatureOfBusiness] = useState("");
//     const [businessType, setBusinessType] = useState("");
//     const [yearsInBusiness, setYearsInBusiness] = useState("");
//     const [officePinCode, setPinCode] = useState("");
//     const [officeCity, setCity] = useState("");
//     const [officeState, setState] = useState("");
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [isKeyboardVisible, setKeyboardVisible] = useState(false); // ✅ Fixed: Added state for keyboard visibility

//     useEffect(() => {
//         getApplicationId();

//         const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
//         const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     // ✅ Get applicationId from AsyncStorage
//     const getApplicationId = async () => {
//         try {
//             const jsonValue = await AsyncStorage.getItem("appIdData");
//             const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//             if (parsedValue) {
//                 setApplicationId(parsedValue);
//                 console.log("✅ Retrieved applicationId:", parsedValue);
//             } else {
//                 console.warn("⚠️ applicationId not found in AsyncStorage");
//             }
//         } catch (error) {
//             console.error("❌ Error getting applicationId:", error);
//         }
//     };

//     // ✅ Fetch City and State based on Pin Code
//     const handlePinCodeChange = async (value) => {
//         setPinCode(value);
//         if (value.length === 6) {
//             try {
//                 const response = await axios.get(`${PINCODE_API_URL}${value}`);
//                 console.log("✅ Pincode Response:", response.data);
//                 if (response.data) {
//                     setCity(response.data.city);
//                     setState(response.data.state);
//                 } else {
//                     setCity("");
//                     setState("");
//                     Alert.alert("Invalid Pin Code", "Please enter a valid Pin Code");
//                 }
//             } catch (error) {
//                 console.error("❌ Error fetching city and state:", error);
//                 Alert.alert("Error", "Failed to fetch city and state");
//             }
//         }
//     };

//     // ✅ Validation
//     const validateInputs = () => {
//         let isValid = true;
//         let errorObj = {};

//         if (!businessName) {
//             errorObj.businessName = "Business name Is Required";
//             isValid = false;
//         }

//         if (!natureOfBusiness) {
//             errorObj.natureOfBusiness = "Nature of business Is Required";
//             isValid = false;
//         }
//         if (!yearsInBusiness) {
//             errorObj.yearsInBusiness = "Years in current business Is Required";
//             isValid = false;
//         }
//         if (!officePinCode || officePinCode.length !== 6) {
//             errorObj.officePinCode = "Valid 6-digit Pin Code Is Required";
//             isValid = false;
//         }
//         if (!officeCity) {
//             errorObj.officeCity = "City Is Required";
//             isValid = false;
//         }
//         if (!officeState) {
//             errorObj.officeState = "State Is Required";
//             isValid = false;
//         }

//         setErrors(errorObj);
//         return isValid;
//     };


//     const handleContinue = async () => {
//         if (!validateInputs()) return;
    
//         try {
//             setIsLoading(true);
    
//             const requestBody = {
//                 applicationId,
//                 businessName,
//                 businessType,
//                 natureOfBusiness,
//                 yearsInBusiness,
//                 officePinCode,
//                 officeCity,
//                 officeState,
//             };
    
//             console.log("📤 Sending Data:", requestBody);
    
//             // ✅ Send business details
//             const response = await axios.post(`${API_BASE_URL}/updateGstDetails`, requestBody);
//             console.log("✅ API Response:", response.data);
    
//             if (response.status === 200) {
//                 Alert.alert("Success", "Business details updated successfully");
    
//                 // ✅ Fetch Employment Information after successful submission
//                 const employmentInfoResponse = await axios.get(
//                     `${API_BASE_URL}?applicationId=${applicationId}`
//                 );
    
//                 console.log("✅ Employment Info Response:", employmentInfoResponse.data);
    
//                 if (employmentInfoResponse.status === 200) {
//                     const employmentType = employmentInfoResponse.data.employmentInformation;
    
//                     if (employmentType === "SelfEmployedBusiness") {
//                         console.log("✅ Navigating to Home");
//                         navigation.navigate("RevenueIncomeDetailsProfessional");
//                     } else {
//                         console.log("✅ Navigating to RevenueIncomeDetails");
//                         navigation.navigate("RevenueIncomeDetails");
//                     }
//                 } else {
//                     Alert.alert("Error", "Failed to fetch employment information");
//                 }
//             }
//         } catch (error) {
//             console.error("❌ Error updating business details:", error);
//             Alert.alert("Error", error.response?.data?.message || "Failed to update details");
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
    
//     const theme = Appearance.getColorScheme();

//     const dynamicStyles = {
//         backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     };

//     const handleBusinessType = (value) => {
//         console.log("🔘 Selected Option handleBusinessType:", value);
//         setBusinessType(value);
//     };

//     const handleSelection = (value) => {
//         console.log("🔘 Selected Option handleSelection:", value);
//         setNatureOfBusiness(value);
//     };
    

//     return (
//         <SafeAreaView style={[styles.container, dynamicStyles]}>
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <KeyboardAvoidingView style={{ flex: 1 }}>
//                     <ScrollView contentContainerStyle={styles.scrollContainer}>

//                     <View style={appStyle.HeadingTitle}>
//                                 <ThemedHeadingText style={[styles.header]}>Business Details</ThemedHeadingText>
//                                 <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }}></ThemedView>
//                             </View>
 
//                         <ThemedTextInput
//                             label="Business Name"
//                             value={businessName}
//                             onChangeText={setBusinessName}
//                             error={errors.businessName}
//                         />

// <ThemedHeadingText style={{fontWeight:'bold', marginBottom:10}}>Company type</ThemedHeadingText>
//                         <View style={{paddingVertical:0, paddingHorizontal:6, marginBottom: 20, borderWidth:1, borderColor:'#ccc', borderRadius:5}}>
//                         <ThemedRadioButtonList
//                             options={[
//                                 { label: 'Proprietorship/Individual', value: 'Proprietorship/Individual' },
//                                 { label: 'Partnership Firm', value: 'Partnership Firm' },
//                                 { label: 'Private Limited Company', value: 'Private Limited Company' },
//                                 { label: 'Limited lia bility partnership (LLP)', value: 'LLP' },
//                             ]}
//                             onValueChange={handleBusinessType}
//                             defaultValue={businessType}
//                             error={errors.businessType}
//                         />
//                         </View>


// <ThemedHeadingText style={{fontWeight:'bold'}}>Nature of business</ThemedHeadingText>
// <ThemedRadioButtonList
//                             options={[
//                                 { label: 'Manufacturing', value: 'Manufacturing' },
//                                 { label: 'Trader/Wholesaler', value: 'Trader/Wholesaler' }
//                             ]}
//                             onValueChange={handleSelection}
//                             defaultValue={natureOfBusiness}
//                             error={errors.natureOfBusiness}
//                         />

//                         <ThemedTextInput
//                             label="Years in Business"
//                             value={yearsInBusiness}
//                             keyboardType="number-pad"
//                             maxLength={4}
//                             onChangeText={setYearsInBusiness}
//                             error={errors.yearsInBusiness}
//                             />

//                         <ThemedTextInput
//                             label="Pin Code"
//                             keyboardType="number-pad"
//                             maxLength={6}
//                             value={officePinCode}
//                             onChangeText={handlePinCodeChange}
//                             error={errors.officePinCode}
//                         />

// <View style={{ flexDirection: "row", gap: 20 }}>
//                         <ThemedTextInput label="City" value={officeCity} editable={false} error={errors.officeCity} />
//                         <ThemedTextInput label="State" value={officeState} editable={false} error={errors.officeState} />
//                         </View>


//                     </ScrollView>

//                     <View style={appStyle.buttonContainer}>
//                         <Pressable style={styles.button} onPress={handleContinue}>
//                             {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
//                         </Pressable>
//                     </View>
//                 </KeyboardAvoidingView>
//             </TouchableWithoutFeedback>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1 },
//     scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//     header: {
//         fontSize: 18,
//         fontWeight: "bold"
//     },
//     button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
//     buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
// });

// export default NoGSTBusinessDetail;





// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { useNavigation } from "@react-navigation/native";
// import React, { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// import {
//     View,
//     Text,
//     StyleSheet,
//     SafeAreaView,
//     KeyboardAvoidingView,
//     ScrollView,
//     Keyboard,
//     TouchableWithoutFeedback,
//     Appearance,
//     Pressable,
//     Alert,
//     ActivityIndicator,
//     Platform,
// } from "react-native";
// import { BASE_URL } from "@/components/util/api_url";
// import { ThemedView } from "@/components/ThemedView";

// const API_BASE_URL = `${BASE_URL}/api/loan-application`;
// const PINCODE_API_URL = `${BASE_URL}/api/pincode/`;

// const NoGSTBusinessDetail = ({ navigation }) => {
//     const [applicationId, setApplicationId] = useState("");
//     const [businessName, setBusinessName] = useState("");
//     const [natureOfBusiness, setNatureOfBusiness] = useState("");
//     const [businessType, setBusinessType] = useState("");
//     const [yearsInBusiness, setYearsInBusiness] = useState("");
//     const [officePinCode, setPinCode] = useState("");
//     const [officeCity, setCity] = useState("");
//     const [officeState, setState] = useState("");
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         getApplicationId();
//     }, []);

//     const getApplicationId = async () => {
//         try {
//             const jsonValue = await AsyncStorage.getItem("appIdData");
//             const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//             if (parsedValue) {
//                 setApplicationId(parsedValue);
//                 console.log("✅ Retrieved applicationId:", parsedValue);
//             } else {
//                 console.warn("⚠️ applicationId not found in AsyncStorage");
//             }
//         } catch (error) {
//             console.error("❌ Error getting applicationId:", error);
//         }
//     };

//     const handlePinCodeChange = async (value) => {
//         setPinCode(value);
//         if (value.length === 6) {
//             try {
//                 const response = await axios.get(`${PINCODE_API_URL}${value}`);
//                 console.log("✅ Pincode Response:", response.data);
//                 if (response.data) {
//                     setCity(response.data.city);
//                     setState(response.data.state);
//                 } else {
//                     setCity("");
//                     setState("");
//                     Alert.alert("Invalid Pin Code", "Please enter a valid Pin Code");
//                 }
//             } catch (error) {
//                 console.error("❌ Error fetching city and state:", error);
//                 Alert.alert("Error", "Failed to fetch city and state");
//             }
//         }
//     };

//     const validateInputs = () => {
//         let isValid = true;
//         let errorObj = {};

//         if (!businessName) {
//             errorObj.businessName = "Business name Is Required";
//             isValid = false;
//         }

//         if (!natureOfBusiness) {
//             errorObj.natureOfBusiness = "Nature of business Is Required";
//             isValid = false;
//         }

//         if (!yearsInBusiness) {
//             errorObj.yearsInBusiness = "Years in current business Is Required";
//             isValid = false;
//         }

//         if (!officePinCode || officePinCode.length !== 6) {
//             errorObj.officePinCode = "Valid 6-digit Pin Code Is Required";
//             isValid = false;
//         }

//         if (!officeCity) {
//             errorObj.officeCity = "City Is Required";
//             isValid = false;
//         }

//         if (!officeState) {
//             errorObj.officeState = "State Is Required";
//             isValid = false;
//         }

//         setErrors(errorObj);
//         return isValid;
//     };

//     const handleContinue = async () => {
//         if (!validateInputs()) return;

//         try {
//             setIsLoading(true);

//             const requestBody = {
//                 applicationId,
//                 businessName,
//                 businessType,
//                 natureOfBusiness,
//                 yearsInBusiness,
//                 officePinCode,
//                 officeCity,
//                 officeState,
//             };

//             console.log("📤 Sending Data:", requestBody);

//             const response = await axios.post(`${API_BASE_URL}/updateGstDetails`, requestBody);
//             console.log("✅ API Response:", response.data);

//             if (response.status === 200) {
               
//                 const employmentInfoResponse = await axios.get(`${API_BASE_URL}?applicationId=${applicationId}`);
//                 console.log("✅ Employment Info Response:", employmentInfoResponse.data);

//                 if (employmentInfoResponse.status === 200) {
//                     const employmentType = employmentInfoResponse.data.employmentInformation;

//                     if (employmentType === "SelfEmployedBusiness") {
//                         navigation.navigate("RevenueIncomeDetailsProfessional");
//                     } else {
//                         navigation.navigate("RevenueIncomeDetails");
//                     }
//                 } else {
//                     Alert.alert("Error", "Failed to fetch employment information");
//                 }
//             }
//         } catch (error) {
//             console.error("❌ Error updating business details:", error);
//             Alert.alert("Error", error.response?.data?.message || "Failed to update details");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const theme = Appearance.getColorScheme();
//     const dynamicStyles = {
//         backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     };

//     const handleBusinessType = (value) => setBusinessType(value);
//     const handleSelection = (value) => setNatureOfBusiness(value);

//     return (
//         <SafeAreaView style={[styles.container, dynamicStyles]}>
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
//             >
//                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                     <ScrollView
//                         contentContainerStyle={styles.scrollContainer}
//                         keyboardShouldPersistTaps="handled"
//                         showsVerticalScrollIndicator={false}
//                     >
//                         <View style={appStyle.HeadingTitle}>
//                             <ThemedHeadingText style={styles.header}>Business Details</ThemedHeadingText>
//                             <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }} />
//                         </View>

//                         <ThemedTextInput
//                             label="Business Name"
//                             value={businessName}
//                             onChangeText={setBusinessName}
//                             error={errors.businessName}
//                         />

//                         <ThemedHeadingText style={{ fontWeight: 'bold', marginBottom: 10 }}>Company type</ThemedHeadingText>
//                         <View style={{ paddingVertical: 0, paddingHorizontal: 6, marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
//                             <ThemedRadioButtonList
//                                 options={[
//                                     { label: 'Proprietorship/Individual', value: 'Proprietorship/Individual' },
//                                     { label: 'Partnership Firm', value: 'Partnership Firm' },
//                                     { label: 'Private Limited Company', value: 'Private Limited Company' },
//                                     { label: 'Limited liability partnership (LLP)', value: 'LLP' },
//                                 ]}
//                                 onValueChange={handleBusinessType}
//                                 defaultValue={businessType}
//                                 error={errors.businessType}
//                             />
//                         </View>

//                         <ThemedHeadingText style={{ fontWeight: 'bold' }}>Nature of business</ThemedHeadingText>
//                         <ThemedRadioButtonList
//                             options={[
//                                 { label: 'Manufacturing', value: 'Manufacturing' },
//                                 { label: 'Trader/Wholesaler', value: 'Trader/Wholesaler' }
//                             ]}
//                             onValueChange={handleSelection}
//                             defaultValue={natureOfBusiness}
//                             error={errors.natureOfBusiness}
//                         />

//                         <ThemedTextInput
//                             label="Years in Business"
//                             value={yearsInBusiness}
//                             keyboardType="number-pad"
//                             maxLength={4}
//                             onChangeText={setYearsInBusiness}
//                             error={errors.yearsInBusiness}
//                         />

//                         <ThemedTextInput
//                             label="Pin Code"
//                             keyboardType="number-pad"
//                             maxLength={6}
//                             value={officePinCode}
//                             onChangeText={handlePinCodeChange}
//                             error={errors.officePinCode}
//                         />

//                         <View style={{ flexDirection: "row", gap: 20 }}>
//                             <ThemedTextInput label="City" value={officeCity} editable={false} error={errors.officeCity} />
//                             <ThemedTextInput label="State" value={officeState} editable={false} error={errors.officeState} />
//                         </View>
//                     </ScrollView>
//                 </TouchableWithoutFeedback>

//                 <View style={appStyle.buttonContainer}>
//                     <Pressable style={styles.button} onPress={handleContinue}>
//                         {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
//                     </Pressable>
//                 </View>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1 },
//     scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//     header: {
//         fontSize: 18,
//         fontWeight: "bold"
//     },
//     button: {
//         backgroundColor: "#FF4800",
//         paddingVertical: 15,
//         borderRadius: 5,
//         width: "90%",
//         alignSelf: "center"
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//         textAlign: "center"
//     },
// });

// export default NoGSTBusinessDetail;




// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
// import { ThemedHeadingText } from "@/components/ThemedText";
// import { useNavigation } from "@react-navigation/native";
// import React, { useState, useEffect, useCallback } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Appearance,
//   Pressable,
//   Alert,
//   ActivityIndicator,
//   Platform,
// } from "react-native";
// import { BASE_URL } from "@/components/util/api_url";
// import { ThemedView } from "@/components/ThemedView";

// const API_LA_BASE = `${BASE_URL}/api/loan-application`;
// const API_BASE_URL = `${BASE_URL}/api`;                 // for /single-loan-application-mobile
// const PINCODE_API_URL = `${BASE_URL}/api/pincode/`;

// const NoGSTBusinessDetail = ({ navigation }) => {
//   const [applicationId, setApplicationId] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [natureOfBusiness, setNatureOfBusiness] = useState("");
//   const [businessType, setBusinessType] = useState("");
//   const [yearsInBusiness, setYearsInBusiness] = useState("");
//   const [officePinCode, setPinCode] = useState("");
//   const [officeCity, setCity] = useState("");
//   const [officeState, setState] = useState("");
//   const [errors, setErrors] = useState({});
//   const [initLoading, setInitLoading] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);

//   useEffect(() => {
//     const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
//     const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
//     return () => {
//       show.remove();
//       hide.remove();
//     };
//   }, []);

//   const theme = Appearance.getColorScheme();
//   const dynamicStyles = {
//     backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//   };

//   const parseStoredPhone = (raw) => {
//     if (!raw) return null;
//     try {
//       const parsed = JSON.parse(raw);
//       if (typeof parsed === "string") return parsed;
//       if (parsed?.phoneNumber) return parsed.phoneNumber;
//       return null;
//     } catch {
//       return raw; // stored as plain string
//     }
//   };

//   const fetchCityAndState = async (pin) => {
//     try {
//       const resp = await axios.get(`${PINCODE_API_URL}${pin}`);
//       if (resp?.data) {
//         setCity(resp.data.city || "");
//         setState(resp.data.state || "");
//       } else {
//         setCity("");
//         setState("");
//         Alert.alert("Invalid Pin Code", "Please enter a valid Pin Code");
//       }
//     } catch (e) {
//       setCity("");
//       setState("");
//       Alert.alert("Error", "Failed to fetch city and state");
//     }
//   };

//   const handlePinCodeChange = async (value) => {
//     setPinCode(value);
//     if (value.length === 6 && /^\d{6}$/.test(value)) {
//       await fetchCityAndState(value);
//     } else {
//       setCity("");
//       setState("");
//     }
//   };

//   const init = useCallback(async () => {
//     try {
//       // 1) Phone number to fetch the single application
//       const userRaw = await AsyncStorage.getItem("userData");
//       const ph = parseStoredPhone(userRaw);
//       if (!ph) {
//         Alert.alert("Error", "Phone number not found. Please verify OTP first.");
//         navigation.navigate("LoginScreen");
//         return;
//       }

//       // 2) Fetch single application by phone
//       try {
//         const { data, status } = await axios.get(
//           `${API_BASE_URL}/single-loan-application-mobile/${ph}`
//         );

//         if (status === 200 && data?.data) {
//           const app = data.data;

//           if (app.loanCompletion === false) {
//             // server app id is the source of truth
//             const id = app.id || app.applicationId;
//             if (id) {
//               setApplicationId(id);
//               await AsyncStorage.setItem("appIdData", JSON.stringify(id));
//             } else {
//               await AsyncStorage.removeItem("appIdData");
//               Alert.alert("Info", "No active application found. Please create a new one.");
//               navigation.replace("LoanRequirements");
//               return;
//             }

//             // Prefill business details if present
//             if (app.businessName) setBusinessName(app.businessName);
//             if (app.businessType) setBusinessType(app.businessType);
//             if (app.natureOfBusiness) setNatureOfBusiness(app.natureOfBusiness);
//             if (app.yearsInBusiness != null) setYearsInBusiness(String(app.yearsInBusiness));

//             if (app.officePinCode) {
//               const pin = String(app.officePinCode).replace(/\D/g, "");
//               setPinCode(pin);
//               // Prefer explicit city/state from server; otherwise look up by pincode
//               if (app.officeCity) setCity(app.officeCity);
//               if (app.officeState) setState(app.officeState);
//               if ((!app.officeCity || !app.officeState) && /^\d{6}$/.test(pin)) {
//                 await fetchCityAndState(pin);
//               }
//             } else {
//               setCity(app.officeCity || "");
//               setState(app.officeState || "");
//             }

//             setInitLoading(false);
//             return;
//           }

//           // Completed -> force new loan creation
//           await AsyncStorage.removeItem("appIdData");
//           setApplicationId("");
//           Alert.alert("Info", "Your previous application is completed. Please start a new one.");
//           navigation.replace("LoanRequirements");
//           return;
//         }
//       } catch (err) {
//         // 404 -> no active application -> start new
//         if (err?.response?.status === 404) {
//           await AsyncStorage.removeItem("appIdData");
//           setApplicationId("");
//           Alert.alert("Info", "No active application found. Please create a new application first.");
//           navigation.replace("LoanRequirements");
//           return;
//         }
//         console.error("❌ Fetch application error:", err?.response?.data || err.message);
//         Alert.alert("Error", "Failed to check application. Please try again.");
//       }
//     } finally {
//       setInitLoading(false);
//     }
//   }, [navigation]);

//   useEffect(() => {
//     init();
//   }, [init]);

//   const validateInputs = () => {
//     let isValid = true;
//     let errorObj = {};

//     if (!businessName?.trim()) {
//       errorObj.businessName = "Business name Is Required";
//       isValid = false;
//     }
//     if (!businessType) {
//       errorObj.businessType = "Company type Is Required";
//       isValid = false;
//     }
//     if (!natureOfBusiness) {
//       errorObj.natureOfBusiness = "Nature of business Is Required";
//       isValid = false;
//     }
//     if (!yearsInBusiness) {
//       errorObj.yearsInBusiness = "Years in current business Is Required";
//       isValid = false;
//     }
//     if (!officePinCode || officePinCode.length !== 6 || !/^\d{6}$/.test(officePinCode)) {
//       errorObj.officePinCode = "Valid 6-digit Pin Code Is Required";
//       isValid = false;
//     }
//     if (!officeCity) {
//       errorObj.officeCity = "City Is Required";
//       isValid = false;
//     }
//     if (!officeState) {
//       errorObj.officeState = "State Is Required";
//       isValid = false;
//     }

//     setErrors(errorObj);
//     return isValid;
//   };

//   const handleContinue = async () => {
//     if (!validateInputs()) return;

//     if (!applicationId) {
//       Alert.alert("Error", "No active application. Please start a new application.");
//       navigation.replace("LoanRequirements");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const requestBody = {
//         applicationId,
//         businessName: businessName.trim(),
//         businessType,
//         natureOfBusiness,
//         yearsInBusiness,
//         officePinCode,
//         officeCity,
//         officeState,
//       };

//       const response = await axios.post(`${API_LA_BASE}/updateGstDetails`, requestBody);

//       if (response.status === 200) {
//         // Decide next screen based on employment info
//         const employmentInfoResponse = await axios.get(`${API_LA_BASE}?applicationId=${applicationId}`);
//         if (employmentInfoResponse.status === 200) {
//           const employmentType = employmentInfoResponse.data?.employmentInformation;
//           if (employmentType === "SelfEmployedProfessional") {
//             navigation.navigate("RevenueIncomeDetailsProfessional");
//           } else {
//             // Default for SelfEmployedBusiness and others
//             navigation.navigate("RevenueIncomeDetails");
//           }
//         } else {
//           Alert.alert("Error", "Failed to fetch employment information");
//         }
//       } else {
//         Alert.alert("Error", response.data?.message || "Failed to update details");
//       }
//     } catch (error) {
//       console.error("❌ Error updating business details:", error?.response?.data || error.message);
//       Alert.alert("Error", error?.response?.data?.message || "Failed to update details");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (initLoading) {
//     return (
//       <SafeAreaView style={[styles.container, dynamicStyles]}>
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//           <ActivityIndicator />
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={[styles.container, dynamicStyles]}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             contentContainerStyle={styles.scrollContainer}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           >
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={styles.header}>Business Details</ThemedHeadingText>
//               <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
//             </View>

//             <ThemedTextInput
//               label="Business Name"
//               value={businessName}
//               onChangeText={setBusinessName}
//               error={errors.businessName}
//             />

//             <ThemedHeadingText style={{ fontWeight: "bold", marginBottom: 10 }}>
//               Company type
//             </ThemedHeadingText>
//             <View
//               style={{
//                 paddingVertical: 0,
//                 paddingHorizontal: 6,
//                 marginBottom: 20,
//                 borderWidth: 1,
//                 borderColor: "#ccc",
//                 borderRadius: 5,
//               }}
//             >
//               <ThemedRadioButtonList
//                 options={[
//                   { label: "Proprietorship/Individual", value: "Proprietorship/Individual" },
//                   { label: "Partnership Firm", value: "Partnership Firm" },
//                   { label: "Private Limited Company", value: "Private Limited Company" },
//                   { label: "Limited liability partnership (LLP)", value: "LLP" },
//                 ]}
//                 onValueChange={setBusinessType}
//                 selectedValue={businessType}
//                 value={businessType}
//                 defaultValue={businessType}
//                 error={errors.businessType}
//               />
//             </View>

//             <ThemedHeadingText style={{ fontWeight: "bold" }}>
//               Nature of business
//             </ThemedHeadingText>
//             <ThemedRadioButtonList
//               options={[
//                 { label: "Manufacturing", value: "Manufacturing" },
//                 { label: "Trader/Wholesaler", value: "Trader/Wholesaler" },
//               ]}
//               onValueChange={setNatureOfBusiness}
//               selectedValue={natureOfBusiness}
//               value={natureOfBusiness}
//               defaultValue={natureOfBusiness}
//               error={errors.natureOfBusiness}
//             />

//             <ThemedTextInput
//               label="Years in Business"
//               value={yearsInBusiness}
//               keyboardType="number-pad"
//               maxLength={4}
//               onChangeText={setYearsInBusiness}
//               error={errors.yearsInBusiness}
//             />

//             <ThemedTextInput
//               label="Pin Code"
//               keyboardType="number-pad"
//               maxLength={6}
//               value={officePinCode}
//               onChangeText={handlePinCodeChange}
//               error={errors.officePinCode}
//             />

//             <View style={{ flexDirection: "row", gap: 20 }}>
//               <ThemedTextInput
//                 label="City"
//                 value={officeCity}
//                 editable={false}
//                 error={errors.officeCity}
//               />
//               <ThemedTextInput
//                 label="State"
//                 value={officeState}
//                 editable={false}
//                 error={errors.officeState}
//               />
//             </View>
//           </ScrollView>
//         </TouchableWithoutFeedback>

//         <View style={appStyle.buttonContainer}>
//           <Pressable style={styles.button} onPress={handleContinue} disabled={isLoading}>
//             {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
//           </Pressable>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   button: {
//     backgroundColor: "#FF4800",
//     paddingVertical: 15,
//     borderRadius: 5,
//     width: "90%",
//     alignSelf: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });

// export default NoGSTBusinessDetail;



import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import { ThemedHeadingText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Appearance,
  Pressable,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { BASE_URL } from "@/components/util/api_url";
import { ThemedView } from "@/components/ThemedView";

const API_LA_BASE = `${BASE_URL}/api/loan-application`;
const API_BASE_URL = `${BASE_URL}/api`; // for /single-loan-application-mobileprefill
const PINCODE_API_URL = `${BASE_URL}/api/pincode/`;

const NoGSTBusinessDetail = ({ navigation }) => {
  const [applicationId, setApplicationId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [natureOfBusiness, setNatureOfBusiness] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [officePinCode, setPinCode] = useState("");
  const [officeCity, setCity] = useState("");
  const [officeState, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
  };

  const parseStoredPhone = (raw) => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") return parsed;
      if (parsed?.phoneNumber) return parsed.phoneNumber;
      return null;
    } catch {
      return raw;
    }
  };

  const fetchCityAndState = async (pin) => {
    try {
      const resp = await axios.get(`${PINCODE_API_URL}${pin}`);
      if (resp?.data) {
        setCity(resp.data.city || "");
        setState(resp.data.state || "");
      } else {
        setCity("");
        setState("");
        Alert.alert("Invalid Pin Code", "Please enter a valid Pin Code");
      }
    } catch (e) {
      setCity("");
      setState("");
      Alert.alert("Error", "Failed to fetch city and state");
    }
  };

  const handlePinCodeChange = async (value) => {
    setPinCode(value);
    if (value.length === 6 && /^\d{6}$/.test(value)) {
      await fetchCityAndState(value);
    } else {
      setCity("");
      setState("");
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

      const { data, status } = await axios.get(`${API_BASE_URL}/single-loan-application-mobileprefill/${phone}`);
      const applications = Array.isArray(data?.data) ? data.data : [];

      if (!applications.length) {
        await AsyncStorage.removeItem("appIdData");
        Alert.alert("Info", "No applications found. Please start a new one.");
        navigation.replace("LoanRequirements");
        return;
      }

      let selectedApp = applications.find(
        (app) => app.id?.toString() === appIdData || app.applicationId?.toString() === appIdData
      );

      if (!selectedApp || selectedApp.loanCompletion) {
        selectedApp = applications
          .filter((app) => app.loanCompletion === false)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
      }

      if (!selectedApp) {
        await AsyncStorage.removeItem("appIdData");
        Alert.alert("Info", "Your previous application is completed. Please start a new one.");
        navigation.replace("LoanRequirements");
        return;
      }

      setApplicationId(selectedApp.id || selectedApp.applicationId);
      await AsyncStorage.setItem("appIdData", JSON.stringify(selectedApp.id || selectedApp.applicationId));

      if (selectedApp.businessName) setBusinessName(selectedApp.businessName);
      if (selectedApp.businessType) setBusinessType(selectedApp.businessType);
      if (selectedApp.natureOfBusiness) setNatureOfBusiness(selectedApp.natureOfBusiness);
      if (selectedApp.yearsInBusiness != null) setYearsInBusiness(String(selectedApp.yearsInBusiness));

      if (selectedApp.officePinCode) {
        const pin = String(selectedApp.officePinCode).replace(/\D/g, "");
        setPinCode(pin);
        if (selectedApp.officeCity) setCity(selectedApp.officeCity);
        if (selectedApp.officeState) setState(selectedApp.officeState);
        if ((!selectedApp.officeCity || !selectedApp.officeState) && /^\d{6}$/.test(pin)) {
          await fetchCityAndState(pin);
        }
      } else {
        setCity(selectedApp.officeCity || "");
        setState(selectedApp.officeState || "");
      }

    } catch (error) {
      console.error("❌ Prefill error:", error?.response?.data || error.message);
      Alert.alert("Error", "Failed to fetch application. Please try again.");
    } finally {
      setInitLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    init();
  }, [init]);

  const validateInputs = () => {
    let isValid = true;
    let errorObj = {};

    if (!businessName?.trim()) {
      errorObj.businessName = "Business name is required";
      isValid = false;
    }
    if (!businessType) {
      errorObj.businessType = "Company type is required";
      isValid = false;
    }
    if (!natureOfBusiness) {
      errorObj.natureOfBusiness = "Nature of business is required";
      isValid = false;
    }
    if (!yearsInBusiness) {
      errorObj.yearsInBusiness = "Years in business is required";
      isValid = false;
    }
    if (!officePinCode || officePinCode.length !== 6 || !/^\d{6}$/.test(officePinCode)) {
      errorObj.officePinCode = "Valid 6-digit pin code is required";
      isValid = false;
    }
    if (!officeCity) {
      errorObj.officeCity = "City is required";
      isValid = false;
    }
    if (!officeState) {
      errorObj.officeState = "State is required";
      isValid = false;
    }

    setErrors(errorObj);
    return isValid;
  };

  const handleContinue = async () => {
    if (!validateInputs()) return;

    if (!applicationId) {
      Alert.alert("Error", "No active application. Please start a new application.");
      navigation.replace("LoanRequirements");
      return;
    }

    try {
      setIsLoading(true);

      const requestBody = {
        applicationId,
        businessName: businessName.trim(),
        businessType,
        natureOfBusiness,
        yearsInBusiness,
        officePinCode,
        officeCity,
        officeState,
      };

      const response = await axios.post(`${API_LA_BASE}/updateGstDetails`, requestBody);

      if (response.status === 200) {
        const employmentInfoResponse = await axios.get(`${API_LA_BASE}?applicationId=${applicationId}`);
        if (employmentInfoResponse.status === 200) {
          const employmentType = employmentInfoResponse.data?.employmentInformation;
          if (employmentType === "SelfEmployedProfessional") {
            navigation.navigate("RevenueIncomeDetailsProfessional");
          } else {
            navigation.navigate("RevenueIncomeDetails");
          }
        } else {
          Alert.alert("Error", "Failed to fetch employment information");
        }
      } else {
        Alert.alert("Error", response.data?.message || "Failed to update details");
      }
    } catch (error) {
      console.error("❌ Error updating business details:", error?.response?.data || error.message);
      Alert.alert("Error", error?.response?.data?.message || "Failed to update details");
    } finally {
      setIsLoading(false);
    }
  };

  if (initLoading) {
    return (
      <SafeAreaView style={[styles.container, dynamicStyles]}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, dynamicStyles]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={styles.header}>Business Details</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
            </View>

            <ThemedTextInput label="Business Name" value={businessName} onChangeText={setBusinessName} error={errors.businessName} />

            <ThemedHeadingText style={{ fontWeight: "bold", marginBottom: 10 }}>Company type</ThemedHeadingText>
            <View style={styles.radioBox}>
              <ThemedRadioButtonList
                options={[
                  { label: "Proprietorship/Individual", value: "Proprietorship/Individual" },
                  { label: "Partnership Firm", value: "Partnership Firm" },
                  { label: "Private Limited Company", value: "Private Limited Company" },
                  { label: "Limited liability partnership (LLP)", value: "LLP" },
                ]}
                selectedValue={businessType}
                onValueChange={setBusinessType}
                error={errors.businessType}
              />
            </View>

            <ThemedHeadingText style={{ fontWeight: "bold" }}>Nature of business</ThemedHeadingText>
            <ThemedRadioButtonList
              options={[
                { label: "Manufacturing", value: "Manufacturing" },
                { label: "Trader/Wholesaler", value: "Trader/Wholesaler" },
              ]}
              selectedValue={natureOfBusiness}
              onValueChange={setNatureOfBusiness}
              error={errors.natureOfBusiness}
            />

            <ThemedTextInput label="Years in Business" value={yearsInBusiness} keyboardType="number-pad" maxLength={4} onChangeText={setYearsInBusiness} error={errors.yearsInBusiness} />
            <ThemedTextInput label="Pin Code" value={officePinCode} keyboardType="number-pad" maxLength={6} onChangeText={handlePinCodeChange} error={errors.officePinCode} />

            <View style={{ flexDirection: "row", gap: 20 }}>
              <ThemedTextInput label="City" value={officeCity} editable={false} error={errors.officeCity} />
              <ThemedTextInput label="State" value={officeState} editable={false} error={errors.officeState} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>

        <View style={appStyle.buttonContainer}>
          <Pressable style={styles.button} onPress={handleContinue} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  header: { fontSize: 18, fontWeight: "bold" },
  radioBox: { paddingHorizontal: 6, marginBottom: 20, borderWidth: 1, borderColor: "#ccc", borderRadius: 5 },
  button: {
    backgroundColor: "#FF4800",
    paddingVertical: 15,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NoGSTBusinessDetail;
