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
import YearPicker from "../YearPicker";
import appStyle from "@/AppStyles";


const Professionaldetails = ({ navigation }) => {
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



    const SelectyourProfession = [
        { label: 'Doctor', value: '1' },
        { label: 'Chartered Accountant (CA)', value: '2' },
        { label: `Lawyer`, value: '3' },
        { label: `Others`, value: '4' },
    ];



    const textareee = {
        backgroundColor: theme === 'dark' ? '#00000036' : '#fff',
    };


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

                        contentContainerStyle={[
                            styles.scrollContainer,
                            { paddingBottom: isKeyboardVisible ? 100 : 80 }, // Dynamic padding
                        ]}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >

                        

                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={[styles.header]}>Professional Details</ThemedHeadingText>
                            <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }}></ThemedView>
                        </View>


                        <ThemedHeadingText style={styles.title}>Select Your Profession</ThemedHeadingText>
                        <ThemedRadioButtonList options={SelectyourProfession} onValueChange={handleSelection} direction="column" defaultValue="" />



                        <ThemedTextInput label="Registration number" placeHolder="Enter your registration number" />

                        <ThemedTextInput label="Registration Year" placeHolder="Select year of registration" />






                    </ScrollView>

                    {/* Floating "Continue" button */}
                    <View
                        style={appStyle.buttonContainer}
                    >
                        <Pressable style={styles.button} onPress={() => navigation.navigate('BusinessDetailSearchProfessional')}>
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
        paddingBottom: 20,
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
        paddingBottom: 20,
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
    tearariii: {
        height: 78
    }

});

export default Professionaldetails;
