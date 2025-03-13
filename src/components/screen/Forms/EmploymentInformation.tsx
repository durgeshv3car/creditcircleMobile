import appStyle from "@/AppStyles";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Appearance,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.0.18:5000/api";

const EmploymentInformation = ({ navigation }) => {
  const [applicationId, setapplicationId] = useState("");
  const [employmentType, setEmploymentType] = useState(""); // ✅ Ensure state holds the selected value
  const [isLoading, setIsLoading] = useState(false);

  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  const EmploymentOptions = [
    { label: "Salaried", description: "Working full-time with a regular income", value: "Salaried" },
    { label: "Self Employed Business", description: "Running your own business or startup", value: "SelfEmployedBusiness" },
    { label: "Self Employed Professional", description: "Practicing a profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
    { label: "Student", description: "Currently studying or working part-time", value: "Student" },
  ];

  // ✅ Fetch Phone Number before API call
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      // try {
      //   const response = await axios.get(`${API_BASE_URL}/otp/get-phone-number`);
      //   if (response.data.phoneNumber) {
      //     setPhoneNumber(response.data.phoneNumber);
      //     console.log("📌 Fetched Phone Number:", response.data.phoneNumber);
      //   } else {
      //     Alert.alert("Error", "Phone number not found. Please verify OTP first.");
      //     navigation.navigate("LoginScreen");
      //   }
      // } catch (error) {
      //   console.error("❌ Error fetching phone number:", error);
      //   Alert.alert("Error", "Failed to retrieve phone number.");
      // }

      const jsonValue = await AsyncStorage.getItem('appIdData');
    const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
    setapplicationId(parsedValue);
    console.log(parsedValue)

    };
    fetchPhoneNumber();
  }, []);

  // ✅ Handle Employment Selection and Send API Request
  const handleSelection = async (selectedValue) => {
    if (!selectedValue) {
      Alert.alert("Error", "Employment Status is required.");
      return;
    }

    setEmploymentType(selectedValue); // ✅ Update the state properly

    console.log("✔ Selected Employment Type:", selectedValue);

    setIsLoading(true);

    try {
      const requestData = {applicationId, employmentStatus: selectedValue };
      console.log("🚀 Sending Employment Details:", requestData);

      const response = await axios.post(`${API_BASE_URL}/loan-application/employment-details`, requestData, {
        headers: { "Content-Type": "application/json" }, // ✅ Ensure correct headers
      });

      if (response.status === 200) {
        console.log("✅ Employment Details Submitted. Navigating...");

        // ✅ Dynamic Navigation Based on Employment Type
        switch (selectedValue) {
          case "Salaried":
            navigation.navigate("IncomeandSalaryDetails");
            break;
          case "SelfEmployedBusiness":
            navigation.navigate("BusinessDetailSearch");
            break;
          case "SelfEmployedProfessional":
            navigation.navigate("Professionaldetails");
            break;
          case "Student":
            navigation.navigate("StudentIncomeDetails");
            break;
          default:
            Alert.alert("Error", "Invalid employment type selected.");
            break;
        }
      } else {
        console.log("❌ API Error Response:", response.data);
        Alert.alert("Error", response.data.message || "Failed to submit employment details.");
      }
    } catch (error) {
      console.error("❌ Error submitting employment details:", error.response ? error.response.data : error.message);
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
              <ThemedHeadingText style={[styles.header]}>Employment Information</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
              <ThemedText style={appStyle.subHeaderTitle}>Tell us about your employment status</ThemedText>
            </View>

            {/* ✅ Employment Selection */}
            <ThemedView>
              <ThemedRadioButtonList options={EmploymentOptions} onValueChange={handleSelection} direction="column" />
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = {
  container: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
};

export default EmploymentInformation;
