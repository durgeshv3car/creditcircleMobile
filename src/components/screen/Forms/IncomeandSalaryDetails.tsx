import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
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

const API_BASE_URL = `${BASE_URL}/api`;

const IncomeandSalaryDetails = ({ navigation }) => {
  const [applicationId, setapplicationId] = useState("");
  const [netIncome, setNetIncome] = useState("");
  const [modeOfSalary, setModeOfSalary] = useState("");
  const [creditCardOwnership, setCreditCardOwnership] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    fetchPhoneNumber();
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

  const fetchPhoneNumber = async () => {

      const jsonValue = await AsyncStorage.getItem('appIdData');
    const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
    setapplicationId(parsedValue);
    // setPhoneNumber(response.data.phoneNumber);
    console.log(parsedValue) 


    //   const response = await axios.get(`${API_BASE_URL}/otp/get-phone-number`);
    //   if (response.data.phoneNumber) {
    //     setPhoneNumber(response.data.phoneNumber);
    //   } else {
    //     Alert.alert("Error", "Phone number not found. Please verify OTP first.");
    //     navigation.navigate("LoginScreen");
    //   }
    // } catch (error) {
    //   console.error("❌ Error fetching phone number:", error);
    //   Alert.alert("Error", "Failed to retrieve phone number.");
    // }
  };

  // ✅ Validation Function
  const validateInputs = () => {
    let valid = true;
    let errorObj = {};

    if (!netIncome.trim() || isNaN(netIncome)) {
      errorObj.netIncome = "Net Monthly Income is required & must be a number";
      valid = false;
    } else if (parseInt(netIncome) < 5000) { 
      errorObj.netIncome = "Net Monthly Income must be at least ₹5000";
      valid = false;
    }
  
    if (!modeOfSalary) {
      errorObj.modeOfSalary = "Please select your Mode of Salary";
      valid = false;
    }
    if (!creditCardOwnership) {
      errorObj.creditCardOwnership = "Please select Credit Card Ownership";
      valid = false;
    }

    setErrors(errorObj);
    return valid;
  };

  // ✅ Submit Data to API
  const handleSubmit = async () => {
    if (!validateInputs()) return;


    setIsLoading(true);
    try {
      const requestData = {
        applicationId : applicationId,
        netMonthlyIncome: netIncome, // Correct field name
        salaryMode: modeOfSalary, // Correct field name
        hasCreditCard: creditCardOwnership, // Correct field name
      };

      console.log("📤 Sending Data:", requestData);

      const response = await axios.post(
        `${API_BASE_URL}/loan-application/salaried-details`,
        requestData
      );

      console.log("✅ API Response:", response.data);

      if (response.status === 200) {
       
        navigation.navigate("BankAccount");
      } else {
        // Alert.alert("Error", response.data.message || "Failed to submit salary details.");
        console.log("❌ Error:", response.data.message || "Failed to submit salary details.");
      }
    } catch (error) {
      console.error("❌ Error submitting salary details:", error);
      if (error.response) {
        console.log("🔍 API Response Data:", error.response.data);
        // Alert.alert("Error", error.response.data.message || "Invalid request.");
      } else {
        // Alert.alert("Error", "Network error. Please try again.");
        console.log("Network error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  const salaryOptions = [
    { label: "Bank", value: "Bank" },
    { label: "Cash", value: "Cash" },
    { label: "Both", value: "Both" },
  ];

  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  return (
    <SafeAreaView style={[styles.container, dynamicStyles]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={styles.header}>Income & Salary Details</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
            </View>

            {/* Net Monthly Income */}
            <ThemedTextInput
              label="Net Monthly Income"
              placeHolder="Enter your monthly salary"
              keyboardType="numeric"
              value={netIncome}
              onChangeText={setNetIncome}
              error={errors.netIncome}
            />





            {/* Mode of Salary */}
            <View style={{ marginTop: 10 }}>
              <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Mode of Salary</ThemedHeadingText>
              <RadioButtonGroup
                size="auto"
                options={salaryOptions}
                onValueChange={setModeOfSalary}
                direction="row"
                defaultValue={modeOfSalary}
              />
              {errors.modeOfSalary ? <Text style={styles.errorText}>{errors.modeOfSalary}</Text> : null}
            </View>

            {/* Credit Card Ownership */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
              <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Do you own a Credit Card?</ThemedHeadingText>
              <RadioButtonGroup
                size="auto"
                options={yesNoOptions}
                onValueChange={setCreditCardOwnership}
                direction="row"
                defaultValue={creditCardOwnership}
              />
            </View>
            {errors.creditCardOwnership ? <Text style={styles.errorText}>{errors.creditCardOwnership}</Text> : null}
            <Text style={{ fontSize: 11 }}>Owning a credit card may positively impact your loan approval.</Text>
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

export default IncomeandSalaryDetails;
