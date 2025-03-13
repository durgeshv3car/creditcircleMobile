import { Text, TextInput, View, type TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  label?: string; // Only one word is allowed in the label
  placeHolder?: string;
  disable?: boolean; // Optional, default value handled internally
  validation?: (value: string) => string | null; // Validation function
  error?: string | null; // External error from parent
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  label,
  placeHolder,
  keyboardType,
  disable = true, // Default value is true
  validation,
  error: externalError, // Error from parent component
  onChangeText,
  ...otherProps
}: ThemedInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor || (disable ? "#ffffff42" : "#F7F7F7"), dark: darkColor },
    "background"
  );
  const borderColor = useThemeColor({ light: "#cccccc", dark: darkColor || "#333333" }, "border");
  const placeholderColor = useThemeColor({ light: "#888", dark: "#4F4E4E" }, "text");
  const textColor = useThemeColor({ light: "black", dark: "white" }, "text");
  const labelColor = useThemeColor({ light: "#273283", dark: "#ffffff" }, "text");
  const paddingLeftValue = disable ? 0 : 10;
  const borderRadiusroun = disable ? 0 : 4;
  const borderWidth = disable ? 1 : 0;

  const [value, setValue] = useState("");
  const [internalError, setInternalError] = useState<string | null>(null);

  // Format label based on uppercase character count (for single word)
  const formatLabel = (labelText: string) => {
    if (!labelText || labelText.includes(" ")) return labelText;

    const uppercaseCount = (labelText.match(/[A-Z]/g) || []).length;
    return uppercaseCount > 1 ? labelText.toUpperCase() : labelText[0].toUpperCase() + labelText.slice(1).toLowerCase();
  };

  const handleBlur = () => {
    if (validation) {
      setInternalError(validation(value));
    }
  };

  // ** Final error to display: External error takes priority **
  const finalError = externalError || internalError;

  return (
    <View style={{ minHeight: 48, flex: 1, marginBottom: 26 }}>
      {label && (
        <Text style={{ color: labelColor, fontWeight: "bold", fontSize: 12 }}>
          {formatLabel(label)}
        </Text>
      )}
      <TextInput
        style={[
          {
            backgroundColor,
            borderColor,
            borderBottomWidth: borderWidth,
            paddingVertical: 7,
            color: textColor,
            flex: 1,
            paddingLeft: paddingLeftValue,
            height: 40,
            borderRadius: borderRadiusroun,
          },
          style,
        ]}
        placeholder={placeHolder}
        keyboardType={keyboardType || "default"}
        editable={disable}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (validation) {
            setInternalError(validation(text));
          }
          if (onChangeText) {
            onChangeText(text);
          }
        }}
        onBlur={handleBlur}
        {...otherProps}
      />
      {finalError && <Text style={{ color: "red", fontSize: 12, marginTop: 2 }}>{finalError}</Text>}
    </View>
  );
}
