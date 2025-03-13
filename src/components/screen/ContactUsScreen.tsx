import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Linking, Alert } from 'react-native';


const ContactUsScreen = () => {
    const handlePress = (type) => {
        if (type === 'Call') {
            const phoneNumber = 'tel:+1234567890'; // Replace with your phone number
            Linking.openURL(phoneNumber).catch((err) =>
                Alert.alert('Error', 'Unable to open the phone dialer.')
            );
        } else if (type === 'Email') {
            const email = 'mailto:support@example.com'; // Replace with your email address
            Linking.openURL(email).catch((err) =>
                Alert.alert('Error', 'Unable to open the email client.')
            );
        } else if (type === 'Chat') {
            Alert.alert('Chat', 'Chat feature is not implemented yet. Coming Soon');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Let's get in touch!</Text>
            </View>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
                <Image
                    source={{
                        uri: 'https://img.freepik.com/premium-vector/customer-support-concepts_662093-1854.jpg',
                    }}
                    style={styles.illustration}
                />
            </View>

            {/* Contact Options */}
            <View style={styles.contactOptions}>
                <TouchableOpacity style={styles.contactButton} onPress={() => handlePress('Call')}>
                    
                    <Text style={styles.buttonText}>Call Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton} onPress={() => handlePress('Email')}>
                    
                    <Text style={styles.buttonText}>Email Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton} onPress={() => handlePress('Chat')}>
                    
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
            </View>

            {/* Social Media Links */}
            <View style={styles.socialMedia}>
                <Text style={styles.socialMediaText}>Our social media</Text>
           
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginVertical: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    illustrationContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    illustration: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        resizeMode: 'contain',
    },
    contactOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    contactButton: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        width: '30%',
        elevation: 3,
    },
    buttonText: {
        marginTop: 8,
        fontSize: 14,
        color: '#333333',
    },
    socialMedia: {
        alignItems: 'center',
        marginTop: 30,
    },
    socialMediaText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    },
});

export default ContactUsScreen;
