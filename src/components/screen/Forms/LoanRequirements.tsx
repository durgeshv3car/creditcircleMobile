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
import { BASE_URL } from "@/components/util/api_url";

const API_BASE_URL = `${BASE_URL}/api`;



const formatIndianCurrency = (value) => {
  const x = value.replace(/,/g, "");
  if (!x) return "";
  const lastThree = x.slice(-3);
  const otherNumbers = x.slice(0, -3);
  if (otherNumbers !== "") {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  } else {
    return lastThree;
  }
}

const LoanRequirements = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState(12);
  const [isLoading, setIsLoading] = useState(false);


  const [loanType, setloantype] = useState("");
  const [NoloanAmount, setNoLoanAmount] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (text) => {
    const rawValue = text.replace(/[^0-9]/g, "");
    setNoLoanAmount(rawValue)
    // console.log("Not Coma", rawValue)    
    setLoanAmount(formatIndianCurrency(rawValue));
  };

  const screenWidth = Dimensions.get("window").width;
  const theme = Appearance.getColorScheme();

  const dynamicStyles = {
    backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
  };
  
  // ✅ Fetch Phone Number
  useEffect(() => {

    const fetchPhoneNumber = async () => {
      const loanTypess= await AsyncStorage.getItem('loanType');
      setloantype(loanTypess)

      try {
        // const response = await axios.get(`${API_BASE_URL}/otp/get-phone-number`);
         const jsonValue = await AsyncStorage.getItem('userData');
        const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
        if (parsedValue) {
          setPhoneNumber(parsedValue);
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
    let valid = true;
    let errorObj = {};
  
    if (!phoneNumber) {
      errorObj.phoneNumber = "Phone Number Is Required.";
      valid = false;
    }
  
    if (!NoloanAmount || isNaN(NoloanAmount) || NoloanAmount <= 0) {
      errorObj.loanAmount = "Please Enter A Valid Loan Amount.";
      valid = false;
    } else if (parseInt(NoloanAmount) < 5000) {
      errorObj.loanAmount = "Loan Amount Must Be At Least ₹5,000.";
      valid = false;
    }
  
    if (!loanTenure || isNaN(loanTenure) || loanTenure < 1 || loanTenure > 60) {
      errorObj.loanTenure = "Loan Tenure Must Be Between 1 And 60 Months.";
      valid = false;
    }
  
    setErrors(errorObj);
    return valid;
  };

  // ✅ Handle Loan Submission
  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const requestData = {
        phoneNumber,
        desiredLoanAmount: parseFloat(NoloanAmount),
        loanTenure: parseInt(loanTenure, 10),
        loanType,
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
        navigation.navigate("EmploymentInformation");
      } else {
        Alert.alert("Error", response.data.message || "Failed to submit loan requirements.");
      }
    } catch (error) {
      console.error("❌ Error submitting loan requirements:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };



  const imagecoleor = {
    tintColor: theme === 'dark' ? "#ffffff" : ""
  };


  return (
    <SafeAreaView style={[styles.container, dynamicStyles]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={[styles.header]}>Loan Requirements</ThemedHeadingText>
              <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
              <ThemedText style={styles.subHeader}>Your Loan Preferences</ThemedText>
            </View>

            <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>Desired Loan Amount</ThemedHeadingText>
            <ThemedTextInput
              style={[ { width: screenWidth - 40 , borderWidth: 1, borderRadius: 6, paddingLeft: 10, marginTop: 10, textAlign: 'center', height: 60 }]}
              placeholder="Enter the loan amount you wish to borrow."
              keyboardType="decimal-pad"
              value={loanAmount}
              onChangeText={handleInputChange}
              error={errors.loanAmount}
            />

            <View style={styles.containerMain}>
              <View style={styles.sliderValue}>
                <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold", flex: 1 }}>Loan Tenure (Months)</ThemedHeadingText>
                <ThemedTextInput
                  style={[styles.input,]}
                  value={String(loanTenure)}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) => setLoanTenure(parseInt(text, 10) || 0)}
                />
              </View>
              <Slider value={loanTenure} minimumTrackTintColor="#273283" onValueChange={setLoanTenure} minimumValue={1} maximumValue={60} step={1} />
              <Image
                source={require("../../../assets/images/sliderImage.png")}
                style={[imagecoleor, {
                  width: screenWidth - 40,
                  height: screenWidth * 0.1,
                }]}
                resizeMode="contain" // Adjust this to "cover" or "stretch" if needed
              />
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

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
//   header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
//   subHeader: { fontSize: 12 },
//   input: { borderWidth: 1, borderRadius: 6, paddingLeft: 10, marginTop: 10, textAlign: "center", height: 50 },
//   buttonContainer: { position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center" },
//   button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
// });


const styles = StyleSheet.create({


  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 12,
  },

  containerMain: {
    marginTop: 6
  },

  sliderValue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    width: 100,
    textAlign: 'center',
    fontWeight: "bold",
    right: 0,
    position: 'absolute',
    marginTop: 20,
    paddingVertical: 0,
    height: 30,
    borderColor: "#D5D5D5",
    
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




export default LoanRequirements;
