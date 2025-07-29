import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
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
    Appearance,
    Pressable,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

const API_URL = `${BASE_URL}/api/loan-application/student-details`;  // Adjust your API URL

const StudentIncomeDetails = ({ navigation }) => {
    const [applicationId, setApplicationId] = useState("");
    const [studentIncome, setstudentIncome] = useState("");
    const [studentIncomeMode, setstudentIncomeMode] = useState("");
    const [hasCreditCard, setHasCreditCard] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    console.log("hasCreditCard", hasCreditCard);

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
            const jsonValue = await AsyncStorage.getItem("appIdData");
            const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
            setApplicationId(parsedValue);
        } catch (error) {
            console.error("❌ Error fetching Application ID:", error);
            Alert.alert("Error", "Failed to retrieve Application ID.");
        }
    };

    const validateInputs = () => {
        let valid = true;
        let errorObj = {};

        if (!studentIncome) {
            errorObj.studentIncome = "Please select your monthly income";
            valid = false;
        }
        if (!studentIncomeMode) {
            errorObj.studentIncomeMode = "Please select mode of income";
            valid = false;
        }
        if (!hasCreditCard) {
            errorObj.hasCreditCard = "Please select if you have a credit card";
            valid = false;
        }

        setErrors(errorObj);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) return;

        setIsLoading(true);
        try {
            const requestData = {
                applicationId,
                studentIncome,
                studentIncomeMode,
                hasCreditCard,
            };

            console.log("📤 Sending Data:", requestData);

            const response = await axios.post(API_URL, requestData);

            if (response.status === 200) {
              
                navigation.navigate("BankAccount");
            } else {
                Alert.alert("Error", response.data.message || "Failed to save details.");
            }
        } catch (error) {
            console.error("❌ Error submitting income details:", error);
            Alert.alert("Error", error.response?.data?.message || "Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const theme = Appearance.getColorScheme();
    const dynamicStyles = {
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
        shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
    };

    const amountOptions = [
        { label: "Less Than ₹3,000", value: "3000" },
        { label: "₹3,000 - ₹5,000", value: "5000" },
        { label: "₹5,000 - ₹10,000", value: "10000" },
        { label: "₹10,000 - ₹15,000", value: "15000" },
        { label: "More Than ₹15,000", value: "15001" },
    ];

    const modeOfSalaryOptions = [
        { label: "Bank", value: "Bank" },
        { label: "Cash", value: "Cash" },
        { label: "Both", value: "Both" },
    ];

    const creditCardOptions = [
        { label: "Yes", value: "1" },
        { label: "No", value: "0" },
    ];

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={styles.header}>Income Details</ThemedHeadingText>
                            <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }} />
                        </View>

                        <ThemedHeadingText style={styles.title}>What Is Your Monthly Income?</ThemedHeadingText>
                        <ThemedRadioButtonList options={amountOptions} onValueChange={setstudentIncome} direction="column" defaultValue="" error={errors.studentIncome} />

                        <ThemedHeadingText style={styles.title}>Mode Of Income</ThemedHeadingText>
                        <RadioButtonGroup size="auto" options={modeOfSalaryOptions} onValueChange={setstudentIncomeMode} direction="row" defaultValue="" error={errors.studentIncomeMode} />

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                            <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Do You Own A Credit Card?</ThemedHeadingText>
                            <RadioButtonGroup size="auto" options={creditCardOptions} onValueChange={setHasCreditCard} direction="row" defaultValue="" error={errors.hasCreditCard} />
                        </View>

                        <ThemedText style={{ fontSize: 12 }}>Owning a credit card may positively impact your loan approval.</ThemedText>
                    </ScrollView>

                    {/* <View style={appStyle.buttonContainer}>
                        <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
                            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
                        </Pressable>
                    </View> */}

{!isKeyboardVisible && (
  <View style={appStyle.buttonContainer}>
    <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
      {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
    </Pressable>
  </View>
)}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { paddingHorizontal: 20, paddingBottom: 100 },
    header: { fontSize: 18, fontWeight: "bold" },
    buttonContainer: { position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center" },
    button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default StudentIncomeDetails;
