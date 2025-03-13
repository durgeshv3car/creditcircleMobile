import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MoneySmart = ({ navigation }) => {
    const gridData = [
        {
            title: '01 Reasons Personal Loan is Best for Your Big or Small Purchases',
            image: require('../../assets/images/exampal.png'), // Use require for local images
        },
        {
            title: '02 Reasons Personal Loan is Best for Your Big or Small Purchases',
            image: require('../../assets/images/exampal.png'), // Use require for local images
        },
        {
            title: '03 Reasons Personal Loan is Best for Your Big or Small Purchases',
            image: require('../../assets/images/exampal.png'), // Add more items as needed
        },
        {
            title: '04 Reasons Personal Loan is Best for Your Big or Small Purchases',
            image: require('../../assets/images/exampal.png'), // Add more items as needed
        },
    ];

    const renderGridItem = ({ item }) => (
        <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate('MoneySmartListing')} // Navigate to 'MoneySmartListing'
        >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Money Smarts</Text>
            <FlatList
                data={gridData}
                numColumns={2}
                renderItem={renderGridItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.gridContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    gridContainer: {
        justifyContent: 'space-between',
    },
    gridItem: {
        flex: 1,
        margin: 8,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 8,
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        flexShrink: 1,
    },
});

export default MoneySmart;
