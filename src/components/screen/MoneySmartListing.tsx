import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../util/api_url';


const MoneySmartListing = ({ route, navigation }) => {
    const { item } = route.params; // item from grid
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Example API call for list items related to the selected grid item
        axios.get(`${BASE_URL}/api/banner/images/money/${item.id}`) // assuming each grid item has an ID
            .then(response => {
                setListData(response.data); // e.g. [{ title, image, description }]
            })
            .catch(error => {
                console.error('Error fetching list data:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('MoneySmartDetail', { item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Related Articles</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <FlatList
                    data={listData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 8,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default MoneySmartListing;
