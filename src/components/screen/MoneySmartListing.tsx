import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MoneySmartListing = ({ navigation }) => {
    const listData = Array(5).fill({
        title: '5 Reasons Personal Loan is Best for Your Big or Small Purchases',
        image: 'https://via.placeholder.com/150', // Replace with actual image URL
    });

    const navigateToDetail = () => {
        navigation.navigate('DetailPage');
    };

    const renderListItem = ({ item }) => (
        <TouchableOpacity style={styles.listItem} onPress={navigateToDetail}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={listData}
            renderItem={renderListItem}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
        flexShrink: 1,
    },
});

export default MoneySmartListing;
