import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { ThemedTextInput } from '../ThemedInput';
import ThemedRadioButtonList from '../ThemedRadioButtonList';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ThemedText } from '../ThemedText';
import { BASE_URL } from '../util/api_url';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

    const [Phone, setPhone] = useState();

    const API_URL = `${BASE_URL}/api/otp/get-profile?phoneNumber=${Phone}`;
    const UPDATE_PROFILE_URL = `${BASE_URL}/api/update-combined-data`;

    const [sections, setSections] = useState({
        personalDetails: {
            fields: {
                firstName: '',
                lastName: '',
                mobile: '',
                email: '',
                dob: '',
                gender: '',
                education: '',
                maritalStatus: '',
                liveWith: '',
            },
            progress: 0
        },
        panDetails: {
            fields: {
                pan: '',
                houseNo: '',
                street: '',
                landmark: '',
                pinCode: '',
                city: '',
                state: '',
            },
            progress: 0
        },
        employmentInfo: {
            fields: {
                companyName: '',
                employmentLevel: '',
                officeNo: '',
                officeStreet: '',
                officePinCode: '',
                officeCity: '',
                officeState: '',
            },
            progress: 0
        }, 
        incomeDetails: {
            fields: {
                netMonthlyIncome: '',
                modeOfIncome: '',
                bankAccount: '',
                hasCreditCard: '',
            },
            progress: 0
        },

        insuranceDetails: {
            fields: {
                insurancePlans: '',
                investmentOptions: '',
                earningMembers: '',
            },
            progress: 0
        },

        lifestylePreferences: {
            fields: {
                shoppingFrequency: '',
                rewardInterests: '',
                exploreIndiaFrequency: '',
                travelAbroadFrequency: '',
                passions: '',
                movieGenres: '',
            },
            progress: 0
        }
    });

    const [expandedSections, setExpandedSections] = useState({
        personalDetails: true,
        panDetails: false
    });

    const debounceTimer = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDataLocal = async () => {
            try {
                
                const jsonValue = await AsyncStorage.getItem('userData');
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
      setPhone(parsedValue);


                // const otpResponse = await axios.get(`${BASE_URL}/api/otp/get-phone-number`);
                // setPhone(otpResponse.data.phoneNumber);
                // console.log('Fetched Phone Number:', otpResponse.data.phoneNumber);
            } catch (error) {
                console.error('❌ Error fetching phone number:', error.message);
            }
        };
    
        fetchDataLocal();
    }, []);
    
    useEffect(() => {
        if (Phone) {
            fetchData();
        }
    }, [Phone]);


    const ThemedDropdown = ({ label, options, selectedValue, onValueChange }) => (
        <View style={{ marginVertical: 8 }}>
            <Text style={{ marginBottom: 4 }}>{label}</Text>
            <RNPickerSelect
                onValueChange={onValueChange}
                value={selectedValue}
                items={options.map(opt => ({ label: opt.label, value: opt.value }))}
                style={{
                    inputAndroid: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }
                }}
            />
        </View>
    );
    

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const profileResponse = await axios.get(API_URL);

            if (profileResponse.status === 200) {
                preFillData(profileResponse.data);
            }
        } catch (error) {
            console.error('❌ Error fetching data:', error.message);
        } finally {
            setIsLoading(false);
        }
    };



    const SECTION_TITLES = {
        personalDetails: {
            title: 'Personal Details',
            subtitle: 'Basic information about you',
        },
        panDetails: {
            title: 'PAN & Address',
            subtitle: 'Your PAN and current address',
        },
        employmentInfo: {
            title: 'Employment Info',
            subtitle: 'Workplace and job details',
        },
        incomeDetails: {
            title: 'Income Details',
            subtitle: 'Monthly income and source',
        },
        insuranceDetails: {
            title: 'Insurance & Investment',
            subtitle: 'Plans, investments and dependents',
        },
        lifestylePreferences: {
            title: 'Lifestyle Preferences',
            subtitle: 'Spending habits and interests',
        }
    };
    


    const preFillData = (profileData) => {
        setSections((prevSections) => {
            const updatedSections = {
                ...prevSections,
                personalDetails: {
                    ...prevSections.personalDetails,
                    fields: {
                        ...prevSections.personalDetails.fields,
                        firstName: profileData.firstName || '',
                        lastName: profileData.lastName || '',
                        mobile: profileData.phoneNumber || '',
                        email: profileData.email || '',
                        dob: profileData.dob || '',
                        gender: profileData.gender || '',
                        education: profileData.education || '',
                        maritalStatus: profileData.maritalStatus || '',
                        liveWith: profileData.liveWith || '',
                    }
                },
                panDetails: {
                    ...prevSections.panDetails,
                    fields: {
                        pan: profileData.pan || '',
                        houseNo: profileData.houseNo || '',
                        street: profileData.street || '',
                        landmark: profileData.landmark || '',
                        pinCode: profileData.pinCode || '',
                        city: profileData.city || '',
                        state: profileData.state || ''
                    }
                },
                employmentInfo: {
                    ...prevSections.employmentInfo,
                    fields: {
                        companyName: profileData.companyName || '',
                        employmentLevel: profileData.employmentLevel || '',
                        officeNo: profileData.officeNo || '',
                        officeStreet: profileData.officeStreet || '',
                        officePinCode: profileData.officePinCode || '',
                        officeCity: profileData.officeCity || '',
                        officeState: profileData.officeState || ''
                    }
                },
                incomeDetails: {
                    ...prevSections.incomeDetails,
                    fields: {
                        netMonthlyIncome: profileData.netMonthlyIncome || '',
                        modeOfIncome: profileData.modeOfIncome || '',
                        bankAccount: profileData.bankAccount || '',
                        hasCreditCard: profileData.hasCreditCard || ''
                    }
                },
                insuranceDetails: {
                    ...prevSections.insuranceDetails,
                    fields: {
                        insurancePlans: profileData.insurancePlans || '',
                        investmentOptions: profileData.investmentOptions || '',
                        earningMembers: profileData.earningMembers || ''
                    }
                },
                lifestylePreferences: {
                    ...prevSections.lifestylePreferences,
                    fields: {
                        shoppingFrequency: profileData.shoppingFrequency || '',
                        rewardInterests: profileData.rewardInterests || '',
                        exploreIndiaFrequency: profileData.exploreIndiaFrequency || '',
                        travelAbroadFrequency: profileData.travelAbroadFrequency || '',
                        passions: profileData.passions || '',
                        movieGenres: profileData.movieGenres || ''
                    }
                }
            };

            Object.keys(updatedSections).forEach((key) => {
                updatedSections[key].progress = calculateProgress(updatedSections[key].fields);
            });

            return updatedSections;
        });
    };

    const calculateProgress = (fields) => {
        const totalFields = Object.keys(fields).length;
        const filledFields = Object.values(fields).filter((field) => field).length;
        return Math.round((filledFields / totalFields) * 100);
    };

    const handleInputChange = useCallback((sectionKey, fieldKey, value) => {
        setSections((prevSections) => {
            const updatedFields = {
                ...prevSections[sectionKey].fields,
                [fieldKey]: value
            };

            return {
                ...prevSections,
                [sectionKey]: {
                    fields: updatedFields,
                    progress: calculateProgress(updatedFields)
                }
            };
        });

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(async () => {
            try {
                await axios.post(UPDATE_PROFILE_URL, {
                    phoneNumber: Phone,
                    section: sectionKey,
                    field: fieldKey,
                    value
                });
            } catch (error) {
                console.error(`❌ Error updating ${fieldKey}:`, error.message);
            }
        }, 800);
    }, [Phone]);

    const toggleSection = (section) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    // const renderSectionHeader = (title,  progress, sectionKey) => (
    //     <TouchableOpacity onPress={() => toggleSection(sectionKey)} style={styles.sectionHeader}>
    //          <View style={styles.progressCircle}>
    //         <CircularProgress 
    //         value={progress} 
    //         radius={20} 
    //         activeStrokeColor={'#129004'}
    //                         inActiveStrokeColor={'#BEC2E5'}
    //                         activeStrokeWidth={6}
    //                         circleBackgroundColor={'#fff'}
    //                         inActiveStrokeWidth={6}
    //                         valueSuffix={'%'}
    //         />
    //         </View>
    //         {/* <Text style={styles.sectionTitle}>{title}</Text> */}
    //         <View style={{ flexDirection: "column", flex: 1, }}>
    //                 <Text style={styles.sectionTitle}>{title}</Text>
    //                 <Text style={styles.SubsectionTitle}>asdfasd</Text>
    //             </View>
    //     </TouchableOpacity>
    // );



    const liveWithOptions = [
        { label: 'Do you own a four wheeler?', value: 'Four Wheeler' },
        { label: 'Do you own a two wheeler?', value: 'Two Wheeler' }
    ];
    

    const educationOptions = [
        { label: 'Below 10th', value: 'Below 10th' },
        { label: '10th Pass', value: '10th Pass' },
        { label: '12th Pass', value: '12th Pass' },
        { label: 'Diploma', value: 'Diploma' },
        { label: 'Graduate', value: 'Graduate' },
        { label: 'Post Graduate', value: 'Post Graduate' },
        { label: 'Doctorate', value: 'Doctorate' },
    ];

    
    const maritalStatusOptions = [
        { label: 'Single', value: 'Single' },
        { label: 'Married', value: 'Married' },
        { label: 'Divorced', value: 'Divorced' },
        { label: 'Widowed', value: 'Widowed' },
    ];
    


    const renderSectionHeader = (titleKey, progress, sectionKey) => {
        const sectionTitle = SECTION_TITLES[titleKey]?.title || titleKey;
        const sectionSubtitle = SECTION_TITLES[titleKey]?.subtitle || '';
    
        return (
            <TouchableOpacity onPress={() => toggleSection(sectionKey)} style={styles.sectionHeader}>
                <View style={styles.progressCircle}>
                    <CircularProgress 
                        value={progress} 
                        radius={20} 
                        activeStrokeColor={'#129004'}
                        inActiveStrokeColor={'#BEC2E5'}
                        activeStrokeWidth={6}
                        inActiveStrokeWidth={6}
                        circleBackgroundColor={'#fff'}
                        valueSuffix={'%'}
                    />
                </View>
                <View style={{ flexDirection: "column", flex: 1 }}>
                    <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                    <Text style={styles.SubsectionTitle}>{sectionSubtitle}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    // const renderInputs = (sectionKey) =>
    //     Object.entries(sections[sectionKey]?.fields || {}).map(([fieldKey, value]) => (
    //         <ThemedTextInput
    //             key={fieldKey}
    //             label={fieldKey}
    //             value={value}
    //             onChangeText={(value) => handleInputChange(sectionKey, fieldKey, value)}
    //         />
    //     ));


    const renderInputs = (sectionKey) =>
        Object.entries(sections[sectionKey]?.fields || {}).map(([fieldKey, value]) => {
            // Radio for "liveWith"
            if (sectionKey === 'personalDetails' && fieldKey === 'liveWith') {
                return (
                    <>
                    <ThemedText style={{ marginVertical: 8 }}>
                    {/* {fieldKey} */}
                    Who do you live with?
                    </ThemedText>
                    <ThemedRadioButtonList
                        key={fieldKey}
                        label="Who do you live with?"
                        options={liveWithOptions}
                        selectedValue={value}
                        onValueChange={(newValue) => handleInputChange(sectionKey, fieldKey, newValue)}
                    />
                    </>
                );
            }
    
            // Dropdown for "education"
            if (sectionKey === 'personalDetails' && fieldKey === 'education') {
                return (
                    <ThemedDropdown
                        key={fieldKey}
                        label="Educational Qualification"
                        options={educationOptions}
                        selectedValue={value}
                        onValueChange={(newValue) => handleInputChange(sectionKey, fieldKey, newValue)}
                    />
                );
            }
    
            // Dropdown for "maritalStatus"
            if (sectionKey === 'personalDetails' && fieldKey === 'maritalStatus') {
                return (
                    <ThemedDropdown
                        key={fieldKey}
                        label="Marital Status"
                        options={maritalStatusOptions}
                        selectedValue={value}
                        onValueChange={(newValue) => handleInputChange(sectionKey, fieldKey, newValue)}
                    />
                );
            }
    
            // Default input
            return (
                <ThemedTextInput
                    key={fieldKey}
                    label={fieldKey}
                    value={value}
                    onChangeText={(text) => handleInputChange(sectionKey, fieldKey, text)}
                />
            );
        });

        

    return (
        <ScrollView style={{ paddingTop:10 }}>
            {Object.keys(sections).map((sectionKey) => (
                <View key={sectionKey} >
                    {renderSectionHeader(sectionKey, sections[sectionKey]?.progress || 0, sectionKey)}
                    <View style={styles.sectionContent}>
                        {expandedSections[sectionKey] && renderInputs(sectionKey)}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 10,
        borderRadius: 10,
        width: '90%',
        margin: 'auto',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#747474'

    },
    sectionContent: {
        paddingHorizontal: 22,
    },
    SubsectionTitle: {
        flex: 1,
        fontSize: 12,
        color: '#9597A0',
        marginLeft: 10,
    },
    progressCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    }
});

export default App;
