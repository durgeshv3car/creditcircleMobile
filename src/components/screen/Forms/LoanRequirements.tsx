// import { ThemedTextInput } from "@/components/ThemedInput";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import React, { useState, useEffect } from "react";
// import { Slider } from "@miblanchard/react-native-slider";
// import axios from "axios";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Appearance,
//   Pressable,
//   Alert,
//   Image,
//   Dimensions,
//   StyleSheet,
// } from "react-native";
// import appStyle from "@/AppStyles";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_URL } from "@/components/util/api_url";

// const API_BASE_URL = `${BASE_URL}/api`;



// const formatIndianCurrency = (value) => {
//   const x = value.replace(/,/g, "");
//   if (!x) return "";
//   const lastThree = x.slice(-3);
//   const otherNumbers = x.slice(0, -3);
//   if (otherNumbers !== "") {
//     return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
//   } else {
//     return lastThree;
//   }
// }

// const LoanRequirements = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loanAmount, setLoanAmount] = useState("");
//   const [loanTenure, setLoanTenure] = useState(12);
//   const [isLoading, setIsLoading] = useState(false);


//   const [loanType, setloantype] = useState("");
//   const [NoloanAmount, setNoLoanAmount] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (text) => {
//     const rawValue = text.replace(/[^0-9]/g, "");
//     setNoLoanAmount(rawValue)
//     // console.log("Not Coma", rawValue)    
//     setLoanAmount(formatIndianCurrency(rawValue));
//   };

//   const screenWidth = Dimensions.get("window").width;
//   const theme = Appearance.getColorScheme();

//   const dynamicStyles = {
//     backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//   };
  
//   // ✅ Fetch Phone Number
//   useEffect(() => {

//     const fetchPhoneNumber = async () => {
//       const loanTypess= await AsyncStorage.getItem('loanType');
//       setloantype(loanTypess)

//       try {
//         // const response = await axios.get(`${API_BASE_URL}/otp/get-phone-number`);
//          const jsonValue = await AsyncStorage.getItem('userData');
//         const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//         if (parsedValue) {
//           setPhoneNumber(parsedValue);
//         } else {
//           Alert.alert("Error", "Phone number not found. Please verify OTP first.");
//           navigation.navigate("LoginScreen");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching phone number:", error);
//         Alert.alert("Error", "Failed to retrieve phone number.");
//       }
//     };

//     fetchPhoneNumber();

//   }, []);



//   // ✅ Validate Inputs Before Submission
//   const validateInputs = () => {
//     let valid = true;
//     let errorObj = {};
  
//     if (!phoneNumber) {
//       errorObj.phoneNumber = "Phone Number Is Required.";
//       valid = false;
//     }
  
//     if (!NoloanAmount || isNaN(NoloanAmount) || NoloanAmount <= 0) {
//       errorObj.loanAmount = "Please Enter A Valid Loan Amount.";
//       valid = false;
//     } else if (parseInt(NoloanAmount) < 5000) {
//       errorObj.loanAmount = "Loan Amount Must Be At Least ₹5,000.";
//       valid = false;
//     }
  
//     if (!loanTenure || isNaN(loanTenure) || loanTenure < 1 || loanTenure > 60) {
//       errorObj.loanTenure = "Loan Tenure Must Be Between 1 And 60 Months.";
//       valid = false;
//     }
  
//     setErrors(errorObj);
//     return valid;
//   };

//   // ✅ Handle Loan Submission
//   const handleSubmit = async () => {
//     if (!validateInputs()) return;

//     setIsLoading(true);

//     try {
//       const requestData = {
//         phoneNumber,
//         desiredLoanAmount: parseFloat(NoloanAmount),
//         loanTenure: parseInt(loanTenure, 10),
//         loanType,
//       };

//       console.log("🚀 Sending Loan Requirements:", requestData);



//       const response = await axios.post(`${API_BASE_URL}/loan-application/loan-requirements`, requestData);
       
//       const appId = response.data.applicationId

      

//       try {
//         const jsonValue = JSON.stringify(appId);
//         await AsyncStorage.setItem('appIdData', jsonValue);
//         console.log('User data saved successfully.');
//       } catch (error) {
//         console.error('Error saving user data:', error);
//       }
      

      

//       if (response.status === 200) {
//         navigation.navigate("EmploymentInformation");
//       } else {
//         Alert.alert("Error", response.data.message || "Failed to submit loan requirements.");
//       }
//     } catch (error) {
//       console.error("❌ Error submitting loan requirements:", error.response ? error.response.data : error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };



//   const imagecoleor = {
//     tintColor: theme === 'dark' ? "#ffffff" : ""
//   };


//   return (
//     <SafeAreaView style={[styles.container, dynamicStyles]}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView style={{ flex: 1 }}>
//           <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={[styles.header]}>Loan Requirements</ThemedHeadingText>
//               <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
//               <ThemedText style={styles.subHeader}>Your Loan Preferences</ThemedText>
//             </View>

//             <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Desired Loan Amount</ThemedHeadingText>
//             <ThemedTextInput
//               style={[ { width: screenWidth - 40 , borderWidth: 1, borderRadius: 6, paddingLeft: 10, marginTop: 10, textAlign: 'center', height: 60 }]}
//               placeholder="Enter the loan amount you wish to borrow."
//               keyboardType="decimal-pad"
//               value={loanAmount}
//               onChangeText={handleInputChange}
//               error={errors.loanAmount}
//             />

//             <View style={styles.containerMain}>
//               <View style={styles.sliderValue}>
//                 <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold", flex: 1 }}>Loan Tenure (Months)</ThemedHeadingText>
//                 <ThemedTextInput
//                   style={[styles.input,]}
//                   value={String(loanTenure)}
//                   keyboardType="numeric"
//                   maxLength={2}
//                   onChangeText={(text) => setLoanTenure(parseInt(text, 10) || 0)}
//                 />
//               </View>
//               <Slider value={loanTenure} minimumTrackTintColor="#273283" onValueChange={setLoanTenure} minimumValue={1} maximumValue={60} step={1} />
//               <Image
//                 source={require("../../../assets/images/sliderImage.png")}
//                 style={[imagecoleor, {
//                   width: screenWidth - 40,
//                   height: screenWidth * 0.1,
//                 }]}
//                 resizeMode="contain" // Adjust this to "cover" or "stretch" if needed
//               />
//             </View>
//           </ScrollView>

//           <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
//             <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
//               <Text style={styles.buttonText}>{isLoading ? "Submitting..." : "Continue"}</Text>
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: { flex: 1 },
// //   scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
// //   header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
// //   subHeader: { fontSize: 12 },
// //   input: { borderWidth: 1, borderRadius: 6, paddingLeft: 10, marginTop: 10, textAlign: "center", height: 50 },
// //   buttonContainer: { position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center" },
// //   button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
// //   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
// // });


// const styles = StyleSheet.create({


//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 120,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   subHeader: {
//     fontSize: 12,
//   },

//   containerMain: {
//     marginTop: 6
//   },

//   sliderValue: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 5,
//     fontSize: 16,
//     width: 100,
//     textAlign: 'center',
//     fontWeight: "bold",
//     right: 0,
//     position: 'absolute',
//     marginTop: 20,
//     paddingVertical: 0,
//     height: 30,
//     borderColor: "#D5D5D5",
    
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
//     width: "90%"
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: 'center'
//   },


// });




// export default LoanRequirements;


// import { ThemedTextInput } from "@/components/ThemedInput";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import React, { useState, useEffect } from "react";
// import { Slider } from "@miblanchard/react-native-slider";
// import axios from "axios";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Appearance,
//   Pressable,
//   Alert,
//   Image,
//   Dimensions,
//   StyleSheet,
// } from "react-native";
// import appStyle from "@/AppStyles";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_URL } from "@/components/util/api_url";

// const API_BASE_URL = `${BASE_URL}/api`;

// /** Format a numeric string into Indian numbering with commas */
// const formatIndianCurrency = (value) => {
//   const x = (value || "").replace(/,/g, "");
//   if (!x) return "";
//   const lastThree = x.slice(-3);
//   const otherNumbers = x.slice(0, -3);
//   if (otherNumbers !== "") {
//     return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
//   } else {
//     return lastThree;
//   }
// };

// /** Extract phone from whatever you saved in AsyncStorage('userData') */
// const parsePhoneFromStorage = (raw) => {
//   if (!raw) return "";
//   if (typeof raw === "string") return raw;
//   if (typeof raw === "object") {
//     return raw.phoneNumber || raw.mobile || raw.phone || "";
//   }
//   return "";
// };

// const LoanRequirements = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loanAmount, setLoanAmount] = useState("");
//   const [NoloanAmount, setNoLoanAmount] = useState("");
//   const [loanTenure, setLoanTenure] = useState(12);
//   const [loanType, setloantype] = useState("");

//   const [isLoading, setIsLoading] = useState(false);
//   const [prefilling, setPrefilling] = useState(true);
//   const [errors, setErrors] = useState({});

//   // track existing app to decide update vs create
//   const [existingAppId, setExistingAppId] = useState(null);
//   const [existingIsCompleted, setExistingIsCompleted] = useState(false);

//   const screenWidth = Dimensions.get("window").width;
//   const theme = Appearance.getColorScheme();

//   const dynamicStyles = {
//     backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//   };
//   const imagecoleor = { tintColor: theme === "dark" ? "#ffffff" : "" };

//   const handleInputChange = (text) => {
//     const rawValue = (text || "").replace(/[^0-9]/g, "");
//     setNoLoanAmount(rawValue);
//     setLoanAmount(formatIndianCurrency(rawValue));
//   };

//   /** Bootstrap: load phone + loanType from storage */
//   useEffect(() => {
//     const bootstrap = async () => {
//       try {
//         const loanTypess = await AsyncStorage.getItem("loanType");
//         if (loanTypess) setloantype(loanTypess);

//         const jsonValue = await AsyncStorage.getItem("userData");
//         const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//         const phone = parsePhoneFromStorage(parsedValue);

//         if (!phone) {
//           Alert.alert("Error", "Phone number not found. Please verify OTP first.");
//           navigation.navigate("LoginScreen");
//           return;
//         }
//         setPhoneNumber(phone);
//       } catch (e) {
//         console.error("❌ Error bootstrapping:", e);
//         Alert.alert("Error", "Failed to retrieve phone number.");
//       }
//     };
//     bootstrap();
//   }, []);

//   /** Prefill: hit /single-loan-application-mobile/:phone; prefill if loanCompletion === false */
//   useEffect(() => {
//     const fetchExisting = async () => {
//       if (!phoneNumber) return;
//       setPrefilling(true);
//       try {
//         const url = `${API_BASE_URL}/single-loan-application-mobile/${encodeURIComponent(
//           phoneNumber
//         )}`;
//         const res = await axios.get(url);

//         // Your payload is under res.data.data
//         const app = res?.data?.data ?? null;
//         if (!app) {
//           setPrefilling(false);
//           return;
//         }

//         const loanCompletion = Boolean(app.loanCompletion);
//         setExistingIsCompleted(loanCompletion);

//         // backend uses `id` as the identifier
//         if (app.id) setExistingAppId(String(app.id));

//         if (loanCompletion === false) {
//           const amt = app.desiredLoanAmount != null ? String(app.desiredLoanAmount) : "";
//           const tenure = Number(app.loanTenure ?? 12);
//           const type = app.loanType ?? "";

//           setNoLoanAmount(amt);
//           setLoanAmount(amt ? formatIndianCurrency(amt) : "");
//           if (!Number.isNaN(tenure) && tenure >= 1 && tenure <= 60) {
//             setLoanTenure(tenure);
//           }
//           setloantype(type);

//           try {
//             if (app.id) {
//               await AsyncStorage.setItem("appIdData", JSON.stringify(app.id));
//             }
//           } catch (e) {
//             console.warn("Couldn't cache appIdData:", e);
//           }
//         }
//       } catch (err) {
//         // If 404/no app, just allow create flow
//         console.log("ℹ️ No existing application or fetch error:", err?.message || err);
//       } finally {
//         setPrefilling(false);
//       }
//     };
//     fetchExisting();
//   }, [phoneNumber]);

//   /** Validate before submit */
//   const validateInputs = () => {
//     let valid = true;
//     const errorObj = {};

//     if (!phoneNumber) {
//       errorObj.phoneNumber = "Phone Number Is Required.";
//       valid = false;
//     }

//     if (!NoloanAmount || isNaN(Number(NoloanAmount)) || Number(NoloanAmount) <= 0) {
//       errorObj.loanAmount = "Please Enter A Valid Loan Amount.";
//       valid = false;
//     } else if (parseInt(NoloanAmount) < 5000) {
//       errorObj.loanAmount = "Loan Amount Must Be At Least ₹5,000.";
//       valid = false;
//     }

//     if (!loanTenure || isNaN(Number(loanTenure)) || loanTenure < 1 || loanTenure > 60) {
//       errorObj.loanTenure = "Loan Tenure Must Be Between 1 And 60 Months.";
//       valid = false;
//     }

//     setErrors(errorObj);
//     return valid;
//   };

//   /** Submit: update unfinished app (PUT) or create new (POST) */
//   const handleSubmit = async () => {
//     if (!validateInputs()) return;
//     if (prefilling) return; // avoid race vs prefill

//     setIsLoading(true);
//     try {
//       const requestData = {
//         phoneNumber,
//         desiredLoanAmount: parseFloat(NoloanAmount),
//         loanTenure: parseInt(String(loanTenure), 10),
//         loanType,
//       };

//       console.log("🚀 Sending Loan Requirements:", requestData);

//       let response;
//       if (existingAppId && existingIsCompleted === false) {
//         // UPDATE flow (adjust path if your backend differs)
//         response = await axios.put(
//           `${API_BASE_URL}/single-loan-update-application/${existingAppId}`,
//           requestData
//         );
//       } else {
//         // CREATE flow
//         response = await axios.post(
//           `${API_BASE_URL}/loan-application/loan-requirements`,
//           requestData
//         );
//       }

//       // Prefer `id`; also check alternative names for safety
//       const appId =
//         response?.data?.id ??
//         response?.data?.applicationId ??
//         existingAppId ??
//         null;

//       try {
//         if (appId) {
//           await AsyncStorage.setItem("appIdData", JSON.stringify(appId));
//           console.log("AppId saved successfully.");
//         }
//       } catch (error) {
//         console.error("Error saving appId:", error);
//       }

//       if (response?.status >= 200 && response?.status < 300) {
//         navigation.navigate("EmploymentInformation");
//       } else {
//         Alert.alert("Error", response?.data?.message || "Failed to submit loan requirements.");
//       }
//     } catch (error) {
//       console.error(
//         "❌ Error submitting loan requirements:",
//         error?.response ? error.response.data : error?.message
//       );
//       Alert.alert("Error", "Unable to submit loan requirements. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, dynamicStyles]}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
//           <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={[styles.header]}>Loan Requirements</ThemedHeadingText>
//               <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
//               <ThemedText style={styles.subHeader}>Your Loan Preferences</ThemedText>
//             </View>

//             <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
//               Desired Loan Amount
//             </ThemedHeadingText>

//             <ThemedTextInput
//               style={[
//                 {
//                   width: screenWidth - 40,
//                   borderWidth: 1,
//                   borderRadius: 6,
//                   paddingLeft: 10,
//                   marginTop: 10,
//                   textAlign: "center",
//                   height: 60,
//                 },
//               ]}
//               placeholder="Enter the loan amount you wish to borrow."
//               keyboardType="decimal-pad"
//               value={loanAmount}
//               onChangeText={handleInputChange}
//               error={errors.loanAmount}
//               editable={!isLoading}
//             />

//             <View style={styles.containerMain}>
//               <View style={styles.sliderValue}>
//                 <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold", flex: 1 }}>
//                   Loan Tenure (Months)
//                 </ThemedHeadingText>
//                 <ThemedTextInput
//                   style={[styles.input]}
//                   value={String(loanTenure)}
//                   keyboardType="numeric"
//                   maxLength={2}
//                   onChangeText={(text) => setLoanTenure(parseInt(text, 10) || 0)}
//                   editable={!isLoading}
//                 />
//               </View>

//               <Slider
//                 value={loanTenure}
//                 onValueChange={(v) => {
//                   // @miblanchard/react-native-slider can pass number or array
//                   const val = Array.isArray(v) ? v[0] : v;
//                   setLoanTenure(val || 0);
//                 }}
//                 minimumTrackTintColor="#273283"
//                 minimumValue={1}
//                 maximumValue={60}
//                 step={1}
//                 disabled={isLoading}
//               />

//               <Image
//                 source={require("../../../assets/images/sliderImage.png")}
//                 style={[imagecoleor, { width: screenWidth - 40, height: screenWidth * 0.1 }]}
//                 resizeMode="contain"
//               />
//             </View>
//           </ScrollView>

//           <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
//             <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading || prefilling}>
//               <Text style={styles.buttonText}>
//                 {isLoading ? "Submitting..." : prefilling ? "Loading..." : "Continue"}
//               </Text>
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 120 },
//   header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
//   subHeader: { fontSize: 12 },
//   containerMain: { marginTop: 6 },
//   sliderValue: { flex: 1, flexDirection: "row", alignItems: "center" },
//   input: {
//     borderWidth: 1,
//     borderRadius: 5,
//     fontSize: 16,
//     width: 100,
//     textAlign: "center",
//     fontWeight: "bold",
//     right: 0,
//     position: "absolute",
//     marginTop: 20,
//     paddingVertical: 0,
//     height: 30,
//     borderColor: "#D5D5D5",
//   },
//   buttonContainer: { position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center" },
//   button: { backgroundColor: "#FF4800", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 5, width: "90%" },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
// });

// export default LoanRequirements;


import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState, useEffect } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import axios from "axios";
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
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import appStyle from "@/AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/components/util/api_url";

const API_BASE_URL = `${BASE_URL}/api`;

/* ---------- utils ---------- */
const formatIndianCurrency = (value: string) => {
  const x = (value || "").replace(/,/g, "");
  if (!x) return "";
  const lastThree = x.slice(-3);
  const otherNumbers = x.slice(0, -3);
  return otherNumbers !== ""
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;
};

const parsePhoneFromStorage = (raw: any) => {
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  if (typeof raw === "object") return raw.phoneNumber || raw.mobile || raw.phone || "";
  return "";
};

const isCompleted = (v: any) => {
  if (v === true || v === 1) return true;
  if (v === false || v === 0) return false;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["completed","complete","done","finished","true","1","yes","y"].includes(s)) return true;
    if (["incomplete","pending","ongoing","in-progress","progress","false","0","no","n"].includes(s)) return false;
  }
  return false; // default: treat as NOT completed
};

const extractAppId = (obj: any) =>
  obj?.id ??
  obj?.applicationId ??
  obj?.appId ??
  obj?.data?.id ??
  obj?.data?.applicationId ??
  null;

const pickBestApp = (apps: any[]) => {
  if (!Array.isArray(apps) || apps.length === 0) return null;
  const norm = (a: any) => ({
    raw: a,
    completed: isCompleted(a?.loanDataStatus ?? a?.loanCompletion),
    createdAt: a?.createdAt ? new Date(a.createdAt).getTime() : 0,
    updatedAt: a?.updatedAt ? new Date(a.updatedAt).getTime() : 0,
  });
  const rows = apps.map(norm);
  const incomplete = rows
    .filter(r => !r.completed)
    .sort((a,b) => (b.updatedAt - a.updatedAt) || (b.createdAt - a.createdAt));
  if (incomplete[0]) return incomplete[0].raw;
  return rows.sort((a,b) => (b.updatedAt - a.updatedAt) || (b.createdAt - a.createdAt))[0].raw;
};
/* --------------------------- */

const LoanRequirements = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [NoloanAmount, setNoLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState(12);
  const [loanType, setloantype] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [prefilling, setPrefilling] = useState(true);
  const [errors, setErrors] = useState<Record<string,string>>({});

  // server state
  const [existingAppId, setExistingAppId] = useState<string | null>(null);
  const [existingIsCompleted, setExistingIsCompleted] = useState<boolean>(false);

  const screenWidth = Dimensions.get("window").width;
  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };
  const imagecoleor = { tintColor: theme === "dark" ? "#ffffff" : "" };

  const handleInputChange = (text: string) => {
    const rawValue = (text || "").replace(/[^0-9]/g, "");
    setNoLoanAmount(rawValue);
    setLoanAmount(formatIndianCurrency(rawValue));
  };

  const resetLocalFields = () => {
    setNoLoanAmount("");
    setLoanAmount("");
    setLoanTenure(12);
    // keep loanType from storage
  };

  const createNewApplication = async (ph: string, lt: string | null) => {
    const type = lt ?? "PersonalLoan";
    const payload = { phoneNumber: ph, loanType: type };
    const resp = await axios.post(`${API_BASE_URL}/loan-application/loan-requirements`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    const newId = extractAppId(resp) ?? extractAppId(resp?.data);
    if (!newId) throw new Error("Create succeeded but no application id returned");
    await AsyncStorage.setItem("appIdData", JSON.stringify(newId));
    setExistingAppId(String(newId));
    setExistingIsCompleted(false);
    resetLocalFields(); // start fresh form
  };

  /** Bootstrap: load phone + loanType from storage */
  useEffect(() => {
    (async () => {
      try {
        const lt = await AsyncStorage.getItem("loanType");
        if (lt) setloantype(lt);

        const raw = await AsyncStorage.getItem("userData");
        let parsed: any = null;
        try { parsed = raw ? JSON.parse(raw) : null; } catch { parsed = raw; }
        const phone = parsePhoneFromStorage(parsed);
        if (!phone) {
          Alert.alert("Error", "Phone number not found. Please verify OTP first.");
          navigation.navigate("LoginScreen");
          return;
        }
        setPhoneNumber(phone);
      } catch (e) {
        console.error("❌ bootstrap error:", e);
        Alert.alert("Error", "Failed to retrieve phone number.");
      }
    })();
  }, []);

  /** Prefill or create-new based on completion */
  useEffect(() => {
    if (!phoneNumber) return;
    let cancelled = false;

    (async () => {
      setPrefilling(true);
      try {
        const url = `${API_BASE_URL}/single-loan-application-mobileprefill/${encodeURIComponent(phoneNumber)}`;
        const res = await axios.get(url);
        const payload = res?.data?.data;

        let app: any = null;
        if (Array.isArray(payload)) {
          app = pickBestApp(payload);
        } else {
          app = payload ?? null;
        }

        if (!app) {
          // nothing on server → create new
          if (!cancelled) {
            await createNewApplication(phoneNumber, await AsyncStorage.getItem("loanType"));
          }
          return;
        }

        const completed = isCompleted(app.loanDataStatus ?? app.loanCompletion);
        if (!cancelled) setExistingIsCompleted(completed);

        const foundId = extractAppId(app);
        if (foundId != null && !cancelled) {
          setExistingAppId(String(foundId));
          await AsyncStorage.setItem("appIdData", JSON.stringify(foundId));
        }

        if (completed) {
          // app is completed → create a new one now
          if (!cancelled) {
            await createNewApplication(phoneNumber, await AsyncStorage.getItem("loanType"));
          }
          return;
        }

        // not completed → PREFILL
        if (!cancelled) {
          const amt = app.desiredLoanAmount ?? app.amount ?? app.loanAmount ?? null;
          const tenureRaw = app.loanTenure ?? app.tenure ?? app.duration ?? 12;
          const type = app.loanType ?? app.type ?? loanType;

          const amtStr = amt != null ? String(amt).replace(/[^0-9]/g, "") : "";
          setNoLoanAmount(amtStr);
          setLoanAmount(amtStr ? formatIndianCurrency(amtStr) : "");

          const tenureNum = Number(String(tenureRaw).replace(/[^0-9]/g, "")) || 12;
          setLoanTenure(Math.max(1, Math.min(60, tenureNum)));

          if (type) setloantype(type);
        }
      } catch (err: any) {
        // 404 or other fetch problems → create new app
        try {
          await createNewApplication(phoneNumber, await AsyncStorage.getItem("loanType"));
        } catch (makeErr: any) {
          console.error("❌ create after fetch fail:", makeErr?.response?.data || makeErr?.message);
          Alert.alert("Error", makeErr?.response?.data?.message || "Unable to set up application.");
        }
      } finally {
        if (!cancelled) setPrefilling(false);
      }
    })();

    return () => { cancelled = true; };
  }, [phoneNumber]);

  /** Validate before submit */
  const validateInputs = () => {
    const errorObj: Record<string,string> = {};
    if (!phoneNumber) errorObj.phoneNumber = "Phone Number Is Required.";
    if (!NoloanAmount || isNaN(Number(NoloanAmount)) || Number(NoloanAmount) <= 0) {
      errorObj.loanAmount = "Please Enter A Valid Loan Amount.";
    } else if (parseInt(NoloanAmount, 10) < 15000) {
      errorObj.loanAmount = "Loan Amount Must Be At Least ₹15,000.";
    }
    if (!loanTenure || isNaN(Number(loanTenure)) || loanTenure < 1 || loanTenure > 60) {
      errorObj.loanTenure = "Loan Tenure Must Be Between 1 And 60 Months.";
    }
    setErrors(errorObj);
    return Object.keys(errorObj).length === 0;
  };

  /** Submit: update unfinished app (PUT) or create new (POST) */
  const handleSubmit = async () => {
    if (!validateInputs()) return;
    if (prefilling) return;

    setIsLoading(true);
    try {
      const requestData = {
        phoneNumber,
        desiredLoanAmount: parseFloat(NoloanAmount),
        loanTenure: parseInt(String(loanTenure), 10),
        loanType,
      };

      let response;
      if (existingAppId && existingIsCompleted === false) {
        // update current active app
        response = await axios.put(
          `${API_BASE_URL}/single-loan-update-application/${existingAppId}`,
          requestData
        );
      } else {
        // (shouldn’t happen because we create at init) but safe fallback
        response = await axios.post(
          `${API_BASE_URL}/loan-application/loan-requirements`,
          requestData
        );
      }

      const appId = extractAppId(response) ?? existingAppId ?? null;
      if (appId) await AsyncStorage.setItem("appIdData", JSON.stringify(appId));

      if (response?.status >= 200 && response?.status < 300) {
        navigation.navigate("EmploymentInformation");
      } else {
        Alert.alert("Error", response?.data?.message || "Failed to submit loan requirements.");
      }
    } catch (error: any) {
      console.error("❌ submit error:", error?.response?.data || error?.message);
      Alert.alert("Error", error?.response?.data?.message || "Unable to submit loan requirements. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={[styles.header]}>Loan Requirements</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
              <ThemedText style={styles.subHeader}>Your Loan Preferences</ThemedText>
            </View>

            <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
              Desired Loan Amount
            </ThemedHeadingText>

            <ThemedTextInput
              style={[
                {
                  width: screenWidth - 40,
                  borderWidth: 1,
                  borderRadius: 6,
                  paddingLeft: 10,
                  marginTop: 10,
                  textAlign: "center",
                  height: 60,
                },
              ]}
              placeholder="Enter the loan amount you wish to borrow."
              keyboardType="decimal-pad"
              value={loanAmount}
              onChangeText={handleInputChange}
              error={errors.loanAmount}
              editable={!isLoading}
            />

            <View style={styles.containerMain}>
              <View style={styles.sliderValue}>
                <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold", flex: 1 }}>
                  Loan Tenure (Months)
                </ThemedHeadingText>
                <ThemedTextInput
                  style={[styles.input]}
                  value={String(loanTenure)}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) => setLoanTenure(parseInt(text, 10) || 0)}
                  editable={!isLoading}
                />
              </View>

              <Slider
                value={loanTenure}
                onValueChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  const safe = typeof val === "number" ? Math.max(1, Math.min(60, Math.round(val))) : 12;
                  setLoanTenure(safe);
                }}
                minimumTrackTintColor="#273283"
                minimumValue={1}
                maximumValue={60}
                step={1}
                disabled={isLoading}
              />

              <Image
                source={require("../../../assets/images/sliderImage.png")}
                style={[imagecoleor, { width: screenWidth - 40, height: screenWidth * 0.1 }]}
                resizeMode="contain"
              />
            </View>
          </ScrollView>

          <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
            <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading || prefilling}>
              <Text style={styles.buttonText}>
                {isLoading ? "Submitting..." : prefilling ? "Loading..." : "Continue"}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 120 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  subHeader: { fontSize: 12 },
  containerMain: { marginTop: 6 },
  sliderValue: { flex: 1, flexDirection: "row", alignItems: "center" },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    width: 100,
    textAlign: "center",
    fontWeight: "bold",
    right: 0,
    position: "absolute",
    marginTop: 20,
    paddingVertical: 0,
    height: 30,
    borderColor: "#D5D5D5",
  },
  buttonContainer: { position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center" },
  button: { backgroundColor: "#FF4800", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 5, width: "90%" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default LoanRequirements;


