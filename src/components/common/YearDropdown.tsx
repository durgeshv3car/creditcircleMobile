import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const YearDropdown = ({ label, selectedYear, onYearSelect }) => {
    const [selectedValue, setSelectedValue] = useState(selectedYear || "");

    const handleChange = (value) => {
        setSelectedValue(value);
        onYearSelect(value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Picker
                selectedValue={selectedValue}
                onValueChange={handleChange}
                style={styles.picker}
                mode="dropdown" // Optional for dropdown style
            >
                <Picker.Item label="Select Year" value="" />
                {Array.from({ length: 50 }, (_, i) => (
                    <Picker.Item key={i} label={`${1970 + i}`} value={`${1970 + i}`} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        color: "#333",
    },
    picker: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default YearDropdown;
