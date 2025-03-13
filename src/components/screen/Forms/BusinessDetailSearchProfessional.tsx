import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
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

const BusinessDetailSearchProfessional = ({ navigation }) => {
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



    const [Value, setValue] = useState()


    const theme = Appearance.getColorScheme();


    const dynamicStyles = {
        backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
        shadowColor: theme === 'dark' ? '#FFFFFF' : '#000000',
    };

    const imagecoleor = {
        tintColor: theme === 'dark' ? "#ffffff" : ""
    };



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
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={appStyle.HeadingTitle}>
                            <ThemedHeadingText style={[styles.header]}>GST Details</ThemedHeadingText>
                            <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }}></ThemedView>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                            <ThemedHeadingText>Do You Have GST Number?</ThemedHeadingText>
                            <RadioButtonGroup size="auto" options={yesno} onValueChange={handleSelection} direction="row" defaultValue="" />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <TextInput value={Value} placeholder="Enter your business GST number" keyboardType="number-pad"
                                onChangeText={(text) => {
                                    const sanitizedText = text.replace(/[^0-9]/g, '');
                                    setValue(sanitizedText);
                                }}

                                style={{ textAlign: 'center', borderRadius: 50, borderWidth: 1, height: 48 }}></TextInput>
                        </View>

                    </ScrollView>

                    {/* Floating "Continue" button */}
                    <View
                        style={[
                            styles.buttonContainer,
                            { marginBottom: isKeyboardVisible ? 10 : 20 },
                        ]}
                    >
                        <Pressable style={styles.button} onPress={() => navigation.navigate('YesGSTBusinessDetailProfessional')}>
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
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
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

export default BusinessDetailSearchProfessional;
