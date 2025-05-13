import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
    View,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Appearance,
    Pressable,
    Text,
    ActivityIndicator,
    Alert,
} from "react-native";
import YearDropdown from "@/components/common/YearDropdown";
import appStyle from "@/AppStyles";
import { BASE_URL } from "@/components/util/api_url";

const API_BASE_URL = `${BASE_URL}/api/loan-application/updateProfessionalDetails`;

const Professionaldetails = ({ navigation }) => {
    const [applicationId, setApplicationId] = useState("");
    const [profession, setProfession] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [yearRegistration, setyearRegistration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        getApplicationId();
    }, []);

    // ✅ Get applicationId from AsyncStorage
    const getApplicationId = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("appIdData");
            const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
            setApplicationId(parsedValue);
        } catch (error) {
            console.error("❌ Error getting applicationId:", error);
        }
    };

    // ✅ Validation
    const validateInputs = () => {
        let isValid = true;
        let errorObj = {};

        if (!profession) {
            errorObj.profession = "Profession Is Required";
            isValid = false;
        }
        if (!registrationNumber.trim()) {
            errorObj.registrationNumber = "Registration number Is Required";
            isValid = false;
        }
        if (!yearRegistration) {
            errorObj.yearRegistration = "Year of registration Is Required";
            isValid = false;
        }

        setErrors(errorObj);
        return isValid;
    };

    // ✅ Handle Continue (API Update)
    const handleContinue = async () => {
        if (!validateInputs()) return;

        try {
            setIsLoading(true);

            const requestBody = {
                applicationId,
                profession,
                registrationNumber,
                yearRegistration
            };

            console.log("📤 Sending Data:", requestBody);

            const response = await axios.post(API_BASE_URL, requestBody);

            if (response.status === 200) {
                Alert.alert("Success", "Professional details updated successfully");
                navigation.navigate("BusinessDetailSearch");
            }
        } catch (error) {
            console.error("❌ Error updating professional details:", error);
            Alert.alert("Error", error.response?.data?.message || "Failed to update details");
        } finally {
            setIsLoading(false);
        }
    };

    const theme = Appearance.getColorScheme();

    const dynamicStyles = {
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    };

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {/* Profession */}
                        <ThemedHeadingText style={styles.title}>Select Your Profession</ThemedHeadingText>
                        <ThemedRadioButtonList
                            options={[
                                { label: "Doctor", value: "Doctor" },
                                { label: "Chartered Accountant (CA)", value: "Chartered Accountant (CA)" },
                                { label: "Lawyer", value: "Lawyer" },
                                { label: "Others", value: "Others" },
                            ]}
                            onValueChange={setProfession}
                            defaultValue={profession}
                        />
                        {errors.profession && <Text style={styles.errorText}>{errors.profession}</Text>}

                        {/* Registration Number */}
                        <ThemedTextInput
                            label="Registration number"
                            placeHolder="Enter your registration number"
                            value={registrationNumber}
                            onChangeText={setRegistrationNumber}
                            error={errors.registrationNumber}
                        />

                        {/* Year of Registration */}
                        <YearDropdown
    label="Year of Registration"
    selectedYear={yearRegistration}
    onYearSelect={(year) => {
        console.log("Selected Year:", year);
        setyearRegistration(year);
    }}
/>
                        {errors.yearRegistration && <Text style={styles.errorText}>{errors.yearRegistration}</Text>}
                    </ScrollView>

                    {/* ✅ Submit Button */}
                    <View style={appStyle.buttonContainer}>
                        <Pressable style={styles.button} onPress={handleContinue} disabled={isLoading}>
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
    title: { fontSize: 12, fontWeight: "bold", marginBottom: 5 },
    button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    errorText: { color: "red", fontSize: 12, marginBottom: 5 },
});

export default Professionaldetails;
