import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const DateOfBirthInput = ({ value, onChange }) => {
    const handleChange = (text) => {
        let rawInput = text.replace(/[^0-9]/g, '').slice(0, 8);

        const today = new Date();
        const thisyear = today.getFullYear();
        let day = rawInput.slice(0, 2);
        let month = rawInput.slice(2, 4);
        let year = rawInput.slice(4);

        if (day > 31) day = '31';
        if (month > 12) month = '12';

        if (year.length === 4) {
            const numericYear = parseInt(year, 10);
            if (numericYear < 1950) year = '1950';
            else if (numericYear > thisyear) year = thisyear.toString();
        }

        let formatted = '';
        if (day) formatted += day;
        if (month) formatted += `/${month}`;
        if (year) formatted += `/${year}`;

        onChange(formatted); // ✅ Send updated DOB back to parent
    };

    return (
        <View>
            <Text style={styles.label}>Date Of Birth</Text>
            <TextInput
                style={styles.input}
                value={value} // ✅ Controlled input
                onChangeText={handleChange}
                placeholder="DD/MM/YYYY"
                keyboardType="numeric"
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
