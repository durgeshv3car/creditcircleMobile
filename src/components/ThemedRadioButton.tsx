import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Appearance, Pressable } from "react-native";
import { ThemedHeadingText } from "./ThemedText";

type RadioOption = {
  label: string;
  value: string;
};

type RadioButtonGroupProps = {
  options: RadioOption[];
  onValueChange: (value: string) => void;
  direction?: "row" | "column";
  defaultValue?: string | null;
  size?: "28%" | "auto";
  error?: string; // ✅ Added error prop
  value, 
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  onValueChange,
  direction = "column",
  defaultValue = null,
  size = "28%",
  value, 
  error // ✅ Accepting error prop
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue);

  const handlePress = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  const theme = Appearance.getColorScheme();
  const borderColor = { borderColor: theme === "dark" ? "#ffffff" : "#273283" };
  const backgroundColor = { backgroundColor: theme === "dark" ? "#ffffff" : "#273283" };

  return (
    // <View>
    //   <View style={[styles.container, { flexDirection: direction }]}>
    //     {options.map((option) => (
    //       <TouchableOpacity
    //         key={option.value}
    //         style={[styles.option, { width: size }]}
    //         onPress={() => handlePress(option.value)}
    //       >
    //         <View style={[styles.radioButton, borderColor]}>
    //           {selectedValue === option.value && <View style={[styles.selectedDot, backgroundColor]} />}
    //         </View>
    //         <ThemedHeadingText style={styles.label}>{option.label}</ThemedHeadingText>
    //       </TouchableOpacity>
    //     ))}
    //   </View>

    //   {/* ✅ Display error message if present */}
    //   {error && <Text style={styles.errorText}>{error}</Text>}
    // </View>

    <View style={[styles.container, { flexDirection: direction === 'row' ? 'row' : 'column' }]} >
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          onPress={() => handlePress(option.value)}
          // style={{
          //   marginRight: direction === 'row' ? 16 : 0,
          //   marginBottom: direction === 'column' ? 8 : 0,
          //   flexDirection: 'row',
          //   alignItems: 'center'
          // }}
          style={[styles.option, { width: size }]}
        >
          {/* <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#D3D3D3',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8
            }}
          > */}

<View style={[styles.radioButton, borderColor]}>
            {/* {value === option.value && (
              <View style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: '#273283',
              }} />
            )} */}

            {/* {selectedValue === option.value && <View style={[styles.selectedDot, backgroundColor]} />} */}

            {(value === option.value || selectedValue === option.value) && (
  <View style={[styles.selectedDot, backgroundColor]} />
)}
          </View>
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ))}
      {error && <Text style={{ color: 'red', marginTop: 4 }}>{error}</Text>}
    </View>
  );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  radioButton: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#273283",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  selectedDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#273283",
  },
  label: {
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
