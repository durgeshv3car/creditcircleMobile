

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'react-native';
import { ThemedTextInput } from '../ThemedInput';
import appStyle from '@/AppStyles';

const TaxCalculatorScreen = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    financialYear: '2024-25',
  ageGroup: 'below60',
    incomeSalary: '',
    rentalIncome: '',
    incomeDigitalAssets: '',
    interestIncome: '',
    otherIncome: '',
    perquisiteIncome: '',
    specialAllowance: '',
    bonus: '',
    childrenEducation: '',
    telecom: '',
    otherAllowances: '',
    hraReceived: '',
    ltaClaimed: '',
    professionalTax: '',
    deduction80C: '',
    deduction80D: '',
    deduction80G: '',
    childrenEducationExempt: '',
otherReimbursements: '',
homeLoanSelf: '',
lic: '',
ulip: '',
ppf: '',
tuitionFees: '',
elss: '',
nsc: '',
postOffice: '',
taxSaverFd: '',
jss: '',
nss: '',
homeLoanPrincipal: '',

  });
  

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const parse = (v) => parseFloat(v || '0');

  const grossIncome =
  parse(form.incomeSalary) +
  parse(form.specialAllowance) +
  parse(form.bonus) +
  parse(form.childrenEducation) +
  parse(form.telecom) +
  parse(form.otherAllowances) +
  parse(form.rentalIncome) +
  parse(form.incomeDigitalAssets) +
  parse(form.interestIncome) +
  parse(form.otherIncome) +
  parse(form.perquisiteIncome)
  ;

  // const deduction80C =
  // Math.min(
  //   parse(form.lic) +
  //   parse(form.ulip) +
  //   parse(form.ppf) +
  //   parse(form.tuitionFees) +
  //   parse(form.elss) +
  //   parse(form.nsc) +
  //   parse(form.postOffice) +
  //   parse(form.taxSaverFd) +
  //   parse(form.jss) +
  //   parse(form.nss) +
  //   parse(form.homeLoanPrincipal),
  //   150000,
  // );

// 80C deductions (max ₹1.5L)
const raw80C =
  parse(form.lic) +
  parse(form.ulip) +
  parse(form.ppf) +
  parse(form.tuitionFees) +
  parse(form.elss) +
  parse(form.nsc) +
  parse(form.postOffice) +
  parse(form.taxSaverFd) +
  parse(form.jss) +
  parse(form.nss) +
  parse(form.homeLoanPrincipal);

const deduction80C = Math.min(raw80C, 150000);

// Other deductions
const deduction80D = Math.min(parse(form.deduction80D), 25000);
const deduction80CCD1B = Math.min(parse(form.deduction80CCD1B), 50000);

// Standard deductions
const standardDeductionOld = 50000;
const standardDeductionNew = 75000;

// Gross income passed from previous calculation
// const grossIncome = <your calculated gross income here>;

const totalDeductionsOld = deduction80C + deduction80D + deduction80CCD1B + standardDeductionOld;
const taxableIncomeOld = Math.max(grossIncome - totalDeductionsOld, 0);

// Old Regime Tax Slabs
const incomeTaxOld = (income) => {
  if (income <= 250000) return 0;
  if (income <= 500000) return (income - 250000) * 0.05;
  if (income <= 700000) return 12500 + (income - 500000) * 0.2;
  if (income <= 1000000) return 12500 + 40000 + (income - 700000) * 0.2;
  return 12500 + 40000 + 60000 + (income - 1000000) * 0.3;
};

let taxOld = incomeTaxOld(taxableIncomeOld);

// Rebate under Section 87A (for income ≤ ₹7L under old regime)
if (taxableIncomeOld <= 700000) {
  taxOld = 0;
}

// Surcharge (if applicable)
let surchargeOld = 0;
if (taxableIncomeOld > 5000000 && taxableIncomeOld <= 10000000) surchargeOld = taxOld * 0.10;
else if (taxableIncomeOld > 10000000 && taxableIncomeOld <= 20000000) surchargeOld = taxOld * 0.15;
else if (taxableIncomeOld > 20000000 && taxableIncomeOld <= 50000000) surchargeOld = taxOld * 0.25;
else if (taxableIncomeOld > 50000000) surchargeOld = taxOld * 0.37;

const cessOld = (taxOld + surchargeOld) * 0.04;
const totalOldTax = Math.round(taxOld + surchargeOld + cessOld);

// New Regime Calculation
const taxableIncomeNew = Math.max(grossIncome - standardDeductionNew, 0);

const calculateNewTax = (income) => {
  let tax = 0;

  if (income <= 400000) tax = 0;
  else if (income <= 800000) tax = (income - 400000) * 0.05;
  else if (income <= 1200000) tax = 20000 + (income - 800000) * 0.10;
  else if (income <= 1600000) tax = 60000 + (income - 1200000) * 0.15;
  else if (income <= 2000000) tax = 120000 + (income - 1600000) * 0.20;
  else if (income <= 2400000) tax = 200000 + (income - 2000000) * 0.25;
  else tax = 300000 + (income - 2400000) * 0.30;

  // Section 87A rebate under new regime (only if taxable ≤ ₹7L after deductions)
  if (income <= 700000) {
    tax = 0;
  } else if (income <= 1200000) {
    tax = Math.max(tax - 12500, 0); // rebate up to ₹12,500
  }

  return tax;
};

const taxBaseNew = calculateNewTax(taxableIncomeNew);

// Surcharge (if applicable)
let surchargeNew = 0;
if (taxableIncomeNew > 5000000 && taxableIncomeNew <= 10000000) surchargeNew = taxBaseNew * 0.10;
else if (taxableIncomeNew > 10000000 && taxableIncomeNew <= 20000000) surchargeNew = taxBaseNew * 0.15;
else if (taxableIncomeNew > 20000000 && taxableIncomeNew <= 50000000) surchargeNew = taxBaseNew * 0.25;
else if (taxableIncomeNew > 50000000) surchargeNew = taxBaseNew * 0.37;

const cessNew = (taxBaseNew + surchargeNew) * 0.04;
const totalNewTax = Math.round(taxBaseNew + surchargeNew + cessNew);

// Regime suggestion
const recommendedRegime = totalNewTax < totalOldTax ? 'New' : 'Old';
const savings = Math.abs(totalOldTax - totalNewTax);



const formatIndianCurrency = (value) => {
  const num = value.replace(/,/g, '');
  const x = num.split('.');
  let intPart = x[0];
  const decPart = x.length > 1 ? '.' + x[1] : '';
  const lastThree = intPart.slice(-3);
  const otherNumbers = intPart.slice(0, -3);
  if (otherNumbers !== '') {
    intPart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  return intPart + decPart;
};



const inputProps = {
  placeholderTextColor: "#999999"
};

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.title}>Start Your Tax Calculation</Text>
            <Text style={[styles.label, appStyle.labelco]}>Financial Year</Text>
             <View style={[styles.pickerWrapper]}>
            <Picker
              selectedValue={form.financialYear}
             
              onValueChange={(value) => handleInputChange('financialYear', value)}
            >
              <Picker.Item label="Select Year" value="" />
              <Picker.Item label="2023–24" value="2023-24" />
              <Picker.Item label="2024–25" value="2024-25" />
            </Picker>
</View>

            <Text style={[styles.label, appStyle.labelco]}>Age Group</Text>
            <View style={[styles.pickerWrapper]}>
            <Picker
              selectedValue={form.ageGroup}
              style={styles.dropdown}
              onValueChange={(value) => handleInputChange('ageGroup', value)}
            >
              <Picker.Item label="Select Age Group" value="" />
              <Picker.Item label="Below 60" value="below60" />
              <Picker.Item label="60–79 (Senior)" value="60-79" />
              <Picker.Item label="80+ (Super Senior)" value="80plus" />
            </Picker>
            </View>
          </>
        );

        case 2:
          return (
            <>
  <Text style={styles.title}>Enter Your Income</Text>

  {/* Section: Salary & Allowances */}
  <Text style={styles.sectionHeading}>Salary & Allowances</Text>

  <Text style={[styles.label, appStyle.labelco]}>Income from Salary (before HRA, LTA)</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    placeholder="Income from Salary (before HRA, LTA)"
    keyboardType="numeric"
    // value={form.incomeSalary}
    value={formatIndianCurrency(form.incomeSalary)}

    onChangeText={(text) => handleInputChange('incomeSalary', text.replace(/,/g, ''))}
  />

  <Text style={[styles.label, appStyle.labelco]}>Special Allowance</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    placeholder="Special Allowance"
    keyboardType="numeric"
    // value={form.specialAllowance}
    value={formatIndianCurrency(form.specialAllowance)}
    onChangeText={(text) => handleInputChange('specialAllowance', text.replace(/,/g, ''))}
  />

  <Text style={[styles.label, appStyle.labelco]}>Bonus/Variable Pay</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    
    placeholder="Bonus/Variable Pay"
    keyboardType="numeric"
    // value={form.bonus}
    value={formatIndianCurrency(form.bonus)}
    onChangeText={(text) => handleInputChange('bonus', text.replace(/,/g, ''))}
  />

  <Text style={[styles.label, appStyle.labelco]}>Children Education Allowance</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    
    placeholder="Children Education Allowance"
    keyboardType="numeric"
    // value={form.childrenEducation}
    value={formatIndianCurrency(form.childrenEducation)}
    onChangeText={(text) => handleInputChange('childrenEducation', text.replace(/,/g, ''))}
  />

  <Text style={[styles.label, appStyle.labelco]}>Telephone/Internet Reimbursement</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    
    placeholder="Telephone/Internet Reimbursement"
    keyboardType="numeric"
    // value={form.telecom}
    value={formatIndianCurrency(form.telecom)}
    onChangeText={(text) => handleInputChange('telecom', text.replace(/,/g, ''))}
  />

  <Text style={[styles.label, appStyle.labelco]}>Other Allowances (Fuel, Driver, Attire)</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    
    placeholder="Other Allowances"
    keyboardType="numeric"
    // value={form.otherAllowances}
    value={formatIndianCurrency(form.otherAllowances)}
    onChangeText={(text) => handleInputChange('otherAllowances', text.replace(/,/g, ''))}
  />

  {/* Section: Rental & Investment Income */}
  <Text style={styles.sectionHeading}>Rental & Investment Income</Text>

  <Text style={[styles.label, appStyle.labelco]}>Rental Income (Let-Out Property)</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    
    placeholder="Rental Income"
    keyboardType="numeric"
    // value={form.rentalIncome}
    value={formatIndianCurrency(form.rentalIncome)}
    onChangeText={(text) => handleInputChange('rentalIncome', text.replace(/,/g, ''))}
  />

  <Text style={[styles.label, appStyle.labelco]}>Income from Digital Assets</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    
    placeholder="Income from Digital Assets"
    keyboardType="numeric"
    // value={form.incomeDigitalAssets}
    value={formatIndianCurrency(form.incomeDigitalAssets)}
    onChangeText={(text) => handleInputChange('incomeDigitalAssets', text.replace(/,/g, ''))}
  />

  <Text style={[styles.label, appStyle.labelco]}>Interest Income (Savings/Deposits)</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    
    placeholder="Interest Income"
    keyboardType="numeric"
    // value={form.interestIncome}
    value={formatIndianCurrency(form.interestIncome)}
    onChangeText={(text) => handleInputChange('interestIncome', text.replace(/,/g, ''))}
  />

  <Text style={[styles.label, appStyle.labelco]}>Other Income (Freelancing, Perks)</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    
    placeholder="Other Income"
    keyboardType="numeric"
    // value={form.otherIncome}
    value={formatIndianCurrency(form.otherIncome)}
    onChangeText={(text) => handleInputChange('otherIncome', text.replace(/,/g, ''))}
  />

  <Text style={[styles.label, appStyle.labelco]}>Perquisite Income (House, Loan, etc.)</Text>
  <ThemedTextInput
   placeholderTextColor="#DADADA"
    
    placeholder="Perquisite Income"
    keyboardType="numeric"
    // value={form.perquisiteIncome}
    value={formatIndianCurrency(form.perquisiteIncome)}
    onChangeText={(text) => handleInputChange('perquisiteIncome', text.replace(/,/g, ''))}
  />
</>

          );
        

          case 3:
            return (
              <>
              <Text style={styles.title}>Your Exempt Allowances</Text>
            
              <Text style={styles.sectionHeading}>Salary-Linked Exemptions</Text>
            
              <Text style={[styles.label, appStyle.labelco]}>HRA Received</Text>
              <ThemedTextInput
   placeholderTextColor="#DADADA"
                
                placeholder="HRA Received"
                keyboardType="numeric"
                // value={form.hraReceived}
                value={formatIndianCurrency(form.hraReceived)}
                onChangeText={(text) => handleInputChange('hraReceived', text.replace(/,/g, ''))}
              />
            
              <Text style={[styles.label, appStyle.labelco]}>LTA Claimed</Text>
              <ThemedTextInput
   placeholderTextColor="#DADADA"
                
                placeholder="LTA Claimed"
                keyboardType="numeric"
                // value={form.ltaClaimed}
                value={formatIndianCurrency(form.ltaClaimed)}
                onChangeText={(text) => handleInputChange('ltaClaimed', text.replace(/,/g, ''))}
              />
            
              <Text style={[styles.label, appStyle.labelco]}>Professional Tax Paid</Text>
              <ThemedTextInput
   placeholderTextColor="#DADADA"
                
                placeholder="Professional Tax Paid"
                keyboardType="numeric"
                // value={form.professionalTax}
                value={formatIndianCurrency(form.professionalTax)}
                onChangeText={(text) => handleInputChange('professionalTax', text.replace(/,/g, ''))}
              />
            
              <Text style={styles.sectionHeading}>Education & Reimbursements</Text>
            
              <Text style={[styles.label, appStyle.labelco]}>Children Education Allowance (Exempt)</Text>
              <ThemedTextInput
   placeholderTextColor="#DADADA"
                
                placeholder="Children Education Allowance (Exempt)"
                keyboardType="numeric"
                // value={form.childrenEducationExempt}
                value={formatIndianCurrency(form.childrenEducationExempt)}
                onChangeText={(text) => handleInputChange('childrenEducationExempt', text.replace(/,/g, ''))}
              />
            
              <Text style={[styles.label, appStyle.labelco]}>Other Reimbursements (Fuel, Driver, Internet, etc.)</Text>
              <ThemedTextInput
   placeholderTextColor="#DADADA"
                
                placeholder="Other Reimbursements"
                keyboardType="numeric"
                // value={form.otherReimbursements}
                value={formatIndianCurrency(form.otherReimbursements)}
                onChangeText={(text) => handleInputChange('otherReimbursements', text.replace(/,/g, ''))}
              />
            
              <Text style={styles.sectionHeading}>Home Loan Interest</Text>
            
              <Text style={[styles.label, appStyle.labelco]}>Home Loan Interest – Self Occupied</Text>
              <ThemedTextInput
   placeholderTextColor="#DADADA"
                
                placeholder="Home Loan Interest – Self Occupied"
                keyboardType="numeric"
                // value={form.homeLoanSelf}
                value={formatIndianCurrency(form.homeLoanSelf)}
                onChangeText={(text) => handleInputChange('homeLoanSelf', text.replace(/,/g, ''))}
              />
            </>
            
            );
          

            case 4:
              return (
                <>
                <Text style={styles.title}>Your Tax Saving Deductions</Text>
              
                {/* Section: 80C Investments */}
                <Text style={styles.sectionHeading}>Declare Your 80C Investments</Text>
              
                <Text style={[styles.label, appStyle.labelco]}>LIC Premiums</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="LIC Premiums"
                  keyboardType="numeric"
                  // value={form.lic}
                  value={formatIndianCurrency(form.lic)}
                  onChangeText={(text) => handleInputChange('lic', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>ULIP (Unit Linked Insurance Plan)</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="ULIP"
                  keyboardType="numeric"
                  // value={form.ulip}
                  value={formatIndianCurrency(form.ulip)}
                  onChangeText={(text) => handleInputChange('ulip', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>PPF (Public Provident Fund)</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="PPF"
                  keyboardType="numeric"
                  // value={form.ppf}
                  value={formatIndianCurrency(form.ppf)}
                  onChangeText={(text) => handleInputChange('ppf', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>Tuition Fees (for up to 2 children)</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="Tuition Fees"
                  keyboardType="numeric"
                  // value={form.tuitionFees}
                  value={formatIndianCurrency(form.tuitionFees)}
                  onChangeText={(text) => handleInputChange('tuitionFees', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>ELSS Mutual Funds</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="ELSS"
                  keyboardType="numeric"
                  // value={form.elss}
                  value={formatIndianCurrency(form.elss)}
                  onChangeText={(text) => handleInputChange('elss', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>NSC (National Savings Certificate)</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="NSC"
                  keyboardType="numeric"
                  // value={form.nsc}
                  value={formatIndianCurrency(form.nsc)}
                  onChangeText={(text) => handleInputChange('nsc', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>Post Office 5-Year Deposit</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="Post Office Deposit"
                  keyboardType="numeric"
                  // value={form.postOffice}
                  value={formatIndianCurrency(form.postOffice)}
                  onChangeText={(text) => handleInputChange('postOffice', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>Tax Saver Fixed Deposit (5-Year FD)</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="Tax Saver FD"
                  keyboardType="numeric"
                  // value={form.taxSaverFd}
                  value={formatIndianCurrency(form.taxSaverFd)}
                  onChangeText={(text) => handleInputChange('taxSaverFd', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>Jeevan Suraksha Scheme (JSS)</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="JSS"
                  keyboardType="numeric"
                  // value={form.jss}
                  value={formatIndianCurrency(form.jss)}
                  onChangeText={(text) => handleInputChange('jss', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>NSS (National Saving Scheme)</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="NSS"
                  keyboardType="numeric"
                  // value={form.nss}
                  value={formatIndianCurrency(form.nss)}
                  onChangeText={(text) => handleInputChange('nss', text.replace(/,/g, ''))}
                />
              
                <Text style={[styles.label, appStyle.labelco]}>Home Loan Principal Repayment</Text>
                <ThemedTextInput
   placeholderTextColor="#DADADA"
                  
                  placeholder="Home Loan Principal"
                  keyboardType="numeric"
                  // value={form.homeLoanPrincipal}
                  value={formatIndianCurrency(form.homeLoanPrincipal)} 
                  onChangeText={(text) => handleInputChange('homeLoanPrincipal', text.replace(/,/g, ''))}
                />
              </>
              
              );
            
            
              case 5:
  return (
    <>
    <Text style={styles.title}>Other Deductions Summary</Text>
  
    <View style={styles.summaryCard}>
      <Text style={styles.sectionHeading}>80C – Investment-Based Deductions</Text>
      <Text>Total Declared: ₹{raw80C.toLocaleString()} / ₹1,50,000</Text>
      <TouchableOpacity onPress={() => setStep(4)} style={styles.linkButton}>
        <Text style={styles.linkText}>View / Edit 80C Details</Text>
      </TouchableOpacity>
    </View>
  
    <Text style={[styles.label, appStyle.labelco]}>80D – Medical Insurance & Preventive Checkup</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="80D"
      keyboardType="numeric"
      // value={form.deduction80D}
      value={formatIndianCurrency(form.deduction80D)} 
      onChangeText={(text) => handleInputChange('deduction80D', text.replace(/,/g, ''))}
    />
  
    <Text style={[styles.label, appStyle.labelco]}>80E – Interest on Education Loan</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="80E"
      keyboardType="numeric"
      value={form.deduction80E}
      onChangeText={(text) => handleInputChange('deduction80E', text.replace(/,/g, ''))}
    />
  
    <Text style={[styles.label, appStyle.labelco]}>80CCD(1B) – Employee Voluntary NPS Contribution</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="80CCD(1B)"
      keyboardType="numeric"
      value={form.deduction80CCD1B}
      onChangeText={(text) => handleInputChange('deduction80CCD1B', text.replace(/,/g, ''))}
    />
  
    {/* <Text style={[styles.label, appStyle.labelco]}>80CCD(2) – Employer NPS Contribution</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="80CCD(2)"
      keyboardType="numeric"
      value={form.deduction80CCD2}
      onChangeText={(text) => handleInputChange('deduction80CCD2', text.replace(/,/g, ''))}
    /> */}
  
    {/* <Text style={[styles.label, appStyle.labelco]}>80EEA – Home Loan Interest (FY 2022–23)</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="80EEA"
      keyboardType="numeric"
      value={form.deduction80EEA}
      onChangeText={(text) => handleInputChange('deduction80EEA', text.replace(/,/g, ''))}
    /> */}
  
    <Text style={[styles.label, appStyle.labelco]}>80TTA – Interest from Savings Account</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="80TTA"
      keyboardType="numeric"
      value={form.deduction80TTA}
      onChangeText={(text) => handleInputChange('deduction80TTA', text.replace(/,/g, ''))}
    />
  
    <Text style={[styles.label, appStyle.labelco]}>80G – Donations to Approved Funds</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="80G"
      keyboardType="numeric"
      value={form.deduction80G}
      onChangeText={(text) => handleInputChange('deduction80G', text.replace(/,/g, ''))}
    />
  
    <Text style={[styles.label, appStyle.labelco]}>80U / 80DD – Disability Deduction</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="80U / 80DD"
      keyboardType="numeric"
      value={form.deduction80U}
      onChangeText={(text) => handleInputChange('deduction80U', text.replace(/,/g, ''))}
    />
  
    {/* <Text style={[styles.label, appStyle.labelco]}>80DDB – Specified Disease Treatment</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="80DDB"
      keyboardType="numeric"
      value={form.deduction80DDB}
      onChangeText={(text) => handleInputChange('deduction80DDB', text.replace(/,/g, ''))}
    />
   */}
    <Text style={[styles.label, appStyle.labelco]}>Other Deductions</Text>
    <ThemedTextInput
   placeholderTextColor="#DADADA"
      
      placeholder="Other Deductions (Optional Label)"
      keyboardType="numeric"
      value={form.deductionOther}
      onChangeText={(text) => handleInputChange('deductionOther', text.replace(/,/g, ''))}
    />
  
    {/* <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => setStep(4)} style={styles.backButton}>
        <Text style={styles.buttonText}>Back to 80C</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setStep(6)} style={styles.nextButton}>
        <Text style={styles.buttonText}>Calculate Tax</Text>
      </TouchableOpacity>
    </View> */}
  </>
  
  );


  case 6:
        return (
          <View style={[styles.cardContainer, {flex:1}]}>
            <View style={{flex:1}}>
            <Text style={styles.titleresult}>Net Tax Payable</Text>
            {/* <Text style={styles.subtext}>Based on your income & deductions, this is your best option.</Text> */}

            <View style={styles.row}>
  {/* Old Regime Block */}
  <View style={styles.taxBox}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={[styles.label, appStyle.labelco]}>Old Regime</Text>
      {recommendedRegime === 'Old' && (
        <Text style={{fontSize:12, backgroundColor:"#349c67", paddingHorizontal:2, borderRadius:4, color:"#fff"}}>Recommended</Text>
      )}
    </View>
    <View style={[styles.boderBox, { borderColor: '#f1b500' }]}>
                    <View style={{ backgroundColor: "#E4E7F5", padding: 10, marginBottom: 10, borderRadius: 10 }}>
                      <View>
                        <Text style={styles.label}>Tax payable</Text>
                        <Text style={styles.tax}>₹{totalOldTax.toLocaleString()} </Text>
                      </View>

                      <View style={{ flexDirection: "column", justifyContent: 'space-between', marginTop:10 }}>
                        <View >
                          <Text style={{ fontSize: 10 }}>Income tax</Text> <Text style={{fontWeight:800}}>{taxOld.toLocaleString()}</Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 10 }}>Surcharge</Text> <Text style={{fontWeight:800}}>{surchargeOld.toLocaleString()}</Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 10 }}>Cess</Text> <Text style={{fontWeight:800}}>{cessOld.toLocaleString()}</Text>
                        </View>
                      </View>
                    </View>

<View style={{flexDirection:"column"}}>
<View style={{flexDirection:"column", justifyContent:'space-between', marginBottom:5, padding:5, borderRadius:6, backgroundColor:'#F4F4F4', alignItems:'center'}}>
<Text style={{ fontSize: 11 }}>Total income</Text>
<Text style={{ fontSize: 11, fontWeight:600 }}>₹{taxableIncomeOld.toLocaleString()}</Text>
</View>

<View style={{flexDirection:"column", justifyContent:'space-between', marginBottom:5, padding:5, borderRadius:6, backgroundColor:'#F4F4F4', alignItems:'center'}}>
<Text style={{ fontSize: 11 }}>Exemption and deduction</Text>
<Text style={{ fontSize: 11, fontWeight:600 }}>₹{totalDeductionsOld.toLocaleString()}</Text>



</View>
</View>

      <Text style={styles.effectiveRate}>
        Effective Tax Rate {(taxOld / grossIncome * 100).toFixed(1)}%
      </Text>
    </View>
  </View>

  {/* New Regime Block */}
  <View style={styles.taxBox}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={[styles.label, appStyle.labelco]}>New Regime</Text>
      {recommendedRegime === 'New' && (
        // <Image
        //   source={require('../../assets/icons/checkmark.png')}
        //   style={styles.checkmark}
        //   width={20}
        //   height={20}
        // />
        <Text style={{fontSize:12, backgroundColor:"#349c67", paddingHorizontal:2, borderRadius:4, color:"#fff"}}>Recommended</Text>
      )}
    </View>
    {/* <View style={[styles.boderBox, { borderColor: '#3DA14F', backgroundColor: '#F2F8F3' }]}>
      <Text style={styles.tax}>₹{totalNewTax.toLocaleString()}</Text>
      <Text style={styles.deductions}>Zero Deductions</Text>
      <Text style={styles.effectiveRate}>
        Effective Tax Rate {(totalNewTax / grossIncome * 100).toFixed(1)}%
      </Text>
    </View> */}

    <View style={[styles.boderBox, {borderColor: '#3DA14F', backgroundColor: '#F2F8F3' }]}>
                    <View style={{ backgroundColor: "#C2E5C8", padding: 10, marginBottom: 10, borderRadius: 10 }}>
                      <View>
                        <Text style={styles.label}>Tax payable</Text>
                        <Text style={styles.tax}>₹{totalNewTax.toLocaleString()} </Text>
                      </View>

                      <View style={{ flexDirection: "column", justifyContent: 'space-between', marginTop:10 }}>
                        <View >
                          <Text style={{ fontSize: 10 }}>Income tax</Text> <Text style={{fontWeight:800}}>{taxBaseNew.toLocaleString()}</Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 10 }}>Surcharge</Text> <Text style={{fontWeight:800}}>{surchargeNew.toLocaleString()}</Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 10 }}>Cess</Text> <Text style={{fontWeight:800}}>{cessNew.toLocaleString()}</Text>
                        </View>
                      </View>
                    </View>

<View style={{flexDirection:"column"}}>
<View style={{flexDirection:"column", justifyContent:'space-between', marginBottom:5, padding:5, borderRadius:6, backgroundColor:'#E5E5E5', alignItems:'center'}}>
<Text style={{ fontSize: 11 }}>Total income</Text>
<Text style={{ fontSize: 11, fontWeight:600 }}>₹{taxableIncomeOld.toLocaleString()}</Text>
</View>

<View style={{flexDirection:"column", justifyContent:'space-between', marginBottom:5, padding:5, borderRadius:6, backgroundColor:'#E5E5E5', alignItems:'center'}}>
<Text style={{ fontSize: 11 }}>Exemption and deduction</Text>
<Text style={{ fontSize: 11, fontWeight:600 }}>₹{standardDeductionNew.toLocaleString()}</Text>



</View>
</View>

      <Text style={styles.effectiveRate}>
        Effective Tax Rate {(taxBaseNew / grossIncome * 100).toFixed(1)}%
      </Text>
    </View>

  </View>
</View>


            <Text style={styles.savings}>
            ☑ You save ₹{savings.toLocaleString()} more in the{' '}
              <Text style={{ fontWeight: 'bold' }}>{recommendedRegime} Regime</Text>
            </Text>

         <View style={styles.cardContainerresult}>
         <Text style={[styles.title, { fontSize: 16,}]}>Tax-Saving Deductions</Text>
            {[
              { label: '80C', used: deduction80C, cap: 150000 },
              { label: '80D', used: deduction80D, cap: 25000 },
              { label: '80CCD(1B)', used: deduction80CCD1B, cap: 50000 },
            ].map((item, index) => (
              <View key={index} style={{ marginVertical: 6 }}>
                <Text>{item.label}  ₹{item.used.toLocaleString()} of ₹{item.cap.toLocaleString()} declared</Text>
                <View style={styles.barBackground}>
                  <View style={[
                    styles.barFill,
                    { width: `${(item.used / item.cap) * 100}%` }
                  ]} />
                </View>
              </View>
            ))}
         </View>

            </View>

            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => {
                setForm({
                  financialYear: '',
                  ageGroup: '',
                  incomeSalary: '',
                  rentalIncome: '',
                  incomeDigitalAssets: '',
                  interestIncome: '',
                  otherIncome: '',
                  perquisiteIncome: '',
                  specialAllowance: '',
                  bonus: '',
                  childrenEducation: '',
                  telecom: '',
                  otherAllowances: '',
                  hraReceived: '',
                  ltaClaimed: '',
                  professionalTax: '',
                  deduction80C: '',
                  deduction80D: '',
                  deduction80E: '',
                  deduction80CCD1B: '',
                  deduction80CCD2: '',
                  // deduction80EEA: '',
                  deduction80TTA: '',
                  deduction80G: '',
                  deduction80U: '',
                  deduction80DDB: '',
                  deductionOther: '',
                  childrenEducationExempt: '',
                  otherReimbursements: '',
                  homeLoanSelf: '',
                  lic: '',
                  ulip: '',
                  ppf: '',
                  tuitionFees: '',
                  elss: '',
                  nsc: '',
                  postOffice: '',
                  taxSaverFd: '',
                  jss: '',
                  nss: '',
                  homeLoanPrincipal: '',
                });
                setStep(1);
              }}
            >
              <Text style={styles.ctaText}>Apply for Loan Based on Net Income</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (

    <View style={{flexDirection: 'column', flex:1 }}>
      <View style={{ 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems:"flex-end", 
    marginBottom: 10, 
    zIndex:100, 
    marginTop:-55, 
    paddingRight:30,
    height:40,
    }}>
    {step > 1 && (
      <TouchableOpacity onPress={() => setStep(step - 1)}>
        <Text style={{ color: '#FF4800', fontWeight: '600' }}>← Back</Text>
      </TouchableOpacity>
    )}
    <Text style={{ fontWeight: 'bold', fontSize:12, color: '#969696' }}>Step <Text style={{color:"#000", fontSize:16}}>{step}</Text>/6</Text>
    <View style={{ width: 50 }} /> {/* spacer to balance layout */}
  </View>

   
  

  <ScrollView contentContainerStyle={[styles.container, appStyle.incometex]}>
    {renderStep()}
  </ScrollView>

  {/* <View style={styles.buttonContainer} {step === 6}>
      {step > 1 && step < 6 && (
        <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backButton}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      )}
      {step < 6 && (
        <TouchableOpacity onPress={() => setStep(step + 1)} style={styles.nextButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View> */}

{step !== 6 && (
  <View style={[styles.buttonContainer, appStyle.buttoncont,  { height:60 }]}>
    {step > 1 && step < 6 && (
      <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backButton}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    )}
    {step < 6 && (
      <TouchableOpacity onPress={() => setStep(step + 1)} style={styles.nextButton}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    )}
  </View>
)}

</View>

   

  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color:"#FF4800" },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  label: { fontWeight: '600', marginBottom: 0, color:"#273283", fontSize:12 },
  dropdown: {
    borderWidth: 1,
    borderColor: 'red',
  },
      pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc', // default, can be overridden
    marginVertical: 10,
    overflow: 'hidden',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF4800',
    display:"none"
    },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:0,
    padding:4,
    width:'100%',
    zIndex:9999,
    gap:5,
  },
  nextButton: {
    backgroundColor: '#FF4800',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    zIndex:9999,
    flex:1,
    width:"100%",
    textAlign:'center'
  },
  backButton: {
    backgroundColor: '#555',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,    
    flex:1,
    width:"100%",
    textAlign:'center',
  },
  buttonText: {
    color: '#fff',
    width:'100%',
    textAlign:'center',
    top: 4,
  },
  cardContainer: {
    padding: 0,
    borderRadius: 12,
    
  },
  subtext: { fontSize: 14, color: '#555', marginVertical: 6, },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  taxBox: {
    width: '48%',
    marginTop:10,
  },

  tax: { fontSize: 22, fontWeight: 'bold' },
  boderBox:{
    borderColor:"red",
    borderWidth:1,
    borderRadius:10,
    padding: 8,
    marginTop:5,
    flex:1
  },
  deductions: { fontSize: 14, color: '#666', marginTop: 4 },
  effectiveRate: { fontSize: 12, color: '#666', marginTop: 6 },
  barBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginTop: 4,
    borderWidth:1,
    borderColor:"#ccc"
  },
  barFill: {
    height: 6,
    backgroundColor: '#f4c300',
    borderRadius: 3,
  },
  savings: { marginTop: 12, fontSize: 14, color: '#2a8a2a' },
  ctaButton: {
    backgroundColor: '#000',
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  ctaText: { color: '#fff', fontWeight: '600' },
  checkmark:{width:30, height:30},
  titleresult:{fontSize:20, color:"#FF4800", fontWeight:600},
  cardContainerresult:{ borderWidth:1, borderColor:"#D3CFCF", padding:10, marginTop:10, borderRadius:10, backgroundColor:"#F7F7F7"},
});

export default TaxCalculatorScreen;



