// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
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

// const EmploymentDetails = ({ navigation }) => {
//     const [applicationId, setApplicationId] = useState("");
//     const [companyName, setCompanyName] = useState("");
//     const [employmentLevel, setEmploymentLevel] = useState("");
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [isKeyboardVisible, setKeyboardVisible] = useState(false);

//     useEffect(() => {
//         fetchApplicationId(); // ✅ Fetch application ID

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
//             Alert.alert("Error", "Failed to retrieve phone number.");
//         }
//     };

//     // ✅ Validate Inputs
//     const validateInputs = () => {
//         let valid = true;
//         let errorObj = {};

//         if (!companyName.trim()) {
//             errorObj.companyName = "Company Name Is Required";
//             valid = false;
//         }
//         if (!employmentLevel) {
//             errorObj.employmentLevel = "Please Select Your Employment Level";
//             valid = false;
//         }

//         setErrors(errorObj);
//         return valid;
//     };

//     const handleSubmit = async () => {
//         if (!validateInputs()) return;

//         setIsLoading(true);
//         try {
//             const requestData = { applicationId, companyName, employmentLevel };

//             console.log("📤 Sending Data:", requestData);

//             const response = await axios.post(
//                 `${API_BASE_URL}/loan-application/employmentLevel`,
//                 requestData
//             );

//             if (response.status === 200) {
//                 // Alert.alert("Success", "Employment details updated successfully.");
//                 navigation.navigate("OfficeAddressInformation");
//             } else {
//                 Alert.alert("Error", response.data.message || "Failed to update employment details.");
//             }
//         } catch (error) {
//             console.error("❌ Error submitting employment details:", error);
//             // Alert.alert("Error", error.response?.data?.message || "Network error. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const theme = Appearance.getColorScheme();
//     const dynamicStyles = {
//         backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//         shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//     };

//     const employmentOptions = [
//         { label: "Executive", value: "Executive" },
//         { label: "Supervisor", value: "Supervisor" },
//         { label: "Manager", value: "Manager" },
//         { label: "Sr. Manager", value: "Sr. Manager" },
//         { label: "Top Management", value: "Top Management" }
//     ];

//     return (
//         <SafeAreaView style={[styles.container, dynamicStyles]}>
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <KeyboardAvoidingView style={{ flex: 1 }}>
//                     <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//                         <View style={appStyle.HeadingTitle}>
//                             <ThemedHeadingText style={[styles.header]}>Employment Details</ThemedHeadingText>
//                             <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
//                         </View>

//                         {/* Company Name */}
//                         <ThemedTextInput
//                             label="Company Name"
//                             placeHolder="Enter Company Name"
//                             value={companyName}
//                             onChangeText={setCompanyName}
//                             error={errors.companyName}
//                         />

//                         {/* Employment Level */}
//                         <View style={{ marginTop: 10 }}>
//                             <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Employment Level</ThemedHeadingText>
//                             <ThemedRadioButtonList
//                                 options={employmentOptions}
//                                 onValueChange={setEmploymentLevel}
//                                 direction="column"
//                                 defaultValue={employmentLevel}
//                             />
//                             {errors.employmentLevel ? <Text style={styles.errorText}>{errors.employmentLevel}</Text> : null}
//                         </View>
//                     </ScrollView>

//                     {/* Submit Button */}
//                     <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
//                         <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
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
//     scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
//     header: { fontSize: 18, fontWeight: "bold" },
//     buttonContainer: { left: 0, right: 0, bottom: 0, alignItems: "center" },
//     button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
//     buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
//     errorText: { color: "red", fontSize: 12, marginTop: 5 },
// });

// export default EmploymentDetails;


// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
// import { ThemedHeadingText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { BASE_URL } from "@/components/util/api_url";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
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
//   Text,
//   Platform,
// } from "react-native";

// const API_BASE_URL = `${BASE_URL}/api`;

// const EmploymentDetails = ({ navigation }) => {
//   const [applicationId, setApplicationId] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [employmentLevel, setEmploymentLevel] = useState("");
//   const [errors, setErrors] = useState({});

//   const [initLoading, setInitLoading] = useState(true);   // page bootstrap loading
//   const [submitting, setSubmitting] = useState(false);    // submit button spinner
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");

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
//     shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//   };

//   const employmentOptions = [
//     { label: "Executive", value: "Executive" },
//     { label: "Supervisor", value: "Supervisor" },
//     { label: "Manager", value: "Manager" },
//     { label: "Sr. Manager", value: "Sr. Manager" },
//     { label: "Top Management", value: "Top Management" },
//   ];

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
//       setPhoneNumber(ph);

//       // 2) Fetch application by phone
//       try {
//         const { data, status } = await axios.get(
//           `${API_BASE_URL}/single-loan-application-mobile/${ph}`
//         );

//         if (status === 200 && data?.data) {
//           const app = data.data;

//           if (app.loanCompletion === false) {
//             // Keep server application id
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

//             // Prefill fields if present
//             if (app.companyName) setCompanyName(app.companyName);
//             if (app.employmentLevel) setEmploymentLevel(app.employmentLevel);

//             setInitLoading(false);
//             return;
//           }

//           // Completed -> start new loan
//           await AsyncStorage.removeItem("appIdData");
//           setApplicationId("");
//           Alert.alert("Info", "Your previous application is completed. Please start a new one.");
//           navigation.replace("LoanRequirements");
//           return;
//         }
//       } catch (err) {
//         // 404 -> no active app
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

//   // ✅ Validate Inputs
//   const validateInputs = () => {
//     let valid = true;
//     let errorObj = {};

//     if (!companyName.trim()) {
//       errorObj.companyName = "Company Name Is Required";
//       valid = false;
//     }
//     if (!employmentLevel) {
//       errorObj.employmentLevel = "Please Select Your Employment Level";
//       valid = false;
//     }

//     setErrors(errorObj);
//     return valid;
//   };

//   const handleSubmit = async () => {
//     if (!validateInputs()) return;

//     if (!applicationId) {
//       Alert.alert("Error", "No active application. Please start a new application.");
//       navigation.replace("LoanRequirements");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const requestData = { applicationId, companyName, employmentLevel };

//       const response = await axios.post(
//         `${API_BASE_URL}/loan-application/employmentLevel`,
//         requestData
//       );

//       if (response.status === 200) {
//         navigation.navigate("OfficeAddressInformation");
//       } else {
//         Alert.alert(
//           "Error",
//           response.data?.message || "Failed to update employment details."
//         );
//       }
//     } catch (error) {
//       console.error("❌ Error submitting employment details:", error?.response?.data || error.message);
//       Alert.alert(
//         "Error",
//         error?.response?.data?.message || "Network error. Please try again."
//       );
//     } finally {
//       setSubmitting(false);
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
//           <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={[styles.header]}>Employment Details</ThemedHeadingText>
//               <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
//             </View>

//             {/* Company Name */}
//             <ThemedTextInput
//               label="Company Name"
//               placeHolder="Enter Company Name"
//               value={companyName}
//               onChangeText={setCompanyName}
//               error={errors.companyName}
//             />

//             {/* Employment Level */}
//             <View style={{ marginTop: 10 }}>
//               <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
//                 Employment Level
//               </ThemedHeadingText>
//               <ThemedRadioButtonList
//                 options={employmentOptions}
//                 onValueChange={setEmploymentLevel}
//                 direction="column"
//                 selectedValue={employmentLevel}  // preselect (preferred prop name)
//                 value={employmentLevel}          // fallback if component uses 'value'
//                 defaultValue={employmentLevel}   // compatibility if component is uncontrolled
//                 disabled={submitting}
//               />
//               {errors.employmentLevel ? (
//                 <Text style={styles.errorText}>{errors.employmentLevel}</Text>
//               ) : null}
//             </View>
//           </ScrollView>

//           {/* Submit Button */}
//           <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
//             <Pressable style={styles.button} onPress={handleSubmit} disabled={submitting}>
//               {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
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

// export default EmploymentDetails;




import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
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

const employmentOptions = [
  { label: "Executive", value: "Executive" },
  { label: "Supervisor", value: "Supervisor" },
  { label: "Manager", value: "Manager" },
  { label: "Sr. Manager", value: "Sr. Manager" },
  { label: "Top Management", value: "Top Management" },
];

/* ---------------- helpers ---------------- */
const parseStoredPhone = (raw: any) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return parsed;
    if (parsed?.phoneNumber) return parsed.phoneNumber;
    return null;
  } catch {
    return raw; // phone stored as plain string
  }
};
const parseBackendBool = (v: any): boolean => {
  if (v === true || v === 1) return true;
  if (v === false || v === 0) return false;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["true","1","yes","completed","complete","done","finished"].includes(s)) return true;
    if (["false","0","no","incomplete","pending","progress","in-progress","ongoing"].includes(s)) return false;
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

const prefillByPhone = (phone: string) =>
  axios.get(`${API_BASE_URL}/single-loan-application-mobileprefill/${encodeURIComponent(phone)}`);

const createApplication = (payload: any) =>
  axios.post(`${API_BASE_URL}/loan-application/loan-requirements`, payload, {
    headers: { "Content-Type": "application/json" },
  });

/* ---------------- component ---------------- */
const EmploymentDetails = ({ navigation }) => {
  const [applicationId, setApplicationId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employmentLevel, setEmploymentLevel] = useState("");
  const [errors, setErrors] = useState({} as Record<string,string>);

  const [initLoading, setInitLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  /** ensure we have an active (unfinished) app for this phone; prefill fields */
  const ensureActiveAppAndPrefill = useCallback(async (phone: string) => {
    // 1) prefill
    let app: any = null;
    try {
      const { data, status } = await prefillByPhone(phone);
      if (status === 200) {
        const payload = data?.data;
        app = Array.isArray(payload) ? pickBestApp(payload) : payload ?? null;
      }
    } catch {
      // we'll create if needed below
    }

    // 2) if no app → create new, then refetch prefill
    if (!app) {
      const loanType = (await AsyncStorage.getItem("loanType")) ?? "PersonalLoan";
      await createApplication({ phoneNumber: phone, loanType });
      const { data } = await prefillByPhone(phone);
      const payload = data?.data;
      app = Array.isArray(payload) ? pickBestApp(payload) : payload ?? null;
    }

    if (!app) throw new Error("Unable to load or create a loan application.");

    // 3) if app is completed → create fresh, then refetch prefill
    const completed = parseBackendBool(app.loanDataStatus ?? app.loanCompletion);
    if (completed) {
      const loanType = (await AsyncStorage.getItem("loanType")) ?? "PersonalLoan";
      await createApplication({ phoneNumber: phone, loanType });
      const { data } = await prefillByPhone(phone);
      const payload = data?.data;
      app = Array.isArray(payload) ? pickBestApp(payload) : payload ?? null;
      if (!app) throw new Error("Application created but could not be retrieved.");
    }

    // 4) unfinished → set id and prefill fields
    const id = extractAppId(app) ?? app.id ?? app.applicationId;
    if (!id) throw new Error("No application ID available.");
    setApplicationId(String(id));

    if (app.companyName) setCompanyName(app.companyName);
    if (app.employmentLevel) setEmploymentLevel(app.employmentLevel);

    return String(id);
  }, []);

  /** init */
  useEffect(() => {
    (async () => {
      setInitLoading(true);
      try {
        const userRaw = await AsyncStorage.getItem("userData");
        const ph = parseStoredPhone(userRaw);
        if (!ph) {
          Alert.alert("Error", "Phone number not found. Please verify OTP first.");
          navigation.navigate("LoginScreen");
          return;
        }
        setPhoneNumber(ph);
        await ensureActiveAppAndPrefill(ph);
      } catch (e: any) {
        console.error("❌ init error:", e?.response?.data || e?.message);
        Alert.alert("Error", e?.message || "Unable to set up employment step.");
      } finally {
        setInitLoading(false);
      }
    })();
  }, [ensureActiveAppAndPrefill, navigation]);

  /* ------------ validate + submit ------------ */
  const validateInputs = () => {
    const err: Record<string,string> = {};
    if (!companyName.trim()) err.companyName = "Company Name Is Required";
    if (!employmentLevel) err.employmentLevel = "Please Select Your Employment Level";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    if (!applicationId) {
      Alert.alert("Error", "No active application ID. Please go back and reopen this step.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { applicationId, companyName, employmentLevel };
      const res = await axios.post(`${API_BASE_URL}/loan-application/employmentLevel`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        navigation.navigate("OfficeAddressInformation");
      } else {
        Alert.alert("Error", res?.data?.message || "Failed to update employment details.");
      }
    } catch (err: any) {
      console.error("❌ submit error:", err?.response?.data || err?.message);
      Alert.alert("Error", err?.response?.data?.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={[styles.header]}>Employment Details</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
            </View>

            <ThemedTextInput
              label="Company Name"
              placeHolder="Enter Company Name"
              value={companyName}
              onChangeText={setCompanyName}
              error={errors.companyName}
            />

            <View style={{ marginTop: 10 }}>
              <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
                Employment Level
              </ThemedHeadingText>
              <ThemedRadioButtonList
                options={employmentOptions}
                onValueChange={setEmploymentLevel}
                direction="column"
                selectedValue={employmentLevel}
                value={employmentLevel}
                defaultValue={employmentLevel}
                disabled={submitting}
              />
              {errors.employmentLevel ? <Text style={styles.errorText}>{errors.employmentLevel}</Text> : null}
            </View>
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

export default EmploymentDetails;
