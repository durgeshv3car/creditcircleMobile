import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const notifications = [
    {
        id: '1',
        title: 'Thailand announces e-visa facility for Indians from January 1',
        description: 'Says 60-day exemption to remain',
        time: '1 hour ago',
    },
    {
        id: '2',
        title: 'Vishal Mega Mart plans quick commerce rollout',
        description: 'CEO says well-funded for expansion',
        time: '2 hour ago',
    },
    // Add more notifications here...
];

const NotificationScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailScreen', { notification: item })}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.time}>{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // White background
    },
    listContainer: {
        padding: 10,
    },
    card: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000', // Black text
    },
    description: {
        fontSize: 14,
        color: '#555555', // Dark grey text
        marginVertical: 4,
    },
    time: {
        fontSize: 12,
        color: '#888888', // Lighter grey text
    },
});
