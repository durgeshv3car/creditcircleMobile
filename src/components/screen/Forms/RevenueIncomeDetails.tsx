// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import RadioButtonGroup from "@/components/ThemedRadioButton";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
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
//     ActivityIndicator
// } from "react-native";

// import { BASE_URL } from "@/components/util/api_url";

// const API_BASE_URL = `${BASE_URL}/api/loan-application/updateRevenueIncome`;

// const RevenueIncomeDetails = ({ navigation }) => {
//     const [applicationId, setApplicationId] = useState("");
//     const [businessTurnover, setbusinessTurnover] = useState("");
//     const [businessIncome, setbusinessIncome] = useState("");
//     const [hasCreditCard, sethasCreditCard] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [keyboardVisible, setKeyboardVisible] = useState(false);

//     useEffect(() => {
//         getApplicationId();

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

//     const getApplicationId = async () => {
//         try {
//             const jsonValue = await AsyncStorage.getItem("appIdData");
//             const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//             setApplicationId(parsedValue);
//         } catch (error) {
//             console.error("❌ Error getting applicationId:", error);
//         }
//     };

//     const formatIndianCurrency = (value) => {
//         const x = value.replace(/,/g, "").replace(/\D/g, "");
//         if (!x) return "";
//         const lastThree = x.slice(-3);
//         const otherNumbers = x.slice(0, -3);
//         if (otherNumbers !== "") {
//             return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
//         } else {
//             return lastThree;
//         }
//     };

//     const validateInputs = () => {
//         let isValid = true;
//         let errorObj = {};

//         if (!businessTurnover.trim()) {
//             errorObj.businessTurnover = "Gross annual turnover Is Required";
//             isValid = false;
//         }
//         if (!businessIncome.trim()) {
//             errorObj.businessIncome = "Gross annual income Is Required";
//             isValid = false;
//         }
//         if (!hasCreditCard) {
//             errorObj.hasCreditCard = "Please select if you own a credit card";
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
//                 businessTurnover: businessTurnover.replace(/,/g, ""),
//                 businessIncome: businessIncome.replace(/,/g, ""),
//                 hasCreditCard: hasCreditCard === "1" ? true : false
//             };

//             console.log("📤 Sending Data:", requestBody);

//             const response = await axios.post(API_BASE_URL, requestBody);

//             if (response.status === 200) {
//                 navigation.navigate("BankAccount");
//             }
//         } catch (error) {
//             console.error("❌ Error updating revenue income details:", error);
//             Alert.alert("Error", error.response?.data?.message || "Failed to update details");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const theme = Appearance.getColorScheme();

//     const dynamicStyles = {
//         backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     };

//     return (
//         <SafeAreaView style={[styles.container, dynamicStyles]}>
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <KeyboardAvoidingView style={{ flex: 1 }}>
//                     <ScrollView contentContainerStyle={styles.scrollContainer}>
//                         <View style={appStyle.HeadingTitle}>
//                             <ThemedHeadingText style={[styles.header]}>
//                                 Revenue & Income Details
//                             </ThemedHeadingText>
//                             <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }}></ThemedView>
//                         </View>

//                         {/* Gross Annual Turnover */}
//                         <ThemedTextInput
//                             label="Gross Annual Turnover"
//                             value={businessTurnover}
//                             placeHolder="Enter Gross Annual Turnover"
//                             keyboardType="numeric"
//                             onChangeText={(value) => setbusinessTurnover(formatIndianCurrency(value))}
//                             error={errors.businessTurnover}
//                         />

//                         {/* Gross Annual Income */}
//                         <ThemedTextInput
//                             label="Gross Annual Income"
//                             value={businessIncome}
//                             placeHolder="Enter Gross Annual Income"
//                             keyboardType="numeric"
//                             onChangeText={(value) => setbusinessIncome(formatIndianCurrency(value))}
//                             error={errors.businessIncome}
//                         />

//                         {/* Credit Card Ownership */}
//                         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
//                             <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
//                                 Do You Own A Credit Card?
//                             </ThemedHeadingText>
//                             <RadioButtonGroup
//                                 size="auto"
//                                 options={[
//                                     { label: "Yes", value: "1" },
//                                     { label: "No", value: "2" },
//                                 ]}
//                                 onValueChange={sethasCreditCard}
//                                 direction="row"
//                                 defaultValue={hasCreditCard}
//                             />
//                         </View>
//                     </ScrollView>

//                     {/* Submit Button */}
//                     <View style={appStyle.buttonContainer}>
//                         <Pressable style={styles.button} onPress={handleContinue} disabled={isLoading}>
//                             {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
//                         </Pressable>
//                     </View>
//                 </KeyboardAvoidingView>
//             </TouchableWithoutFeedback>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     scrollContainer: {
//         paddingHorizontal: 20,
//         paddingBottom: 50,
//     },
//     header: {
//         fontSize: 18,
//         fontWeight: "bold"
//     },
//     buttonContainer: {
//         position: "absolute",
//         left: 0,
//         right: 0,
//         bottom: 0,
//         alignItems: "center",
//     },
//     button: {
//         backgroundColor: "#FF4800",
//         paddingVertical: 15,
//         paddingHorizontal: 40,
//         borderRadius: 5,
//         width: "90%"
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//         textAlign: 'center'
//     },
// });

// export default RevenueIncomeDetails;



// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import RadioButtonGroup from "@/components/ThemedRadioButton";
// import { ThemedHeadingText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
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

// const API_UPDATE_URL = `${BASE_URL}/api/loan-application/updateRevenueIncome`;
// const API_BASE_URL = `${BASE_URL}/api`; // for /single-loan-application-mobile/:phone

// const RevenueIncomeDetails = ({ navigation }) => {
//   const [applicationId, setApplicationId] = useState("");
//   const [businessTurnover, setBusinessTurnover] = useState("");
//   const [businessIncome, setBusinessIncome] = useState("");
//   const [hasCreditCard, setHasCreditCard] = useState(""); // "1" | "2"
//   const [errors, setErrors] = useState({});
//   const [initLoading, setInitLoading] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [keyboardVisible, setKeyboardVisible] = useState(false);

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

//   const formatIndianCurrency = (value) => {
//     const x = value.replace(/,/g, "").replace(/\D/g, "");
//     if (!x) return "";
//     const lastThree = x.slice(-3);
//     const otherNumbers = x.slice(0, -3);
//     if (otherNumbers !== "") {
//       return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
//     } else {
//       return lastThree;
//     }
//   };

//   const parseStoredPhone = (raw) => {
//     if (!raw) return null;
//     try {
//       const parsed = JSON.parse(raw);
//       if (typeof parsed === "string") return parsed;
//       if (parsed?.phoneNumber) return parsed.phoneNumber;
//       return null;
//     } catch {
//       // stored as plain string
//       return raw;
//     }
//   };

//   const init = useCallback(async () => {
//     try {
//       // 1) Get phone number
//       const userRaw = await AsyncStorage.getItem("userData");
//       const ph = parseStoredPhone(userRaw);
//       if (!ph) {
//         Alert.alert("Error", "Phone number not found. Please verify OTP first.");
//         navigation.navigate("LoginScreen");
//         return;
//       }

//       // 2) Fetch application by phone to decide draft/new and prefill
//       try {
//         const { data, status } = await axios.get(
//           `${API_BASE_URL}/single-loan-application-mobile/${ph}`
//         );

//         if (status === 200 && data?.data) {
//           const app = data.data;

//           if (app.loanCompletion === false) {
//             // app id source of truth
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

//             // Prefill revenue/income + credit card
//             if (app.businessTurnover != null) {
//               const t = String(app.businessTurnover).replace(/\D/g, "");
//               setBusinessTurnover(formatIndianCurrency(t));
//             }
//             if (app.businessIncome != null) {
//               const i = String(app.businessIncome).replace(/\D/g, "");
//               setBusinessIncome(formatIndianCurrency(i));
//             }
//             if (typeof app.hasCreditCard === "boolean") {
//               setHasCreditCard(app.hasCreditCard ? "1" : "2");
//             } else if (typeof app.hasCreditCard === "string") {
//               const norm =
//                 app.hasCreditCard.toLowerCase() === "yes" ||
//                 app.hasCreditCard.toLowerCase() === "true"
//                   ? "1"
//                   : "2";
//               setHasCreditCard(norm);
//             }

//             setInitLoading(false);
//             return;
//           }

//           // Completed -> start new application
//           await AsyncStorage.removeItem("appIdData");
//           setApplicationId("");
//           Alert.alert("Info", "Your previous application is completed. Please start a new one.");
//           navigation.replace("LoanRequirements");
//           return;
//         }
//       } catch (err) {
//         // 404 -> no active application
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

//     if (!businessTurnover.trim()) {
//       errorObj.businessTurnover = "Gross annual turnover Is Required";
//       isValid = false;
//     }
//     if (!businessIncome.trim()) {
//       errorObj.businessIncome = "Gross annual income Is Required";
//       isValid = false;
//     }
//     if (!hasCreditCard) {
//       errorObj.hasCreditCard = "Please select if you own a credit card";
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
//         businessTurnover: businessTurnover.replace(/,/g, ""),
//         businessIncome: businessIncome.replace(/,/g, ""),
//         hasCreditCard: hasCreditCard === "1", // boolean expected by backend
//       };

//       const response = await axios.post(API_UPDATE_URL, requestBody);

//       if (response.status === 200) {
//         navigation.navigate("BankAccount");
//       } else {
//         Alert.alert("Error", response.data?.message || "Failed to update details");
//       }
//     } catch (error) {
//       console.error("❌ Error updating revenue income details:", error?.response?.data || error.message);
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
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === "ios" ? "padding" : undefined}
//         >
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={[styles.header]}>
//                 Revenue & Income Details
//               </ThemedHeadingText>
//               <ThemedView
//                 style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}
//               />
//             </View>

//             {/* Gross Annual Turnover */}
//             <ThemedTextInput
//               label="Gross Annual Turnover"
//               value={businessTurnover}
//               placeHolder="Enter Gross Annual Turnover"
//               keyboardType="numeric"
//               onChangeText={(value) => setBusinessTurnover(formatIndianCurrency(value))}
//               error={errors.businessTurnover}
//             />

//             {/* Gross Annual Income */}
//             <ThemedTextInput
//               label="Gross Annual Income"
//               value={businessIncome}
//               placeHolder="Enter Gross Annual Income"
//               keyboardType="numeric"
//               onChangeText={(value) => setBusinessIncome(formatIndianCurrency(value))}
//               error={errors.businessIncome}
//             />

//             {/* Credit Card Ownership */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginTop: 10,
//               }}
//             >
//               <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
//                 Do You Own A Credit Card?
//               </ThemedHeadingText>
//               <RadioButtonGroup
//                 size="auto"
//                 options={[
//                   { label: "Yes", value: "1" },
//                   { label: "No", value: "2" },
//                 ]}
//                 onValueChange={setHasCreditCard}
//                 direction="row"
//                 defaultValue={hasCreditCard} // preselect
//                 value={hasCreditCard}        // controlled mode if supported
//                 disabled={isLoading}
//               />
//             </View>
//           </ScrollView>

//           {/* Submit Button */}
//           <View style={appStyle.buttonContainer}>
//             <Pressable style={styles.button} onPress={handleContinue} disabled={isLoading}>
//               {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 50,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttonContainer: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#FF4800",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 5,
//     width: "90%",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });

// export default RevenueIncomeDetails;


// import React, { useState, useEffect, useCallback } from "react";
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
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// import appStyle from "@/AppStyles";
// import { BASE_URL } from "@/components/util/api_url";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import RadioButtonGroup from "@/components/ThemedRadioButton";
// import { ThemedHeadingText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// const API_UPDATE_URL = `${BASE_URL}/api/loan-application/updateRevenueIncome`;
// const API_BASE_URL = `${BASE_URL}/api`;

// const RevenueIncomeDetails = ({ navigation }) => {
//   const [applicationId, setApplicationId] = useState("");
//   const [businessTurnover, setBusinessTurnover] = useState("");
//   const [businessIncome, setBusinessIncome] = useState("");
//   const [hasCreditCard, setHasCreditCard] = useState("");
//   const [errors, setErrors] = useState({});
//   const [initLoading, setInitLoading] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   const formatIndianCurrency = (value) => {
//     const x = value.replace(/,/g, "").replace(/\D/g, "");
//     if (!x) return "";
//     const lastThree = x.slice(-3);
//     const otherNumbers = x.slice(0, -3);
//     return otherNumbers !== ""
//       ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
//       : lastThree;
//   };

//   const parseStoredPhone = (raw) => {
//     if (!raw) return null;
//     try {
//       const parsed = JSON.parse(raw);
//       if (typeof parsed === "string") return parsed;
//       if (parsed?.phoneNumber) return parsed.phoneNumber;
//       return null;
//     } catch {
//       return raw;
//     }
//   };

//   const init = useCallback(async () => {
//     try {
//       const rawUser = await AsyncStorage.getItem("userData");
//       const phone = parseStoredPhone(rawUser);

//       if (!phone) {
//         Alert.alert("Error", "Phone number not found. Please login again.");
//         navigation.replace("LoginScreen");
//         return;
//       }

//       const { data } = await axios.get(`${API_BASE_URL}/single-loan-application-mobile/${phone}`);
//       const app = data?.data;

//       if (app && app.loanCompletion === false) {
//         const appId = app.id || app.applicationId;
//         if (!appId) throw new Error("Missing application ID");

//         setApplicationId(appId);
//         await AsyncStorage.setItem("appIdData", JSON.stringify(appId));

//         if (app.businessTurnover)
//           setBusinessTurnover(formatIndianCurrency(String(app.businessTurnover)));
//         if (app.businessIncome)
//           setBusinessIncome(formatIndianCurrency(String(app.businessIncome)));
//         if (typeof app.hasCreditCard === "boolean") {
//           setHasCreditCard(app.hasCreditCard ? "1" : "2");
//         } else if (typeof app.hasCreditCard === "string") {
//           const val = app.hasCreditCard.toLowerCase();
//           setHasCreditCard(val === "yes" || val === "true" ? "1" : "2");
//         }
//       } else {
//         // app is completed
//         await AsyncStorage.removeItem("appIdData");
//         setApplicationId("");
//         Alert.alert("Info", "Your previous application is completed. Please start a new one.");
//         navigation.replace("LoanRequirements");
//         return;
//       }
//     } catch (err) {
//       if (err?.response?.status === 404) {
//         await AsyncStorage.removeItem("appIdData");
//         setApplicationId("");
//         Alert.alert("Info", "No active application found. Please start a new one.");
//         navigation.replace("LoanRequirements");
//       } else {
//         console.error("❌ Prefill error:", err?.response?.data || err.message);
//         Alert.alert("Error", "Unable to fetch application. Please try again.");
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
//     let errObj = {};

//     if (!businessTurnover.trim()) {
//       errObj.businessTurnover = "Turnover is required";
//       isValid = false;
//     }
//     if (!businessIncome.trim()) {
//       errObj.businessIncome = "Income is required";
//       isValid = false;
//     }
//     if (!hasCreditCard) {
//       errObj.hasCreditCard = "Please select credit card ownership";
//       isValid = false;
//     }

//     setErrors(errObj);
//     return isValid;
//   };

//   const handleContinue = async () => {
//     if (!validateInputs()) return;

//     if (!applicationId) {
//       Alert.alert("Error", "Missing application. Please start again.");
//       navigation.replace("LoanRequirements");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const body = {
//         applicationId,
//         businessTurnover: businessTurnover.replace(/,/g, ""),
//         businessIncome: businessIncome.replace(/,/g, ""),
//         hasCreditCard: hasCreditCard === "1",
//       };

//       const res = await axios.post(API_UPDATE_URL, body);
//       if (res.status === 200) {
//         navigation.navigate("BankAccount");
//       } else {
//         Alert.alert("Error", res.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("❌ Update error:", err?.response?.data || err.message);
//       Alert.alert("Error", err?.response?.data?.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (initLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.centered}>
//           <ActivityIndicator />
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === "ios" ? "padding" : undefined}
//         >
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={styles.header}>Revenue & Income Details</ThemedHeadingText>
//               <ThemedView style={styles.underline} />
//             </View>

//             <ThemedTextInput
//               label="Gross Annual Turnover"
//               value={businessTurnover}
//               placeHolder="Enter Turnover"
//               keyboardType="numeric"
//               onChangeText={(v) => setBusinessTurnover(formatIndianCurrency(v))}
//               error={errors.businessTurnover}
//             />

//             <ThemedTextInput
//               label="Gross Annual Income"
//               value={businessIncome}
//               placeHolder="Enter Income"
//               keyboardType="numeric"
//               onChangeText={(v) => setBusinessIncome(formatIndianCurrency(v))}
//               error={errors.businessIncome}
//             />

//             <View style={styles.radioRow}>
//               <ThemedHeadingText style={styles.radioLabel}>Do you own a credit card?</ThemedHeadingText>
//               <RadioButtonGroup
//                 options={[
//                   { label: "Yes", value: "1" },
//                   { label: "No", value: "2" },
//                 ]}
//                 onValueChange={setHasCreditCard}
//                 value={hasCreditCard}
//                 direction="row"
//                 disabled={isLoading}
//               />
//             </View>
//           </ScrollView>

//           <View style={appStyle.buttonContainer}>
//             <Pressable style={styles.button} onPress={handleContinue} disabled={isLoading}>
//               {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
//   header: { fontSize: 18, fontWeight: "bold" },
//   underline: { width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 },
//   radioRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
//   radioLabel: { fontSize: 12, fontWeight: "bold" },
//   button: {
//     backgroundColor: "#FF4800",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 5,
//     width: "90%",
//     alignSelf: "center",
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 16,
//   },
// });

// export default RevenueIncomeDetails;



import React, { useState, useEffect, useCallback } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import appStyle from "@/AppStyles";
import { BASE_URL } from "@/components/util/api_url";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import { ThemedHeadingText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

/* --------- API endpoints --------- */
const API_BASE_URL = `${BASE_URL}/api`;
const API_UPDATE_URL = `${BASE_URL}/api/loan-application/updateRevenueIncome`;
const API_CREATE_URL = `${BASE_URL}/api/loan-application/loan-requirements`; // POST { phoneNumber, loanType }

/* --------- helpers --------- */
const parseStoredPhone = (raw: any) => {
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
const parseBackendBool = (v: any): boolean => {
  if (v === true || v === 1) return true;
  if (v === false || v === 0) return false;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["true","1","yes","y","completed","complete","done","finished"].includes(s)) return true;
    if (["false","0","no","n","incomplete","pending","ongoing","progress","in-progress"].includes(s)) return false;
  }
  return false;
};
const extractAppId = (obj: any) =>
  obj?.id ?? obj?.applicationId ?? obj?.appId ?? obj?.data?.id ?? obj?.data?.applicationId ?? null;

const sameId = (a: any, b: any) => String(a ?? "").trim() === String(b ?? "").trim();

const pickBestIncomplete = (apps: any[]) => {
  const rows = apps.map((a) => ({
    raw: a,
    completed: parseBackendBool(a?.loanCompletion ?? a?.loanDataStatus),
    createdAt: a?.createdAt ? new Date(a.createdAt).getTime() : 0,
    updatedAt: a?.updatedAt ? new Date(a.updatedAt).getTime() : 0,
  }));
  const incomplete = rows
    .filter((r) => !r.completed)
    .sort((a, b) => (b.updatedAt - a.updatedAt) || (b.createdAt - a.createdAt));
  return incomplete[0]?.raw ?? null;
};

const formatIndianCurrency = (value: string) => {
  const x = value.replace(/,/g, "").replace(/\D/g, "");
  if (!x) return "";
  const lastThree = x.slice(-3);
  const otherNumbers = x.slice(0, -3);
  return otherNumbers !== ""
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;
};

/* Normalize API shapes: GET /single-loan-application-mobileprefill/:phone */
const prefillByPhone = async (phone: string) => {
  const clean = String(phone ?? "").trim();
  if (!clean) throw new Error("Phone missing for prefill.");
  const url = `${API_BASE_URL}/single-loan-application-mobileprefill/${encodeURIComponent(clean)}`;
  const res = await axios.get(url, { timeout: 15000, headers: { Accept: "application/json" } });
  if (res.status !== 200) throw new Error(`Prefill HTTP ${res.status}`);
  const body = res?.data;
  const payload = (Array.isArray(body?.data) || typeof body?.data === "object") ? body.data : body;
  const list = Array.isArray(payload) ? payload : (payload ? [payload] : []);
  return list;
};

const createNewApplication = async (phone: string) => {
  const loanType = (await AsyncStorage.getItem("loanType")) ?? "PersonalLoan";
  await axios.post(
    API_CREATE_URL,
    { phoneNumber: phone, loanType },
    { headers: { "Content-Type": "application/json" } }
  );
};

/* --------- component --------- */
const RevenueIncomeDetails = ({ navigation }) => {
  const [applicationId, setApplicationId] = useState("");
  const [businessTurnover, setBusinessTurnover] = useState("");
  const [businessIncome, setBusinessIncome] = useState("");
  const [hasCreditCard, setHasCreditCard] = useState(""); // "1" yes | "2" no

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const theme = Appearance.getColorScheme();
  const dynamicStyles = { backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" };

  const prefillRevenueFields = (app: any) => {
    if (app?.businessTurnover != null) {
      const t = String(app.businessTurnover).replace(/\D/g, "");
      setBusinessTurnover(formatIndianCurrency(t));
    }
    if (app?.businessIncome != null) {
      const i = String(app.businessIncome).replace(/\D/g, "");
      setBusinessIncome(formatIndianCurrency(i));
    }
    if (typeof app?.hasCreditCard === "boolean") {
      setHasCreditCard(app.hasCreditCard ? "1" : "2");
    } else if (typeof app?.hasCreditCard === "string") {
      const s = app.hasCreditCard.toLowerCase();
      setHasCreditCard(s === "yes" || s === "true" ? "1" : "2");
    }
  };

  const init = useCallback(async () => {
    setInitLoading(true);
    try {
      // Phone
      const rawUser = await AsyncStorage.getItem("userData");
      const phone = parseStoredPhone(rawUser);
      if (!phone) {
        Alert.alert("Error", "Phone number not found. Please login again.");
        navigation.replace("LoginScreen");
        return;
      }

      // Try to use stored appId if it points to an incomplete app; else pick best incomplete; else create new
      const storedIdRaw = await AsyncStorage.getItem("appIdData");
      const storedId = storedIdRaw ? JSON.parse(storedIdRaw) : null;

      // 1) Fetch all apps for phone
      let apps = await prefillByPhone(phone);

      // 2) If storedId exists, try to match it
      let selected =
        storedId &&
        apps.find((a: any) => sameId(extractAppId(a) ?? a?.id ?? a?.applicationId, storedId));

      // 3) If matched app is completed, ignore it
      if (selected && parseBackendBool(selected?.loanCompletion ?? selected?.loanDataStatus)) {
        selected = null;
      }

      // 4) If no selected yet, pick the most recent incomplete
      if (!selected) {
        selected = pickBestIncomplete(apps);
      }

      // 5) If still nothing → create new app and refetch, then pick most recent incomplete
      if (!selected) {
        await createNewApplication(phone);
        apps = await prefillByPhone(phone);
        selected = pickBestIncomplete(apps);
        if (!selected) {
          throw new Error("Application created but no incomplete application returned.");
        }
      }

      // 6) Use selected app
      const id = extractAppId(selected) ?? selected?.id ?? selected?.applicationId;
      if (!id) throw new Error("No application ID available.");
      setApplicationId(String(id));
      await AsyncStorage.setItem("appIdData", JSON.stringify(id));

      // Prefill revenue fields
      prefillRevenueFields(selected);
    } catch (err: any) {
      console.error("❌ init error:", err?.response?.data || err?.message);
      Alert.alert("Error", err?.message || "Unable to load revenue details.");
      // As a last resort, route to start flow
      navigation.replace("LoanRequirements");
    } finally {
      setInitLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    init();
  }, [init]);

  /* --------- validate + submit --------- */
  const validateInputs = () => {
    const err: Record<string, string> = {};
    if (!businessTurnover.trim()) err.businessTurnover = "Gross annual turnover is required";
    if (!businessIncome.trim()) err.businessIncome = "Gross annual income is required";
    if (!hasCreditCard) err.hasCreditCard = "Please select if you own a credit card";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleContinue = async () => {
    if (!validateInputs()) return;

    if (!applicationId) {
      Alert.alert("Error", "No active application. Please start again.");
      navigation.replace("LoanRequirements");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        applicationId,
        businessTurnover: businessTurnover.replace(/,/g, ""),
        businessIncome: businessIncome.replace(/,/g, ""),
        hasCreditCard: hasCreditCard === "1",
      };
      const res = await axios.post(API_UPDATE_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        navigation.navigate("BankAccount");
      } else {
        Alert.alert("Error", res?.data?.message || "Failed to update details");
      }
    } catch (e: any) {
      console.error("❌ Update error:", e?.response?.data || e?.message);
      Alert.alert("Error", e?.response?.data?.message || "Failed to update details");
    } finally {
      setIsLoading(false);
    }
  };

  /* --------- UI --------- */
  if (initLoading) {
    return (
      <SafeAreaView style={[styles.container, dynamicStyles]}>
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, dynamicStyles]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={styles.header}>Revenue & Income Details</ThemedHeadingText>
              <ThemedView style={styles.underline} />
            </View>

            <ThemedTextInput
              label="Gross Annual Turnover"
              value={businessTurnover}
              placeHolder="Enter Gross Annual Turnover"
              keyboardType="numeric"
              onChangeText={(v) => setBusinessTurnover(formatIndianCurrency(v))}
              error={errors.businessTurnover}
            />

            <ThemedTextInput
              label="Gross Annual Income"
              value={businessIncome}
              placeHolder="Enter Gross Annual Income"
              keyboardType="numeric"
              onChangeText={(v) => setBusinessIncome(formatIndianCurrency(v))}
              error={errors.businessIncome}
            />

            <View style={styles.radioRow}>
              <ThemedHeadingText style={styles.radioLabel}>
                Do You Own A Credit Card?
              </ThemedHeadingText>
              <RadioButtonGroup
                size="auto"
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "2" },
                ]}
                onValueChange={setHasCreditCard}
                direction="row"
                defaultValue={hasCreditCard}
                value={hasCreditCard}
                disabled={isLoading}
              />
            </View>
          </ScrollView>

          <View style={appStyle.buttonContainer}>
            <Pressable style={styles.button} onPress={handleContinue} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

/* --------- styles --------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
  header: { fontSize: 18, fontWeight: "bold" },
  underline: { width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  radioLabel: { fontSize: 12, fontWeight: "bold" },
  button: {
    backgroundColor: "#FF4800",
    paddingVertical: 15,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default RevenueIncomeDetails;
