// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { BASE_URL } from "@/components/util/api_url";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// import {
//     View,
//     Text,
//     SafeAreaView,
//     KeyboardAvoidingView,
//     ScrollView,
//     Keyboard,
//     TouchableWithoutFeedback,
//     Pressable,
//     Alert,
//     StyleSheet,
//     ActivityIndicator,
// } from "react-native";

// const API_BASE_URL = `${BASE_URL}/api`;

// const SalariedReasontoApplyforLoan = ({ navigation }) => {
//     const [applicationId, setApplicationId] = useState("");
//     const [selectedLoanPurpose, setSelectedLoanPurpose] = useState("");
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         fetchApplicationId();
//     }, []);

//     // ✅ Fetch Application ID from AsyncStorage
//     const fetchApplicationId = async () => {
//         try {
//             const jsonValue = await AsyncStorage.getItem("appIdData");
//             const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//             setApplicationId(parsedValue);
//         } catch (error) {
//             console.error("❌ Error fetching application ID:", error);
//             Alert.alert("Error", "Failed to retrieve application ID.");
//         }
//     };

//     // ✅ Validate Input
//     const validateInput = () => {
//         let valid = true;
//         let errorObj = {};

//         if (!selectedLoanPurpose) {
//             errorObj.loanPurpose = "Please select a loan purpose";
//             valid = false;
//         }

//         setErrors(errorObj);
//         return valid;
//     };

//     // ✅ Handle API Submission
//     const handleSubmit = async () => {
//         if (!validateInput()) return;

//         setIsLoading(true);
//         try {

//             const jsonValue = await AsyncStorage.getItem("appIdData");
    
//             if (!jsonValue || jsonValue.trim() === "") {
//                 Alert.alert("Error", "Application ID is missing or invalid.");
//                 // navigation.navigate("Home");
//                 return;
//             }

//             const requestData = {
//                 applicationId,
//                 loanPurpose: selectedLoanPurpose,
//                 loanCompletion: true,
//             };

//             console.log("📤 Sending Data:", requestData);

//             const response = await axios.post(
//                 `${API_BASE_URL}/loan-application/loan-purpose`,
//                 requestData
//             );

//             if (response.status === 200) {
//                 navigation.navigate("LoanOffer");
//             } else {
//                 Alert.alert("Error", response.data.message || "Failed to save loan purpose.");
//             }
//         } catch (error) {
//             console.error("❌ Error submitting loan purpose:", error);
//             Alert.alert("Error", error.response?.data?.message || "Network error. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const Reason = [
//         { label: 'Working Capital Expense', value: 'Working Capital Expense' },
//         { label: 'Purchase Material', value: 'Purchase Material' },
//         { label: 'Buy/Upgrade Machine/Equipments', value: 'Buy/Upgrade Machine/Equipments' },
//         { label: 'Buy Office/Factory Space', value: 'Buy Office/Factory Space' },
//         { label: 'Marketing Expense', value: 'Marketing Expense' },
//         { label: 'Payback Existing Loans/Credit Card Bills', value: 'Payback Existing Loans/Credit Card Bills' },
//         { label: 'Others', value: 'Others' }
//     ];


//     return (
//         <SafeAreaView style={appStyle.gstcraeccontainer}>
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
//                     <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//                         <View style={appStyle.HeadingTitle}>
//                             <ThemedHeadingText style={[styles.header]}>Loan Purpose: Reason to Apply for Loan</ThemedHeadingText>
//                             <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
//                         </View>

//                         <ThemedView>
//                             <ThemedRadioButtonList
//                                 onValueChange={(value) => setSelectedLoanPurpose(value)}
//                                 options={Reason}
//                                 direction="column"
//                                 navigation={navigation}
//                             />
//                         </ThemedView>

//                         {errors.loanPurpose && <Text style={styles.errorText}>{errors.loanPurpose}</Text>}
//                     </ScrollView>

//                     {/* Submit Button */}
//                     <View style={styles.buttonContainer}>
//                         <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
//                             {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Check Eligibility</Text>}
//                         </Pressable>
//                     </View>
//                 </KeyboardAvoidingView>
//             </TouchableWithoutFeedback>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1},
//     scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//     header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
//     buttonContainer: { left: 0, right: 0, bottom: 24, alignItems: "center" },
//     button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
//     buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
//     errorText: { color: "red", fontSize: 12, marginTop: 5 },
// });

// export default SalariedReasontoApplyforLoan;




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
//   Text,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Pressable,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
//   Platform,
// } from "react-native";

// const API_BASE_URL = `${BASE_URL}/api`;

// const SalariedReasontoApplyforLoan = ({ navigation }) => {
//   const [applicationId, setApplicationId] = useState("");
//   const [selectedLoanPurpose, setSelectedLoanPurpose] = useState("");
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

//   const init = useCallback(async () => {
//     try {
//       // 1) Load phone number
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
//             // server app id is source of truth
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

//             // Prefill loan purpose (if previously chosen)
//             if (app.loanPurpose) setSelectedLoanPurpose(app.loanPurpose);

//             setInitLoading(false);
//             return;
//           }

//           // Completed -> force new loan
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

//   // ✅ Validate Input
//   const validateInput = () => {
//     let valid = true;
//     let errorObj = {};

//     if (!selectedLoanPurpose) {
//       errorObj.loanPurpose = "Please select a loan purpose";
//       valid = false;
//     }

//     setErrors(errorObj);
//     return valid;
//   };

//   // ✅ Handle API Submission
//   const handleSubmit = async () => {
//     if (!validateInput()) return;

//     if (!applicationId) {
//       Alert.alert("Error", "No active application. Please start a new application.");
//       navigation.replace("LoanRequirements");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const requestData = {
//         applicationId,
//         loanPurpose: selectedLoanPurpose,
//         loanCompletion: true, // mark as completed
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/loan-application/loan-purpose`,
//         requestData
//       );

//       if (response.status === 200) {
//         navigation.navigate("LoanOffer");
//       } else {
//         Alert.alert("Error", response.data?.message || "Failed to save loan purpose.");
//       }
//     } catch (error) {
//       console.error("❌ Error submitting loan purpose:", error?.response?.data || error.message);
//       Alert.alert("Error", error?.response?.data?.message || "Network error. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const Reason = [
//     { label: "Working Capital Expense", value: "Working Capital Expense" },
//     { label: "Purchase Material", value: "Purchase Material" },
//     { label: "Buy/Upgrade Machine/Equipments", value: "Buy/Upgrade Machine/Equipments" },
//     { label: "Buy Office/Factory Space", value: "Buy Office/Factory Space" },
//     { label: "Marketing Expense", value: "Marketing Expense" },
//     { label: "Payback Existing Loans/Credit Card Bills", value: "Payback Existing Loans/Credit Card Bills" },
//     { label: "Others", value: "Others" },
//   ];

//   if (initLoading) {
//     return (
//       <SafeAreaView style={appStyle.gstcraeccontainer}>
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//           <ActivityIndicator />
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={appStyle.gstcraeccontainer}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//           <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={[styles.header]}>
//                 Loan Purpose: Reason to Apply for Loan
//               </ThemedHeadingText>
//               <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
//             </View>

//             <ThemedView>
//               <ThemedRadioButtonList
//                 options={Reason}
//                 onValueChange={(value) => setSelectedLoanPurpose(value)}
//                 direction="column"
//                 // Preselect (component compatibility: selectedValue/value/defaultValue)
//                 selectedValue={selectedLoanPurpose}
//                 value={selectedLoanPurpose}
//                 defaultValue={selectedLoanPurpose}
//                 navigation={navigation}
//               />
//             </ThemedView>

//             {errors.loanPurpose ? <Text style={styles.errorText}>{errors.loanPurpose}</Text> : null}
//           </ScrollView>

//           {/* Submit Button */}
//           <View style={styles.buttonContainer}>
//             <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
//               {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Check Eligibility</Text>}
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//   header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
//   buttonContainer: { left: 0, right: 0, bottom: 24, alignItems: "center" },
//   button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
//   errorText: { color: "red", fontSize: 12, marginTop: 5 },
// });

// export default SalariedReasontoApplyforLoan;




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
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";

const API_BASE_URL = `${BASE_URL}/api`;
const API_CREATE_URL = `${BASE_URL}/api/loan-application/loan-requirements`; // POST { phoneNumber, loanType }

/* ---------------- helpers ---------------- */
const parseStoredPhone = (raw: any) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return parsed;
    if (parsed?.phoneNumber) return parsed.phoneNumber;
    return null;
  } catch {
    return raw; // stored as plain string
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
  if (!Array.isArray(apps) || apps.length === 0) return null;
  const rows = apps.map(a => ({
    raw: a,
    completed: parseBackendBool(a?.loanCompletion ?? a?.loanDataStatus),
    createdAt: a?.createdAt ? new Date(a.createdAt).getTime() : 0,
    updatedAt: a?.updatedAt ? new Date(a.updatedAt).getTime() : 0,
  }));
  const incomplete = rows
    .filter(r => !r.completed)
    .sort((a,b) => (b.updatedAt - a.updatedAt) || (b.createdAt - a.createdAt));
  return incomplete[0]?.raw ?? null;
};
/** GET all apps for phone; normalize to array */
const prefillByPhone = async (phone: string) => {
  const url = `${API_BASE_URL}/single-loan-application-mobileprefill/${encodeURIComponent(phone)}`;
  const res = await axios.get(url, { timeout: 15000, headers: { Accept: "application/json" } });
  if (res.status !== 200) throw new Error(`Prefill HTTP ${res.status}`);
  const body = res?.data;
  const payload = (Array.isArray(body?.data) || typeof body?.data === "object") ? body.data : body;
  return Array.isArray(payload) ? payload : (payload ? [payload] : []);
};
/** POST create new app for phone (if none incomplete) */
const createNewApplication = async (phone: string) => {
  const loanType = (await AsyncStorage.getItem("loanType")) ?? "PersonalLoan";
  await axios.post(
    API_CREATE_URL,
    { phoneNumber: phone, loanType },
    { headers: { "Content-Type": "application/json" } }
  );
};

/* ---------------- component ---------------- */
const SalariedReasontoApplyforLoan = ({ navigation }) => {
  const [applicationId, setApplicationId] = useState("");
  const [selectedLoanPurpose, setSelectedLoanPurpose] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  /** init: prefer stored incomplete app; else pick most recent incomplete; else create new and refetch */
  const init = useCallback(async () => {
    setInitLoading(true);
    try {
      // phone
      const userRaw = await AsyncStorage.getItem("userData");
      const ph = parseStoredPhone(userRaw);
      if (!ph) {
        Alert.alert("Error", "Phone number not found. Please verify OTP first.");
        navigation.navigate("LoginScreen");
        return;
      }

      // gather all apps
      let apps = await prefillByPhone(ph);

      // try stored id first
      const storedIdRaw = await AsyncStorage.getItem("appIdData");
      const storedId = storedIdRaw ? JSON.parse(storedIdRaw) : null;
      let selected =
        storedId &&
        apps.find(a => sameId(extractAppId(a) ?? a?.id ?? a?.applicationId, storedId));

      // if stored match is completed, ignore
      if (selected && parseBackendBool(selected?.loanCompletion ?? selected?.loanDataStatus)) {
        selected = null;
      }

      // else pick most recent incomplete
      if (!selected) {
        selected = pickBestIncomplete(apps);
      }

      // if none incomplete → create new and refetch → pick incomplete
      if (!selected) {
        await createNewApplication(ph);
        apps = await prefillByPhone(ph);
        selected = pickBestIncomplete(apps);
        if (!selected) throw new Error("Application created but no incomplete application returned.");
      }

      // apply selected app
      const id = extractAppId(selected) ?? selected?.id ?? selected?.applicationId;
      if (!id) throw new Error("No application ID available.");
      setApplicationId(String(id));
      await AsyncStorage.setItem("appIdData", JSON.stringify(id));

      // prefill loan purpose if already set
      if (selected?.loanPurpose) setSelectedLoanPurpose(selected.loanPurpose);

    } catch (e: any) {
      console.error("❌ init error:", e?.response?.data || e?.message);
      Alert.alert("Error", e?.message || "Unable to initialise loan purpose step.");
      navigation.replace("LoanRequirements");
    } finally {
      setInitLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    init();
  }, [init]);

  // Validate
  const validateInput = () => {
    const err: Record<string,string> = {};
    if (!selectedLoanPurpose) err.loanPurpose = "Please select a loan purpose";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Submit
  const handleSubmit = async () => {
    if (!validateInput()) return;

    if (!applicationId) {
      Alert.alert("Error", "No active application. Please start a new application.");
      navigation.replace("LoanRequirements");
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
        applicationId,
        loanPurpose: selectedLoanPurpose,
        loanCompletion: true, // mark as completed
      };

      const response = await axios.post(`${API_BASE_URL}/loan-application/loan-purpose`, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        navigation.navigate("LoanOffer");
      } else {
        Alert.alert("Error", response.data?.message || "Failed to save loan purpose.");
      }
    } catch (error: any) {
      console.error("❌ submit error:", error?.response?.data || error.message);
      Alert.alert("Error", error?.response?.data?.message || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const Reason = [
    { label: "Working Capital Expense", value: "Working Capital Expense" },
    { label: "Purchase Material", value: "Purchase Material" },
    { label: "Buy/Upgrade Machine/Equipments", value: "Buy/Upgrade Machine/Equipments" },
    { label: "Buy Office/Factory Space", value: "Buy Office/Factory Space" },
    { label: "Marketing Expense", value: "Marketing Expense" },
    { label: "Payback Existing Loans/Credit Card Bills", value: "Payback Existing Loans/Credit Card Bills" },
    { label: "Others", value: "Others" },
  ];

  if (initLoading) {
    return (
      <SafeAreaView style={appStyle.gstcraeccontainer}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={appStyle.gstcraeccontainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={[styles.header]}>
                Loan Purpose: Reason to Apply for Loan
              </ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
            </View>

            <ThemedView>
              <ThemedRadioButtonList
                options={Reason}
                onValueChange={(value) => setSelectedLoanPurpose(value)}
                direction="column"
                selectedValue={selectedLoanPurpose}
                value={selectedLoanPurpose}
                defaultValue={selectedLoanPurpose}
                navigation={navigation}
              />
            </ThemedView>

            {errors.loanPurpose ? <Text style={styles.errorText}>{errors.loanPurpose}</Text> : null}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Check Eligibility</Text>}
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
  buttonContainer: { left: 0, right: 0, bottom: 24, alignItems: "center" },
  button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  errorText: { color: "red", fontSize: 12, marginTop: 5 },
});

export default SalariedReasontoApplyforLoan;
