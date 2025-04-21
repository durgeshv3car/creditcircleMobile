import appStyle from "@/AppStyles";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BASE_URL } from "@/components/util/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
    TextInput,
    Alert,
    ActivityIndicator
} from "react-native";

const API_BASE_URL = `${BASE_URL}/api`;

const BankAccount = ({ navigation }) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBanks, setFilteredBanks] = useState([]);
    const [applicationId, setApplicationId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [employmentStatus, setEmploymentStatus] = useState()

    useEffect(() => {
        fetchApplicationId(); // Fetch application ID and employment status

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

    const fetchApplicationId = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('appIdData');
            const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
            setApplicationId(parsedValue);

            if (parsedValue) {
                fetchLoanApplicationDetails(parsedValue);
            }
        } catch (error) {
            console.error("❌ Error fetching application ID:", error);
            Alert.alert("Error", "Failed to retrieve application ID.");
        }
    };

    const fetchLoanApplicationDetails = async (applicationId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/loan-application?applicationId=${applicationId}`);
            
            if (response.status === 200) {
                const employmentStatus = response.data.loanApplication.employmentStatus;
                console.log("💼 Employment Status:", employmentStatus);
    
                // Store employment status instead of navigating immediately
                setEmploymentStatus(employmentStatus);
            }
        } catch (error) {
            console.error("❌ Error fetching loan application details:", error);
            Alert.alert("Error", "Failed to fetch loan application details.");
        }
    };

    const banks = [
        "HDFC Bank", "ICICI Bank", "Kotak Bank", "IDFC Bank", "HSBC Bank",
        "SBI Bank", "Axis Bank", "Yes Bank", "IndusInd Bank", "RBL Bank",
        "UCO Bank", "Indian Overseas Bank", "Federal Bank", "Central Bank Of India",
        "Karnataka Bank", "South Indian Bank", "Jammu & Kashmir Bank", "Other Bank"
    ];

    useEffect(() => {
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
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
        shadowColor: theme === "dark" ? "#FFFFFF" : "#000000",
    };

    const handleSubmit = async () => {
        if (!selectedBank) {
            Alert.alert("Select", "Please select a bank.");
            return;
        }
        if (!applicationId) {
            Alert.alert("Error", "Application ID is missing.");
            return;
        }
    
        setIsLoading(true);
    
        try {
            const requestData = { applicationId, salaryBank: selectedBank };
    
            console.log("📤 Sending Data:", requestData);
    
            const response = await axios.post(`${API_BASE_URL}/loan-application/bank`, requestData);
    
            if (response.status === 200) {
               
                // Now navigate based on stored employment status
                if (employmentStatus === "Salaried") {
                    navigation.navigate("EmploymentDetails");
                } else if (employmentStatus === "SelfEmployedBusiness") {
                    navigation.navigate("SelfReasontoApplyforLoan");
                } else if (employmentStatus === "SelfEmployedProfessional") {
                    navigation.navigate("SelfReasontoApplyforLoan");
                } else if (employmentStatus === "Student") {
                    navigation.navigate("FamilyDetails");
                } else {
                    Alert.alert("Error", "Invalid employment status. Please try again.");
                }
            } else {
                Alert.alert("Error", response.data.message || "Failed to update bank details.");
            }
        } catch (error) {
            console.error("❌ Error submitting bank details:", error);
            
        } finally {
            setIsLoading(false);
        }
    };

    const renderBankItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.bankItem, selectedBank === item && { borderColor: "#FF4800" }]}
            onPress={() => {
                setSelectedBank(item);
                setModalVisible(false);
            }}
        >
            <View style={styles.radioContainer}>
                <ThemedText style={styles.bankText}>{item}</ThemedText>
                <View
                    style={[styles.radioButton, selectedBank === item && { backgroundColor: "#FF4800" }]}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            <View style={styles.scrollContainer}>
                <View style={appStyle.HeadingTitle}>
                    <ThemedHeadingText style={styles.header}>Salary Bank Account</ThemedHeadingText>
                    <ThemedView style={{ width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 }}></ThemedView>
                </View>

                <FlatList
                    data={banks.slice(0, 10)}
                    renderItem={renderBankItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    ListFooterComponent={
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
                            <ThemedHeadingText style={styles.openModalText}>View More</ThemedHeadingText>
                        </TouchableOpacity>
                    }
                />
            </View>

            <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <ThemedView style={styles.modalContainer}>
                    <TextInput style={styles.searchBox} placeholder="Search your bank..." value={searchQuery} onChangeText={handleSearch} />
                    <FlatList data={filteredBanks} renderItem={renderBankItem} keyExtractor={(item, index) => index.toString()} />
                </ThemedView>
            </Modal>

            <View style={appStyle.buttonContainer}>
                <Pressable style={appStyle.button} onPress={handleSubmit} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={appStyle.buttonText}>Continue</Text>}
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

// const styles = StyleSheet.create({
//     container: { flex: 1 },
//     scrollContainer: { paddingHorizontal: 20, paddingBottom: 20, flex: 1 },
//     header: { fontSize: 18, fontWeight: "bold" },
//     row: { justifyContent: "space-between", flex: 1 },
//     openModalButton: { padding: 16, borderRadius: 8, textAlign: "center" },
//     searchBox: { height: 50, backgroundColor: "#F1F1F1", paddingHorizontal: 50, marginBottom: 16, flex: 1 },
// });




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flex:1
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
        color: '#FF4800',
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



export default BankAccount;
