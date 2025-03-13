import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
    const { notification } = route.params; // Get the notification data passed via navigation

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.description}>{notification.description}</Text>
            <Text style={styles.time}>{notification.time}</Text>
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000000',
    },
    description: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 20,
    },
    time: {
        fontSize: 14,
        color: '#888888',
    },
});
