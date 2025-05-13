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
import appStyle from '@/AppStyles';

export const MoneySmart = ({ limit = 4 }) => {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
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
            <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
    {item.title}
</Text>
        </TouchableOpacity>
    );

    const dataToDisplay = showAll ? gridData : gridData.slice(0, limit);

    return (
        <View style={styles.container}>
            <Text style={appStyle.sectionTitle}>Money Smarts</Text>
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

                    {/* {!showAll && gridData.length > limit && (
                        <TouchableOpacity
                            style={styles.viewAllButton}
                            onPress={() => setShowAll(true)}
                        >
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    )} */}
                </>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom:0,
        paddingRight: 8,
        marginTop:10,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        
    },
    gridContainer: {
        justifyContent: 'space-between',
        gap: 8,
        paddingBottom: 16,
    },
    gridItem: {
        flex: 1,
        marginRight: 8,
        borderColor: '#ccc',
        backgroundColor:"#F9F9F9",
        borderWidth: 1,
        padding:6,
        borderRadius: 8,
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: 100,
        marginBottom: 4,
        borderRadius: 4,
        backgroundColor: '#ccc',
        resizeMode: "cover",
    
    },
    // text: {
    //     fontSize: 14,
    //     textAlign: 'left',
    //     padding: 2,
    //     paddingHorizontal:8,
    //     marginBottom: 8,
    //     fontWeight:'600',
    //     color:"#273283",

    // },

    text: {
        fontSize: 14,
        textAlign: 'left',
        padding: 2,
        fontWeight: '600',
        color: "#273283",
        lineHeight: 18,
    },
});
