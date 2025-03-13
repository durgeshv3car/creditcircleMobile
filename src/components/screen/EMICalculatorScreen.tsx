import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Appearance,
    Dimensions,
} from "react-native";
import { Slider } from '@miblanchard/react-native-slider';

const EMICalculatorScreen = () => {
    const [loanAmount, setLoanAmount] = useState(5); // Default: 5 Lakhs
    const [interestAmount, setInterestAmount] = useState(10); // Default: 10%
    const [loanTenure, setLoanTenure] = useState(12); // Default: 12 months

    const calculateEMI = () => {
        const principal = loanAmount * 100000;
        const rate = interestAmount / 12 / 100;
        const months = loanTenure;
        const emi =
            (principal * rate * Math.pow(1 + rate, months)) /
            (Math.pow(1 + rate, months) - 1);
        return Math.round(emi);
    };

    const principalAmount = loanAmount * 100000;
    const interestPayable =
        (principalAmount * interestAmount * loanTenure) / (12 * 100);
    const totalPayable = principalAmount + interestPayable;



    const theme = Appearance.getColorScheme();

    const imagecoleor = {
        tintColor: theme === 'dark' ? "#ffffff" : ""
    };

    const screenWidth = Dimensions.get('window').width;


    return (
        <ScrollView style={styles.container}>

            <View style={styles.emiContainer}>
                <Text style={styles.emiHeader}>Monthly EMI</Text>

                <Text style={styles.emiValue}>₹{calculateEMI()}</Text>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }}>Principal Amount: </Text> <Text style={{ fontWeight: "bold" }}>₹{principalAmount.toLocaleString()}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginVertical:6 }}>
                    <Text style={{ flex: 1 }} >Interest Amount: </Text> <Text style={{ fontWeight: "bold" }}> ₹{Math.round(interestPayable).toLocaleString()}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }} >Total Amount Payable: </Text> <Text style={{ fontWeight: "bold" }}> ₹{Math.round(totalPayable).toLocaleString()}</Text>
                </View>

            </View>

            {/* Loan Amount Slider */}
            <View style={styles.sliderContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text >Loan Amount</Text>
                    <Text >{loanAmount} Lakh</Text>
                </View>
                <Slider
                    value={loanAmount}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    minimumValue={1}
                    maximumValue={50}
                    step={1}
                    minimumTrackTintColor="#4A56E2"
                    maximumTrackTintColor="#D3D3D3"
                    thumbTintColor="#4A56E2"
                />

                <Image
                    source={require("../../assets/images/Amout.png")}
                    style={[imagecoleor, {
                        width: screenWidth - 40,
                        height: screenWidth * 0.1,
                    }]}
                    resizeMode="contain" // Adjust this to "cover" or "stretch" if needed
                />
            </View>

            {/* Interest Amount Slider */}
            <View style={styles.sliderContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text >Interest Amount</Text>
                    <Text >{interestAmount}%</Text>
                </View>
                <Slider
                    value={interestAmount}
                    onValueChange={(value) => setInterestAmount(value[0])}
                    minimumValue={5}
                    maximumValue={30}
                    step={1}
                    minimumTrackTintColor="#4A56E2"
                    maximumTrackTintColor="#D3D3D3"
                    thumbTintColor="#4A56E2"
                />

                <Image
                    source={require("../../assets/images/Intrast.png")}
                    style={[imagecoleor, {
                        width: screenWidth - 40,
                        height: screenWidth * 0.1,
                    }]}
                    resizeMode="contain" // Adjust this to "cover" or "stretch" if needed
                />
            </View>

            {/* Loan Tenure Slider */}
            <View style={styles.sliderContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text >Loan Tenure</Text>
                    <Text >{loanTenure} Months</Text>
                </View>
                <Slider
                    value={loanTenure}
                    onValueChange={(value) => setLoanTenure(value[0])}
                    minimumValue={12}
                    maximumValue={60}
                    step={12}
                    minimumTrackTintColor="#4A56E2"
                    maximumTrackTintColor="#D3D3D3"
                    thumbTintColor="#4A56E2"
                />

                <Image
                    source={require("../../assets/images/Year.png")}
                    style={[imagecoleor, {
                        width: screenWidth - 40,
                        height: screenWidth * 0.1,
                    }]}
                    resizeMode="contain" // Adjust this to "cover" or "stretch" if needed
                />
            </View>




        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    sliderContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    slider: {
        width: "100%",
        height: 40,
    },
    value: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 16,
    },
    emiContainer: {
        backgroundColor: "#f8f8f8",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'column'
    },
    emiHeader: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center'
    },
    emiValue: {
        fontSize: 60,
        fontWeight: "bold",
        color: "#FF5722",
        textAlign: "center",
        marginVertical: 20,
        marginTop:1
    },

    button: {
        backgroundColor: "#FF5722",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default EMICalculatorScreen;   