import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    RefreshControl,
    TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { BASE_URL } from '../util/api_url';

const DEALS_API_URL = `${BASE_URL}/api/offer/offer`;

const DealsScreen = ({ navigation }) => {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOrder, setSortOrder] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchOffers();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [categoryFilter, sortOrder, searchText]);

    const fetchOffers = async () => {
        try {
            const response = await axios.get(DEALS_API_URL);
            if (response.data.success && Array.isArray(response.data.offers)) {
                setOffers(response.data.offers);
                setFilteredOffers(response.data.offers);
            } else {
                Alert.alert('Error', 'Invalid response from server');
            }
        } catch (error) {
            console.error('❌ Error fetching offers:', error);
            Alert.alert('Error', 'Failed to fetch offers. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...offers];

        if (categoryFilter) {
            filtered = filtered.filter(item => item.category === categoryFilter);
        }

        if (searchText.trim()) {
            const search = searchText.toLowerCase();
            filtered = filtered.filter(item =>
                item.title?.toLowerCase().includes(search) ||
                item.description?.toLowerCase().includes(search) ||
                item.category?.toLowerCase().includes(search)
            );
        }

        if (sortOrder === 'brandAsc') {
            filtered.sort((a, b) => (a.brand?.name || '').localeCompare(b.brand?.name || ''));
        } else if (sortOrder === 'brandDesc') {
            filtered.sort((a, b) => (b.brand?.name || '').localeCompare(a.brand?.name || ''));
        } else if (sortOrder === 'titleAsc') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === 'titleDesc') {
            filtered.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredOffers(filtered);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchOffers().finally(() => setRefreshing(false));
    };

    const renderOffer = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('DealDetail', { offer: item })}
            style={styles.offerCard}
        >
            <View style={styles.headerRow}>
                {(item.brandLogo?.logo?.web || item.offerImage?.web) ? (
                    <Image
                        source={{ uri: item.brandLogo?.mobile }}
                        style={styles.brandLogo}
                    />
                ) : null}
                <View style={{ flex: 1 }}>
                    <Text style={styles.offerTitle}>{item.title}</Text>
                    <Text style={styles.categoryText}>
                        <Text style={styles.categoryHighlight}>{item.category}</Text>
                    </Text>
                </View>
            </View>

            {item.offerImage?.web ? (
                <Image source={{ uri: item.offerImage.mobile }} style={styles.fullImage} />
            ) : null}

            <Text style={styles.offerDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    const getUniqueCategories = () => {
        return [...new Set(offers.map(item => item.category))].filter(Boolean).sort();
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FF4800" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.filtersContainer}>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={categoryFilter}
                        onValueChange={setCategoryFilter}
                        style={styles.picker}
                    >
                        <Picker.Item label="All Categories" value="" />
                        {getUniqueCategories().map((cat) => (
                            <Picker.Item key={cat} label={cat} value={cat} />
                        ))}
                    </Picker>
                </View>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search offers..."
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
            </View>

            <FlatList
                data={filteredOffers}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={renderOffer}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => {
                        setSortOrder(prev => prev === "brandAsc" ? "brandDesc" : "brandAsc");
                    }}
                >
                    <Text style={styles.footerButtonText}>
                        {sortOrder === "brandAsc"
                            ? "Brand ↓"
                            : sortOrder === "brandDesc"
                                ? "Brand ↑"
                                : "Sort by Brand"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => {
                        setSortOrder(prev => prev === "titleAsc" ? "titleDesc" : "titleAsc");
                    }}
                >
                    <Text style={styles.footerButtonText}>
                        {sortOrder === "titleAsc"
                            ? "Title ↓"
                            : sortOrder === "titleDesc"
                                ? "Title ↑"
                                : "Sort by Title"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
        paddingBottom: 120,
    },
    offerCard: {
        backgroundColor: '#fdfdff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    brandLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 10,
    },
    fullImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: "stretch",
    },
    offerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#002f6c',
        marginBottom: 4,
    },
    offerDescription: {
        fontSize: 13,
        color: '#444',
    },
    categoryText: {
        fontSize: 13,
        color: '#333',
    },
    categoryHighlight: {
        fontWeight: 'bold',
        color: '#FF4800',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    pickerWrapper: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#eee',
        borderRadius: 6,
    },
    picker: {
        width: '100%',
        height: 52,
        padding:0,
        margin:0,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 16,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    footerButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    footerButtonText: {
        fontWeight: '600',
    },
});

export default DealsScreen;
