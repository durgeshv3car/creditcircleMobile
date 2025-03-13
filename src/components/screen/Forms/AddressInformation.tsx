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
} from "react-native";
import { ThemedTextInput } from "@/components/ThemedInput";

const AddressInformation = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [landmark, setLandmark] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [profileExists, setProfileExists] = useState(true);

    /** ✅ Fetch user profile data if already available */
const fetchProfileData = async () => {
  try {
    // ✅ Fetch the phone number from the OTP model
    const otpResponse = await axios.get("http://192.168.0.18:5000/api/otp/get-phone-number");

    if (!otpResponse.data.phoneNumber) {
      Alert.alert("Error", "Phone number not found. Verify OTP first.");
      return;
    }

    setPhoneNumber(otpResponse.data.phoneNumber);

    // ✅ Fetch Profile using Phone Number
    const profileResponse = await axios.get(
      `http://192.168.0.18:5000/api/otp/get-profile?phoneNumber=${otpResponse.data.phoneNumber}`
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
            errorObj.houseNo = "House No. is required";
            valid = false;
        }
        if (!streetAddress.trim()) {
            errorObj.streetAddress = "Street Address is required";
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
                `http://192.168.0.18:5000/api/loan-application/address`,
                requestData
            );

            if (response.status === 200) {
                Alert.alert("Success", "Address updated successfully");
                navigation.navigate("PersonalBackground");
            } else {
                Alert.alert("Error", response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error updating address:", error);
            Alert.alert("Error", "Failed to update address.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Address Information</Text>
                    <Text style={styles.subHeader}>Tell us about your address</Text>
                </View>

                <ThemedTextInput
                    label="House No."
                    value={houseNo}
                    onChangeText={setHouseNo}
                    error={errors.houseNo}
                />
                <ThemedTextInput
                    label="Street Address"
                    value={streetAddress}
                    onChangeText={setStreetAddress}
                    error={errors.streetAddress}
                />
                <ThemedTextInput
                    label="Landmark"
                    value={landmark}
                    onChangeText={setLandmark}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{profileExists === false ? "Update" : "Continue"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    headerContainer: { marginBottom: 20 },
    header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
    subHeader: { fontSize: 12, color: "gray" },
    button: {
        backgroundColor: "#FF4800",
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AddressInformation;
