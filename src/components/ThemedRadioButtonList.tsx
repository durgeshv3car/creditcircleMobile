import appStyle from '@/AppStyles';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Appearance, Pressable } from 'react-native';

const ThemedRadioButtonList = ({
  options,
  onValueChange = () => {},
  direction = "column",
  defaultValue = null,
  navigation,
  style = {}, // Optional prop
  error,  // ✅ Added error prop for validation errors
  value,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handlePress = (value) => {
    setSelectedValue(value);
    onValueChange(value);

    // Redirect based on the value
    if (navigation) {
      switch (value) {
        case "1":
          navigation.navigate("IncomeandSalaryDetails");
          break;
        case "2":
          navigation.navigate("BusinessDetailSearch");
          break;
        case "3":
          navigation.navigate("Professionaldetails");
          break;
        case "4":
          navigation.navigate("StudentIncomeDetails");
          break;
        default:
          break;
      }
    }
  };

  const theme = Appearance.getColorScheme();
  const borderColor = { borderColor: theme === 'dark' ? "#ffffff" : "#273283" };
  const backgroundColor = { backgroundColor: theme === 'dark' ? "#ffffff" : "#273283" };
  const backgroundColorList = { backgroundColor: theme === 'dark' ? "#222" : "#ffffff" };

  return (
    

    <View style={[styles.container, style, { flexDirection: direction === 'row' ? 'row' : 'column' }]} >
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              // onPress={() => onValueChange(option.value)}
              onPress={() => handlePress(option.value)}
              
              style={[styles.option, { paddingVertical: option.description?.length > 0 ? 10 : 10 }, backgroundColorList]}
            >
              
              <View style={{ paddingVertical: option?.description?.length ? 0 : 12 }}>
               <Text style={appStyle.Headingco}>{option.label}</Text>
              {option.description && option.description.length > 0 ? (
                 <Text style={appStyle.labelco}>{option.description}</Text>
               ) : null}
             </View>
              
             <View style={[styles.radioButton, borderColor]}>
           {(value === option.value || selectedValue === option.value) && (
            <View style={[styles.selectedDot, backgroundColor]} />
          )}
            
              </View>
              
            

              
            </TouchableOpacity>
          ))}
          {error && <Text style={{ color: 'red', marginTop: 4 }}>{error}</Text>}
        </View>
  );
};

export default ThemedRadioButtonList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    borderColor: '#D3D3D3',
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
  },
  radioButton: {
    height: 16,
    width: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#273283',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#273283',
  },
  Heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#273283',
  },
  label: {
    fontSize: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
