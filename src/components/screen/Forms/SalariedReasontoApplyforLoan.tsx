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

//       const [phoneNumber, setPhoneNumber] = useState('');
//   const [userId, setUserId] = useState('');

//     useEffect(() => {
//         fetchApplicationId();
//         charappid();

//         const fetchPhoneNumber = async () => {
//       try {
//          const jsonValues = await AsyncStorage.getItem("userData");
//             const phoneNumber = jsonValues ? JSON.parse(jsonValues) : null;
//            setPhoneNumber(phoneNumber);
//            console.log("Phone Number:", phoneNumber);
//            const Useri = await AsyncStorage.getItem("userId");
//             const userData = Useri ? JSON.parse(Useri) : null;
//            setUserId(userData);
//            console.log("User ID:", userData);

//       } catch (error) {
//         console.error('Error fetching phone number:', error);
//       }
//     };

//     fetchPhoneNumber();

//     }, []);


//     const charappid = async () => {
//         const jsonValue = await AsyncStorage.getItem("appIdData");
//         const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
//         if (!parsedValue || parsedValue.trim() === "") {
//             Alert.alert("Error", "Application ID is missing or invalid.");
//             navigation.navigate("LoanOffer");
//             return;
            
//         }  
 
// }


//     // ✅ Fetch Application ID from AsyncStorage
//     const fetchApplicationId = async () => {
//         try {
//             const jsonValue = await AsyncStorage.getItem("appIdData");
//             const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;

//             console.log("Application ID:", parsedValue);    

//             if (!parsedValue || parsedValue.trim() === "") {
//                 Alert.alert("Error", "Application ID is missing or invalid.");
//                 return;
                
//             }   

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

//     // // ✅ Handle API Submission
//     const handleSubmit = async () => {
//         if (!validateInput()) return;
      
//         setIsLoading(true);
//         try {
//             const jsonValue = await AsyncStorage.getItem("appIdData");
    
//             if (!jsonValue || jsonValue.trim() === "") {
//                 Alert.alert("Error", "Application ID is missing or invalid.");
//                 return;
//             }
            
//             const requestData = {
//                 applicationId,
//                 loanPurpose: selectedLoanPurpose,
//                 loanCompletion: true,
//             };

//             const response = await axios.post(
//                 `${API_BASE_URL}/loan-application/loan-purpose`,
//                 requestData
//             );

          

//             if (response.status === 200) {
//                 navigation.navigate("LoanOffer", {dayata: response.data});
//                 // Alert.alert("Success", "Loan purpose saved successfully.");

              
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


//     // ✅ Loan Purpose Options
//     const Reason = [
//         { label: "Home Buying/Renovation", value: "Home Buying/Renovation" },
//         { label: "Pay Back Existing Loan/Credit Card Bills", value: "Pay Back Existing Loan" },
//         { label: "Investment In Stocks/Mutual Funds", value: "Investment" },
//         { label: "Medical Expenses", value: "Medical Expenses" },
//         { label: "Educational Expenses", value: "Educational Expenses" },
//         { label: "Wedding Related Expenses", value: "Wedding Expenses" },
//         { label: "Travel/Vacation Expenses", value: "Travel" },
//         { label: "Others", value: "Others" },
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
//     scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//     header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
//     buttonContainer: { left: 0, right: 0, bottom: 20, alignItems: "center" },
//     button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
//     buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
//     errorText: { color: "red", fontSize: 12, marginTop: 5 },
// });

// export default SalariedReasontoApplyforLoan;










// New Data

import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
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
    Keyboard,
    TouchableWithoutFeedback,
    Pressable,
    Alert,
    StyleSheet,
    ActivityIndicator,
    Platform,
} from "react-native";

const API_BASE_URL = `${BASE_URL}/api`;

const SalariedReasontoApplyforLoan = ({ navigation }) => {
    const [applicationId, setApplicationId] = useState("");
    const [selectedLoanPurpose, setSelectedLoanPurpose] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        fetchApplicationId();
        checkAppId();

        const fetchPhoneNumber = async () => {
            try {
                const jsonValues = await AsyncStorage.getItem("userData");
                const parsedData = jsonValues ? JSON.parse(jsonValues) : null;
                setPhoneNumber(parsedData);
                console.log("Phone Number:", parsedData);

                  const profileResponse = await axios.get(`${BASE_URL}/api/otp/get-profile?phoneNumber=${parsedData}`
      );
                setUserId(profileResponse.data.id);
                
            } catch (error) {
                console.error('Error fetching phone number:', error);
            }
        };

        fetchPhoneNumber();
    }, []);

    const checkAppId = async () => {
        const jsonValue = await AsyncStorage.getItem("appIdData");
        const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
        if (!parsedValue || parsedValue.trim() === "") {
            Alert.alert("Error", "Application ID is missing or invalid.");
            navigation.navigate("LoanOffer");
            return;
        }
    };

    const fetchApplicationId = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("appIdData");
            const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;

            console.log("Application ID:", parsedValue);

            if (!parsedValue || parsedValue.trim() === "") {
                Alert.alert("Error", "Application ID is missing or invalid.");
                return;
            }

            setApplicationId(parsedValue);
        } catch (error) {
            console.error("❌ Error fetching application ID:", error);
            Alert.alert("Error", "Failed to retrieve application ID.");
        }
    };

    const validateInput = () => {
        let valid = true;
        let errorObj = {};

        if (!selectedLoanPurpose) {
            errorObj.loanPurpose = "Please select a loan purpose";
            valid = false;
        }

        setErrors(errorObj);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateInput()) return;

        setIsLoading(true);

        try {
            const jsonValue = await AsyncStorage.getItem("appIdData");


            if (!jsonValue || jsonValue.trim() === "") {
                Alert.alert("Error", "Application ID is missing or invalid.");
                return;
            }

            const requestData = {
                applicationId,
                loanPurpose: selectedLoanPurpose,
                loanCompletion: true,
            };

            // Step 1: Submit to your API
            const response = await axios.post(
                `${API_BASE_URL}/loan-application/loan-purpose`,
                requestData
            );

            if (response.status !== 200) {
                throw new Error(response.data.message || "Failed to save loan purpose.");
            }

            

               
            // Step 2: Prepare Cashe API request
            const cashePayload = {
                userPhoneNumber: phoneNumber,
                userId: userId,
                loanId: applicationId,
            };

            console.log("✅ Loan Purpose Submitted Successfully:", cashePayload);  


            // Step 3: Send to Cashe API
            const casheResponse = await axios.post(
                "https://app.creditcircle.in/api/partner/cashe",
                cashePayload
            );

            console.log("🔍 CASHe Response:", casheResponse.data);
            
            if (casheResponse.status === 200) {
                navigation.navigate("LoanOffer", {
                    dayata: response.data,
                    casheData: casheResponse.data,
                });
            } else {
                Alert.alert("Error", casheResponse.data || "Cashe API failed.");
            }

        } catch (error) {
            console.error("❌ Error:", error);
            Alert.alert("Error", error.response?.data?.message || "Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const Reason = [
        { label: "Home Buying/Renovation", value: "Home Buying/Renovation" },
        { label: "Pay Back Existing Loan/Credit Card Bills", value: "Pay Back Existing Loan" },
        { label: "Investment In Stocks/Mutual Funds", value: "Investment" },
        { label: "Medical Expenses", value: "Medical Expenses" },
        { label: "Educational Expenses", value: "Educational Expenses" },
        { label: "Wedding Related Expenses", value: "Wedding Expenses" },
        { label: "Travel/Vacation Expenses", value: "Travel" },
        { label: "Others", value: "Others" },
    ];

    return (
        <SafeAreaView style={appStyle.gstcraeccontainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={[styles.header]}>Loan Purpose: Reason to Apply for Loan</ThemedHeadingText>
                            <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
                        </View>

                        <ThemedView>
                            <ThemedRadioButtonList
                                onValueChange={(value) => setSelectedLoanPurpose(value)}
                                options={Reason}
                                direction="column"
                                navigation={navigation}
                            />
                        </ThemedView>

                        {errors.loanPurpose && <Text style={styles.errorText}>{errors.loanPurpose}</Text>}
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
    scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
    header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
    buttonContainer: { left: 0, right: 0, bottom: 20, alignItems: "center" },
    button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    errorText: { color: "red", fontSize: 12, marginTop: 5 },
});

export default SalariedReasontoApplyforLoan;











// Old data


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
//   const [isLoading, setIsLoading] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     fetchApplicationId();
//     validateAppIdExists();
//   }, []);



//   const validateAppIdExists = async () => {
//     const parsedValue = await AsyncStorage.getItem("appIdData");
//     if (!parsedValue || (typeof parsedValue === "string" && parsedValue.trim() === "")) {
//       Alert.alert("Error", "Application ID is missing or invalid.");
//       navigation.navigate("LoanOffer");
//     }
//   };

//   const fetchApplicationId = async () => {
//     try {
//       const parsedValue = await AsyncStorage.getItem("appIdData");
//        const parsedValuemain = parsedValue ? JSON.parse(parsedValue) : null;
//       if (!parsedValue) {
//         Alert.alert("Error", "Application ID is missing or invalid.");
//         return;
//       }
//       setApplicationId(parsedValuemain);
//     } catch (error) {
//       console.error("❌ Error fetching application ID:", error);
//       Alert.alert("Error", "Failed to retrieve application ID.");
//     }
//   };

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

//   const handleSubmit = async () => {
//     if (!validateInput()) return;

//     setIsLoading(true);

//     try {
//       const appIdRaw = await AsyncStorage.getItem("appIdData");
//       if (!appIdRaw) {
//         Alert.alert("Error", "Application ID is missing or invalid.");
//         return;
//       }

//       const appIdParsed = (() => {
//         try {
//           const v = JSON.parse(appIdRaw);
//           return typeof v === "string" ? v : v?.applicationId || appIdRaw;
//         } catch {
//           return appIdRaw;
//         }
//       })();

   
//       const jsonValue = await AsyncStorage.getItem('userData');
//       const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
  

//       if (!parsedValue) {
//         Alert.alert("Error", "Phone number not found in local storage.");
//         return;
//       }

//       // const userIdRes = await axios.post(
//       //   `${API_BASE_URL}/otp/get-phone-number`,
//       //   { phoneNumber: parsedValue },
//       //   { headers: { "Content-Type": "application/json" } }
//       // );


//       // console.log("🔍 User ID Response:", userIdRes.data);

    
//       // if (!userIdRes) {
//       //   Alert.alert("Error", "User ID not found from phone lookup.");
//       //   return;
//       // }

//       // setPhoneNumber(parsedValue);
//       // setUserId(userIdRes.data);

//       // Save loan purpose
//       const requestData = {
//         applicationId: appIdParsed,
//         loanPurpose: selectedLoanPurpose,
//         loanCompletion: true,
//       };

//       console.log("🔍 Request Data:", requestData);

//       const response = await axios.post(
//         `${API_BASE_URL}/loan-application/loan-purpose`,
//         requestData
//       );

//       if (response.status === 200) {
//         // Alert.alert("Success", "Loan purpose saved successfully.");

//          const profileResponse = await axios.get(
//       `${BASE_URL}/api/otp/get-profile?phoneNumber=${parsedValue}`
//     );



//         const profileId = profileResponse.data.id;

//         try {
//           const cashePayload = {
//             userPhoneNumber: parsedValue,
//             userId: profileId,
//             loanId: appIdParsed,
//           };

           

//           const casheRes = await axios.post(
//             "https://app.creditcircle.in/api/partner/cashe",
//             cashePayload,
//             { headers: { "Content-Type": "application/json" } }
//           );

//           console.log("🔍 CASHe Response:", casheRes.data);

//           const root = casheRes?.data ?? {};
//           const duplicateStatusCode = root.duplicateStatusCode ?? root.data?.duplicateStatusCode;
//           const payload = root.payload ?? root.data?.payload;
//           const offer = payload?.offer ?? payload;
//           const redirectUrl = offer?.redirectUrl;

//           if (duplicateStatusCode === 1 || duplicateStatusCode === 2) {
//             if (redirectUrl) {
//               navigation.navigate("WebviewScreen", { urlName: redirectUrl });
//             } else {
//               Alert.alert("Error", "Redirect URL missing in the response.");
//             }
//           } else if (duplicateStatusCode === 3) {
//             Alert.alert("Info", "Data already exists.");
//           } else {
//             Alert.alert("Unexpected response", JSON.stringify(root, null, 2));
//           }
//         } catch (err) {
//           console.error("CASHe API error:", err?.response?.data || err?.message);
//           Alert.alert("Error", err?.response?.data?.message || "Failed to process CASHe request.");
//         }
//       } else {
//         Alert.alert(
//           "Error",
//           response?.data?.message || "Failed to save loan purpose."
//         );
//       }
//     } catch (error) {
//       console.error("❌ Error submitting loan purpose:", error);
//       Alert.alert(
//         "Error",
//         error?.response?.data?.message || "Network error. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const Reason = [
//     { label: "Home Buying/Renovation", value: "Home Buying/Renovation" },
//     { label: "Pay Back Existing Loan/Credit Card Bills", value: "Pay Back Existing Loan" },
//     { label: "Investment In Stocks/Mutual Funds", value: "Investment" },
//     { label: "Medical Expenses", value: "Medical Expenses" },
//     { label: "Educational Expenses", value: "Educational Expenses" },
//     { label: "Wedding Related Expenses", value: "Wedding Expenses" },
//     { label: "Travel/Vacation Expenses", value: "Travel" },
//     { label: "Others", value: "Others" },
//   ];

//   return (
//     <SafeAreaView style={appStyle.gstcraeccontainer}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//           <ScrollView
//             contentContainerStyle={styles.scrollContainer}
//             showsVerticalScrollIndicator={false}
//           >
//             <View style={appStyle.HeadingTitle}>
//               <ThemedHeadingText style={[styles.header]}>
//                 Loan Purpose: Reason to Apply for Loan
//               </ThemedHeadingText>
//               <ThemedView
//                 style={{
//                   width: "20%",
//                   height: 2,
//                   backgroundColor: "#FF4800",
//                   marginTop: 4,
//                 }}
//               />
//             </View>

//             <ThemedView>
//               <ThemedRadioButtonList
//                 onValueChange={(value) => setSelectedLoanPurpose(value)}
//                 options={Reason}
//                 direction="column"
//                 navigation={navigation}
//               />
//             </ThemedView>

//             {errors.loanPurpose && (
//               <Text style={styles.errorText}>{errors.loanPurpose}</Text>
//             )}
//           </ScrollView>

//           <View style={styles.buttonContainer}>
//             <Pressable
//               style={styles.button}
//               onPress={handleSubmit}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Check Eligibility</Text>
//               )}
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//   header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
//   buttonContainer: { left: 0, right: 0, bottom: 20, alignItems: "center" },
//   button: {
//     backgroundColor: "#FF4800",
//     paddingVertical: 15,
//     borderRadius: 5,
//     width: "90%",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   errorText: { color: "red", fontSize: 12, marginTop: 5 },
// });

// export default SalariedReasontoApplyforLoan;
