import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
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

const ProfessionalReasontoApplyforLoan = ({ navigation }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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





    const handleSelection = (value) => {
    };
    const theme = Appearance.getColorScheme();


    const dynamicStyles = {
        backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
        shadowColor: theme === 'dark' ? '#FFFFFF' : '#000000',
    };

    const imagecoleor = {
        tintColor: theme === 'dark' ? "#ffffff" : "#273283"
    };

    const Reason = [
        { label: 'Working Capital Expense', value: '1' },
        { label: 'Purchase Material', value: '2' },
        { label: 'Buy/Upgrade Machine/Equipments', value: '3' },
        { label: 'Buy Office/Factory Space', value: '4' },
        { label: 'Marketing Expense', value: '5' },
        { label: 'Payback Existing Loans/Credit Card Bills', value: '6' },
        { label: 'Others', value: '7' }
    ];

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            {/* Dismiss keyboard when tapping outside */}
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
                            <ThemedHeadingText style={[styles.header]}>Loan Purpose: Reason To Apply For Loan</ThemedHeadingText>
                            <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }}></ThemedView>
                        </View>




                        <ThemedView>
                            <ThemedRadioButtonList onValueChange={handleSelection} options={Reason} direction="column" navigation={navigation} />
                        </ThemedView>

                    </ScrollView>

                    {/* Floating "Continue" button */}
                    <View
                        style={appStyle.buttonContainer}
                    >
                        <Pressable style={styles.button} onPress={() => alert("Hello")}>
                            <Text style={styles.buttonText}>Check Eligibility</Text>
                        </Pressable>
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
    headerContainer: {
        marginVertical: 20
    },
    scrollContainer: {
        paddingHorizontal: 20,
        
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

export default ProfessionalReasontoApplyforLoan;
