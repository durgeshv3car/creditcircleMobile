import appStyle from '@/AppStyles';
import RadioButtonGroup from '@/components/ThemedRadioButton';
import { ThemedHeadingText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BASE_URL } from '@/components/util/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const API_BASE_URL = `${BASE_URL}/api/loan-application`;

const BusinessDetailSearch = ({ navigation }) => {
  const [gstNumber, setGstNumber] = useState('');
  const [hasGstNumber, setHasGstNumber] = useState('1');
  const [loading, setLoading] = useState(false);
  const [gstError, setGstError] = useState('');

  const validateGST = (text) => {
    const alphanumericOnly = /^[A-Z0-9]*$/;
    const fullGstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

    if (!alphanumericOnly.test(text)) {
      return { valid: false, message: 'Only alphabets and numbers are allowed' };
    }

    if (text.length !== 15) {
      return { valid: false, message: 'GST number must be 15 characters long' };
    }

    if (!fullGstRegex.test(text)) {
      return { valid: false, message: 'Invalid GST number format' };
    }

    return { valid: true, message: '' };
  };

  const handleGSTChange = (text) => {
    const upperText = text.toUpperCase();
    setGstNumber(upperText);

    const { valid, message } = validateGST(upperText);
    setGstError(valid ? '' : message);
  };

  const handleSubmit = async () => {
    if (hasGstNumber === '1') {
      if (!gstNumber || gstNumber.length !== 15 || gstError) {
        Alert.alert('Error', gstError || 'Please enter a valid GST Number');
        return;
      }

      try {
        const jsonValue = await AsyncStorage.getItem('appIdData');
        const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;

        setLoading(true);
        const requestData = {
          gstNumber,
          applicationId: parsedValue,
        };

        const response = await axios.post(`${API_BASE_URL}/fetchgstdetails`, requestData);

        if (response.status === 200) {
          navigation.navigate('YesGSTBusinessDetail', { gstData: response.data });
        } else {
          Alert.alert('Error', response.data.message || 'Failed to fetch GST details');
        }
      } catch (error) {
        Alert.alert('Error', error.response?.data?.message || 'Failed to fetch GST details');
      } finally {
        setLoading(false);
      }
    } else {
      navigation.navigate('NoGSTBusinessDetail');
    }
  };

  const yesNoOptions = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '2' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={appStyle.HeadingTitle}>
              <ThemedHeadingText style={styles.header}>GST Details</ThemedHeadingText>
              <ThemedView style={styles.headerLine} />
            </View>

            <View style={styles.inputGroup}>
              <ThemedHeadingText>Do You Have GST Number?</ThemedHeadingText>
              <RadioButtonGroup
                size="auto"
                options={yesNoOptions}
                onValueChange={setHasGstNumber}
                direction="row"
                defaultValue={hasGstNumber}
              />
            </View>

            {hasGstNumber === '1' && (
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Enter your business GST number"
                  style={[styles.input, gstError && styles.inputError]}
                  value={gstNumber}
                  onChangeText={handleGSTChange}
                  maxLength={15}
                  keyboardType="default"
                  autoCapitalize="characters"
                />
                {gstError !== '' && <Text style={styles.errorText}>{gstError}</Text>}
              </View>
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flex:1, paddingHorizontal: 20, paddingBottom: 50, backgroundColor: '#fff' },
  header: { fontSize: 18, fontWeight: 'bold' },
  headerLine: { width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 },
  inputGroup: { marginVertical: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 48,
    textAlign: 'center',
  },
  inputError: { borderColor: '#FF3B30' },
  errorText: { color: '#FF3B30', fontSize: 12, marginTop: 4, textAlign: 'center' },
  buttonContainer: { left: 0, right: 0, bottom: 0, alignItems: 'center' },
  button: { backgroundColor: '#FF4800', paddingVertical: 15, borderRadius: 5, width: '90%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default BusinessDetailSearch;