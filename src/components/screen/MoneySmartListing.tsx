// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     FlatList,
//     StyleSheet,
//     TouchableOpacity,
//     Image,
//     ActivityIndicator,
// } from 'react-native';
// import axios from 'axios';
// import { BASE_URL } from '../util/api_url';

// const MoneySmartListing = ({ navigation }) => {
//     const [listData, setListData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios
//             .get(`${BASE_URL}/api/offer/money`)
//             .then(response => {

//                 console.log('Response:', response.data);

//                 if (response.data?.offers && Array.isArray(response.data.offers)) {
//                     setListData(response.data.offers);
//                 } else {
//                     setListData([]);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching list data:', error);
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     const renderItem = ({ item }) => (
//         console.log('Item:', item),
//         <TouchableOpacity
//             style={styles.listItem}
//             onPress={() => navigation.navigate('MoneySmartDetail', { item })}
//         >
//             <Image source={{ uri: item.offerImage?.mobile }} style={styles.image} />
//             <View style={styles.textContainer}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <Text numberOfLines={2} style={styles.description}>
//                     {item.description}
//                 </Text>
//             </View>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
           
//             {loading ? (
//                 <ActivityIndicator size="large" color="#000" />
//             ) : listData.length > 0 ? (
//                 <FlatList
//                     data={listData}
//                     renderItem={renderItem}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             ) : (
//                 <Text style={styles.noDataText}>No articles available at the moment.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 16,
//     },
//     header: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 12,
//     },
//     listItem: {
//         flexDirection: 'row',
//         marginBottom: 16,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 8,
//         padding: 8,
//     },
//     image: {
//         width: 150,
//         height: 80,
//         borderRadius: 8,
//         marginRight: 12,
//     },
//     textContainer: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     description: {
//         fontSize: 14,
//         color: '#555',
//     },
//     noDataText: {
//         textAlign: 'center',
//         fontSize: 16,
//         color: '#888',
//         marginTop: 20,
//     },
// });

// export default MoneySmartListing;


import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Pressable,
    Image,
    ActivityIndicator,
    Dimensions,
    Platform,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../util/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 38) / 2;

const MoneySmartListing = ({ navigation }) => {
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            // .get(`${BASE_URL}/api/offer/money`)
            // .then(response => {
            //     if (response.data?.offers && Array.isArray(response.data.offers)) {
            //         setListData(response.data.offers);
            //     } else {
            //         setListData([]);
            //     }
            // })
            // .catch(error => {
            //     console.error('Error fetching list data:', error);
            // })
            // .finally(() => setLoading(false));

            const fetchData = async () => {
                try {
                    const token = await AsyncStorage.getItem('userToken');

                    const response = await axios.get(`${BASE_URL}/api/offer/money`, {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.data?.offers && Array.isArray(response.data.offers)) {
                        setListData(response.data.offers);
                    } else {
                        setListData([]);
                    }
                } catch (error) {
                    console.error('Error fetching list data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
            onPress={() => navigation.navigate('MoneySmartDetail', { item })}
        >
            <Image source={{ uri: item.offerImage?.mobile }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                {/* <Text style={styles.cardSubtitle} numberOfLines={2}>{item.description}</Text> */}
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : listData.length > 0 ? (
                <FlatList
                    data={listData}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 24 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
            ) : (
                <Text style={styles.noData}>No offers available right now.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafa',
        paddingHorizontal: 10,
        marginTop:10
      
    },
    card: {
        width: cardWidth,
        backgroundColor: '#ffffffee',
        borderRadius: 6,
        padding: 4,
        marginTop:8,
        margin: 2,
       justifyContent: 'center',
       alignItems: 'center',
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    cardImage: {
        width: '100%',
        height: 80,
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: '#e0e0e0',
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e1e1e',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#666',
    },
    noData: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
        marginTop: 30,
    },
});

export default MoneySmartListing;
