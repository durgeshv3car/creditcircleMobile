import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState, useEffect } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import axios from "axios";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Appearance,
  Pressable,
  Alert,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import appStyle from "@/AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.0.18:5000/api";

const LoanRequirements = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const theme = Appearance.getColorScheme();

  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  // ✅ Fetch Phone Number
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const response = await axios.get(`http://192.168.0.18:5000/api/otp/get-phone-number`);
        if (response.data.phoneNumber) {
          setPhoneNumber(response.data.phoneNumber);
        } else {
          Alert.alert("Error", "Phone number not found. Please verify OTP first.");
          navigation.navigate("LoginScreen");
        }
      } catch (error) {
        console.error("❌ Error fetching phone number:", error);
        Alert.alert("Error", "Failed to retrieve phone number.");
      }
    };
    fetchPhoneNumber();
  }, []);

  // ✅ Validate Inputs Before Submission
  const validateInputs = () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Phone number is required.");
      return false;
    }

    if (!loanAmount || isNaN(loanAmount) || loanAmount <= 0) {
      Alert.alert("Error", "Please enter a valid loan amount.");
      return false;
    }

    if (!loanTenure || isNaN(loanTenure) || loanTenure < 1 || loanTenure > 60) {
      Alert.alert("Error", "Loan tenure must be between 1 and 60 months.");
      return false;
    }

    return true;
  };

  // ✅ Handle Loan Submission
  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const requestData = {
        phoneNumber,
        desiredLoanAmount: parseFloat(loanAmount),
        loanTenure: parseInt(loanTenure, 10)
      };

      console.log("🚀 Sending Loan Requirements:", requestData);

      const response = await axios.post(`${API_BASE_URL}/loan-application/loan-requirements`, requestData);
      
      const appId = response.data.applicationId

      try {
        const jsonValue = JSON.stringify(appId);
        await AsyncStorage.setItem('appIdData', jsonValue);
        console.log('User data saved successfully.');
      } catch (error) {
        console.error('Error saving user data:', error);
      }
      

      

      if (response.status === 200) {
        Alert.alert("Success", "Loan requirements submitted successfully." );
        navigation.navigate("EmploymentInformation");
      } else {
        Alert.alert("Error", response.data.message || "Failed to submit loan requirements.");
      }
    } catch (error) {
      console.error("❌ Error submitting loan requirements:", error.response ? error.response.data : error.message);
      Alert.alert("Error", error.response?.data?.message || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={[styles.header]}>Loan Requirements</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
              <ThemedText style={styles.subHeader}>Your loan preferences</ThemedText>
            </View>

            <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Desired Loan Amount</ThemedHeadingText>
            <ThemedTextInput
              style={styles.input}
              placeholder="Enter loan amount"
              keyboardType="numeric"
              value={loanAmount}
              onChangeText={(text) => setLoanAmount(text.replace(/[^0-9]/g, ""))}
            />

            <View style={styles.containerMain}>
              <View style={styles.sliderValue}>
                <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold", flex: 1 }}>Loan Tenure (Months)</ThemedHeadingText>
                <ThemedTextInput
                  style={styles.input}
                  value={String(loanTenure)}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) => setLoanTenure(parseInt(text, 10) || 0)}
                />
              </View>
              <Slider value={loanTenure} minimumTrackTintColor="#273283" onValueChange={setLoanTenure} minimumValue={1} maximumValue={60} step={1} />
            </View>
          </ScrollView>

          <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
            <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
              <Text style={styles.buttonText}>{isLoading ? "Submitting..." : "Continue"}</Text>
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
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  subHeader: { fontSize: 12 },
  input: { borderWidth: 1, borderRadius: 6, paddingLeft: 10, marginTop: 10, textAlign: "center", height: 50 },
  buttonContainer: { position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center" },
  button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default LoanRequirements;
