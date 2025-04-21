import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedHeadingText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BASE_URL } from "@/components/util/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
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
} from "react-native";

const API_BASE_URL = `${BASE_URL}/api`;
const PINCODE_API_URL = `${BASE_URL}/api/pincode/`;

const OfficeAddressInformation = ({ navigation }) => {
    const [applicationId, setApplicationId] = useState("");
    const [officeLocation, setOfficeLocation] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        fetchApplicationId();

        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
            setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
            setKeyboardVisible(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const fetchApplicationId = async () => {
        try {
    
            const jsonValue = await AsyncStorage.getItem('appIdData');
            const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
            setApplicationId(parsedValue);
            console.log(parsedValue)

        } catch (error) {
            console.error("❌ Error fetching phone number:", error);
        }
    };

    const fetchCityAndState = async (pin) => {
        try {
            const response = await axios.get(`${PINCODE_API_URL}${pin}`);
            if (response.data) {
                setCity(response.data.city);
                setState(response.data.state);
            } else {
                setCity("");
                setState("");
                Alert.alert("Error", "Invalid Pin Code. Please check again.");
            }
        } catch (error) {
            Alert.alert("Error", "Invalid Pin Code. Please check again.");
            setCity("");
            setState("");
          
        }
    };

    const handlePinCodeChange = (value) => {
        setPinCode(value);
        if (value.length === 6) {
            fetchCityAndState(value);
        }
    };

  const validateInputs = () => {
    let valid = true;
    let errorObj = {};

    if (!officeLocation.trim()) {
        errorObj.officeLocation = "Office Location is required";
        valid = false;
    }
    if (!streetAddress.trim()) {
        errorObj.streetAddress = "Street Address is required";
        valid = false;
    }
    if (!pinCode.trim() || pinCode.length !== 6 || isNaN(pinCode)) {
        errorObj.pinCode = "Valid 6-digit Pin Code is required";
        valid = false;
    }
    if (!city.trim()) {
        errorObj.city = "City is required";
        valid = false;
    }
    if (!state.trim()) {
        errorObj.state = "State is required";
        valid = false;
    }

    console.log("✅ Validation Errors:", errorObj);
    setErrors(errorObj);
    return valid;
};

const handleSubmit = async () => {
    console.log("📌 Debugging Form Data Before API Call:");
    console.log("Application ID:", applicationId);
    console.log("Office Location:", officeLocation);
    console.log("Street Address:", streetAddress);
    console.log("Pin Code:", pinCode);
    console.log("City:", city);
    console.log("State:", state);

    if (!validateInputs()) return;

    setIsLoading(true);
    try {
        const requestData = {
            applicationId: applicationId?.toString(), // Ensure it's a string
            officeLocation: officeLocation.trim(),
            officeStreet: streetAddress.trim(),
            officePinCode: pinCode.trim(),
            officeCity: city.trim(),
            officeState: state.trim(),
        };

        console.log("📤 Sending Data to API:", JSON.stringify(requestData, null, 2));

        const response = await axios.post(
            `${API_BASE_URL}/loan-application/office-address`,
            requestData
        );

        console.log("✅ API Response:", response.data);

        if (response.status === 200) {
            // Alert.alert("Success", "Office address updated successfully.");
            navigation.navigate("SalariedReasontoApplyforLoan");
        } else {
            Alert.alert("Error", response.data.message || "Failed to update office address.");
        }
    } catch (error) {
        console.log("🔍 API Response Data:", error.response?.data); // Log response data
        
    } finally {
        setIsLoading(false);
    }
};

    

    return (
        <SafeAreaView style={[styles.container]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                //  behavior={Platform.OS === "ios" ? "padding" : "height"}
                 >
                    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={[styles.header]}>Office Address Information</ThemedHeadingText>
                            <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
                        </View>

                        <ThemedTextInput label="Office Location" placeHolder="Office no. / building" value={officeLocation} onChangeText={setOfficeLocation} error={errors.officeLocation} />
                        <ThemedTextInput label="Street Address / Area" placeHolder="Road name, area, sector" value={streetAddress} onChangeText={setStreetAddress} error={errors.streetAddress} />
                        <ThemedTextInput label="Pin Code" placeHolder="Enter your area code" keyboardType="number-pad" maxLength={6} value={pinCode} onChangeText={handlePinCodeChange} error={errors.pinCode} />
                        <View style={{ flexDirection: "row", gap: 20 }}>
                            <ThemedTextInput label="City" placeHolder="City" value={city} editable={false} error={errors.city} />
                            <ThemedTextInput label="State" placeHolder="State" value={state} editable={false} error={errors.state} />
                        </View>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>{isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}</Pressable>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
    header: { fontSize: 18, fontWeight: "bold" },
    buttonContainer: { left: 0, right: 0, bottom: 0, alignItems: "center" },
    button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    errorText: { color: "red", fontSize: 12, marginTop: 5 },
});

export default OfficeAddressInformation;
