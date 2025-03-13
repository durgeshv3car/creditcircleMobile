import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { ThemedTextInput } from '../ThemedInput';
import CircularProgress from 'react-native-circular-progress-indicator';

const App = () => {
    const [sections, setSections] = useState({
        personalDetails: { progress: 0, fields: { firstName: '', lastName: '', email: '', mobile: '', dob: '' } },
        panDetails: { progress: 0, fields: { pan: '', houseNo: '', street: '', city: '', state: '' } },
        employmentInfo: { progress: 0, fields: { employerName: '', jobTitle: '' } },
        incomeDetails: { progress: 0, fields: { incomeSource: '', salary: '' } },
        insuranceDetails: { progress: 0, fields: { insurancePlans: '', investmentAmount: '' } },
        lifestylePreferences: { progress: 0, fields: { shoppingFrequency: '', travelPreference: '' } },
    });

    const [expandedSections, setExpandedSections] = useState({
        personalDetails: true,
        panDetails: false,
        employmentInfo: false,
        incomeDetails: false,
        insuranceDetails: false,
        lifestylePreferences: false,
    });

    const toggleSection = (section) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handleInputChange = (sectionKey, fieldKey, value) => {
        setSections((prevSections) => {
            const updatedFields = {
                ...prevSections[sectionKey].fields,
                [fieldKey]: value,
            };

            const filledFields = Object.values(updatedFields).filter((field) => field.trim() !== '').length;
            const totalFields = Object.keys(updatedFields).length;
            const progress = Math.round((filledFields / totalFields) * 100);

            return {
                ...prevSections,
                [sectionKey]: {
                    ...prevSections[sectionKey],
                    fields: updatedFields,
                    progress: progress,
                },
            };
        });
    };

    const renderSectionHeader = (title, Subtitle, progress, sectionKey) => (



        <View style={{ marginBottom: 6, marginTop: 6, marginHorizontal: 18, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: "#F0F0F0" }}>
            <TouchableOpacity
                onPress={() => toggleSection(sectionKey)}
                style={styles.sectionHeader}>
                <View style={styles.progressCircle}>
                    {/* <Text style={styles.progressText}>{progress}%</Text> */}
                    {progress === 100 ?

                        <Image source={require("../../assets/icons/checkmark.png")}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain" // Adjust this to "cover" or "stretch" if needed
                        />
                        :

                        <CircularProgress
                            value={progress}
                            radius={20}
                            activeStrokeColor={'#129004'}
                            inActiveStrokeColor={'#BEC2E5'}
                            activeStrokeWidth={6}
                            circleBackgroundColor={'#fff'}
                            inActiveStrokeWidth={6}
                            valueSuffix={'%'}
                        />

                    }





                </View>
                <View style={{ flexDirection: "column", flex: 1, }}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                    <Text style={styles.SubsectionTitle}>{Subtitle}</Text>
                </View>
                {/* <Ionicons
                    name={expandedSections[sectionKey] ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color="#000"
                /> */}
            </TouchableOpacity>
        </View>
    );

    const renderInputs = (sectionKey) => {
        return Object.entries(sections[sectionKey].fields).map(([fieldKey, value]) => (
            <View style={{ marginHorizontal: 10, }}>
                <ThemedTextInput
                    label={fieldKey}
                    key={fieldKey}
                    placeholder={fieldKey.replace(/([A-Z])/g, ' $1').trim()} // Convert camelCase to readable text
                    value={value}
                    onChangeText={(text) => handleInputChange(sectionKey, fieldKey, text)}
                />
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Personal Details */}
                {renderSectionHeader(
                    'Personal Details',
                    'Let’s Get Started with Your Personal Details',
                    sections.personalDetails.progress,
                    'personalDetails',

                )}
                {expandedSections.personalDetails && (
                    <View style={styles.sectionContent}>{renderInputs('personalDetails')}</View>
                )}

                {/* PAN & Location Information */}
                {renderSectionHeader(
                    'PAN & Location Information',
                    "Let’s Get Started with Your Personal Details",
                    sections.panDetails.progress,
                    'panDetails'
                )}
                {expandedSections.panDetails && (
                    <View style={styles.sectionContent}>{renderInputs('panDetails')}</View>
                )}

                {/* Employment Information */}
                {renderSectionHeader(
                    'Employment Information',
                    "Let’s Get Started with Your Personal Details",
                    sections.employmentInfo.progress,
                    'employmentInfo'
                )}
                {expandedSections.employmentInfo && (
                    <View style={styles.sectionContent}>{renderInputs('employmentInfo')}</View>
                )}

                {/* Income Details */}
                {renderSectionHeader(
                    'Income Details',
                    "Let’s Get Started with Your Personal Details",
                    sections.incomeDetails.progress,
                    'incomeDetails'
                )}
                {expandedSections.incomeDetails && (
                    <View style={styles.sectionContent}>{renderInputs('incomeDetails')}</View>
                )}

                {/* Insurance & Investment Details */}
                {renderSectionHeader(
                    'Insurance & Investment Details',
                    "Let’s Get Started with Your Personal Details",
                    sections.insuranceDetails.progress,
                    'insuranceDetails'
                )}
                {expandedSections.insuranceDetails && (
                    <View style={styles.sectionContent}>{renderInputs('insuranceDetails')}</View>
                )}

                {/* Lifestyle Preferences */}
                {renderSectionHeader(
                    'Lifestyle Preferences',
                    "Let’s Get Started with Your Personal Details",
                    sections.lifestylePreferences.progress,
                    'lifestylePreferences'
                )}
                {expandedSections.lifestylePreferences && (
                    <View style={styles.sectionContent}>{renderInputs('lifestylePreferences')}</View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    progressCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    progressText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    sectionTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#747474'
    },

    SubsectionTitle: {
        flex: 1,
        fontSize: 12,
        color: '#9597A0'
    },
    sectionContent: {
        padding: 10,
    }
});

export default App;
