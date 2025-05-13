import { useEffect, useState } from "react";
import axios from "axios";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    StyleSheet,
    Appearance,
} from "react-native";
import { ThemedTextInput } from "@/components/ThemedInput";
import { BASE_URL } from "@/components/util/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import appStyle from "@/AppStyles";

const AddressInformation = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [landmark, setLandmark] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [profileExists, setProfileExists] = useState(true);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    /** ✅ Fetch user profile data if already available */
const fetchProfileData = async () => {
  try {
    // ✅ Fetch the phone number from the OTP model
    const otpResponse = await axios.get(`${BASE_URL}/api/otp/get-phone-number`);

    if (!otpResponse.data.phoneNumber) {
      Alert.alert("Error", "Phone number not found. Verify OTP first.");
      return;
    }

    setPhoneNumber(otpResponse.data.phoneNumber);


        const jsonValue = await AsyncStorage.getItem('userData');
    const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
    

    // ✅ Fetch Profile using Phone Number
    const profileResponse = await axios.get(
      `${BASE_URL}/api/otp/get-profile?phoneNumber=${parsedValue}`
    );

    if(profileResponse.data.houseNo === null || profileResponse.data.streetAddress === null || profileResponse.data.landmark === null ){
        setProfileExists(true);
        
      }else{
        setProfileExists(false);
      }


    if (profileResponse.data) {
      setHouseNo(profileResponse.data.houseNo || "");
      setStreetAddress(profileResponse.data.streetAddress || "");
      setLandmark(profileResponse.data.landmark || "");
    } else {
      console.log("Profile not found, user will need to create one.");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

useEffect(() => {
  fetchProfileData();

  
}, []);

    const validateInputs = () => {
        let valid = true;
        let errorObj = {};

        if (!houseNo.trim()) {
            errorObj.houseNo = "House No. Is Required";
            valid = false;
        }
        if (!streetAddress.trim()) {
            errorObj.streetAddress = "Street Address Is Required";
            valid = false;
        }

        setErrors(errorObj);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) return;

        try {
            setLoading(true);
            const requestData = { phoneNumber, houseNo, streetAddress, landmark };

            const response = await axios.put(
                `${BASE_URL}/api/loan-application/address`,
                requestData
            );

            if (response.status === 200) {
                navigation.navigate("PersonalBackground");
            } else {
                console.error("Error updating address:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating address:", error);
        } finally {
            setLoading(false);
        }
    };

    
      const theme = Appearance.getColorScheme();
      const dynamicStyles = {
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
        shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
      };
    

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
        {/* Dismiss keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
                <View style={{marginBottom: 16,}}>
                    <ThemedHeadingText style={styles.header}>Address Information</ThemedHeadingText>
                      <ThemedView style={appStyle.headerLine}></ThemedView>
                    <ThemedText  style={styles.subHeader}>Tell us about your address</ThemedText>
                </View>

                <ThemedTextInput
                    label="House No."
                    value={houseNo}
                    onChangeText={setHouseNo}
                    error={errors.houseNo}
                    placeHolder="Flat No., Building Name, Apartment"
                />
                <ThemedTextInput
                    label="Street Address"
                    value={streetAddress}
                    onChangeText={setStreetAddress}
                    error={errors.streetAddress}
                    placeHolder="Road Name, Area, Sector, Colony, Village"
                />
                <ThemedTextInput
                    label="Landmark"
                    value={landmark}
                    onChangeText={setLandmark}
                    placeHolder="E.g. Near Apollo Hospital"
                />
                </ScrollView>

                <View
            style={[
              styles.buttonContainer,
              { marginBottom: isKeyboardVisible ? 10 : 20 },
            ]}
          >
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{profileExists === false ? "Next" : "Continue"}</Text>
                </TouchableOpacity>
                </View>

                </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    );
};

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20 },
//     headerContainer: { marginBottom: 20 },
//     header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
//     subHeader: { fontSize: 12, color: "gray" },
//     button: {
//         backgroundColor: "#FF4800",
//         paddingVertical: 15,
//         borderRadius: 5,
//         alignItems: "center",
//         marginTop: 20,
//     },
//     buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    scrollContainer: {
      paddingHorizontal: 20,
      paddingBottom: 80,
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    subHeader: {
      fontSize: 12,
    },
    inputGroup: {
      marginBottom: 15,
    },
    label: {
      fontSize: 14,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 16,
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
  
    customInput: {
      marginBottom: 10
    }
  });

export default AddressInformation;
