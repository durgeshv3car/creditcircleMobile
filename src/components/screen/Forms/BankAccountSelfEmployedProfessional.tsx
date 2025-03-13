import appStyle from "@/AppStyles";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    Appearance,
    SafeAreaView,
    Keyboard,
    Pressable,
    Image,
    TextInput
} from "react-native";

const BankAccountSelfEmployedProfessional = ({ navigation }) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filteredBanks, setFilteredBanks] = useState([]); // State for filtered banks


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
            setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
            setKeyboardVisible(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const banks = [
        'HDFC Bank',
        'ICICI Bank',
        'Kotak Bank',
        'IDFC Bank',
        'HSBC Bank',
        'SBI Bank',
        'Axis Bank',
        'Yes Bank',
        'IndusInd Bank',
        'RBL Bank',
        'UCO Bank',
        'Indian Overseas Bank',
        'Federal Bank',
        'Central Bank Of India',
        'Karnataka Bank',
        'South Indian Bank',
        'Jammu & Kashmir Bank',
        'Other Bank',
    ];

    useEffect(() => {
        // Initialize the filtered list with all banks
        setFilteredBanks(banks);
    }, []);


    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = banks.filter((bank) =>
            bank.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBanks(filtered);
    };



    const theme = Appearance.getColorScheme();


    const dynamicStyles = {
        backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
        shadowColor: theme === 'dark' ? '#FFFFFF' : '#000000',
    };

    const imagecoleor = {
        tintColor: theme === 'dark' ? "#ffffff" : ""
    };


    const renderBankItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.bankItem,
                selectedBank === item && { borderColor: '#007bff' }
            ]}
            onPress={() => {
                setSelectedBank(item)
                setModalVisible(false);
            }}
        >
            <View style={styles.radioContainer}>

                <ThemedText style={styles.bankText}>{item}</ThemedText>
                <View
                    style={[
                        styles.radioButton,
                        selectedBank === item && { backgroundColor: '#007bff' }
                    ]}
                />
            </View>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
           
            <View style={styles.scrollContainer}>
                
                <View style={appStyle.HeadingTitle}>
                    <ThemedHeadingText style={styles.header}>Current Bank Account</ThemedHeadingText>
                    <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }}></ThemedView>
                </View>

                <FlatList
                    data={banks.slice(0, 10)} // Display first 8 banks
                    renderItem={renderBankItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    ListFooterComponent={
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={styles.openModalButton}
                        >
                            <ThemedHeadingText style={styles.openModalText}>View More</ThemedHeadingText>
                        </TouchableOpacity>
                    }
                />
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <ThemedView style={styles.modalContainer}>
                    <View style={{ flexDirection: 'row', position: 'relative' }}>
                        <Image
                            source={require("../../../assets/icons/searchIcon.png")}
                            style={[{ width: 20, height: 20, position: 'absolute', top: 18, zIndex: 1, left: 8 }]}
                        />


                        <TextInput
                            style={styles.searchBox}
                            placeholder="Search your bank..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />

                        <Image
                            source={require("../../../assets/icons/remove.png")}
                            style={[{ width: 13, height: 13, position: 'absolute', zIndex: 5, top: 20, right: 14 }]}
                        />

                    </View>
                    <FlatList
                        data={filteredBanks}
                        renderItem={renderBankItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ThemedView>
            </Modal>

            <View
                style={appStyle.buttonContainer}
            >
                <Pressable style={appStyle.button} onPress={() => navigation.navigate('ProfessionalReasontoApplyforLoan')}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            </View>


        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flex:1
    },
    headerContainer: {
        marginVertical: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
    },
    row: {
        justifyContent: 'space-between',
        flex: 1,

    },

    openModalButton: {
        padding: 16,
        borderRadius: 8,
        textAlign: 'center',
        justifyContent: 'center'
    },
    searchBox: {
        height: 50,
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 50,
        marginBottom: 16,
        flex: 1,
        zIndex: 0
    },

    openModalText: {
        textAlign: 'center',
        fontWeight: '500'
    },
    bankItem: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        // borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bankText: {
        fontSize: 16,
        marginLeft: 10,
        flex: 1
    },
    viewMoreButton: {
        alignSelf: 'center',
        marginTop: 0,
    },
    viewMoreText: {
        color: '#007bff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        padding: 0,

    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },

    buttonContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        paddingHorizontal: 15
    },
    button: {
        backgroundColor: "#FF4800",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        justifyContent: 'space-between'

    },
    radioButton: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        marginRight: 10,
    },
});

export default BankAccountSelfEmployedProfessional;
