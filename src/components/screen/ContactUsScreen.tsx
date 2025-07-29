import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Linking, Alert } from 'react-native';
import SocialMediaSection from '../common/SocialMediaSection';


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
          

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
                  <View style={styles.header}>
                <Text style={styles.headerText}>Let's get in touch!</Text>
            </View>
                <Image
                    // source={{
                    //     uri: '../../../../assets/images/emailus.jpg', // Replace with your illustration path
                    // }}

                     source={require('../../assets/images/emailus.jpg')} // Replace with your illustration path
                    style={styles.illustration}
                />

                 {/* <TouchableOpacity style={styles.contactButton} onPress={() => handlePress('Email')}>
                    
                    <Text style={styles.buttonText}>Email Us</Text>
                </TouchableOpacity> */}


  <TouchableOpacity style={styles.contactButton} onPress={() => handlePress('Email')}>
    <Text style={styles.buttonText}>📧 Email Us</Text> {/* You can remove emoji or replace with icon */}
  </TouchableOpacity>

            </View>

            {/* Contact Options */}
            <View style={styles.contactOptions}>
                {/* <TouchableOpacity style={styles.contactButton} onPress={() => handlePress('Call')}>
                    
                    <Text style={styles.buttonText}>Call Us</Text>
                </TouchableOpacity> */}
               
                {/* <TouchableOpacity style={styles.contactButton} onPress={() => handlePress('Chat')}>
                    
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity> */}
            </View>

            {/* Social Media Links */}
            <View style={styles.socialMedia}>
           <SocialMediaSection />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
        justifyContent:"space-between"
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
       backgroundColor: '#1E90FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Android shadow
    marginVertical: 10,
    },
    buttonText: {
       color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    },
    socialMedia: {
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
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
