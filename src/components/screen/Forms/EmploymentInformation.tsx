// import appStyle from "@/AppStyles";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   View,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Appearance,
//   Alert,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_URL } from "@/components/util/api_url";

// const API_BASE_URL = `${BASE_URL}/api`;

// const EmploymentInformation = ({ navigation }) => {
//   const [applicationId, setapplicationId] = useState("");
//   const [employmentType, setEmploymentType] = useState(""); // ✅ Ensure state holds the selected value
//   const [isLoading, setIsLoading] = useState(false);
 
//   const [loantype, setloantype] = useState("")



//   const theme = Appearance.getColorScheme();
//   const dynamicStyles = {
//     backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//   };

//   // const EmploymentOptions = [
//   //   { label: "Salaried", description: "Working full-time with a regular income", value: "Salaried" },
//   //   { label: "Self Employed Business", description: "Running your own business or startup", value: "SelfEmployedBusiness" },
//   //   { label: "Self Employed Professional", description: "Practicing a profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
//   //   { label: "Student", description: "Currently studying or working part-time", value: "Student" },
//   // ];





//   // ✅ Fetch Phone Number before API call
//   useEffect(() => {
//     const fetchPhoneNumber = async () => {

//       const loan = await AsyncStorage.getItem('loanType');
//       // const loanss = loan ? JSON.parse(loan) : null;
//       setloantype(loan ?? "PersonalLoan");


//       const jsonValue = await AsyncStorage.getItem('appIdData');
//     const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//     setapplicationId(parsedValue);
//     console.log(parsedValue)

//     };
//     fetchPhoneNumber();
//   }, []);



  
// let options = [];

// if (loantype === 'PersonalLoan') {
//   options = [
//     { label: "Salaried", description: "Working Full-Time With A Regular Income", value: "Salaried" },
//     { label: "Self Employed Business", description: "Running Your Own Business Or Startup", value: "SelfEmployedBusiness" },
//     { label: "Self Employed Professional", description: "Practicing A Profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
//     { label: "Student", description: "Currently Studying Or Working Part-time", value: "Student" },
//   ];
// } else if (loantype === 'BusinessLoan') {
//   options = [
//     { label: "Self Employed Business", description: "Running your own business or startup", value: "SelfEmployedBusiness" },
//     { label: "Self Employed Professional", description: "Practicing a profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
//   ];
// }

// console.log(options)



//   // ✅ Handle Employment Selection and Send API Request
//   const handleSelection = async (selectedValue) => {
//     if (!selectedValue) {
//       Alert.alert("Error", "Employment Status Is Required.");
//       return;
//     }

//     setEmploymentType(selectedValue); // ✅ Update the state properly

//     console.log("✔ Selected Employment Type:", selectedValue);

//     setIsLoading(true);

//     try {
//       const requestData = {applicationId, employmentStatus: selectedValue };
//       console.log("🚀 Sending Employment Details:", requestData);

//       const response = await axios.post(`${API_BASE_URL}/loan-application/employment-details`, requestData, {
//         headers: { "Content-Type": "application/json" }, // ✅ Ensure correct headers
//       });

//       if (response.status === 200) {
//         console.log("✅ Employment Details Submitted. Navigating...");

//         // ✅ Dynamic Navigation Based on Employment Type
//         switch (selectedValue) {
//           case "Salaried":
//             navigation.navigate("IncomeandSalaryDetails");
//             break;
//           case "SelfEmployedBusiness":
//             navigation.navigate("BusinessDetailSearch");
//             break;
//           case "SelfEmployedProfessional":
//             navigation.navigate("Professionaldetails");
//             break;
//           case "Student":
//             navigation.navigate("StudentIncomeDetails");
//             break;
//           default:
//             Alert.alert("Error", "Invalid employment type selected.");
//             break;
//         }
//       } else {
//         console.log("❌ API Error Response:", response.data);
//         Alert.alert("Error", response.data.message || "Failed to submit employment details.");
//       }
//     } catch (error) {
//       console.error("❌ Error submitting employment details:", error.response ? error.response.data : error.message);
//       Alert.alert("Error", error.response?.data?.message || "Network error. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, dynamicStyles]}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView style={{ flex: 1 }}>
//           <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={[styles.header]}>Employment Information</ThemedHeadingText>
//               <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
//               <ThemedText style={appStyle.subHeaderTitle}>Tell us about your employment status</ThemedText>
//             </View>

//             {/* ✅ Employment Selection */}
//             <ThemedView>
//               <ThemedRadioButtonList options={options} onValueChange={handleSelection} direction="column" />
//             </ThemedView>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const styles = {
//   container: { flex: 1 },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//   header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
// };

// export default EmploymentInformation;


// import appStyle from "@/AppStyles";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import {
//   View,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Appearance,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_URL } from "@/components/util/api_url";

// const API_BASE_URL = `${BASE_URL}/api`;

// // ---- helpers ---------------------------------------------------------------
// const parseStoredPhone = (raw: string | null) => {
//   if (!raw) return null;
//   try {
//     const parsed = JSON.parse(raw);
//     if (typeof parsed === "string") return parsed;
//     if (parsed?.phoneNumber) return parsed.phoneNumber;
//     return null;
//   } catch {
//     return raw; // was stored as plain string
//   }
// };

// const parseBackendBool = (v: any): boolean => {
//   if (v === true || v === 1) return true;
//   if (v === false || v === 0) return false;
//   if (typeof v === "string") {
//     const s = v.trim().toLowerCase();
//     if (["true", "1", "yes", "y", "completed", "complete", "done", "finished"].includes(s)) return true;
//     if (["false", "0", "no", "n", "incomplete", "pending", "ongoing", "progress"].includes(s)) return false;
//   }
//   return false;
// };

// const msgIndicatesCompleted = (m: any) =>
//   typeof m === "string" &&
//   /previous application .*completed/i.test(m) &&
//   /(start|create)\s+(a\s+)?new\s+one/i.test(m);

// const getServerMessage = (err: any) =>
//   err?.response?.data?.message ||
//   err?.response?.data?.error ||
//   err?.message ||
//   "Unknown server error";

// // ---- component -------------------------------------------------------------
// const EmploymentInformation = ({ navigation }) => {
//   const [applicationId, setApplicationId] = useState<string>("");
//   const [employmentType, setEmploymentType] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [loanType, setLoanType] = useState("PersonalLoan");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const theme = Appearance.getColorScheme();
//   const dynamicStyles = {
//     backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//   };

//   // Options per loan type
//   const options =
//     loanType === "BusinessLoan"
//       ? [
//           { label: "Self Employed Business", description: "Running your own business or startup", value: "SelfEmployedBusiness" },
//           { label: "Self Employed Professional", description: "Practicing a profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
//         ]
//       : [
//           { label: "Salaried", description: "Working Full-Time With A Regular Income", value: "Salaried" },
//           { label: "Self Employed Business", description: "Running Your Own Business Or Startup", value: "SelfEmployedBusiness" },
//           { label: "Self Employed Professional", description: "Practicing A Profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
//           { label: "Student", description: "Currently Studying Or Working Part-time", value: "Student" },
//         ];

//   // API helpers
//   const createApplication = async (payload: any) =>
//     axios.post(`${API_BASE_URL}/loan-application/loan-requirements`, payload, {
//       headers: { "Content-Type": "application/json" },
//     });

//   const saveAppId = async (resp: any, fallback?: string | null) => {
//     const id = resp?.data?.id ?? resp?.data?.applicationId ?? fallback ?? null;
//     if (id) {
//       await AsyncStorage.setItem("appIdData", JSON.stringify(id));
//       setApplicationId(String(id));
//     }
//     return id;
//   };

//   // Bootstrap & ensure we have a valid, *active* applicationId
//   const init = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       // loanType
//       const lt = await AsyncStorage.getItem("loanType");
//       setLoanType(lt ?? "PersonalLoan");

//       // phone
//       const userRaw = await AsyncStorage.getItem("userData");
//       const ph = parseStoredPhone(userRaw);
//       if (!ph) {
//         Alert.alert("Error", "Phone number not found. Please verify OTP first.");
//         navigation.navigate("LoginScreen");
//         return;
//       }
//       setPhoneNumber(ph);

//       // Check the latest app by phone
//       let app;
//       try {
//         const { data, status } = await axios.get(`${API_BASE_URL}/single-loan-application-mobile/${ph}`);
//         if (status === 200) app = data?.data ?? null;
//       } catch (err: any) {
//         // If not found, we'll create a fresh app below
//         if (err?.response?.status !== 404) {
//           console.warn("Fetch app error (non-404):", err?.response?.data || err?.message);
//         }
//       }

//       if (!app) {
//         // No existing app → create fresh
//         const resp = await createApplication({ phoneNumber: ph, loanType: lt ?? "PersonalLoan" });
//         await saveAppId(resp, null);
//         setEmploymentType(""); // nothing to preselect
//         return;
//       }

//       // If server says completed → create new one immediately
//       const completed = parseBackendBool(app.loanDataStatus ?? app.loanCompletion);
//       if (completed) {
//         const resp = await createApplication({ phoneNumber: ph, loanType: lt ?? "PersonalLoan" });
//         await saveAppId(resp, null);
//         setEmploymentType("");
//         return;
//       }

//       // Otherwise use the active (unfinished) app and prefill
//       const id = app.id || app.applicationId;
//       if (id) {
//         await AsyncStorage.setItem("appIdData", JSON.stringify(id));
//         setApplicationId(String(id));
//       }
//       if (app.employmentStatus) setEmploymentType(app.employmentStatus);
//     } catch (e) {
//       console.error("❌ init error:", e?.response?.data || e?.message);
//       Alert.alert("Error", "Unable to set up employment step. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [navigation]);

//   useEffect(() => {
//     init();
//   }, [init]);

//   // Submit selection; if server rejects as "completed", create new app and retry once
//   const handleSelection = async (selectedValue: string) => {
//     if (!selectedValue) {
//       Alert.alert("Error", "Employment Status Is Required.");
//       return;
//     }

//     // Always re-read persisted appId to avoid stale state
//     const appIdRaw = await AsyncStorage.getItem("appIdData");
//     const appIdPersisted = appIdRaw ? JSON.parse(appIdRaw) : null;
//     const currentAppId = appIdPersisted || applicationId;

//     if (!currentAppId) {
//       // No active app — create one and continue
//       try {
//         const resp = await createApplication({ phoneNumber, loanType });
//         const newId = await saveAppId(resp, null);
//         if (!newId) throw new Error("App created but no id returned");
//       } catch (e: any) {
//         Alert.alert("Error", getServerMessage(e));
//         return;
//       }
//     }

//     setEmploymentType(selectedValue);
//     setSubmitting(true);

//     const postOnce = async (appIdToUse: string) => {
//       const payload = { applicationId: appIdToUse, employmentStatus: selectedValue };
//       return axios.post(`${API_BASE_URL}/loan-application/employment-details`, payload, {
//         headers: { "Content-Type": "application/json" },
//       });
//     };

//     try {
//       // 1st attempt
//       const res = await postOnce((appIdPersisted || applicationId) as string);

//       if (res.status === 200) {
//         // route by type
//         switch (selectedValue) {
//           case "Salaried":
//             navigation.navigate("IncomeandSalaryDetails");
//             break;
//           case "SelfEmployedBusiness":
//             navigation.navigate("BusinessDetailSearch");
//             break;
//           case "SelfEmployedProfessional":
//             navigation.navigate("Professionaldetails");
//             break;
//           case "Student":
//             navigation.navigate("StudentIncomeDetails");
//             break;
//           default:
//             Alert.alert("Error", "Invalid employment type selected.");
//             break;
//         }
//         return;
//       }

//       Alert.alert("Error", res?.data?.message || "Failed to submit employment details.");
//     } catch (err: any) {
//       const msg = getServerMessage(err);

//       // If backend says "previous app completed, start new one" → create & retry once
//       if (msgIndicatesCompleted(msg) || err?.response?.status === 409 || err?.response?.status === 422) {
//         try {
//           const resp = await createApplication({ phoneNumber, loanType });
//           const newId = await saveAppId(resp, null);
//           if (!newId) throw new Error("App created but no id returned (retry path).");

//           const res2 = await axios.post(
//             `${API_BASE_URL}/loan-application/employment-details`,
//             { applicationId: newId, employmentStatus: selectedValue },
//             { headers: { "Content-Type": "application/json" } }
//           );

//           if (res2.status === 200) {
//             switch (selectedValue) {
//               case "Salaried":
//                 navigation.navigate("IncomeandSalaryDetails");
//                 break;
//               case "SelfEmployedBusiness":
//                 navigation.navigate("BusinessDetailSearch");
//                 break;
//               case "SelfEmployedProfessional":
//                 navigation.navigate("Professionaldetails");
//                 break;
//               case "Student":
//                 navigation.navigate("StudentIncomeDetails");
//                 break;
//             }
//             return;
//           }

//           Alert.alert("Error", res2?.data?.message || "Failed to submit employment details.");
//         } catch (e2: any) {
//           console.error("❌ Retry submit error:", e2?.response?.data || e2?.message);
//           Alert.alert("Error", getServerMessage(e2));
//         }
//       } else {
//         console.error("❌ Submit error:", err?.response?.data || err?.message);
//         Alert.alert("Error", msg);
//       }
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
//         <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
//           <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={[styles.header]}>Employment Information</ThemedHeadingText>
//               <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
//               <ThemedText style={appStyle.subHeaderTitle}>Tell us about your employment status</ThemedText>
//             </View>

//             <ThemedView>
//               <ThemedRadioButtonList
//                 options={options}
//                 selectedValue={employmentType}
//                 value={employmentType}
//                 onValueChange={handleSelection}
//                 direction="column"
//                 disabled={submitting}
//               />
//             </ThemedView>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const styles = {
//   container: { flex: 1 },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//   header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
// };

// export default EmploymentInformation;


import appStyle from "@/AppStyles";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Appearance,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/components/util/api_url";

const API_BASE_URL = `${BASE_URL}/api`;

/* ---------------- helpers ---------------- */
const parseStoredPhone = (raw: string | null) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return parsed;
    if (parsed?.phoneNumber) return parsed.phoneNumber;
    return null;
  } catch {
    return raw; // plain string phone
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
const EmploymentInformation = ({ navigation }) => {
  const [applicationId, setApplicationId] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loanType, setLoanType] = useState("PersonalLoan");
  const [phoneNumber, setPhoneNumber] = useState("");

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  // Options per loan type
  const options =
    loanType === "BusinessLoan"
      ? [
          { label: "Self Employed Business", description: "Running your own business or startup", value: "SelfEmployedBusiness" },
          { label: "Self Employed Professional", description: "Practicing a profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
        ]
      : [
          { label: "Salaried", description: "Working Full-Time With A Regular Income", value: "Salaried" },
          { label: "Self Employed Business", description: "Running Your Own Business Or Startup", value: "SelfEmployedBusiness" },
          { label: "Self Employed Professional", description: "Practicing A Profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
          { label: "Student", description: "Currently Studying Or Working Part-time", value: "Student" },
        ];

  // API helpers
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

  // Bootstrap & ensure we have a valid, *active* applicationId using the prefill endpoint
  const init = useCallback(async () => {
    setIsLoading(true);
    try {
      // loanType
      const lt = await AsyncStorage.getItem("loanType");
      setLoanType(lt ?? "PersonalLoan");

      // phone
      const userRaw = await AsyncStorage.getItem("userData");
      const ph = parseStoredPhone(userRaw);
      if (!ph) {
        Alert.alert("Error", "Phone number not found. Please verify OTP first.");
        navigation.navigate("LoginScreen");
        return;
      }
      setPhoneNumber(ph);

      // NOTE: use the *prefill* endpoint
      const url = `${API_BASE_URL}/single-loan-application-mobileprefill/${encodeURIComponent(ph)}`;

      let app: any = null;
      try {
        const { data, status } = await axios.get(url);
        const payload = data?.data;
        if (status === 200) {
          app = Array.isArray(payload) ? pickBestApp(payload) : payload ?? null;
        }
      } catch (err: any) {
        if (err?.response?.status !== 404) {
          console.warn("Fetch prefill error (non-404):", err?.response?.data || err?.message);
        }
      }

      if (!app) {
        // No app → create fresh
        const resp = await createApplication({ phoneNumber: ph, loanType: lt ?? "PersonalLoan" });
        await saveAppId(resp, null);
        setEmploymentType(""); // nothing to preselect
        return;
      }

      // If server says completed → create new one immediately
      const completed = parseBackendBool(app.loanDataStatus ?? app.loanCompletion);
      if (completed) {
        const resp = await createApplication({ phoneNumber: ph, loanType: lt ?? "PersonalLoan" });
        await saveAppId(resp, null);
        setEmploymentType("");
        return;
      }

      // Otherwise: active (unfinished) app → persist id & preselect
      const id = extractAppId(app) ?? app?.id ?? app?.applicationId;
      if (id) {
        await AsyncStorage.setItem("appIdData", JSON.stringify(id));
        setApplicationId(String(id));
      }
      if (app.employmentStatus) setEmploymentType(app.employmentStatus);
    } catch (e: any) {
      console.error("❌ init error:", e?.response?.data || e?.message);
      Alert.alert("Error", "Unable to set up employment step. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    init();
  }, [init]);

  // Submit selection
  const handleSelection = async (selectedValue: string) => {
    if (!selectedValue) {
      Alert.alert("Error", "Employment Status Is Required.");
      return;
    }

    // Always re-read persisted appId to avoid stale state
    const appIdRaw = await AsyncStorage.getItem("appIdData");
    let currentAppId = appIdRaw ? JSON.parse(appIdRaw) : applicationId;

    // If missing, create one and continue
    if (!currentAppId) {
      try {
        const resp = await createApplication({ phoneNumber, loanType });
        const newId = await saveAppId(resp, null);
        if (!newId) throw new Error("App created but no id returned");
        currentAppId = newId;
      } catch (e: any) {
        Alert.alert("Error", getServerMessage(e));
        return;
      }
    }

    setEmploymentType(selectedValue);
    setSubmitting(true);

    try {
      const payload = { applicationId: String(currentAppId), employmentStatus: selectedValue };
      const res = await axios.post(`${API_BASE_URL}/loan-application/employment-details`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        switch (selectedValue) {
          case "Salaried":
            navigation.navigate("IncomeandSalaryDetails");
            break;
          case "SelfEmployedBusiness":
            navigation.navigate("BusinessDetailSearch");
            break;
          case "SelfEmployedProfessional":
            navigation.navigate("Professionaldetails");
            break;
          case "Student":
            navigation.navigate("StudentIncomeDetails");
            break;
          default:
            Alert.alert("Error", "Invalid employment type selected.");
        }
      } else {
        Alert.alert("Error", res?.data?.message || "Failed to submit employment details.");
      }
    } catch (err: any) {
      console.error("❌ Submit error:", err?.response?.data || err?.message);
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
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={[styles.header]}>Employment Information</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
              <ThemedText style={appStyle.subHeaderTitle}>Tell us about your employment status</ThemedText>
            </View>

            <ThemedView>
              <ThemedRadioButtonList
                options={options}
                selectedValue={employmentType}
                value={employmentType}
                onValueChange={handleSelection}
                direction="column"
                disabled={submitting}
              />
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = {
  container: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
};

export default EmploymentInformation;


