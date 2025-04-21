import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    Switch,
    StyleSheet,
    Pressable,
    Alert,
} from "react-native";
import { ThemedTextInput } from "../ThemedInput";

const IncomeTaxCalculator = () => {
    const [inputs, setInputs] = useState({
        age: "",
        incomeSalary: "",
        incomeInterest: "",
        incomeRental: "",
        incomeDigitalAssets: "",
        hraReceived: "",
        rentPaid: "",
        basicSalary: "",
        metroCity: false,
        professionalTax: "",
        deduction80C: "",
        medicalSelf: "",
        medicalParents: "",
        educationLoanInterest: "",
        npsContribution: "",
        interestSavings: "",
        donations: "",
    });

    const [results, setResults] = useState(null);

    // Helper functions for calculations
    const validateInputs = () => {
        if (!inputs.age || isNaN(inputs.age)) return false;
        return true;
    };

    const computeTotalIncome = () => {
        const rentalIncomeAfterDeduction = (inputs.incomeRental || 0) * 0.7; // 30% deduction
        return (
            parseFloat(inputs.incomeSalary || 0) +
            parseFloat(inputs.incomeInterest || 0) +
            rentalIncomeAfterDeduction +
            parseFloat(inputs.incomeDigitalAssets || 0)
        );
    };

    const calculateExemptions = () => {
        const hraExemption = Math.min(
            parseFloat(inputs.hraReceived || 0),
            inputs.metroCity
                ? 0.5 * parseFloat(inputs.basicSalary || 0)
                : 0.4 * parseFloat(inputs.basicSalary || 0),
            parseFloat(inputs.rentPaid || 0) - 0.1 * parseFloat(inputs.basicSalary || 0)
        );

        const professionalTax = parseFloat(inputs.professionalTax || 0);
        return hraExemption + professionalTax || 0;
    };

    const calculateDeductions = () => {
        const section80C = Math.min(parseFloat(inputs.deduction80C || 0), 150000);
        const medicalExpenses = parseFloat(inputs.medicalSelf || 0) + parseFloat(inputs.medicalParents || 0);
        const otherDeductions =
            parseFloat(inputs.educationLoanInterest || 0) +
            parseFloat(inputs.npsContribution || 0) +
            parseFloat(inputs.interestSavings || 0) +
            parseFloat(inputs.donations || 0);
        return section80C + medicalExpenses + otherDeductions;
    };

    const calculateTaxNewRegime = (income) => {
        // Apply standard deduction
        const standardDeduction = 50000;
        let taxableIncome = income - standardDeduction;

        if (taxableIncome <= 0) return 0; // No tax if taxable income is ≤ 0

        // Apply rebate for income up to ₹7,00,000
        if (taxableIncome <= 700000) return 0;

        // Slab-wise calculation for new tax regime
        const slabs = [
            { limit: 300000, rate: 0.05 },
            { limit: 600000, rate: 0.1 },
            { limit: 900000, rate: 0.15 },
            { limit: 1200000, rate: 0.2 },
            { limit: 1500000, rate: 0.3 },
        ];

        let tax = 0;
        let previousLimit = 0;

        for (const slab of slabs) {
            if (taxableIncome > slab.limit) {
                tax += (slab.limit - previousLimit) * slab.rate;
                previousLimit = slab.limit;
            } else {
                tax += (taxableIncome - previousLimit) * slab.rate;
                return Math.round(tax + tax * 0.04); // Add 4% cess and return
            }
        }

        // Apply 30% for income > ₹15,00,000
        if (taxableIncome > 1500000) {
            tax += (taxableIncome - 1500000) * 0.3;
        }

        tax += tax * 0.04; // Add Health and Education Cess (4%)
        return Math.round(tax);
    };

    const calculateTaxOldRegime = (taxableIncome) => {
        const slabs = [
            { limit: 250000, rate: 0.05 },
            { limit: 500000, rate: 0.1 },
            { limit: 1000000, rate: 0.2 },
        ];
        let tax = 0;
        let previousLimit = 0;
        slabs.forEach((slab) => {
            if (taxableIncome > slab.limit) {
                tax += (Math.min(taxableIncome, slab.limit) - previousLimit) * slab.rate;
                previousLimit = slab.limit;
            }
        });
        if (taxableIncome > 1000000) {
            tax += (taxableIncome - 1000000) * 0.3; // 30% for income > ₹10L
        }
        return tax;
    };

    const handleSubmit = () => {
        if (!validateInputs()) {
            Alert.alert("Validation Error", "Please enter valid inputs.");
            return;
        }

        const totalIncome = computeTotalIncome();
        const exemptions = calculateExemptions();
        const deductions = calculateDeductions();

        const taxableIncomeOld = totalIncome - exemptions - deductions;
        const taxableIncomeNew = totalIncome;

        const taxOld = calculateTaxOldRegime(taxableIncomeOld);
        const taxNew = calculateTaxNewRegime(taxableIncomeNew);

        setResults({
            totalIncome,
            exemptions,
            deductions,
            taxOld,
            taxNew,
            recommendedRegime: taxOld < taxNew ? "Old Regime" : "New Regime",
        });
    };

    return (
       <View style={styles.container}>
      
       {results && (
         <Text style={styles.header}>
                <View style={styles.results}>
                    <Text>Total Income: ₹{results && results.totalIncome}</Text>
                    <Text>Exemptions: ₹{results.exemptions}</Text>
                    <Text>Deductions: ₹{results.deductions}</Text>
                    <Text>Tax (Old Regime): ₹{results.taxOld}</Text>
                    <Text>Tax (New Regime): ₹{results.taxNew}</Text>
                    <Text>Recommended: {results.recommendedRegime}</Text>
                </View>
                
       </Text>
            )}


       <ScrollView style={{marginBottom: 50, marginTop:10}}>
            

            {/* Input Fields */}
            {[
                { label: "Age", placeholder: "Enter your age", key: "age" },
                { label: "Income from Salary", placeholder: "Enter your gross salary income", key: "incomeSalary" },
                { label: "Income from Interest", placeholder:"Interest from savings bank and deposits", key: "incomeInterest" },
                { label: "Income from Rental Property", placeholder: "Annual rent received on let-out property", key: "incomeRental" },
                { label: "Income from Digital Assets", placeholder: "Crypto currency (blockchain) or similar technology ", key: "incomeDigitalAssets" },
                { label: "HRA Received", placeholder: "House Rent Allowance received per annum", key: "hraReceived" },
                { label: "Rent Paid", placeholder: "Total rent paid per annum", key: "rentPaid" },
                { label: "Basic Salary", placeholder: "Basic salary received per annum", key: "basicSalary" },
                { label: "Professional Tax", placeholder: "",  key: "professionalTax" },
                { label: "Deductions (80C)", placeholder: "PPF, ELSS mutual funds, LIC premium, etc. (max: 1.5L)",  key: "deduction80C" },
                { label: "Medical Expenses (Self & Family including parents)", placeholder: "Health insurance premium & health checkup fees", key: "medicalSelf" },
                { label: "Medical Expenses (Parents)", placeholder: "", key: "medicalParents" },
                { label: "Interest on Education Loan", placeholder:"Interest amount paid on loan taken for higher education", key: "educationLoanInterest" },
                { label: "NPS Contribution (80CCD)", placeholder: "Voluntary contribution to National Pension Scheme ",  key: "npsContribution" },
                { label: "Interest on Savings Deposits (80TTA)", placeholder: "Interest income on deposits in savings account",  key: "interestSavings" },
                { label: "Donations to Charity (80G)", placeholder: "Donation to charitable insitutions and NGOs", key: "donations" },
            ].map((field) => (
                <ThemedTextInput
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                        setInputs({ ...inputs, [field.key]: value })
                    }
                />
            ))}

            <View style={styles.switchContainer}>
                <Text>Do you live in a metro city?</Text>
                <Switch
                    value={inputs.metroCity}
                    onValueChange={(value) => setInputs({ ...inputs, metroCity: value })}
                />
            </View>

            {/* <Button title="Calculate Tax" style  onPress={handleSubmit} /> */}

            
         
            

            {/* Results */}
            
        </ScrollView>
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal:20, paddingBottom:10 }}>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Calculate Tax</Text>
                </Pressable>
            </View>
       </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, height:"100%", padding: 20, paddingTop:0, backgroundColor: "#fff" },
    header: { backgroundColor:'#ccc', padding:10, borderRadius:10, marginTop:10, marginBottom:10 },
    switchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15, backgroundColor: "#fff" },
    results: {},
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
        textAlign: 'center'
    },
});

export default IncomeTaxCalculator;



