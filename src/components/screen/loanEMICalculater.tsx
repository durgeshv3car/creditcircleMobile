import appStyle from '@/AppStyles';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export default function EMICalculator() {
    const navigation = useNavigation();
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

    const formatIndianCurrency = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return '0';
        return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
      };
      
      
    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, loanTenure]);

    return (
        <SafeAreaView style={appStyle.Emicontainer}>
            <View>
            <Text style={styles.title}>Loan EMI Calculator</Text>
            </View>

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
                        <Text style={styles.amount}>₹{formatIndianCurrency(loanAmount)}</Text>
                    </View>
                    <Text style={styles.operator}>+</Text>
                    <View style={styles.column}>
                        <Text style={styles.resultLabel}>Interest Amount</Text>
                        <Text style={styles.amount}>₹{formatIndianCurrency(totalInterest)}</Text>
                    </View>
                    <Text style={styles.operator}>=</Text>
                    <View style={styles.column}>
                        <Text style={styles.resultLabel}>Payable Amount</Text>
                        <Text style={styles.amount}>₹{formatIndianCurrency(totalAmount)}</Text>
                    </View>
                </View>

                <View style={styles.emiContainer}>
                    <View style={styles.emiBox}>
                        <Text style={styles.emiLabel}>EMI</Text>
                        <Text style={styles.emiAmount}>₹{formatIndianCurrency(emi)}</Text>
                    </View>
                    
                    {/* <TouchableOpacity style={styles.checkEligibility}>
                        <Text style={styles.buttonText}>Check Eligibility →</Text>
                    </TouchableOpacity> */}

<TouchableOpacity
  style={styles.checkEligibility}
  onPress={() => navigation.navigate('EligibilityScreen')} // replace with your target screen name
>
  <Text style={styles.buttonText}>Check Eligibility →</Text>
</TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF4800',
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
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a237e',
        textAlign: 'left'
    },
    sublabel: {
        fontSize: 10,
        color: '#666',
        marginTop:-4,
        marginBottom: 5,
        textAlign: 'left'
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
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
        textAlign: 'center',
    },
    operator: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#666',
        width:20
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
        marginTop:-6
    },
    emiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius:6
        
    },
    emiBox: {
        padding: 10,
        borderRadius: 8,
        width:"46%",
        backgroundColor:"#fff"
    },
    emiLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop:-16,
        marginLeft:-10,
        width:40,
        textAlign:"center",
        backgroundColor:"#273283",
        color:"#fff",
        borderRadius:100,        
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