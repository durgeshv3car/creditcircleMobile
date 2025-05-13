import { useEffect, useState } from "react";
import axios from "axios";
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Pressable,
    Alert,
    StyleSheet,
    Appearance
} from "react-native";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import appStyle from "@/AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/components/util/api_url";

const PersonalBackground = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [education, setEducation] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [profileExists, setProfileExists] = useState(false);
    const [loantype, setLoantype] = useState("PersonalLoan");


    const fetchProfileData = async () => {
        const loan = await AsyncStorage.getItem('loanType');
        setLoantype(loan ?? "PersonalLoan");

        try {
            const otpResponse = await axios.get(`${BASE_URL}/api/otp/get-phone-number`);

            if (!otpResponse.data.phoneNumber) {
                Alert.alert("Error", "Phone number not found. Verify OTP first.");
                return;
            }

            setPhoneNumber(otpResponse.data.phoneNumber);

            const profileResponse = await axios.get(
                `${BASE_URL}/api/otp/get-profile?phoneNumber=${otpResponse.data.phoneNumber}`
            );

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
            errorObj.gender = "Gender Is Required";
            valid = false;
        }
        if (!education) {
            errorObj.education = "Education Is Required";
            valid = false;
        }
        if (!maritalStatus) {
            errorObj.maritalStatus = "Marital Status Is Required";
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
                url: `${BASE_URL}/api/loan-application/personal-background`,
                data: requestData
            });

            if (response.status === 200) {
                navigation.navigate("LoanRequirements");
            } else {
                // Alert.alert("Error", response.data.message || "Something went wrong");
                console.log("Error:", response.data.message || "Something went wrong");
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
            const otpResponse = await fetch(`${BASE_URL}/api/otp/get-phone-number`);
            const otpData = await otpResponse.json();

            if (!otpResponse.ok || !otpData.phoneNumber) {
                return;
            }

            const response = await fetch(`${BASE_URL}/api/markOtpAsCompleted`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: otpData.phoneNumber })
            });

            const data = await response.json();

            if (response.ok) {
                navigation.navigate("Home");
            } else {
                // Alert.alert("Error", data.message || "Failed to update OTP status.");
                console.log("Error:", data.message || "Failed to update OTP status.");
            }

        } catch (error) {
            console.error("Error in handleLookingForOtherOffers:", error);
        }
    };

      const theme = Appearance.getColorScheme();
      const dynamicStyles = {
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
        shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
      };

    

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <ThemedHeadingText style={styles.header}>Personal Background</ThemedHeadingText>
                    <ThemedView style={appStyle.headerLine}></ThemedView>
                    <ThemedText style={styles.subHeader}>Share Your Personal Background</ThemedText>
                </View>

                <ThemedHeadingText style={styles.title}>Gender</ThemedHeadingText>
                <RadioButtonGroup 
                    options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                        { label: 'Other', value: 'Other' }
                    ]} 
                    value={gender}
                    onValueChange={setGender} 
                    direction="row"
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
                        value={education}
                        onValueChange={setEducation} 
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
                    value={maritalStatus}
                    onValueChange={setMaritalStatus} 
                    direction="row"
                    error={errors.maritalStatus} 
                />

                <View style={{marginTop:26}}>
                    {loantype === "BusinessLoan" ? 
                  <View style={appStyle.buttonContainer}>
                  <Pressable style={styles.button} onPress={handleSubmit}>
                      <Text style={styles.buttonText}>Next</Text>
                  </Pressable>
              </View>
                        : 
                        <View style={appStyle.buttonContainer}>
                        <Pressable style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Check Eligibility For Personal Loan</Text>
                        </Pressable>

                        <Pressable style={styles.buttonHome} onPress={handleLookingForOtherOffers}>
                            <Text style={styles.buttonTextHome}>Looking For Other Offers</Text>
                        </Pressable>
                    </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 12,
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
        width: "100%"
    },
    buttonHome: {
        paddingVertical: 15,
        borderRadius: 5,
        width: "100%"
    },
    buttonTextHome: {
        color: "#AFAFAF",
        fontSize: 14,
        textAlign: 'center'
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center'
    },
    sectionContainer: {
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#F4F4F4",
        borderRadius: 6,
        padding: 10,
        paddingBottom: 0,
    }
});

export default PersonalBackground;
