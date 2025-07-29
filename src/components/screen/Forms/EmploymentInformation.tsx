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
import { BASE_URL } from "@/components/util/api_url";

const API_BASE_URL = `${BASE_URL}/api`;

const EmploymentInformation = ({ navigation }) => {
  const [applicationId, setapplicationId] = useState("");
  const [employmentType, setEmploymentType] = useState(""); // ✅ Ensure state holds the selected value
  const [isLoading, setIsLoading] = useState(false);
 
  const [loantype, setloantype] = useState("")



  const theme = Appearance.getColorScheme();
  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };

  // const EmploymentOptions = [
  //   { label: "Salaried", description: "Working full-time with a regular income", value: "Salaried" },
  //   { label: "Self Employed Business", description: "Running your own business or startup", value: "SelfEmployedBusiness" },
  //   { label: "Self Employed Professional", description: "Practicing a profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
  //   { label: "Student", description: "Currently studying or working part-time", value: "Student" },
  // ];





  // ✅ Fetch Phone Number before API call
  useEffect(() => {
    const fetchPhoneNumber = async () => {

      const loan = await AsyncStorage.getItem('loanType');
      // const loanss = loan ? JSON.parse(loan) : null;
      setloantype(loan ?? "PersonalLoan");


      const jsonValue = await AsyncStorage.getItem('appIdData');
    const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
    setapplicationId(parsedValue);
    console.log(parsedValue)

    };
    fetchPhoneNumber();
  }, []);



  
let options = [];

if (loantype === 'PersonalLoan') {
  options = [
    { label: "Salaried", description: "Working Full-Time With A Regular Income", value: "Salaried" },
    { label: "Self Employed Business", description: "Running Your Own Business Or Startup", value: "SelfEmployedBusiness" },
    { label: "Self Employed Professional", description: "Practicing A Profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
    { label: "Student", description: "Currently Studying Or Working Part-time", value: "Student" },
  ];
} else if (loantype === 'BusinessLoan') {
  options = [
    { label: "Self Employed Business", description: "Running your own business or startup", value: "SelfEmployedBusiness" },
    { label: "Self Employed Professional", description: "Practicing a profession (e.g. Doctor, CA, Lawyer)", value: "SelfEmployedProfessional" },
  ];
}

console.log(options)



  // ✅ Handle Employment Selection and Send API Request
  const handleSelection = async (selectedValue) => {
    if (!selectedValue) {
      Alert.alert("Error", "Employment Status Is Required.");
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
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={[styles.header]}>Employment Information</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
              <ThemedText style={appStyle.subHeaderTitle}>Tell us about your employment status</ThemedText>
            </View>

            {/* ✅ Employment Selection */}
            <ThemedView>
              <ThemedRadioButtonList options={options} onValueChange={handleSelection} direction="column" />
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
