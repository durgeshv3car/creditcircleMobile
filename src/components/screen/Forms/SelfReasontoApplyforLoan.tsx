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
} from "react-native";

const API_BASE_URL = `${BASE_URL}/api`;

const SalariedReasontoApplyforLoan = ({ navigation }) => {
    const [applicationId, setApplicationId] = useState("");
    const [selectedLoanPurpose, setSelectedLoanPurpose] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchApplicationId();
    }, []);

    // ✅ Fetch Application ID from AsyncStorage
    const fetchApplicationId = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("appIdData");
            const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
            setApplicationId(parsedValue);
        } catch (error) {
            console.error("❌ Error fetching application ID:", error);
            Alert.alert("Error", "Failed to retrieve application ID.");
        }
    };

    // ✅ Validate Input
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

    // ✅ Handle API Submission
    const handleSubmit = async () => {
        if (!validateInput()) return;

        setIsLoading(true);
        try {

            const jsonValue = await AsyncStorage.getItem("appIdData");
    
            if (!jsonValue || jsonValue.trim() === "") {
                Alert.alert("Error", "Application ID is missing or invalid.");
                // navigation.navigate("Home");
                return;
            }

            const requestData = {
                applicationId,
                loanPurpose: selectedLoanPurpose,
                loanCompletion: true,
            };

            console.log("📤 Sending Data:", requestData);

            const response = await axios.post(
                `${API_BASE_URL}/loan-application/loan-purpose`,
                requestData
            );

            if (response.status === 200) {
                navigation.navigate("LoanOffer");
            } else {
                Alert.alert("Error", response.data.message || "Failed to save loan purpose.");
            }
        } catch (error) {
            console.error("❌ Error submitting loan purpose:", error);
            Alert.alert("Error", error.response?.data?.message || "Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const Reason = [
        { label: 'Working Capital Expense', value: 'Working Capital Expense' },
        { label: 'Purchase Material', value: 'Purchase Material' },
        { label: 'Buy/Upgrade Machine/Equipments', value: 'Buy/Upgrade Machine/Equipments' },
        { label: 'Buy Office/Factory Space', value: 'Buy Office/Factory Space' },
        { label: 'Marketing Expense', value: 'Marketing Expense' },
        { label: 'Payback Existing Loans/Credit Card Bills', value: 'Payback Existing Loans/Credit Card Bills' },
        { label: 'Others', value: 'Others' }
    ];


    return (
        <SafeAreaView style={[styles.container]}>
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

                    {/* Submit Button */}
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
    container: { flex: 1, backgroundColor: "#fff" },
    scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
    header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
    buttonContainer: { left: 0, right: 0, bottom: 0, alignItems: "center" },
    button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    errorText: { color: "red", fontSize: 12, marginTop: 5 },
});

export default SalariedReasontoApplyforLoan;
