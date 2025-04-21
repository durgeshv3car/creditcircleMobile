import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const DateOfBirthInput = ({ value, onChange }) => {
    const handleChange = (text) => {
        const digitsOnly = text.replace(/\D/g, '');
    
        let day = digitsOnly.substring(0, 2);
        let month = digitsOnly.substring(2, 4);
        let year = digitsOnly.substring(4, 8);
    
        // Cap day and month values
        if (day.length === 2) {
            let numDay = parseInt(day);
            if (numDay > 31) day = '31';
        }
        if (month.length === 2) {
            let numMonth = parseInt(month);
            if (numMonth > 12) month = '12';
        }
    
        if (year.length === 4) {
            const currentYear = new Date().getFullYear();
            const numYear = parseInt(year);
            if (numYear < 1950) year = '1950';
            else if (numYear > currentYear) year = currentYear.toString();
        }
    
        let formatted = '';
        if (day.length) formatted += day;
        if (month.length) formatted += '/' + month;
        if (year.length) formatted += '/' + year;
    
        onChange(formatted);
    };
    


    return (
        <View>
            <Text style={styles.label}>Date Of Birth</Text>
            <TextInput
                style={styles.input}
                value={value} // ✅ Controlled input
                onChangeText={handleChange}
                placeholder="DD/MM/YYYY"
                keyboardType="number-pad"
                maxLength={10}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    
    label: {
        marginBottom: 0,
        fontSize: 12,
        fontWeight: 'bold',
        color:'#273283'
    },
    input: {
        borderColor: '#9597A0',
        borderBottomWidth:1,
        paddingLeft: 0,
        fontSize: 14,
    },
});

export default DateOfBirthInput;
