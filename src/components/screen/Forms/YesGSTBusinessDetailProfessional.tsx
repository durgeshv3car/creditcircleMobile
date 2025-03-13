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

const YesGSTBusinessDetailProfessional = ({ navigation }) => {
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



    const options = [
        { label: 'Owned By Self/Spouse', value: '1' },
        { label: 'Owned By Parents', value: '2' },
        { label: `Rented/Don't Own The Property`, value: '3' },
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

                        <View style={{ flex: 1 }}>
                           
                            <View style={appStyle.HeadingTitle}>
                                <ThemedHeadingText style={[styles.header]}>Business Details</ThemedHeadingText>
                                <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }}></ThemedView>
                            </View>



                            <ThemedTextInput label="Business PAN" placeHolder="Auto fetch from GST" disable={false} />

                            <ThemedTextInput label="Legal Name Of Business" placeHolder="Auto fetch from GST" disable={false} />

                            <ThemedTextInput label="Trade Name Of Business" placeHolder="Auto fetch from GST" disable={false} />

                            <ThemedTextInput label="Date Of Registration" placeHolder="Auto fetch from GST" disable={false} />


                            <ThemedTextInput label="Constitution Of Business" placeHolder="Auto fetch from GST" disable={false} />


                            <ThemedHeadingText style={styles.title}>Principal Place Of Business</ThemedHeadingText>
                            <TextInput
                                editable={false}
                                multiline
                                numberOfLines={3}
                                value={"IT-2005, Ricco industrial area, Ramchandra pura, IT Zone, Sitapura, Jaipur, Jaipur, Rajasthan, 303905"}
                                style={[styles.tearariii, textareee, { color: "#666" }]}

                            />




                            
                            <ThemedRadioButtonList options={options} onValueChange={handleSelection} direction="column" defaultValue="" />




                            <ThemedTextInput label="GST Status" placeHolder="Auto fetch from GST" disable={false} />

                            <ThemedTextInput label="Nature Of Core Business Activity" placeHolder="Auto fetch from GST" disable={false} />

                            <ThemedTextInput label="Pin Code" placeHolder="Auto fetch from GST" disable={false} />

                            <View style={{ flex: 1, flexDirection: 'row', width: '100%', gap: 20 }}>
                                <ThemedTextInput label="City" placeHolder="Auto fetch from GST" disable={false} />
                                <ThemedTextInput label="State" placeHolder="Auto fetch from GST" disable={false} />
                            </View>


                        </View>

                    </ScrollView>

                    {/* Floating "Continue" button */}
                    <View
                        style={appStyle.buttonContainer}
                    >
                        <Pressable style={appStyle.button} onPress={() => navigation.navigate('NoGSTBusinessDetailProfessional')}>
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
    headerContainer: {
        marginVertical: 20
    },
    header: {
        fontSize: 18,
        fontWeight: "bold"
    },
    subHeader: {
        fontSize: 14,
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
        height: 78,
        borderRadius: 6,
        backgroundColor:"#D9D9D9"
    }

});

export default YesGSTBusinessDetailProfessional;
