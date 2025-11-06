// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import RadioButtonGroup from "@/components/ThemedRadioButton";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { BASE_URL } from "@/components/util/api_url";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Appearance,
//   Pressable,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";

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

// const IncomeandSalaryDetails = ({ navigation }) => {
//   const [applicationId, setapplicationId] = useState("");
//   const [netIncome, setNetIncome] = useState("");
//   const [modeOfSalary, setModeOfSalary] = useState("");
//   const [creditCardOwnership, setCreditCardOwnership] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);

//   useEffect(() => {
//     fetchPhoneNumber();
//     const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
//       setKeyboardVisible(true)
//     );
//     const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
//       setKeyboardVisible(false)
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);


  
//   const handleInputChange = (text) => {
//     const rawValue = text.replace(/[^0-9]/g, "");
//     setNetIncome(rawValue)
//     // console.log("Not Coma", rawValue)    
//     setNetIncome(formatIndianCurrency(rawValue));
//   };

//   const fetchPhoneNumber = async () => {

//       const jsonValue = await AsyncStorage.getItem('appIdData');
//     const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//     setapplicationId(parsedValue);
//     // setPhoneNumber(response.data.phoneNumber);
//     console.log(parsedValue) 


//     //   const response = await axios.get(`${API_BASE_URL}/otp/get-phone-number`);
//     //   if (response.data.phoneNumber) {
//     //     setPhoneNumber(response.data.phoneNumber);
//     //   } else {
//     //     Alert.alert("Error", "Phone number not found. Please verify OTP first.");
//     //     navigation.navigate("LoginScreen");
//     //   }
//     // } catch (error) {
//     //   console.error("❌ Error fetching phone number:", error);
//     //   Alert.alert("Error", "Failed to retrieve phone number.");
//     // }
//   };

//   // ✅ Validation Function
//   const validateInputs = () => {
//     let valid = true;
//     let errorObj = {};
  
//     // Remove commas for validation
//     const numericIncome = netIncome.replace(/,/g, "");
  
//     if (!numericIncome.trim() || isNaN(numericIncome)) {
//       errorObj.netIncome = "Net Monthly Income Is Required & Must Be A Number";
//       valid = false;
//     } else if (parseInt(numericIncome, 10) < 5000) { 
//       errorObj.netIncome = "Net Monthly Income Must Be At least ₹5000";
//       valid = false;
//     }
  
//     if (!modeOfSalary) {
//       errorObj.modeOfSalary = "Please Select Your Mode Of Salary";
//       valid = false;
//     }
//     if (!creditCardOwnership) {
//       errorObj.creditCardOwnership = "Please Select Credit Card Ownership";
//       valid = false;
//     }
  
//     setErrors(errorObj);
//     return valid;
//   };
  
//   // ✅ Submit Data to API
//   const handleSubmit = async () => {
//     if (!validateInputs()) return;
  
//     setIsLoading(true);
//     try {
//       const requestData = {
//         applicationId: applicationId,
//         netMonthlyIncome: netIncome.replace(/,/g, ""), // send numeric value without commas
//         salaryMode: modeOfSalary,
//         hasCreditCard: creditCardOwnership,
//       };
  
//       const response = await axios.post(
//         `${API_BASE_URL}/loan-application/salaried-details`,
//         requestData
//       );
  
//       if (response.status === 200) {
//         navigation.navigate("BankAccount");
//       } else {
//         console.log("❌ Error:", response.data.message || "Failed to submit salary details.");
//       }
//     } catch (error) {
//       console.error("❌ Error submitting salary details:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   const theme = Appearance.getColorScheme();
//   const dynamicStyles = {
//     backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//   };

//   const salaryOptions = [
//     { label: "Bank", value: "Bank" },
//     { label: "Cash", value: "Cash" },
//     { label: "Both", value: "Both" },
//   ];

//   const yesNoOptions = [
//     { label: "Yes", value: "Yes" },
//     { label: "No", value: "No" },
//   ];

//   return (
//     <SafeAreaView style={[styles.container, dynamicStyles]}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView style={{ flex: 1 }}>
//           <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={styles.header}>Income & Salary Details</ThemedHeadingText>
//               <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
//             </View>

//             {/* Net Monthly Income */}
//             <ThemedTextInput
//               label="Net Monthly Income"
//               placeHolder="Enter Your Monthly Salary"
//               keyboardType="numeric"
//               value={netIncome}
//               // onChangeText={setNetIncome}
//               onChangeText={handleInputChange}
//               error={errors.netIncome}
//             />



//             {/* Mode of Salary */}
//             <View style={{ marginTop: 10 }}>
//               <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Mode of Salary</ThemedHeadingText>
//               <RadioButtonGroup
//                 size="auto"
//                 options={salaryOptions}
//                 onValueChange={setModeOfSalary}
//                 direction="row"
//                 defaultValue={modeOfSalary}
//               />
//               {errors.modeOfSalary ? <Text style={styles.errorText}>{errors.modeOfSalary}</Text> : null}
//             </View>

//             {/* Credit Card Ownership */}
//             <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
//               <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Do you own a Credit Card?</ThemedHeadingText>
//               <RadioButtonGroup
//                 size="auto"
//                 options={yesNoOptions}
//                 onValueChange={setCreditCardOwnership}
//                 direction="row"
//                 defaultValue={creditCardOwnership}
//               />
//             </View>
//             {errors.creditCardOwnership ? <Text style={styles.errorText}>{errors.creditCardOwnership}</Text> : null}
//             <Text style={{ fontSize: 11 }}>Owning a credit card may positively impact your loan approval.</Text>
//           </ScrollView>

//           {/* Submit Button */}
//           <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
//             <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
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
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
//   header: { fontSize: 18, fontWeight: "bold" },
//   buttonContainer: { left: 0, right: 0, bottom: 0, alignItems: "center" },
//   button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
//   errorText: { color: "red", fontSize: 12, marginTop: 5 },
// });

// export default IncomeandSalaryDetails;










// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import RadioButtonGroup from "@/components/ThemedRadioButton";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { BASE_URL } from "@/components/util/api_url";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Appearance,
//   Pressable,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
//   Platform,
// } from "react-native";

// const API_BASE_URL = `${BASE_URL}/api`;

// // Format number in Indian locale while typing (e.g. 12,34,567)
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
// };

// const IncomeandSalaryDetails = ({ navigation }) => {
//   const [applicationId, setApplicationId] = useState("");
//   const [netIncome, setNetIncome] = useState("");
//   const [modeOfSalary, setModeOfSalary] = useState("");
//   const [creditCardOwnership, setCreditCardOwnership] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const theme = Appearance.getColorScheme();
//   const dynamicStyles = {
//     backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//   };

//   const salaryOptions = [
//     { label: "Bank", value: "Bank" },
//     { label: "Cash", value: "Cash" },
//     { label: "Both", value: "Both" },
//   ];

//   const yesNoOptions = [
//     { label: "Yes", value: "Yes" },
//     { label: "No", value: "No" },
//   ];

//   useEffect(() => {
//     const show = Keyboard.addListener("keyboardDidShow", () =>
//       setKeyboardVisible(true)
//     );
//     const hide = Keyboard.addListener("keyboardDidHide", () =>
//       setKeyboardVisible(false)
//     );
//     return () => {
//       show.remove();
//       hide.remove();
//     };
//   }, []);

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
//       // 1) Get any previously saved applicationId (from LoanRequirements / EmploymentInformation)
//       const appIdRaw = await AsyncStorage.getItem("appIdData");
//       const appId = appIdRaw ? JSON.parse(appIdRaw) : null;
//       if (appId) setApplicationId(appId);

//       // 2) Get phone number to fetch current application
//       const userRaw = await AsyncStorage.getItem("userData");
//       const ph = parseStoredPhone(userRaw);
//       if (!ph) {
//         Alert.alert("Error", "Phone number not found. Please verify OTP first.");
//         navigation.navigate("LoginScreen");
//         return;
//       }
//       setPhoneNumber(ph);

//       // 3) Fetch existing application by phone number
//       try {
//         const { data, status } = await axios.get(
//           `${API_BASE_URL}/single-loan-application-mobile/${ph}`
//         );

//         if (status === 200 && data?.data) {
//           const app = data.data;

//           if (app.loanCompletion === false) {
//             // Keep the server app id as source of truth
//             const id = app.id || app.applicationId || appId;
//             if (id) {
//               setApplicationId(id);
//               await AsyncStorage.setItem("appIdData", JSON.stringify(id));
//             }

//             // Prefill salary details if they exist
//             // netMonthlyIncome can be number/string -> convert to formatted string with commas
//             if (app.netMonthlyIncome != null && app.netMonthlyIncome !== "") {
//               const digits = String(app.netMonthlyIncome).replace(/[^0-9]/g, "");
//               setNetIncome(formatIndianCurrency(digits));
//             }

//             // salaryMode is expected to be "Bank" | "Cash" | "Both"
//             if (app.salaryMode) {
//               setModeOfSalary(app.salaryMode);
//             }

//             // hasCreditCard may be boolean or "Yes"/"No"
//             if (typeof app.hasCreditCard === "boolean") {
//               setCreditCardOwnership(app.hasCreditCard ? "Yes" : "No");
//             } else if (typeof app.hasCreditCard === "string") {
//               // normalize to "Yes"/"No"
//               const normalized =
//                 app.hasCreditCard.toLowerCase() === "yes" ||
//                 app.hasCreditCard.toLowerCase() === "true"
//                   ? "Yes"
//                   : "No";
//               setCreditCardOwnership(normalized);
//             }

//             setIsLoading(false);
//             return;
//           }

//           // loanCompletion === true -> completed -> must create a new loan
//           await AsyncStorage.removeItem("appIdData");
//           setApplicationId("");
//           Alert.alert("Info", "Your previous application is completed. Please start a new one.");
//           navigation.replace("LoanRequirements");
//           return;
//         }
//       } catch (err) {
//         // 404 -> no application -> create a new one from LoanRequirements
//         if (err?.response?.status === 404) {
//           await AsyncStorage.removeItem("appIdData");
//           setApplicationId("");
//           Alert.alert("Info", "No active application found. Please create a new application first.");
//           navigation.replace("LoanRequirements");
//           return;
//         }
//         console.error("❌ Error fetching application:", err?.response?.data || err.message);
//         Alert.alert("Error", "Failed to check application. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [navigation]);

//   useEffect(() => {
//     init();
//   }, [init]);

//   // Format while typing
//   const handleIncomeChange = (text) => {
//     const rawValue = text.replace(/[^0-9]/g, "");
//     setNetIncome(formatIndianCurrency(rawValue));
//   };

//   // ✅ Validation Function
//   const validateInputs = () => {
//     let valid = true;
//     let errorObj = {};

//     const numericIncome = netIncome.replace(/,/g, "");

//     if (!numericIncome.trim() || isNaN(numericIncome)) {
//       errorObj.netIncome = "Net Monthly Income Is Required & Must Be A Number";
//       valid = false;
//     } else if (parseInt(numericIncome, 10) < 5000) {
//       errorObj.netIncome = "Net Monthly Income Must Be At least ₹5000";
//       valid = false;
//     }

//     if (!modeOfSalary) {
//       errorObj.modeOfSalary = "Please Select Your Mode Of Salary";
//       valid = false;
//     }
//     if (!creditCardOwnership) {
//       errorObj.creditCardOwnership = "Please Select Credit Card Ownership";
//       valid = false;
//     }

//     setErrors(errorObj);
//     return valid;
//   };

//   // ✅ Submit Data to API
//   const handleSubmit = async () => {
//     if (!validateInputs()) return;

//     if (!applicationId) {
//       Alert.alert("Error", "No active application. Please start a new application.");
//       navigation.replace("LoanRequirements");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const requestData = {
//         applicationId,
//         netMonthlyIncome: netIncome.replace(/,/g, ""), // numeric string
//         salaryMode: modeOfSalary,
//         hasCreditCard: creditCardOwnership,           // "Yes" | "No" (adjust if backend expects boolean)
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/loan-application/salaried-details`,
//         requestData
//       );

//       if (response.status === 200) {
//         navigation.navigate("BankAccount");
//       } else {
//         console.log("❌ Error:", response.data?.message || "Failed to submit salary details.");
//         Alert.alert("Error", response.data?.message || "Failed to submit salary details.");
//       }
//     } catch (error) {
//       console.error("❌ Error submitting salary details:", error?.response?.data || error.message);
//       Alert.alert("Error", error?.response?.data?.message || "Network error. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (isLoading) {
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
//           <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={styles.header}>Income & Salary Details</ThemedHeadingText>
//               <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
//             </View>

//             {/* Net Monthly Income */}
//             <ThemedTextInput
//               label="Net Monthly Income"
//               placeHolder="Enter Your Monthly Salary"
//               keyboardType="numeric"
//               value={netIncome}
//               onChangeText={handleIncomeChange}
//               error={errors.netIncome}
//             />

//             {/* Mode of Salary */}
//             <View style={{ marginTop: 10 }}>
//               <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
//                 Mode of Salary
//               </ThemedHeadingText>
//               <RadioButtonGroup
//                 size="auto"
//                 options={salaryOptions}
//                 onValueChange={setModeOfSalary}
//                 direction="row"
//                 defaultValue={modeOfSalary}  // preselect
//                 value={modeOfSalary}          // if component supports controlled mode
//                 disabled={submitting}
//               />
//               {errors.modeOfSalary ? <Text style={styles.errorText}>{errors.modeOfSalary}</Text> : null}
//             </View>

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
//                 Do you own a Credit Card?
//               </ThemedHeadingText>
//               <RadioButtonGroup
//                 size="auto"
//                 options={yesNoOptions}
//                 onValueChange={setCreditCardOwnership}
//                 direction="row"
//                 defaultValue={creditCardOwnership} // preselect
//                 value={creditCardOwnership}         // controlled mode if supported
//                 disabled={submitting}
//               />
//             </View>
//             {errors.creditCardOwnership ? (
//               <Text style={styles.errorText}>{errors.creditCardOwnership}</Text>
//             ) : null}
//             <Text style={{ fontSize: 11 }}>
//               Owning a credit card may positively impact your loan approval.
//             </Text>
//           </ScrollView>

//           {/* Submit Button */}
//           <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
//             <Pressable style={styles.button} onPress={handleSubmit} disabled={submitting}>
//               {submitting ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Continue</Text>
//               )}
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
//   header: { fontSize: 18, fontWeight: "bold" },
//   buttonContainer: { left: 0, right: 0, bottom: 0, alignItems: "center" },
//   button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
//   errorText: { color: "red", fontSize: 12, marginTop: 5 },
// });

// export default IncomeandSalaryDetails;


import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BASE_URL } from "@/components/util/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
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
  Platform,
} from "react-native";

const API_BASE_URL = `${BASE_URL}/api`;

/* ---------------- helpers ---------------- */
const formatIndianCurrency = (value: string) => {
  const x = (value || "").replace(/,/g, "");
  if (!x) return "";
  const lastThree = x.slice(-3);
  const otherNumbers = x.slice(0, -3);
  return otherNumbers !== ""
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;
};

const parseStoredPhone = (raw: string | null) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return parsed;
    if (parsed?.phoneNumber) return parsed.phoneNumber;
    return null;
  } catch {
    return raw; // was plain string
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
    completed: parseBackendBool(a?.loanDataStatus ?? a?.loanCompletion),
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

const getServerMessage = (err: any) =>
  err?.response?.data?.message ||
  err?.response?.data?.error ||
  err?.message ||
  "Unknown server error";

/* -------------- component ---------------- */
const IncomeandSalaryDetails = ({ navigation }) => {
  const [applicationId, setApplicationId] = useState<string>("");
  const [netIncome, setNetIncome] = useState<string>("");
  const [modeOfSalary, setModeOfSalary] = useState<string>("");
  const [creditCardOwnership, setCreditCardOwnership] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  const salaryOptions = [
    { label: "Bank", value: "Bank" },
    { label: "Cash", value: "Cash" },
    { label: "Both", value: "Both" },
  ];
  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  const createApplication = (payload: any) =>
    axios.post(`${API_BASE_URL}/loan-application/loan-requirements`, payload, {
      headers: { "Content-Type": "application/json" },
    });

  const saveAppId = async (resp: any, fallback?: string | null) => {
    const id = extractAppId(resp) ?? fallback ?? null;
    if (id) {
      await AsyncStorage.setItem("appIdData", JSON.stringify(id));
      setApplicationId(String(id));
    }
    return id;
  };

  const init = useCallback(async () => {
    setIsLoading(true);
    try {
      const userRaw = await AsyncStorage.getItem("userData");
      const ph = parseStoredPhone(userRaw);
      if (!ph) {
        Alert.alert("Error", "Phone number not found. Please verify OTP first.");
        navigation.navigate("LoginScreen");
        return;
      }
      setPhoneNumber(ph);

      const lt = (await AsyncStorage.getItem("loanType")) ?? "PersonalLoan";

      // ✅ use the *prefill* endpoint
      const url = `${API_BASE_URL}/single-loan-application-mobileprefill/${encodeURIComponent(ph)}`;

      let app: any = null;
      try {
        const { data, status } = await axios.get(url);
        const payload = data?.data;
        if (status === 200) {
          app = Array.isArray(payload) ? pickBestApp(payload) : payload ?? null;
        }
      } catch (err: any) {
        // if 404 or any fetch error, we'll create below
      }

      if (!app) {
        // nothing found → create fresh
        const resp = await createApplication({ phoneNumber: ph, loanType: lt });
        await saveAppId(resp, null);
        return;
      }

      const completed = parseBackendBool(app.loanDataStatus ?? app.loanCompletion);
      if (completed) {
        // completed → create new immediately
        const resp = await createApplication({ phoneNumber: ph, loanType: lt });
        await saveAppId(resp, null);
        return;
      }

      // active → persist id & prefill
      const id = extractAppId(app) ?? app.id ?? app.applicationId;
      if (id) {
        await AsyncStorage.setItem("appIdData", JSON.stringify(id));
        setApplicationId(String(id));
      }

      if (app.netMonthlyIncome != null && app.netMonthlyIncome !== "") {
        const digits = String(app.netMonthlyIncome).replace(/[^0-9]/g, "");
        setNetIncome(formatIndianCurrency(digits));
      }
      if (app.salaryMode) setModeOfSalary(app.salaryMode);

      if (typeof app.hasCreditCard === "boolean") {
        setCreditCardOwnership(app.hasCreditCard ? "Yes" : "No");
      } else if (typeof app.hasCreditCard === "string") {
        const s = app.hasCreditCard.trim().toLowerCase();
        setCreditCardOwnership(s === "yes" || s === "true" ? "Yes" : "No");
      }
    } catch (e: any) {
      console.error("❌ init error:", e?.response?.data || e?.message);
      Alert.alert("Error", "Unable to set up salary step. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  useEffect(() => { init(); }, [init]);

  const handleIncomeChange = (text: string) => {
    const raw = (text || "").replace(/[^0-9]/g, "");
    setNetIncome(formatIndianCurrency(raw));
  };

  const validateInputs = () => {
    const errs: Record<string, string> = {};
    const numericIncome = (netIncome || "").replace(/,/g, "");

    if (!numericIncome.trim() || isNaN(Number(numericIncome))) {
      errs.netIncome = "Net Monthly Income Is Required & Must Be A Number";
    } else if (parseInt(numericIncome, 10) < 5000) {
      errs.netIncome = "Net Monthly Income Must Be At least ₹5000";
    }
    if (!modeOfSalary) errs.modeOfSalary = "Please Select Your Mode Of Salary";
    if (!creditCardOwnership) errs.creditCardOwnership = "Please Select Credit Card Ownership";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const postSalaryDetails = (appIdToUse: string) => {
    const numericIncome = netIncome.replace(/,/g, "");
    const hasCardBool = creditCardOwnership === "Yes";
    const payload: any = {
      applicationId: appIdToUse,
      netMonthlyIncome: numericIncome,
      salaryMode: modeOfSalary,
      hasCreditCard: hasCardBool,             // boolean
      hasCreditCardText: creditCardOwnership, // optional text
    };
    return axios.post(`${API_BASE_URL}/loan-application/salaried-details`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setSubmitting(true);
    try {
      // read latest id
      const appIdRaw = await AsyncStorage.getItem("appIdData");
      let appId = appIdRaw ? JSON.parse(appIdRaw) : applicationId;

      if (!appId) {
        // safeguard: create new
        const lt = (await AsyncStorage.getItem("loanType")) ?? "PersonalLoan";
        const resp = await createApplication({ phoneNumber, loanType: lt });
        appId = await saveAppId(resp, null);
        if (!appId) throw new Error("App created but no id returned");
      }

      const res = await postSalaryDetails(String(appId));
      if (res.status === 200) {
        navigation.navigate("BankAccount");
      } else {
        Alert.alert("Error", res?.data?.message || "Failed to submit salary details.");
      }
    } catch (err: any) {
      console.error("❌ submit error:", err?.response?.data || err?.message);
      Alert.alert("Error", getServerMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={styles.header}>Income & Salary Details</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
            </View>

            <ThemedTextInput
              label="Net Monthly Income"
              placeHolder="Enter Your Monthly Salary"
              keyboardType="numeric"
              value={netIncome}
              onChangeText={handleIncomeChange}
              error={errors.netIncome}
            />

            <View style={{ marginTop: 10 }}>
              <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
                Mode of Salary
              </ThemedHeadingText>
              <RadioButtonGroup
                size="auto"
                options={[{label:"Bank",value:"Bank"},{label:"Cash",value:"Cash"},{label:"Both",value:"Both"}]}
                onValueChange={setModeOfSalary}
                direction="row"
                defaultValue={modeOfSalary}
                value={modeOfSalary}
                disabled={submitting}
              />
              {errors.modeOfSalary ? <Text style={styles.errorText}>{errors.modeOfSalary}</Text> : null}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
              <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
                Do you own a Credit Card?
              </ThemedHeadingText>
              <RadioButtonGroup
                size="auto"
                options={[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]}
                onValueChange={setCreditCardOwnership}
                direction="row"
                defaultValue={creditCardOwnership}
                value={creditCardOwnership}
                disabled={submitting}
              />
            </View>
            {errors.creditCardOwnership ? <Text style={styles.errorText}>{errors.creditCardOwnership}</Text> : null}
            <Text style={{ fontSize: 11 }}>Owning a credit card may positively impact your loan approval.</Text>
          </ScrollView>

          <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
            <Pressable style={styles.button} onPress={handleSubmit} disabled={submitting}>
              {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
  header: { fontSize: 18, fontWeight: "bold" },
  buttonContainer: { left: 0, right: 0, bottom: 0, alignItems: "center" },
  button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  errorText: { color: "red", fontSize: 12, marginTop: 5 },
});

export default IncomeandSalaryDetails;

