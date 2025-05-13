import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing the user's choice

const PrivacyPolicyScreen = ({ navigation }) => {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDeclined, setIsDeclined] = useState(false);

  

    const handleAccept = async () => {
        try {
            await AsyncStorage.setItem("privacyPolicyStatus", "accepted");
            setIsAccepted(true);
            Alert.alert("Privacy Policy", "You have accepted the Privacy Policy.");
            navigation.goBack(); // Go back to the previous screen
        } catch (error) {
            console.error("Error saving privacy policy status", error);
        }
    };

    const handleDecline = async () => {
        try {
            await AsyncStorage.setItem("privacyPolicyStatus", "declined");
            setIsDeclined(true);
            Alert.alert(
                "Declined",
                "You have declined the Privacy Policy. You may not proceed further."
            );
        } catch (error) {
            console.error("Error saving privacy policy status", error);
        }
    };

    if (isAccepted || isDeclined) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Privacy Policy</Text>
           
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Privacy Policy</Text>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.content}>
                    Welcome to our app! Your privacy is important to us. This privacy
                    policy outlines the types of personal information that we collect,
                    how we use it, and the measures we take to protect it.
                </Text>
                <Text style={styles.content}>
                    1. **Information We Collect**: We may collect your name, email
                    address, and usage data to improve your experience.
                </Text>
                <Text style={styles.content}>
                    2. **How We Use Your Information**: Your information will be used for
                    app functionality, customer support, and to improve our services.
                </Text>
                <Text style={styles.content}>
                    3. **Data Security**: We implement strict measures to protect your
                    personal data.
                </Text>
                <Text style={styles.content}>
                    4. **Contact Us**: If you have any questions or concerns about our
                    privacy practices, please contact us at support@example.com.
                </Text>
                <Text style={styles.content}>
                    By accepting, you agree to our privacy practices as described above.
                </Text>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    acceptButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    declineButton: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: "#F44336",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default PrivacyPolicyScreen;
