import { useEffect, useState } from "react";
import axios from "axios";
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Pressable,
    Alert,
    StyleSheet
} from "react-native";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import appStyle from "@/AppStyles";

const PersonalBackground = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [education, setEducation] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [profileExists, setProfileExists] = useState(false);

    const fetchProfileData = async () => {
        try {
            const otpResponse = await axios.get("http://192.168.0.18:5000/api/otp/get-phone-number");

            if (!otpResponse.data.phoneNumber) {
                Alert.alert("Error", "Phone number not found. Verify OTP first.");
                return;
            }

            setPhoneNumber(otpResponse.data.phoneNumber);

            const profileResponse = await axios.get(
                `http://192.168.0.18:5000/api/otp/get-profile?phoneNumber=${otpResponse.data.phoneNumber}`
            );

            console.log(profileResponse.data.gender)

            if (profileResponse.data) {
                setGender(profileResponse.data.gender || "");
                setEducation(profileResponse.data.education || "");
                setMaritalStatus(profileResponse.data.maritalStatus || "");

                setProfileExists(true);
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

        if (!gender) {
            errorObj.gender = "Gender is required";
            valid = false;
        }
        if (!education) {
            errorObj.education = "Education is required";
            valid = false;
        }
        if (!maritalStatus) {
            errorObj.maritalStatus = "Marital Status is required";
            valid = false;
        }

        setErrors(errorObj);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) return;

        try {
            setLoading(true);
            const requestData = { phoneNumber, gender, education, maritalStatus };

            const response = await axios({
                method: profileExists ? "PUT" : "POST",
                url: "http://192.168.0.18:5000/api/loan-application/personal-background",
                data: requestData
            });

            if (response.status === 200) {
                Alert.alert("Success", profileExists ? "Updated successfully" : "Created successfully");
                navigation.navigate("LoanRequirements");
            } else {
                Alert.alert("Error", response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error updating personal background:", error);
            Alert.alert("Error", "Failed to update personal background.");
        } finally {
            setLoading(false);
        }
    };

    const handleLookingForOtherOffers = async () => {
        try {
            // ✅ Fetch the phone number from OTP storage
            const otpResponse = await fetch("http://192.168.0.18:5000/api/otp/get-phone-number");
            const otpData = await otpResponse.json();
    
            if (!otpResponse.ok || !otpData.phoneNumber) {
                Alert.alert("Error", "Failed to retrieve phone number.");
                return;
            }
    
            // ✅ Call the API to mark OTP as completed
            const response = await fetch("http://192.168.0.18:5000/api/markOtpAsCompleted", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: otpData.phoneNumber })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                Alert.alert("Success", "OTP status updated. Redirecting to Home...");
                navigation.navigate("Home"); // ✅ Redirect to Home after completion
            } else {
                Alert.alert("Error", data.message || "Failed to update OTP status.");
            }
    
        } catch (error) {
            console.error("Error in handleLookingForOtherOffers:", error);
            Alert.alert("Error", "Network error. Please try again.");
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <ThemedHeadingText style={styles.header}>Personal Background</ThemedHeadingText>
                    <ThemedView style={styles.headerLine}></ThemedView>
                    <ThemedText style={styles.subHeader}>Share your personal background</ThemedText>
                </View>

                <ThemedHeadingText style={styles.title}>Gender</ThemedHeadingText>
                <RadioButtonGroup 
                    options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                        { label: 'Other', value: 'Other' }
                    ]} 
                    onValueChange={setGender} 
                    defaultValue={gender} 
                    error={errors.gender} 
                />

                <ThemedView style={styles.sectionContainer}>
                    <ThemedHeadingText style={styles.title}>Educational Qualification</ThemedHeadingText>
                    <ThemedRadioButtonList 
                        options={[
                            { label: 'Under Graduate', description: "Currently pursuing a diploma or bachelor's degree", value: 'Under Graduate' },
                            { label: 'Graduate', description: "Completed a bachelor's degree", value: 'Graduate' },
                            { label: 'Post Graduate', description: "Completed a master's degree or higher", value: 'Post Graduate' }
                        ]} 
                        onValueChange={setEducation} 
                        defaultValue={1} 
                        error={errors.education} 
                    />
                </ThemedView>

                <ThemedHeadingText style={styles.title}>Marital Status</ThemedHeadingText>
                <RadioButtonGroup 
                    options={[
                        { label: 'Single', value: 'Single' },
                        { label: 'Married', value: 'Married' },
                        { label: 'Separated', value: 'Separated' },
                        { label: 'Divorced', value: 'Divorced' },
                        { label: 'Widowed', value: 'Widowed' }
                    ]} 
                    onValueChange={setMaritalStatus} 
                    defaultValue={maritalStatus} 
                    error={errors.maritalStatus} 
                />

                <View style={appStyle.buttonContainer}>
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>{profileExists ? "Check Eligibility For Personal Loan" : "Check Eligibility For Personal Loan"}</Text>
                    </Pressable>
                    
                    <Pressable style={styles.buttonHome} onPress={handleLookingForOtherOffers}>
    <Text style={styles.buttonTextHome}>Looking For Other Offers</Text>
</Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
    header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
    subHeader: { fontSize: 12 },
    buttonContainer: { alignItems: "center" },
    button: { backgroundColor: "#FF4800", paddingVertical: 15, borderRadius: 5, width: "90%" },
    buttonHome: { paddingVertical: 15, borderRadius: 5, width: "90%" },
    buttonTextHome: { color: "#AFAFAF", fontSize: 14, textAlign: 'center' },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: 'center' }
});

export default PersonalBackground;
