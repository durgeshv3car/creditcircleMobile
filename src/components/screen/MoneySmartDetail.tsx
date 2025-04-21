import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const MoneySmartDetail = ({ route }) => {
    const { item } = route.params;

    console.log('Detail Page Item:', item); // ✅ Debug log

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: item.offerImage?.mobile }}   
                style={styles.image}
                resizeMode="cover"
                onError={() => console.log('Image failed to load:', item.mobileUrl)}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>
            {item.description}
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#eee', // fallback if image fails
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
    },
});

export default MoneySmartDetail;
