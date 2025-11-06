// import appStyle from "@/AppStyles";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { BASE_URL } from "@/components/util/api_url";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     FlatList,
//     Modal,
//     Appearance,
//     SafeAreaView,
//     Keyboard,
//     Pressable,
//     Image,
//     TextInput,
//     Alert,
//     ActivityIndicator
// } from "react-native";

// const API_BASE_URL = `${BASE_URL}/api`;

// const BankAccount = ({ navigation }) => {
//     const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [selectedBank, setSelectedBank] = useState(null);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredBanks, setFilteredBanks] = useState([]);
//     const [applicationId, setApplicationId] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const [employmentStatus, setEmploymentStatus] = useState()

//     useEffect(() => {
//         fetchApplicationId(); // Fetch application ID and employment status

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

//             if (parsedValue) {
//                 fetchLoanApplicationDetails(parsedValue);
//             }
//         } catch (error) {
//             console.error("❌ Error fetching application ID:", error);
//             Alert.alert("Error", "Failed to retrieve application ID.");
//         }
//     };

//     const fetchLoanApplicationDetails = async (applicationId) => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/loan-application?applicationId=${applicationId}`);
            
//             if (response.status === 200) {
//                 const employmentStatus = response.data.loanApplication.employmentStatus;
//                 console.log("💼 Employment Status:", employmentStatus);
    
//                 // Store employment status instead of navigating immediately
//                 setEmploymentStatus(employmentStatus);
//             }
//         } catch (error) {
//             console.error("❌ Error fetching loan application details:", error);
//             Alert.alert("Error", "Failed to fetch loan application details.");
//         }
//     };

//     const banks = [
//         "HDFC Bank", "ICICI Bank", "Kotak Bank", "IDFC Bank", "HSBC Bank",
//         "SBI Bank", "Axis Bank", "Yes Bank", "IndusInd Bank", "RBL Bank",
//         "UCO Bank", "Indian Overseas Bank", "Federal Bank", "Central Bank Of India",
//         "Karnataka Bank", "South Indian Bank", "Jammu & Kashmir Bank", "Other Bank"
//     ];

//     useEffect(() => {
//         setFilteredBanks(banks);
//     }, []);

//     const handleSearch = (query) => {
//         setSearchQuery(query);
//         const filtered = banks.filter((bank) =>
//             bank.toLowerCase().includes(query.toLowerCase())
//         );
//         setFilteredBanks(filtered);
//     };

//     const theme = Appearance.getColorScheme();
//     const dynamicStyles = {
//         backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//         shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//     };

//     const handleSubmit = async () => {
//         if (!selectedBank) {
//             Alert.alert("Select", "Please select a bank.");
//             return;
//         }
//         if (!applicationId) {
//             Alert.alert("Error", "Application ID is missing.");
//             return;
//         }
    
//         setIsLoading(true);
    
//         try {
//             const requestData = { applicationId, salaryBank: selectedBank };
    
//             console.log("📤 Sending Data:", requestData);
    
//             const response = await axios.post(`${API_BASE_URL}/loan-application/bank`, requestData);
    
//             if (response.status === 200) {
               
//                 // Now navigate based on stored employment status
//                 if (employmentStatus === "Salaried") {
//                     navigation.navigate("EmploymentDetails");
//                 } else if (employmentStatus === "SelfEmployedBusiness") {
//                     navigation.navigate("SelfReasontoApplyforLoan");
//                 } else if (employmentStatus === "SelfEmployedProfessional") {
//                     navigation.navigate("SelfReasontoApplyforLoan");
//                 } else if (employmentStatus === "Student") {
//                     navigation.navigate("FamilyDetails");
//                 } else {
//                     Alert.alert("Error", "Invalid employment status. Please try again.");
//                 }
//             } else {
//                 Alert.alert("Error", response.data.message || "Failed to update bank details.");
//             }
//         } catch (error) {
//             console.error("❌ Error submitting bank details:", error);
            
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const renderBankItem = ({ item }) => (
//         <TouchableOpacity
//             style={[styles.bankItem, selectedBank === item && { borderColor: "#FF4800" }]}
//             onPress={() => {
//                 setSelectedBank(item);
//                 setModalVisible(false);
//             }}
//         >
//             <View style={styles.radioContainer}>
//                 <ThemedText style={styles.bankText}>{item}</ThemedText>
//                 <View
//                     style={[styles.radioButton, selectedBank === item && { backgroundColor: "#FF4800" }]}
//                 />
//             </View>
//         </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={[styles.container, dynamicStyles]}>
//             <View style={styles.scrollContainer}>
//                 <View style={appStyle.HeadingTitle}>
//                     <ThemedHeadingText style={styles.header}>Salary Bank Account</ThemedHeadingText>
//                     <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
//                 </View>

//                 <FlatList
//                     data={banks.slice(0, 10)}
//                     renderItem={renderBankItem}
//                     keyExtractor={(item, index) => index.toString()}
//                     numColumns={2}
//                     columnWrapperStyle={styles.row}
//                     ListFooterComponent={
//                         <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
//                             <ThemedHeadingText style={styles.openModalText}>View More</ThemedHeadingText>
//                         </TouchableOpacity>
//                     }
//                 />
//             </View>

//             <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
//                 <ThemedView style={styles.modalContainer}>
//                     <TextInput style={appStyle.banksearchBox} placeholder="Search Your Bank..." value={searchQuery} onChangeText={handleSearch} />
//                     <FlatList data={filteredBanks} renderItem={renderBankItem} keyExtractor={(item, index) => index.toString()} />
//                 </ThemedView>
//             </Modal>

//             <View style={appStyle.buttonContainer}>
//                 <Pressable style={appStyle.button} onPress={handleSubmit} disabled={isLoading}>
//                     {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={appStyle.buttonText}>Continue</Text>}
//                 </Pressable>
//             </View>
//         </SafeAreaView>
//     );
// };

// // const styles = StyleSheet.create({
// //     container: { flex: 1 },
// //     scrollContainer: { paddingHorizontal: 20, paddingBottom: 20, flex: 1 },
// //     header: { fontSize: 18, fontWeight: "bold" },
// //     row: { justifyContent: "space-between", flex: 1 },
// //     openModalButton: { padding: 16, borderRadius: 8, textAlign: "center" },
// //     searchBox: { height: 50, backgroundColor: "#F1F1F1", paddingHorizontal: 50, marginBottom: 16, flex: 1 },
// // });




// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     scrollContainer: {
//         paddingHorizontal: 20,
//         paddingBottom: 20,
//         flex:1
//     },

//     header: {
//         fontSize: 18,
//         fontWeight: "bold",
//     },
//     row: {
//         justifyContent: 'space-between',
//         flex: 1,

//     },

//     openModalButton: {
//         padding: 16,
//         borderRadius: 8,
//         textAlign: 'center',
//         justifyContent: 'center'
//     },
//     searchBox: {
//         height: 48,
//         backgroundColor: '#F1F1F1',
//         paddingHorizontal: 10,
//         zIndex: 1
//     },

//     openModalText: {
//         textAlign: 'center',
//         fontWeight: '500'
//     },
//     bankItem: {
//         flex: 1,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         // borderColor: '#ccc',
//         borderRadius: 8,
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     bankText: {
//         fontSize: 16,
//         marginLeft: 10,
//         flex: 1
//     },
//     viewMoreButton: {
//         alignSelf: 'center',
//         marginTop: 0,
//     },
//     viewMoreText: {
//         color: '#FF4800',
//         fontSize: 16,
//     },
//     modalContainer: {
//         flex: 1,
//         padding: 0,

//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },

//     buttonContainer: {
//         position: "absolute",
//         left: 0,
//         right: 0,
//         bottom: 0,
//         alignItems: "center",
//         paddingHorizontal: 15
//     },
//     button: {
//         backgroundColor: "#FF4800",
//         paddingVertical: 15,
//         paddingHorizontal: 40,
//         borderRadius: 5,
//         width: "100%",
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//         textAlign: 'center',
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 14,
//         justifyContent: 'space-between'

//     },
//     radioButton: {
//         width: 16,
//         height: 16,
//         borderRadius: 8,
//         borderWidth: 1,
//         marginRight: 10,
        
//     },
// });



// export default BankAccount;


import appStyle from "@/AppStyles";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BASE_URL } from "@/components/util/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Appearance,
  SafeAreaView,
  Keyboard,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const API_BASE_URL = `${BASE_URL}/api`;

/* ---------------- helpers ---------------- */
const parseStoredPhone = (raw: any) => {
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
    .filter((r) => !r.completed)
    .sort((a, b) => (b.updatedAt - a.updatedAt) || (b.createdAt - a.createdAt));
  if (incomplete[0]) return incomplete[0].raw;
  return rows.sort((a, b) => (b.updatedAt - a.updatedAt) || (b.createdAt - a.createdAt))[0].raw;
};

const getServerMessage = (err: any) =>
  err?.response?.data?.message || err?.response?.data?.error || err?.message || "Unknown server error";

/* API */
const prefillByPhone = (phone: string) =>
  axios.get(`${API_BASE_URL}/single-loan-application-mobileprefill/${encodeURIComponent(phone)}`);

const createApplication = (payload: any) =>
  axios.post(`${API_BASE_URL}/loan-application/loan-requirements`, payload, {
    headers: { "Content-Type": "application/json" },
  });

/* -------------- component ---------------- */
const BankAccount = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBanks, setFilteredBanks] = useState<string[]>([]);

  const [applicationId, setApplicationId] = useState<string>("");   // local only (no setItem)
  const [employmentStatus, setEmploymentStatus] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  const banks = [
    "HDFC Bank", "ICICI Bank", "Kotak Bank", "IDFC Bank", "HSBC Bank",
    "SBI Bank", "Axis Bank", "Yes Bank", "IndusInd Bank", "RBL Bank",
    "UCO Bank", "Indian Overseas Bank", "Federal Bank", "Central Bank Of India",
    "Karnataka Bank", "South Indian Bank", "Jammu & Kashmir Bank", "Other Bank"
  ];

  useEffect(() => { setFilteredBanks(banks); }, []);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredBanks(banks.filter((b) => b.toLowerCase().includes(query.toLowerCase())));
  };

  /** Make sure we have an active (unfinished) app; else create and refetch prefill */
  const ensureActiveApp = useCallback(async (phone: string) => {
    // 1) prefill call
    let app: any = null;
    try {
      const { data, status } = await prefillByPhone(phone);
      if (status === 200) {
        const payload = data?.data;
        app = Array.isArray(payload) ? pickBestApp(payload) : payload ?? null;
      }
    } catch {
      // if fetch fails, we'll try creation flow
    }

    // 2) no app → create then refetch prefill to get id
    if (!app) {
      const loanType = (await AsyncStorage.getItem("loanType")) ?? "PersonalLoan";
      await createApplication({ phoneNumber: phone, loanType });
      // refetch
      const { data } = await prefillByPhone(phone);
      const payload = data?.data;
      app = Array.isArray(payload) ? pickBestApp(payload) : payload ?? null;
    }

    if (!app) throw new Error("Unable to load or create a loan application.");

    // 3) if completed → create fresh then refetch prefill
    const completed = parseBackendBool(app.loanDataStatus ?? app.loanCompletion);
    if (completed) {
      const loanType = (await AsyncStorage.getItem("loanType")) ?? "PersonalLoan";
      await createApplication({ phoneNumber: phone, loanType });
      const { data } = await prefillByPhone(phone);
      const payload = data?.data;
      app = Array.isArray(payload) ? pickBestApp(payload) : payload ?? null;
      if (!app) throw new Error("Application created but could not be retrieved.");
    }

    // 4) now app should be unfinished → set state (no storage writes)
    const id = extractAppId(app) ?? app.id ?? app.applicationId;
    if (!id) throw new Error("No application ID available");
    setApplicationId(String(id));

    if (app.salaryBank) setSelectedBank(app.salaryBank);
    if (app.employmentStatus) setEmploymentStatus(app.employmentStatus);

    return app;
  }, []);

  /** INIT: get phone; ensure active app; prefill UI */
  useEffect(() => {
    (async () => {
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
        await ensureActiveApp(ph);
      } catch (e: any) {
        console.error("❌ init error:", e?.response?.data || e?.message);
        Alert.alert("Error", e?.message || "Failed to load bank step.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [ensureActiveApp, navigation]);

  const handleSubmit = async () => {
    if (!selectedBank) {
      Alert.alert("Select", "Please select a bank.");
      return;
    }
    if (!applicationId) {
      Alert.alert("Error", "No application ID available. Please go back and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const requestData = { applicationId: String(applicationId), salaryBank: selectedBank };
      const response = await axios.post(`${API_BASE_URL}/loan-application/bank`, requestData);

      if (response.status === 200) {
        if (employmentStatus === "Salaried") {
          navigation.navigate("EmploymentDetails");
        } else if (employmentStatus === "SelfEmployedBusiness") {
          navigation.navigate("SelfReasontoApplyforLoan");
        } else if (employmentStatus === "SelfEmployedProfessional") {
          navigation.navigate("SelfReasontoApplyforLoan");
        } else if (employmentStatus === "Student") {
          navigation.navigate("FamilyDetails");
        } else {
          Alert.alert("Error", "Invalid employment status. Please try again.");
        }
      } else {
        Alert.alert("Error", response.data?.message || "Failed to update bank details.");
      }
    } catch (err: any) {
      console.error("❌ Error submitting bank details:", err?.response?.data || err?.message);
      Alert.alert("Error", getServerMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const renderBankItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.bankItem, selectedBank === item && { borderColor: "#FF4800" }]}
      onPress={() => {
        setSelectedBank(item);
        setModalVisible(false);
      }}
    >
      <View style={styles.radioContainer}>
        <ThemedText style={styles.bankText}>{item}</ThemedText>
        <View
          style={[
            styles.radioButton,
            { borderColor: selectedBank === item ? "#FF4800" : "#999" },
            selectedBank === item && { backgroundColor: "#FF4800" },
          ]}
        />
      </View>
    </TouchableOpacity>
  );

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
          <View style={styles.scrollContainer}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={styles.header}>Salary Bank Account</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
            </View>

            <FlatList
              data={banks.slice(0, 10)}
              renderItem={renderBankItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              ListFooterComponent={
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
                  <ThemedHeadingText style={styles.openModalText}>View More</ThemedHeadingText>
                </TouchableOpacity>
              }
            />
          </View>

          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <ThemedView style={styles.modalContainer}>
              <TextInput
                style={appStyle.banksearchBox}
                placeholder="Search Your Bank..."
                value={searchQuery}
                onChangeText={handleSearch}
              />
              <FlatList
                data={filteredBanks}
                renderItem={renderBankItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </ThemedView>
          </Modal>

          <View style={appStyle.buttonContainer}>
            <Pressable style={appStyle.button} onPress={handleSubmit} disabled={submitting}>
              {submitting ? <ActivityIndicator color="#fff" /> : <Text style={appStyle.buttonText}>Continue</Text>}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20, flex: 1 },
  header: { fontSize: 18, fontWeight: "bold" },
  row: { justifyContent: "space-between", flex: 1 },
  openModalButton: { padding: 16, borderRadius: 8, textAlign: "center", justifyContent: "center" },
  openModalText: { textAlign: "center", fontWeight: "500" },
  bankItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bankText: { fontSize: 16, marginLeft: 10, flex: 1 },
  modalContainer: { flex: 1, padding: 0 },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    justifyContent: "space-between",
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 10,
  },
});

export default BankAccount;



// import appStyle from "@/AppStyles";
// import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { BASE_URL } from "@/components/util/api_url";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Modal,
//   Appearance,
//   SafeAreaView,
//   Keyboard,
//   Pressable,
//   TextInput,
//   Alert,
//   ActivityIndicator,
// } from "react-native";

// const API_BASE_URL = `${BASE_URL}/api`;

// const BankAccount = ({ navigation }) => {
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedBank, setSelectedBank] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredBanks, setFilteredBanks] = useState([]);
//   const [applicationId, setApplicationId] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const [employmentStatus, setEmploymentStatus] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const theme = Appearance.getColorScheme();
//   const dynamicStyles = {
//     backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//     shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
//   };

//   const banks = [
//     "HDFC Bank", "ICICI Bank", "Kotak Bank", "IDFC Bank", "HSBC Bank",
//     "SBI Bank", "Axis Bank", "Yes Bank", "IndusInd Bank", "RBL Bank",
//     "UCO Bank", "Indian Overseas Bank", "Federal Bank", "Central Bank Of India",
//     "Karnataka Bank", "South Indian Bank", "Jammu & Kashmir Bank", "Other Bank"
//   ];

//   useEffect(() => {
//     setFilteredBanks(banks);
//   }, []);

//   useEffect(() => {
//     const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
//     const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
//     return () => {
//       show.remove();
//       hide.remove();
//     };
//   }, []);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const filtered = banks.filter((b) =>
//       b.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredBanks(filtered);
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
//       // Phone number for GET /single-loan-application-mobile/:phone
//       const userRaw = await AsyncStorage.getItem("userData");
//       const ph = parseStoredPhone(userRaw);
//       if (!ph) {
//         Alert.alert("Error", "Phone number not found. Please verify OTP first.");
//         navigation.navigate("LoginScreen");
//         return;
//       }
//       setPhoneNumber(ph);

//       // Fetch application by phone
//       try {
//         const { data, status } = await axios.get(
//           `${API_BASE_URL}/single-loan-application-mobile/${ph}`
//         );

//         if (status === 200 && data?.data) {
//           const app = data.data;

//           if (app.loanCompletion === false) {
//             // Keep server applicationId
//             const id = app.id || app.applicationId;
//             if (id) {
//               setApplicationId(id);
//               await AsyncStorage.setItem("appIdData", JSON.stringify(id));
//             } else {
//               // No application id returned -> treat as new
//               await AsyncStorage.removeItem("appIdData");
//               Alert.alert("Info", "No active application found. Please create a new one.");
//               navigation.replace("LoanRequirements");
//               return;
//             }

//             // Prefill: bank (salaryBank) and employment status if present
//             if (app.salaryBank) setSelectedBank(app.salaryBank);
//             if (app.employmentStatus) setEmploymentStatus(app.employmentStatus);

//             setIsLoading(false);
//             return;
//           }

//           // Completed -> start a new application
//           await AsyncStorage.removeItem("appIdData");
//           setApplicationId("");
//           Alert.alert("Info", "Your previous application is completed. Please start a new one.");
//           navigation.replace("LoanRequirements");
//           return;
//         }
//       } catch (err) {
//         // 404 -> no application -> start new
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

//   const handleSubmit = async () => {
//     if (!selectedBank) {
//       Alert.alert("Select", "Please select a bank.");
//       return;
//     }
//     if (!applicationId) {
//       Alert.alert("Error", "Application ID is missing.");
//       navigation.replace("LoanRequirements");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const requestData = { applicationId, salaryBank: selectedBank };
//       const response = await axios.post(`${API_BASE_URL}/loan-application/bank`, requestData);

//       if (response.status === 200) {
//         // Navigate based on employmentStatus we prefetched
//         if (employmentStatus === "Salaried") {
//           navigation.navigate("EmploymentDetails");
//         } else if (employmentStatus === "SelfEmployedBusiness") {
//           navigation.navigate("SelfReasontoApplyforLoan");
//         } else if (employmentStatus === "SelfEmployedProfessional") {
//           navigation.navigate("SelfReasontoApplyforLoan");
//         } else if (employmentStatus === "Student") {
//           navigation.navigate("FamilyDetails");
//         } else {
//           Alert.alert("Error", "Invalid employment status. Please try again.");
//         }
//       } else {
//         Alert.alert("Error", response.data?.message || "Failed to update bank details.");
//       }
//     } catch (error) {
//       console.error("❌ Error submitting bank details:", error?.response?.data || error.message);
//       Alert.alert("Error", error?.response?.data?.message || "Network error. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const renderBankItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.bankItem, selectedBank === item && { borderColor: "#FF4800" }]}
//       onPress={() => {
//         setSelectedBank(item);
//         setModalVisible(false);
//       }}
//     >
//       <View style={styles.radioContainer}>
//         <ThemedText style={styles.bankText}>{item}</ThemedText>
//         <View
//           style={[
//             styles.radioButton,
//             { borderColor: selectedBank === item ? "#FF4800" : "#999" },
//             selectedBank === item && { backgroundColor: "#FF4800" },
//           ]}
//         />
//       </View>
//     </TouchableOpacity>
//   );

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
//       <View style={styles.scrollContainer}>
//         <View style={appStyle.HeadingTitle}>
//           <ThemedHeadingText style={styles.header}>Salary Bank Account</ThemedHeadingText>
//           <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
//         </View>

//         <FlatList
//           data={banks.slice(0, 10)}
//           renderItem={renderBankItem}
//           keyExtractor={(item, index) => index.toString()}
//           numColumns={2}
//           columnWrapperStyle={styles.row}
//           ListFooterComponent={
//             <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
//               <ThemedHeadingText style={styles.openModalText}>View More</ThemedHeadingText>
//             </TouchableOpacity>
//           }
//         />
//       </View>

//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <ThemedView style={styles.modalContainer}>
//           <TextInput
//             style={appStyle.banksearchBox}
//             placeholder="Search Your Bank..."
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//           <FlatList
//             data={filteredBanks}
//             renderItem={renderBankItem}
//             keyExtractor={(item, index) => index.toString()}
//           />
//         </ThemedView>
//       </Modal>

//       <View style={appStyle.buttonContainer}>
//         <Pressable style={appStyle.button} onPress={handleSubmit} disabled={submitting}>
//           {submitting ? <ActivityIndicator color="#fff" /> : <Text style={appStyle.buttonText}>Continue</Text>}
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 20, flex: 1 },
//   header: { fontSize: 18, fontWeight: "bold" },
//   row: { justifyContent: "space-between", flex: 1 },
//   openModalButton: { padding: 16, borderRadius: 8, textAlign: "center", justifyContent: "center" },
//   openModalText: { textAlign: "center", fontWeight: "500" },
//   bankItem: {
//     flex: 1,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   bankText: { fontSize: 16, marginLeft: 10, flex: 1 },
//   modalContainer: { flex: 1, padding: 0 },
//   radioContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 14,
//     justifyContent: "space-between",
//   },
//   radioButton: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     marginRight: 10,
//   },
// });

// export default BankAccount;
