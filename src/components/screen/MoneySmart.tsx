import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../util/api_url';
import { useNavigation } from '@react-navigation/native';

export const MoneySmart = () => {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false); // 👈 NEW
    const navigation = useNavigation();

    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/offer/money`)
            .then((response) => {
                setGridData(response.data.offers);
            })
            .catch((error) => {
                console.error('Error fetching money smart data:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    const renderGridItem = ({ item }) => (
        <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate('MoneySmartDetail', { item })}
        >
            <Image
                source={{ uri: item.offerImage?.mobile }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    const dataToDisplay = showAll ? gridData : gridData.slice(0, 4);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Money Smarts</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <>
                    <FlatList
                        data={dataToDisplay}
                        numColumns={2}
                        renderItem={renderGridItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.gridContainer}
                    />

                    {!showAll && gridData.length > 4 && (
                        <TouchableOpacity
                            style={styles.viewAllButton}
                            onPress={() => setShowAll(true)}
                        >
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
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
        fontSize: 16,
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
