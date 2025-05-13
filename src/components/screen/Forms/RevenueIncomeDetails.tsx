import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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
    ActivityIndicator
} from "react-native";

import { BASE_URL } from "@/components/util/api_url";

const API_BASE_URL = `${BASE_URL}/api/loan-application/updateRevenueIncome`;

const RevenueIncomeDetails = ({ navigation }) => {
    const [applicationId, setApplicationId] = useState("");
    const [businessTurnover, setbusinessTurnover] = useState("");
    const [businessIncome, setbusinessIncome] = useState("");
    const [hasCreditCard, sethasCreditCard] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        getApplicationId();

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

    const getApplicationId = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("appIdData");
            const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
            setApplicationId(parsedValue);
        } catch (error) {
            console.error("❌ Error getting applicationId:", error);
        }
    };

    const formatIndianCurrency = (value) => {
        const x = value.replace(/,/g, "").replace(/\D/g, "");
        if (!x) return "";
        const lastThree = x.slice(-3);
        const otherNumbers = x.slice(0, -3);
        if (otherNumbers !== "") {
            return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
        } else {
            return lastThree;
        }
    };

    const validateInputs = () => {
        let isValid = true;
        let errorObj = {};

        if (!businessTurnover.trim()) {
            errorObj.businessTurnover = "Gross annual turnover Is Required";
            isValid = false;
        }
        if (!businessIncome.trim()) {
            errorObj.businessIncome = "Gross annual income Is Required";
            isValid = false;
        }
        if (!hasCreditCard) {
            errorObj.hasCreditCard = "Please select if you own a credit card";
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
                businessTurnover: businessTurnover.replace(/,/g, ""),
                businessIncome: businessIncome.replace(/,/g, ""),
                hasCreditCard: hasCreditCard === "1" ? true : false
            };

            console.log("📤 Sending Data:", requestBody);

            const response = await axios.post(API_BASE_URL, requestBody);

            if (response.status === 200) {
                navigation.navigate("BankAccount");
            }
        } catch (error) {
            console.error("❌ Error updating revenue income details:", error);
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
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={[styles.header]}>
                                Revenue & Income Details
                            </ThemedHeadingText>
                            <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }}></ThemedView>
                        </View>

                        {/* Gross Annual Turnover */}
                        <ThemedTextInput
                            label="Gross Annual Turnover"
                            value={businessTurnover}
                            placeHolder="Enter Gross Annual Turnover"
                            keyboardType="numeric"
                            onChangeText={(value) => setbusinessTurnover(formatIndianCurrency(value))}
                            error={errors.businessTurnover}
                        />

                        {/* Gross Annual Income */}
                        <ThemedTextInput
                            label="Gross Annual Income"
                            value={businessIncome}
                            placeHolder="Enter Gross Annual Income"
                            keyboardType="numeric"
                            onChangeText={(value) => setbusinessIncome(formatIndianCurrency(value))}
                            error={errors.businessIncome}
                        />

                        {/* Credit Card Ownership */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                            <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
                                Do You Own A Credit Card?
                            </ThemedHeadingText>
                            <RadioButtonGroup
                                size="auto"
                                options={[
                                    { label: "Yes", value: "1" },
                                    { label: "No", value: "2" },
                                ]}
                                onValueChange={sethasCreditCard}
                                direction="row"
                                defaultValue={hasCreditCard}
                            />
                        </View>
                    </ScrollView>

                    {/* Submit Button */}
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
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#FF4800",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        width: "90%"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center'
    },
});

export default RevenueIncomeDetails;
