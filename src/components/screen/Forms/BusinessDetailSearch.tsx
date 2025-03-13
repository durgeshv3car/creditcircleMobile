import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import { ThemedHeadingText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    SafeAreaView,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";

const API_BASE_URL = "http://192.168.0.18:5000/api/loan-application"; // API endpoint

const BusinessDetailSearch = ({ navigation }) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [gstNumber, setGstNumber] = useState("");
    const [hasGstNumber, setHasGstNumber] = useState("1");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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

    // ✅ Handle GST fetch logic
    const handleSubmit = async () => {
        if (hasGstNumber === "1") {
            // ✅ If user has GST, validate input
            if (!gstNumber || gstNumber.length !== 15) {
                Alert.alert("Error", "Please enter a valid 15-character GST Number");
                return;
            }

            try {

                
                const jsonValue = await AsyncStorage.getItem('appIdData');
                const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
                // setapplicationId(parsedValue);
                console.log(parsedValue)

                setLoading(true);
                const requestData = {
                    gstNumber,
                    applicationId: parsedValue // Example applicationId — replace with dynamic ID
                };

                console.log("📤 Sending Data:", requestData);

                const response = await axios.post(`${API_BASE_URL}/fetchgstdetails`, requestData);

                if (response.status === 200) {
                    Alert.alert("Success", "GST details fetched successfully!");
                    console.log("✅ Response Data:", response.data);
                    
                    // ✅ Navigate to GST Business Detail screen with data
                    navigation.navigate('YesGSTBusinessDetail', {
                        gstData: response.data
                    });
                } else {
                    Alert.alert("Error", response.data.message || "Failed to fetch GST details");
                }
            } catch (error) {
                console.error("❌ Error fetching GST details:", error);
                Alert.alert("Error", error.response?.data?.message || "Failed to fetch GST details");
            } finally {
                setLoading(false);
            }
        } else {
            // ✅ Navigate to another screen if no GST is available
            navigation.navigate('NoGSTBusinessDetail');
        }
    };

    const yesNoOptions = [
        { label: 'Yes', value: '1' },
        { label: 'No', value: '2' }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Header */}
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={styles.header}>
                                GST Details
                            </ThemedHeadingText>
                            <ThemedView style={styles.headerLine} />
                        </View>

                        {/* GST Number Availability */}
                        <View style={styles.inputGroup}>
                            <ThemedHeadingText>Do You Have GST Number?</ThemedHeadingText>
                            <RadioButtonGroup
                                size="auto"
                                options={yesNoOptions}
                                onValueChange={setHasGstNumber}
                                direction="row"
                                defaultValue={hasGstNumber}
                            />
                        </View>

                        {/* GST Number Input (Show only if Yes) */}
                        {hasGstNumber === "1" && (
                            <View style={styles.inputGroup}>
                                <TextInput
                                    placeholder="Enter your business GST number"
                                    style={styles.input}
                                    value={gstNumber}
                                    onChangeText={setGstNumber}
                                    keyboardType="default"
                                    maxLength={15}
                                />
                            </View>
                        )}
                    </ScrollView>

                    {/* Continue Button */}
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.button}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Continue</Text>
                            )}
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    header: {
        fontSize: 18,
        fontWeight: "bold"
    },
    headerLine: {
        width: '20%',
        height: 2,
        backgroundColor: '#FF4800',
        marginTop: 4
    },
    inputGroup: {
        marginVertical: 15
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 50,
        paddingHorizontal: 15,
        height: 48,
        textAlign: "center"
    },
    buttonContainer: {
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center"
    },
    button: {
        backgroundColor: "#FF4800",
        paddingVertical: 15,
        borderRadius: 5,
        width: "90%",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default BusinessDetailSearch;
