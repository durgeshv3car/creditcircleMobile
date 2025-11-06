import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
    Linking,
} from 'react-native';
import axios from 'axios';
import RenderHTML, { defaultListItemStyleSpecs } from 'react-native-render-html';
import { useRoute } from '@react-navigation/native';
import NotAvailable from '../common/NotAvailable';
import { BASE_URL } from '../util/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appStyle from '@/AppStyles';

const QuickListing = ({route,  navigation}) => {
     const { offer } = route.params;
    const { width } = useWindowDimensions();
  
    const { investmentType } = route.params || {};
    const [cards, setCards] = useState([]);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        if (investmentType) {
            fetchServices(investmentType);
        }
    }, [investmentType]);

    // const fetchServices = async (type) => {
    //     try {
    //         const response = await axios.get(`http://192.168.0.17:5000/api/service/${type}`);

    //         console.log('Response:', response.data); // Debug log

    //         if (response.data.success) {
    //             setCards(response.data.services);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching services:', error);
    //     }
    // };


    const fetchServices = async (type) => {
        try {
            // const response = await axios.get(`${BASE_URL}/api/service/${type}`);


             const token = await AsyncStorage.getItem('userToken');

  const response = await axios.get(`${BASE_URL}/api/service/${type}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

    
            console.log('Response:', response.data); // Debug log
    
            if (response.data.success && Array.isArray(response.data.services)) {
                const services = response.data.services;
    
                if (services.length === 0) {
                    setNoData(true);
                    setCards([]);
                } else {
                    setNoData(false);
                    setCards(services);
                }
            } else {
                setNoData(true);
                setCards([]);
            }
        } catch (error) {
         
            setNoData(true);
            setCards([]);
        }
    };

    const renderCard = ({ item }) => {
        if (!item) return null;
    
        return (
            <View style={styles.card}>
                <Image source={{ uri: item.mobileUrl }} style={styles.cardImage} />
    
                <View style={{ paddingBottom: 10, paddingHorizontal: 10 }}>
                    <Text style={styles.title}>{item.title}</Text>
    
                    <RenderHTML
                        contentWidth={width}
                        source={{ html: item.description || '<div></div>' }}
                        baseStyle={styles.htmlText}
                        tagsStyles={{
                            ul: { paddingLeft: 18, marginBottom: 6 },
                            li: {
                                marginBottom: 6,
                                fontSize: 14,
                                color: '#333',
                                lineHeight: 22,
                            },
                            a: {
                                color: '#FF4800',
                                textDecorationLine: 'underline',
                            },
                        }}
                        listStyleSpecs={{
                            ...defaultListItemStyleSpecs,
                            ul: { marker: '•', paddingLeft: 10 },
                        }}
                        onLinkPress={(event, href) => {
                            Linking.openURL(href);
                        }}
                    />
    
                    <View style={styles.buttonContainer}>
                    <Text style={styles.joinknowMoreText}>
                            join Fee: <Text style={styles.joinTextBoldfree}>{item.joinFee === null ? ("₹"+item.joinFee) : "Free"}</Text>
                        </Text>

                        <Text style={styles.knowMoreText}>
                            Annual Fee: <Text style={styles.TextBoldfree}>{item.annualFee}</Text>
                        </Text>
    
                    </View>
                    
                    <TouchableOpacity
                            style={styles.applyNowButton}
                            onPress={() =>
                                navigation.navigate('WebviewScreen', { urlName: item.companyUrl })
                            }
                        >
                            <Text style={styles.applyNowText}>{item.buttonType || 'APPLY NOW'}</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    };
    
    return (
        <View style={appStyle.gstcraeccontainer}>
        
        {noData && (
               <NotAvailable title="Offer not available in category" uris={"https://placehold.co/300x200?text=Not+Available"} />
        )}
        
        <FlatList
            data={cards}
            keyExtractor={(item) => item.id}
            renderItem={renderCard}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
            
        />

        </View>

    );
};

export default QuickListing;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
        borderRadius:12
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 6,
        color: '#FF4800',
        paddingVertical: 8,
    },
    htmlText: {
        color: '#333',
    },

    joinTextBoldfree: {
        fontWeight: '900',
        color: "green",
    },
    TextBoldfree: {
        fontWeight: 'bold',
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    joinknowMoreText: {
        fontSize: 14,
        color: 'green',
    },

    knowMoreText: {
        fontSize: 14,
        color: '#333',
    },

    applyNowButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FF4800',
        borderRadius: 6,
        marginTop:10
    },
    applyNowText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 6,
    },
});
