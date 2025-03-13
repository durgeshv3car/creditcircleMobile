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

const RevenueIncomeDetailsProfessional = ({ navigation }) => {
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


    const yesno = [
        { label: 'Yes', value: '1' },
        { label: 'No', value: '2' }
    ];

    const ModeofSalary = [
        { label: 'Bank', value: '1' },
        { label: 'Cash', value: '2' },
        { label: 'Both', value: '2' }
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

                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >

                        
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={[styles.header]}>Revenue & Income Details</ThemedHeadingText>
                            <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }}></ThemedView>
                        </View>



                        <ThemedHeadingText style={styles.title}>What Is Your Monthly Income?</ThemedHeadingText>
                        <ThemedRadioButtonList options={amount} onValueChange={handleSelection} direction="column" defaultValue="" />


                        <ThemedHeadingText style={styles.title}>Mode Of Income</ThemedHeadingText>
                        <RadioButtonGroup size="auto" options={ModeofSalary} onValueChange={handleSelection} direction="row" defaultValue="" />



                        <View style={{ marginBottom: 80 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                            <ThemedHeadingText>Do you Own a Credit Card?</ThemedHeadingText>
                            <RadioButtonGroup size="auto" options={yesno} onValueChange={handleSelection} direction="row" defaultValue="" />
                        </View>
                            <ThemedText style={{ fontSize: 11 }}>Owning a credit card may positively impact your loan approval.</ThemedText>
                        </View>



                    </ScrollView>

                    {/* Floating "Continue" button */}
                    <View style={appStyle.buttonContainer} >
                        <Pressable style={styles.button} onPress={() => navigation.navigate('BankAccountSelfEmployedProfessional')}>
                            <Text style={styles.buttonText}>Continue</Text>
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

    title: {
        fontSize: 12,
        fontWeight: "bold"
    },
    scrollContainer: {
        paddingHorizontal: 20,
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
    }
});

export default RevenueIncomeDetailsProfessional;
