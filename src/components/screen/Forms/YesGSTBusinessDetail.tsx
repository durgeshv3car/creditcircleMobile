import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import { ThemedHeadingText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Appearance,
    Pressable,
    Alert,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/components/util/api_url";

const API_BASE_URL = `${BASE_URL}/api/loan-application`;
const GET_DATA_URL = `${BASE_URL}/api/otp/get-loadId?applicationId=`;


const YesGSTBusinessDetail = ({ navigation }) => {
    const [data, setData] = useState({});
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [errors, setErrors] = useState({});

    const [applicationId, setapplicationId] = useState()

    const [pinCode, setPinCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");



    useEffect(() => {
        if (data.officePinCode) {
            setPinCode(data.officePinCode); // set from API initially
        }
    }, [data.officePinCode]);

    useEffect(() => {
        if (pinCode.length === 6) {
            fetchCityState();
        }
    }, [pinCode]);

    const fetchCityState = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/pincode/${pinCode}`);
            if (res.data) {
                const fetchedCity = res.data.city || "";
                const fetchedState = res.data.state || "";
    
                setCity(fetchedCity);
                setState(fetchedState);
    
                setData((prevData) => ({
                    ...prevData,
                    city: fetchedCity,
                    state: fetchedState,
                }));
            }
        } catch (error) {
            console.error("❌ Error fetching city/state from pincode:", error);
            setCity("");
            setState("");
        }
    };
    


    console.log("LLL", city,state, pinCode)


    useEffect(() => {
        const fetchApplicationId = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('appIdData');
                const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
                if (parsedValue) {
                    setapplicationId(parsedValue);
                    console.log("✅ Application ID fetched:", parsedValue);
                }
            } catch (error) {
                console.error("❌ Error fetching application ID:", error);
            }
        };
    
        fetchApplicationId();

    }, []);
    
    useEffect(() => {
        if (applicationId) {
            console.log("📥 Fetching business details for applicationId:", applicationId);
            fetchBusinessDetails();
        }
    }, [applicationId]);




    
    const fetchBusinessDetails = async () => {
        if (!applicationId) return;
    
        try {
            setIsLoading(true);
            const response = await axios.get(`${GET_DATA_URL}${applicationId}`);
            if (response.data) {
                console.log("✅ Fetched Data:", response.data);
                setData(response.data);
            }
        } catch (error) {
            console.error("❌ Error fetching business details:", error);
            Alert.alert("Error", error.response?.data?.message || "Failed to fetch business details");
        } finally {
            setIsLoading(false);
        }
    };
    

    // // ✅ Handle Radio Button Selection
    // const handleSelection = (value) => {
    //     console.log("🔘 Selected Option:", value);
    //     setSelectedOption(value);
        
    //     setData((prevData) => ({ ...prevData, propertyOwnership: value }));
    // };

    const handleSelection = (value) => {
        console.log("🔘 Selected Option:", value);
        setSelectedOption(value);
        setData((prevData) => ({
            ...prevData,
            propertyOwnership: value
        }));
    };


    const validateInputs = () => {
        let errors = {};
        let isValid = true;
    
        // ✅ Check propertyOwnership instead of businessType
        if (!data.propertyOwnership) {
            errors.propertyOwnership = "Select Business Type is required";
            isValid = false;
        }
    
        setErrors(errors);
        return isValid;
    };
    
    // ✅ Handle Update and Redirect
    const handleUpdate = async () => {
        if (!validateInputs()) return;
    
        try {
            setIsLoading(true);
    
            const requestBody = {
                businessType: selectedOption, // ✅ Fix
                applicationId,
            };
    
            console.log("📤 Updating Data:", requestBody);
    
            const response = await axios.post(`${API_BASE_URL}/updateGstDetails`, requestBody);
    
            if (response.status === 200) {
                
                // ✅ Fetch Employment Information
                const employmentInfoResponse = await axios.get(
                    `${API_BASE_URL}?applicationId=${applicationId}`
                );
    
                if (employmentInfoResponse.status === 200) {
                    const employmentType = employmentInfoResponse.data.employmentInformation;
    
                    console.log("🚀 Employment Type:", employmentType);
    
                    // ✅ Navigate based on employment type
                    if (employmentType === "SelfEmployedBusiness") {
                        navigation.navigate("RevenueIncomeDetailsProfessional");
                    } else {
                        navigation.navigate("RevenueIncomeDetails");
                    }
                } else {
                    Alert.alert("Error", "Failed to fetch employment information");
                }
            }
        } catch (error) {
            console.error("❌ Error updating business details:", error);
            Alert.alert("Error", error.response?.data?.message || "Failed to update details");
        } finally {
            setIsLoading(false);
        }
    };

    const theme = Appearance.getColorScheme();

    const dynamicStyles = {
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
    };

    const textareee = {
        backgroundColor: theme === "dark" ? "#00000036" : "#fff",
    };

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={styles.header}>Business Details</ThemedHeadingText>
                        </View>

                        {/* ✅ Auto Fill Data */}
                        <ThemedTextInput
                            label="Business PAN"
                            placeHolder="Auto fetch from GST"
                            value={data.businessPAN}
                           
                            
                        />

                        <ThemedTextInput
                            label="Legal Name Of Business"
                            value={data.businessName}
                            
                        />

                        <ThemedTextInput
                            label="Trade Name Of Business"
                            value={data.tradeName}
                            
                        />

                        <ThemedTextInput
                            label="Date Of Registration"
                            value={data.yearsInBusiness}
                           
                        />



<ThemedHeadingText style={styles.title}>Principal Place Of Business</ThemedHeadingText>
                            <TextInput
                                editable={false}
                                multiline
                                numberOfLines={3}
                                value={data.PrincipalPlaceofBusiness}
                                style={[styles.tearariii, textareee, { color: "#666" }]}

                            />

<ThemedRadioButtonList
    options={[
        { label: "Owned By Self/Spouse", value: "Owned By Self/Spouse" },
        { label: "Owned By Parents", value: "Owned By Parents" },
        { label: "Rented/Don't Own The Property", value: "Rented/Don't Own The Property" },
    ]}
    onValueChange={handleSelection}
    error={errors.propertyOwnership} // ✅ Fix: use propertyOwnership instead of businessType
/>



                        <ThemedTextInput label="GST Status" placeHolder={data.GSTStatus} disable={false} />

                            <ThemedTextInput label="Nature Of Core Business Activity"  placeHolder={data.natureOfBusiness} disable={false} />

                            {/* <ThemedTextInput label="Pin Code" placeHolder={data.officePinCode} disable={false} /> */}


                            <ThemedTextInput
    label="Pin Code"
    value={pinCode}
    onChangeText={(text) => setPinCode(text)}
    disable={false}
/>

                            
                            

                            <View style={{ flex: 1, flexDirection: 'row', width: '100%', gap: 20 }}>
                                <ThemedTextInput label="City" placeHolder={city} disable={false} />
                                <ThemedTextInput label="State" placeHolder={state} disable={false} />
                            </View>


                        {/* ✅ Submit Button */}
                        <View style={appStyle.buttonContainer}>
                            <Pressable
                                style={styles.button}
                                onPress={handleUpdate}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Continue</Text>
                                )}
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    button: {
        backgroundColor: "#FF4800",
        paddingVertical: 15,
        borderRadius: 5,
        width: "90%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default YesGSTBusinessDetail;
