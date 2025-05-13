import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
} from "react-native";
import { BASE_URL } from "@/components/util/api_url";

const API_URL = `${BASE_URL}/api/loan-application/updateRevenueIncomepro`;

const RevenueIncomeDetailsProfessional = ({ navigation }) => {
    const [netMonthlyIncome, setnetMonthlyIncome] = useState("");
    const [salaryMode, setsalaryMode] = useState("");
    const [hasCreditCard, sethasCreditCard] = useState("");
    const [applicationId, setApplicationId] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    // ✅ Get Application ID from AsyncStorage
    useEffect(() => {
        const fetchApplicationId = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("appIdData");
                const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
                if (parsedValue) {
                    setApplicationId(parsedValue);
                    console.log("✅ Application ID:", parsedValue);
                } else {
                    console.warn("⚠️ No applicationId found");
                }
            } catch (error) {
                console.error("❌ Error fetching applicationId:", error);
            }
        };

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

    // ✅ Validation
    const validateInputs = () => {
        let isValid = true;
        let errors = {};

        if (!netMonthlyIncome) {
            errors.netMonthlyIncome = "Monthly income Is Required";
            isValid = false;
        }
        if (!salaryMode) {
            errors.salaryMode = "Mode of income Is Required";
            isValid = false;
        }
        if (!hasCreditCard) {
            errors.hasCreditCard = "Please specify if you own a credit card";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    // ✅ Handle Submission
    const handleSubmit = async () => {
        if (!validateInputs()) return;

        try {
            setIsLoading(true);

            const requestBody = {
                applicationId,
                netMonthlyIncome,
                salaryMode,
                hasCreditCard: hasCreditCard === "1" ? true : false,
            };

            console.log("📤 Submitting Data:", requestBody);

            const response = await axios.post(API_URL, requestBody);

            if (response.status === 200) {
                Alert.alert("Success", "Income details updated successfully!");
                navigation.navigate("BankAccount");
            }
        } catch (error) {
            console.error("❌ Error updating income details:", error);
            Alert.alert("Error", error.response?.data?.message || "Failed to update income details");
        } finally {
            setIsLoading(false);
        }
    };

    const theme = Appearance.getColorScheme();

    const dynamicStyles = {
        backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
    };

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={styles.header}>Revenue & Income Details</ThemedHeadingText>
                        </View>

                        {/* Monthly Income */}
                        <ThemedHeadingText style={styles.title}>What Is Your Monthly Income?</ThemedHeadingText>
                        <ThemedRadioButtonList
                            options={[
                                { label: 'Below ₹1 Lac', value: '1' },
                                { label: '₹1 - ₹3 Lac', value: '2' },
                                { label: '₹3 - ₹5 Lac', value: '3' },
                                { label: '₹5 - ₹8 Lac', value: '4' },
                                { label: '₹8 - ₹10 Lac', value: '5' },
                                { label: 'Over ₹10 Lac', value: '6' },
                            ]}
                            onValueChange={setnetMonthlyIncome}
                            error={errors.netMonthlyIncome}
                        />

                        {/* Mode of Income */}
                        <ThemedHeadingText style={styles.title}>Mode Of Income</ThemedHeadingText>
                        <RadioButtonGroup
                            options={[
                                { label: 'Bank', value: '1' },
                                { label: 'Cash', value: '2' },
                                { label: 'Both', value: '3' },
                            ]}
                            onValueChange={setsalaryMode}
                            error={errors.salaryMode}
                        />

                        {/* Own Credit Card */}
                        <ThemedHeadingText style={styles.title}>Do you Own a Credit Card?</ThemedHeadingText>
                        <RadioButtonGroup
                            options={[
                                { label: 'Yes', value: '1' },
                                { label: 'No', value: '2' },
                            ]}
                            onValueChange={sethasCreditCard}
                            error={errors.hasCreditCard}
                        />
                    </ScrollView>

                    {/* Submit Button */}
                    <View style={appStyle.buttonContainer}>
                        <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Continue</Text>
                            )}
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#FF4800",
        paddingVertical: 15,
        borderRadius: 5,
        width: "90%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default RevenueIncomeDetailsProfessional;
