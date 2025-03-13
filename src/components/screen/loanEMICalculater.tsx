import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export default function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState('100000');
    const [interestRate, setInterestRate] = useState('6.5');
    const [loanTenure, setLoanTenure] = useState('12');
    const [emi, setEmi] = useState('0');
    const [totalInterest, setTotalInterest] = useState('0');
    const [totalAmount, setTotalAmount] = useState('0');

    const calculateEMI = () => {
        const principal = parseFloat(loanAmount);
        const rateOfInterest = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
        const time = parseFloat(loanTenure);

        // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
        const emiAmount = principal * rateOfInterest * Math.pow(1 + rateOfInterest, time) /
            (Math.pow(1 + rateOfInterest, time) - 1);

        const totalPayment = emiAmount * time;
        const totalInterestPayable = totalPayment - principal;

        setEmi(emiAmount.toFixed(0));
        setTotalInterest(totalInterestPayable.toFixed(0));
        setTotalAmount(totalPayment.toFixed(0));
    };

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, loanTenure]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Loan EMI Calculator</Text>

            <View style={styles.inputContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Loan Amount</Text>
                    <Text style={styles.sublabel}>(In Rupees)</Text>
                    <TextInput
                        style={styles.input}
                        value={loanAmount}
                        onChangeText={setLoanAmount}
                        keyboardType="numeric"
                        placeholder="1,00,000"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Interest Rate</Text>
                    <Text style={styles.sublabel}>(In Percentage %)</Text>
                    <TextInput
                        style={styles.input}
                        value={interestRate}
                        onChangeText={setInterestRate}
                        keyboardType="numeric"
                        placeholder="Enter interest rate"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Loan Tenure</Text>
                    <Text style={styles.sublabel}>(In Months)</Text>
                    <TextInput
                        style={styles.input}
                        value={loanTenure}
                        onChangeText={setLoanTenure}
                        keyboardType="numeric"
                        placeholder="Enter loan tenure"
                    />
                </View>
            </View>

            <View style={styles.resultContainer}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.resultLabel}>Principal Amount</Text>
                        <Text style={styles.amount}>₹{loanAmount}</Text>
                    </View>
                    <Text style={styles.operator}>+</Text>
                    <View style={styles.column}>
                        <Text style={styles.resultLabel}>Interest Amount</Text>
                        <Text style={styles.amount}>₹{totalInterest}</Text>
                    </View>
                    <Text style={styles.operator}>=</Text>
                    <View style={styles.column}>
                        <Text style={styles.resultLabel}>Total Amount Payable</Text>
                        <Text style={styles.amount}>₹{totalAmount}</Text>
                    </View>
                </View>

                <View style={styles.emiContainer}>
                    <View style={styles.emiBox}>
                        <Text style={styles.emiLabel}>EMI</Text>
                    </View>
                    <Text style={styles.emiAmount}>₹{emi}</Text>
                    <TouchableOpacity style={styles.checkEligibility}>
                        <Text style={styles.buttonText}>Check Eligibility →</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 6
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a237e',
        textAlign: 'center',
    },
    inputContainer: {
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 10

    },
    inputGroup: {
        marginBottom: 15,
        flex: 1,

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a237e',
        textAlign: 'center'
    },
    sublabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    resultContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    column: {
        flex: 1,
    },
    operator: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#666',
    },
    resultLabel: {
        fontSize: 10,
        color: '#666',
        marginBottom: 5,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    emiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    emiBox: {
        backgroundColor: '#1a237e',
        padding: 10,
        borderRadius: 8,
    },
    emiLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emiAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    checkEligibility: {
        backgroundColor: '#ff5722',
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});