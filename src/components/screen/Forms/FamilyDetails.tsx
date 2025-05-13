import appStyle from "@/AppStyles";
import { ThemedTextInput } from "@/components/ThemedInput";
import RadioButtonGroup from "@/components/ThemedRadioButton";
import ThemedRadioButtonList from "@/components/ThemedRadioButtonList";
import { ThemedHeadingText, ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Appearance,
    Button,
    Pressable,
    Image,
} from "react-native";

const FamilyDetails = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");


    useEffect(() => {
        // Add event listeners for keyboard show and hide
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
            setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
            setKeyboardVisible(false)
        );

        return () => {
            // Cleanup event listeners
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleContinue = () => {
        console.log({ firstName, lastName, email, dob });
    };


    const theme = Appearance.getColorScheme();


    const dynamicStyles = {
        backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
        shadowColor: theme === 'dark' ? '#FFFFFF' : '#000000',
    };

    const imagecoleor = {
        tintColor: theme === 'dark' ? "#ffffff" : ""
    };



    const amount = [
        { label: 'Below ₹1 Lac', value: '1' },
        { label: '₹1 - ₹3 Lac', value: '2' },
        { label: '₹3 - ₹5 Lac', value: '3' },
        { label: '₹5 - ₹8 Lac', value: '4' },
        { label: '₹8 - ₹10 Lac', value: '5' },
        { label: 'Over ₹10 Lac', value: '6' }
    ];


    const ModeofSalary = [
        { label: 'Bank', value: '1' },
        { label: 'Cash', value: '2' },
        { label: 'Both', value: '2' }
    ];


    const yesno = [
        { label: 'Yes', value: '1' },
        { label: 'No', value: '2' }
    ];



    const handleSelection = (value) => {
        setSelectedOption(value);
    };

    return (
        <SafeAreaView style={[styles.container, dynamicStyles]}>
            {/* Dismiss keyboard when tapping outside */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                          

                            {/* Income Details Section */}
                            <View style={appStyle.HeadingTitle}>
                                <ThemedHeadingText style={styles.header}>Family Details</ThemedHeadingText>
                                <ThemedView style={{ width: '20%', height: 2, backgroundColor: '#FF4800', marginTop: 4 }} />
                            </View>
                            <ThemedTextInput label="Father’s Name" placeHolder="Enter father’s name" />
                            
                            <ThemedTextInput label="Mother’s Name" placeHolder="Enter mother’s name" />



                            
                            {/* Credit Card Section */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                <ThemedHeadingText style={{ fontSize: 12, fontWeight: 'bold' }}>Do You Live With Your Parents?</ThemedHeadingText>
                                <RadioButtonGroup
                                    size="auto"
                                    options={yesno}
                                    onValueChange={handleSelection}
                                    direction="row"
                                    defaultValue=""
                                />
                            </View>
                            
                        </ScrollView>

                        {/* Floating "Continue" Button */}
                        <View style={[styles.buttonContainer, { marginBottom: isKeyboardVisible ? 10 : 20 }]}>
                            <Pressable style={styles.button} onPress={() => alert("Hello")}>
                                <Text style={styles.buttonText}>Check Eligibility</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 12,
      fontWeight:'bold'  
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Ensure enough space for floating button
    },
    headerContainer: {
        marginVertical: 20
    },
    header: {
        fontSize: 18,
        fontWeight: "bold"
    },
    subHeader: {
        fontSize: 12,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
    },
    buttonContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#FF4800",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        width: "90%"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center'
    },

    customInput: {
        marginBottom: 10
    },
    
});

export default FamilyDetails;


// import appStyle from "@/AppStyles";
// import { ThemedTextInput } from "@/components/ThemedInput";
// import RadioButtonGroup from "@/components/ThemedRadioButton";
// import { ThemedHeadingText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Alert,
//   Pressable,
//   Keyboard,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Appearance,
// } from "react-native";
// import axios from "axios";
// import { BASE_URL } from "@/components/util/api_url";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const FamilyDetails = ({ navigation }) => {
//   const [fatherName, setFatherName] = useState("");
//   const [motherName, setMotherName] = useState("");
//   const [liveWithParents, setLiveWithParents] = useState("");
//   const [errors, setErrors] = useState({});
//   const [applicationId, setApplicationId] = useState("");
//     const [isKeyboardVisible, setKeyboardVisible] = useState(false);

//   const yesno = [
//     { label: "Yes", value: "1" },
//     { label: "No", value: "2" },
//   ];

//   const handleSelection = (value) => {
//     setLiveWithParents(value);
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!fatherName.trim()) newErrors.fatherName = "Father's name Is Required";
//     if (!motherName.trim()) newErrors.motherName = "Mother's name Is Required";
//     if (!liveWithParents) newErrors.liveWithParents = "Please select an option";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };


//   useEffect(() => { 
          
//           const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
//             setKeyboardVisible(true)
//           );
//           const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
//             setKeyboardVisible(false)
//           );
    
//           return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//           };
    
//     fetchApplicationId();
//   }
//   , []);


//   const fetchApplicationId = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem("appIdData");
//       const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;

//       console.log("📦 Raw AsyncStorage Value:", parsedValue);
//       setApplicationId(parsedValue);
//       if (typeof parsedValue === "string") {
//         setApplicationId(parsedValue);
//       } else if (parsedValue && parsedValue.applicationId) {
//         setApplicationId(parsedValue.applicationId);
//       } else {
//         throw new Error("Invalid Application ID");
//       }
//     } catch (error) {
//       console.error("❌ Error fetching Application ID:", error);
//       Alert.alert("Error", "Failed to retrieve Application ID.");
//     }
//   };


//   const handleContinue = async () => {
//     if (!validateForm()) return;

//     if (!applicationId) {
//       Alert.alert("Error", "Missing Application ID. Please restart the application.");
//       return;
//     }

//     // If backend expects camelCase, keep as-is; if snake_case, change accordingly
//     const payload = {
//       applicationId,
//       fatherName,
//       motherName,
//       liveWithParents: liveWithParents === "1", // convert to boolean
//     };

//     console.log("📤 Submitting Payload:", payload);

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/api/loan-application/student-familydetails`,
//         payload
//       );

//       console.log("✅ API Response:", response.data);

//       if (response.data.success) {
//         Alert.alert("Success", "Details submitted successfully!");
//         navigation.navigate("NextScreen"); // Replace with actual screen
//       } else {
//         Alert.alert("Error", response.data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("❌ API error:", error.response?.data || error.message);
//       Alert.alert("Error", "Failed to submit family details");
//     }
//   };

//   const theme = Appearance.getColorScheme();
//   const dynamicStyles = {
//     backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//   };

//   return (
//     <SafeAreaView style={[styles.container, dynamicStyles]}>
//    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//              <KeyboardAvoidingView
//              style={{flex:1}}
//              >
//       <View style={{ flex: 1 }}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={appStyle.HeadingTitle}>
//             <ThemedHeadingText style={styles.header}>
//               Family Details
//             </ThemedHeadingText>
//             <ThemedView
//               style={{
//                 width: "20%",
//                 height: 2,
//                 backgroundColor: "#FF4800",
//                 marginTop: 4,
//               }}
//             />
//           </View>

//           <ThemedTextInput
//             label="Father’s Name"
//             placeHolder="Enter father’s name"
//             value={fatherName}
//             onChangeText={setFatherName}
//             error={errors.fatherName}
//           />

//           <ThemedTextInput
//             label="Mother’s Name"
//             placeHolder="Enter mother’s name"
//             value={motherName}
//             onChangeText={setMotherName}
//             error={errors.motherName}
//           />

//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//               marginTop: 10,
//             }}
//           >
//             <ThemedHeadingText style={{ fontSize: 12, fontWeight: "bold" }}>
//               Do You Live With Your Parents?
//             </ThemedHeadingText>
//             <RadioButtonGroup
//               size="auto"
//               options={yesno}
//               onValueChange={handleSelection}
//               direction="row"
//               defaultValue=""
//             />
//           </View>
//           {errors.liveWithParents && (
//             <Text style={styles.errorText}>{errors.liveWithParents}</Text>
//           )}
//         </ScrollView>

//         <View style={styles.buttonContainer}>
//           <Pressable style={styles.button} onPress={handleContinue}>
//             <Text style={styles.buttonText}>Check Eligibility</Text>
//           </Pressable>
//         </View>
//       </View>
//           </KeyboardAvoidingView>
//               </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 100,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttonContainer: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#FF4800",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 5,
//     width: "90%",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4,
//   },
// });

// export default FamilyDetails;
