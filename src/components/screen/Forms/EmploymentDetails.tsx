import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
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

const EmploymentDetails = ({ navigation }) => {
    const [applicationId, setApplicationId] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [employmentLevel, setEmploymentLevel] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        fetchApplicationId(); // ✅ Fetch application ID

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
            Alert.alert("Error", "Failed to retrieve phone number.");
        }
    };

    // ✅ Validate Inputs
    const validateInputs = () => {
        let valid = true;
        let errorObj = {};

        if (!companyName.trim()) {
            errorObj.companyName = "Company Name Is Required";
            valid = false;
        }
        if (!employmentLevel) {
            errorObj.employmentLevel = "Please Select Your Employment Level";
            valid = false;
        }

        setErrors(errorObj);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) return;

        setIsLoading(true);
        try {
            const requestData = { applicationId, companyName, employmentLevel };

            console.log("📤 Sending Data:", requestData);

            const response = await axios.post(
                `${API_BASE_URL}/loan-application/employmentLevel`,
                requestData
            );

            if (response.status === 200) {
                // Alert.alert("Success", "Employment details updated successfully.");
                navigation.navigate("OfficeAddressInformation");
            } else {
                Alert.alert("Error", response.data.message || "Failed to update employment details.");
            }
        } catch (error) {
            console.error("❌ Error submitting employment details:", error);
            // Alert.alert("Error", error.response?.data?.message || "Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const theme = Appearance.getColorScheme();
    const dynamicStyles = {
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
        shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
    };

    const employmentOptions = [
        { label: "Executive", value: "Executive" },
        { label: "Supervisor", value: "Supervisor" },
        { label: "Manager", value: "Manager" },
        { label: "Sr. Manager", value: "Sr. Manager" },
        { label: "Top Management", value: "Top Management" }
    ];

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={[styles.header]}>Employment Details</ThemedHeadingText>
                            <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
                        </View>

                        {/* Company Name */}
                        <ThemedTextInput
                            label="Company Name"
                            placeHolder="Enter Company Name"
                            value={companyName}
                            onChangeText={setCompanyName}
                            error={errors.companyName}
                        />

                        {/* Employment Level */}
                        <View style={{ marginTop: 10 }}>
                            <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Employment Level</ThemedHeadingText>
                            <ThemedRadioButtonList
                                options={employmentOptions}
                                onValueChange={setEmploymentLevel}
                                direction="column"
                                defaultValue={employmentLevel}
                            />
                            {errors.employmentLevel ? <Text style={styles.errorText}>{errors.employmentLevel}</Text> : null}
                        </View>
                    </ScrollView>

                    {/* Submit Button */}
                    <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
                        <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
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
    scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
    header: { fontSize: 18, fontWeight: "bold" },
    buttonContainer: { left: 0, right: 0, bottom: 0, alignItems: "center" },
    button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    errorText: { color: "red", fontSize: 12, marginTop: 5 },
});

export default EmploymentDetails;
