import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import { ThemedHeadingText } from "@/components/ThemedText";
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

const API_BASE_URL = "http://192.168.0.18:5000/api/loan-application";
const PINCODE_API_URL = "http://192.168.0.18:5000/api/pincode/";

const NoGSTBusinessDetail = ({ navigation }) => {
    const [applicationId, setApplicationId] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [natureOfBusiness, setNatureOfBusiness] = useState("");
    const [yearsInBusiness, setYearsInBusiness] = useState("");
    const [officePinCode, setPinCode] = useState("");
    const [officeCity, setCity] = useState("");
    const [officeState, setState] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false); // ✅ Fixed: Added state for keyboard visibility

    useEffect(() => {
        getApplicationId();

        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // ✅ Get applicationId from AsyncStorage
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

    // ✅ Fetch City and State based on Pin Code
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

    // ✅ Validation
    const validateInputs = () => {
        let isValid = true;
        let errorObj = {};

        if (!businessName) {
            errorObj.businessName = "Business name is required";
            isValid = false;
        }

        if (!natureOfBusiness) {
            errorObj.natureOfBusiness = "Nature of business is required";
            isValid = false;
        }
        if (!yearsInBusiness) {
            errorObj.yearsInBusiness = "Years in current business is required";
            isValid = false;
        }
        if (!officePinCode || officePinCode.length !== 6) {
            errorObj.officePinCode = "Valid 6-digit Pin Code is required";
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

    // ✅ Handle Continue (API Update)
    const handleContinue = async () => {
        Keyboard.dismiss();
    
        // console.log("🚀 Application ID:", applicationId);
    
        // if (!applicationId) {
        //     Alert.alert("Error", "Application ID is missing");
        //     return;
        // }
    
        if (!validateInputs()) return;
    
        try {
            setIsLoading(true);
            const requestBody = {
                applicationId,
                businessName,
                natureOfBusiness,
                yearsInBusiness,
                officePinCode,
                officeCity,
                officeState
            };
    
            console.log("📤 Sending Data:", requestBody);
    
            const response = await axios.post(`${API_BASE_URL}/updateGstDetails`, requestBody);
    
            console.log("✅ API Response:", response.data);
    
            if (response.status === 200) {
                Alert.alert("Success", "Business details updated successfully");
                navigation.navigate("RevenueIncomeDetails");
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

    const handleSelection = (value) => {
        console.log("🔘 Selected Option:", value);
        setNatureOfBusiness(value);
    };
    

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <ThemedTextInput
                            label="Business Name"
                            value={businessName}
                            onChangeText={setBusinessName}
                            error={errors.businessName}
                        />

                        <ThemedRadioButtonList
                            options={[
                                { label: 'Proprietorship/Individual', value: 'Proprietorship/Individual' },
                                { label: 'Partnership Firm', value: 'Partnership Firm' },
                                { label: 'Private Limited Company', value: 'Private Limited Company' },
                                { label: 'LLP', value: 'LLP' },
                            ]}
                            onValueChange={handleSelection}
                            defaultValue={natureOfBusiness}
                            error={errors.natureOfBusiness}
                        />

                        <ThemedTextInput
                            label="Pin Code"
                            value={officePinCode}
                            onChangeText={handlePinCodeChange}
                            error={errors.officePinCode}
                        />

                        <ThemedTextInput label="City" value={officeCity} editable={false} error={errors.officeCity} />
                        <ThemedTextInput label="State" value={officeState} editable={false} error={errors.officeState} />
                    </ScrollView>

                    <View style={appStyle.buttonContainer}>
                        <Pressable style={styles.button} onPress={handleContinue}>
                            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
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
    button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default NoGSTBusinessDetail;

