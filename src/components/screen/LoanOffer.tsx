import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
} from "react-native";
import { Slider } from '@miblanchard/react-native-slider';

export default function LoanOffer() {

    console.log(Slider);
    const [loanData, setLoanData] = useState([
        { id: "1", name: "Piramal", interestRate: 27.5, emi: 17283, chances: "Excellent" },
        { id: "2", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Excellent" },
        { id: "3", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Excellent" },
        { id: "4", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Excellent" },
        { id: "5", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Excellent" },
        { id: "6", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Excellent" },
        { id: "7", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Excellent" },
    ]);

    const [value, setValue] = useState(5);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);

    const [loanAmount, setLoanAmount] = useState(5); // in Lacs
    const [loanTenure, setLoanTenure] = useState(5); // in Years

    const sortOptions = [
        { label: "Chances of Approval", value: "chances" },
        { label: "Interest Rate", value: "interestRate" },
        { label: "EMI", value: "emi" },
    ];

    const [selectedSort, setSelectedSort] = useState("chances");

    const applySort = (value) => {
        const sortedData = [...loanData].sort((a, b) => {
            if (value === "interestRate" || value === "emi") {
                return a[value] - b[value];
            }
            return a.chances.localeCompare(b.chances);
        });
        setLoanData(sortedData);
        setSortVisible(false);
    };

    const LoanCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>Interest Rate: {item.interestRate}%</Text>
            <Text>EMI: ₹{item.emi}</Text>
            <Text>Chances of Approval: {item.chances}</Text>
            <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>SELECT</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
   

            {/* Loan List */}
            <FlatList
                data={loanData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <LoanCard item={item} />}
                contentContainerStyle={styles.listContainer}
            />

            <View style={styles.header}>
                <TouchableOpacity style={{width:"50%", paddingVertical:16}} onPress={() => setFiltersVisible(true)}>
                    <Text style={styles.filterText}>Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "50%", paddingVertical: 16 }} onPress={() => setSortVisible(true)}>
                    <Text style={styles.sortText}>Sort By</Text>
                </TouchableOpacity>
            </View>
            {/* Filters Modal */}
            <Modal visible={filtersVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Filters</Text>

                    <Text>Loan Amount: ₹{loanAmount} Lac</Text>
                    <Slider
                        value={[loanAmount]}
                        minimumValue={0}
                        maximumValue={50}
                        step={1}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        thumbTintColor="blue"
                        minimumTrackTintColor="blue"
                        maximumTrackTintColor="#ddd"
                    />

                    <Text>Loan Tenure: {loanTenure} Years</Text>
                    <Slider
                        value={[loanTenure]}
                        minimumValue={1}
                        maximumValue={5}
                        step={1}
                        onValueChange={(value) => setLoanTenure(value[0])}
                        thumbTintColor="#007BFF"
                        minimumTrackTintColor="#007BFF"
                        maximumTrackTintColor="#ddd"
                    />

                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setFiltersVisible(false)}
                    >
                        <Text style={styles.modalButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Sort Modal */}
            <Modal visible={sortVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                <View style={{backgroundColor:"red",padding:16}}>
                        <Text style={styles.modalTitle}>Sort By</Text>
                        {sortOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={styles.sortOption}
                                onPress={() => {
                                    setSelectedSort(option.value);
                                    applySort(option.value);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.sortOptionText,
                                        selectedSort === option.value && styles.selectedSortOption,
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setSortVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
               </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1},
    header: {
        flexDirection: "row",
        backgroundColor: "#273283",
        width:"100%"
    },
    headerText: { color: "white", fontSize: 18, fontWeight: "bold" },
    filterText: { color: "white", fontSize: 16, textAlign:'center', },
    sortText: { color: "white", fontSize: 16, textAlign: 'center' },
    listContainer: { padding: 16 },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    title: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
    selectButton: {
        marginTop: 12,
        backgroundColor: "#FF4800",
        padding: 12,
        borderRadius: 8,
    },
    selectButtonText: { color: "white", textAlign: "center", fontWeight: "bold" },
    modalContainer: {
        flex: 1,
        justifyContent:'flex-end',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        
    },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16, color: "white" },
    modalButton: {
        backgroundColor: "#007BFF",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    modalButtonText: { color: "white", textAlign: "center", fontWeight: "bold" },
    sortOption: { padding: 12, backgroundColor: "white", marginBottom: 8, borderRadius: 8 },
    sortOptionText: { fontSize: 16, color: "black" },
    selectedSortOption: { fontWeight: "bold", color: "#007BFF" },
});
