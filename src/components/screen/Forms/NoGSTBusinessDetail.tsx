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





import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
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

const API_BASE_URL = `${BASE_URL}/api/loan-application`;
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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getApplicationId();
    }, []);

    const getApplicationId = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("appIdData");
            const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
            if (parsedValue) {
                setApplicationId(parsedValue);
                console.log("✅ Retrieved applicationId:", parsedValue);
            } else {
                console.warn("⚠️ applicationId not found in AsyncStorage");
            }
        } catch (error) {
            console.error("❌ Error getting applicationId:", error);
        }
    };

    const handlePinCodeChange = async (value) => {
        setPinCode(value);
        if (value.length === 6) {
            try {
                const response = await axios.get(`${PINCODE_API_URL}${value}`);
                console.log("✅ Pincode Response:", response.data);
                if (response.data) {
                    setCity(response.data.city);
                    setState(response.data.state);
                } else {
                    setCity("");
                    setState("");
                    Alert.alert("Invalid Pin Code", "Please enter a valid Pin Code");
                }
            } catch (error) {
                console.error("❌ Error fetching city and state:", error);
                Alert.alert("Error", "Failed to fetch city and state");
            }
        }
    };

    const validateInputs = () => {
        let isValid = true;
        let errorObj = {};

        if (!businessName) {
            errorObj.businessName = "Business name Is Required";
            isValid = false;
        }

        if (!natureOfBusiness) {
            errorObj.natureOfBusiness = "Nature of business Is Required";
            isValid = false;
        }

        if (!yearsInBusiness) {
            errorObj.yearsInBusiness = "Years in current business Is Required";
            isValid = false;
        }

        if (!officePinCode || officePinCode.length !== 6) {
            errorObj.officePinCode = "Valid 6-digit Pin Code Is Required";
            isValid = false;
        }

        if (!officeCity) {
            errorObj.officeCity = "City Is Required";
            isValid = false;
        }

        if (!officeState) {
            errorObj.officeState = "State Is Required";
            isValid = false;
        }

        setErrors(errorObj);
        return isValid;
    };

    const handleContinue = async () => {
        if (!validateInputs()) return;

        try {
            setIsLoading(true);

            const requestBody = {
                applicationId,
                businessName,
                businessType,
                natureOfBusiness,
                yearsInBusiness,
                officePinCode,
                officeCity,
                officeState,
            };

            console.log("📤 Sending Data:", requestBody);

            const response = await axios.post(`${API_BASE_URL}/updateGstDetails`, requestBody);
            console.log("✅ API Response:", response.data);

            if (response.status === 200) {
               
                const employmentInfoResponse = await axios.get(`${API_BASE_URL}?applicationId=${applicationId}`);
                console.log("✅ Employment Info Response:", employmentInfoResponse.data);

                if (employmentInfoResponse.status === 200) {
                    const employmentType = employmentInfoResponse.data.employmentInformation;

                    if (employmentType === "SelfEmployedBusiness") {
                        navigation.navigate("RevenueIncomeDetailsProfessional");
                    } else {
                        navigation.navigate("RevenueIncomeDetails");
                    }
                } else {
                    Alert.alert("Error", "Failed to fetch employment information");
                }
            }
        } catch (error) {
            console.error("❌ Error updating business details:", error);
            Alert.alert("Error", error.response?.data?.message || "Failed to update details");
        } finally {
            setIsLoading(false);
        }
    };

    const theme = Appearance.getColorScheme();
    const dynamicStyles = {
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    };

    const handleBusinessType = (value) => setBusinessType(value);
    const handleSelection = (value) => setNatureOfBusiness(value);

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={styles.header}>Business Details</ThemedHeadingText>
                            <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }} />
                        </View>

                        <ThemedTextInput
                            label="Business Name"
                            value={businessName}
                            onChangeText={setBusinessName}
                            error={errors.businessName}
                        />

                        <ThemedHeadingText style={{ fontWeight: 'bold', marginBottom: 10 }}>Company type</ThemedHeadingText>
                        <View style={{ paddingVertical: 0, paddingHorizontal: 6, marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
                            <ThemedRadioButtonList
                                options={[
                                    { label: 'Proprietorship/Individual', value: 'Proprietorship/Individual' },
                                    { label: 'Partnership Firm', value: 'Partnership Firm' },
                                    { label: 'Private Limited Company', value: 'Private Limited Company' },
                                    { label: 'Limited liability partnership (LLP)', value: 'LLP' },
                                ]}
                                onValueChange={handleBusinessType}
                                defaultValue={businessType}
                                error={errors.businessType}
                            />
                        </View>

                        <ThemedHeadingText style={{ fontWeight: 'bold' }}>Nature of business</ThemedHeadingText>
                        <ThemedRadioButtonList
                            options={[
                                { label: 'Manufacturing', value: 'Manufacturing' },
                                { label: 'Trader/Wholesaler', value: 'Trader/Wholesaler' }
                            ]}
                            onValueChange={handleSelection}
                            defaultValue={natureOfBusiness}
                            error={errors.natureOfBusiness}
                        />

                        <ThemedTextInput
                            label="Years in Business"
                            value={yearsInBusiness}
                            keyboardType="number-pad"
                            maxLength={4}
                            onChangeText={setYearsInBusiness}
                            error={errors.yearsInBusiness}
                        />

                        <ThemedTextInput
                            label="Pin Code"
                            keyboardType="number-pad"
                            maxLength={6}
                            value={officePinCode}
                            onChangeText={handlePinCodeChange}
                            error={errors.officePinCode}
                        />

                        <View style={{ flexDirection: "row", gap: 20 }}>
                            <ThemedTextInput label="City" value={officeCity} editable={false} error={errors.officeCity} />
                            <ThemedTextInput label="State" value={officeState} editable={false} error={errors.officeState} />
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>

                <View style={appStyle.buttonContainer}>
                    <Pressable style={styles.button} onPress={handleContinue}>
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
    header: {
        fontSize: 18,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "#FF4800",
        paddingVertical: 15,
        borderRadius: 5,
        width: "90%",
        alignSelf: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default NoGSTBusinessDetail;
