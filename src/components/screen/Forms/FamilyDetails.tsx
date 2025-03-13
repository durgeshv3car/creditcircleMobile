import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Appearance,
    Button,
    Pressable,
    Image,
} from "react-native";

const FamilyDetails = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");


    useEffect(() => {
        // Add event listeners for keyboard show and hide
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
            setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
            setKeyboardVisible(false)
        );

        return () => {
            // Cleanup event listeners
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleContinue = () => {
        console.log({ firstName, lastName, email, dob });
    };


    const theme = Appearance.getColorScheme();


    const dynamicStyles = {
        backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
        shadowColor: theme === 'dark' ? '#FFFFFF' : '#000000',
    };

    const imagecoleor = {
        tintColor: theme === 'dark' ? "#ffffff" : ""
    };



    const amount = [
        { label: 'Below ₹1 Lac', value: '1' },
        { label: '₹1 - ₹3 Lac', value: '2' },
        { label: '₹3 - ₹5 Lac', value: '3' },
        { label: '₹5 - ₹8 Lac', value: '4' },
        { label: '₹8 - ₹10 Lac', value: '5' },
        { label: 'Over ₹10 Lac', value: '6' }
    ];


    const ModeofSalary = [
        { label: 'Bank', value: '1' },
        { label: 'Cash', value: '2' },
        { label: 'Both', value: '2' }
    ];


    const yesno = [
        { label: 'Yes', value: '1' },
        { label: 'No', value: '2' }
    ];



    const handleSelection = (value) => {
        setSelectedOption(value);
    };

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            {/* Dismiss keyboard when tapping outside */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                          

                            {/* Income Details Section */}
                            <View style={appStyle.HeadingTitle}>
                                <ThemedHeadingText style={styles.header}>Family Details</ThemedHeadingText>
                                <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }} />
                            </View>
                            <ThemedTextInput label="Father’s Name" placeHolder="Enter father’s name" />
                            
                            <ThemedTextInput label="Mother’s Name" placeHolder="Enter mother’s name" />



                            
                            {/* Credit Card Section */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                <ThemedHeadingText style={{ fontSize: 12, fontWeight: 'bold' }}>Do You Live With Your Parents?</ThemedHeadingText>
                                <RadioButtonGroup
                                    size="auto"
                                    options={yesno}
                                    onValueChange={handleSelection}
                                    direction="row"
                                    defaultValue=""
                                />
                            </View>
                            
                        </ScrollView>

                        {/* Floating "Continue" Button */}
                        <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
                            <Pressable style={styles.button} onPress={() => alert("Hello")}>
                                <Text style={styles.buttonText}>Check Eligibility</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 12,
      fontWeight:'bold'  
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Ensure enough space for floating button
    },
    headerContainer: {
        marginVertical: 20
    },
    header: {
        fontSize: 18,
        fontWeight: "bold"
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
    },
    
});

export default FamilyDetails;
