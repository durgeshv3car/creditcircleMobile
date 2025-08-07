// import appStyle from "@/AppStyles";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import React, { useState, useMemo, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   BackHandler,
//   StatusBar,
//   useColorScheme,
// } from "react-native";

// export default function LoanOffer(dayata, {params}) {
//   const navigation = useNavigation();
//   const scheme = useColorScheme(); // detect dark/light mode

//   console.log("LoanOffer data:", params);
  
//   useFocusEffect(

//     useCallback(() => {
//       console.log("LoanOffer screen focused", dayata.applicationId);
//       const onBackPress = () => {
//         navigation.navigate("Home");
//         return true;
//       };

//       const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);
//       return () => backHandler.remove();
//     }, [navigation])
//   );

//   const [loanData] = useState([
//     { id: "1", name: "Piramal", interestRate: 27.5, emi: 17283, chances: "Excellent", preApproved: true },
//     { id: "2", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Excellent", preApproved: false },
//     { id: "3", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Good", preApproved: false },
//     { id: "4", name: "HDFC Bank", interestRate: 16.5, emi: 12500, chances: "Fair", preApproved: false },
//     { id: "5", name: "Axis Bank", interestRate: 13.5, emi: 11000, chances: "Excellent", preApproved: true },
//   ]);

//   const [filter, setFilter] = useState(null);
//   const [sortOrder, setSortOrder] = useState(null);

//   const filteredAndSortedLoans = useMemo(() => {
//     let loans = [...loanData];

//     if (filter === "preApproved") {
//       loans = loans.filter((item) => item.preApproved);
//     } else if (filter === "excellentChance") {
//       loans = loans.filter((item) => item.chances === "Excellent");
//     }

//     if (sortOrder === "interestAsc") {
//       loans.sort((a, b) => a.interestRate - b.interestRate);
//     } else if (sortOrder === "interestDesc") {
//       loans.sort((a, b) => b.interestRate - a.interestRate);
//     } else if (sortOrder === "emiAsc") {
//       loans.sort((a, b) => a.emi - b.emi);
//     } else if (sortOrder === "emiDesc") {
//       loans.sort((a, b) => b.emi - a.emi);
//     }

//     return loans;
//   }, [loanData, filter, sortOrder]);

//   const LoanCard = ({ item }) => (
//     <View style={appStyle.acard}>
//       {item.preApproved && <Text style={styles.preApproved}>Pre-Approved</Text>}
//       <Text style={[styles.title, appStyle.offetitle]}>{item.name}</Text>
//       <View style={styles.infoRow}>
//         <View>
//           <Text style={[styles.label, appStyle.doblebal]}>Interest Rate</Text>
//           <Text style={[styles.value, appStyle.perctvalu]}>{item.interestRate}%</Text>
//         </View>
//         <View>
//           <Text style={[styles.label, appStyle.doblebal]}>EMI</Text>
//           <Text style={[styles.value, appStyle.perctvalu]}>₹ {item.emi}</Text>
//         </View>
//       </View>
//       <View style={styles.chanceRow}>
//         <Text style={[styles.label, appStyle.doblebal]}>Chances of Approval</Text>
//         <Text style={styles.chanceValue}>{item.chances}</Text>
//       </View>
//       <TouchableOpacity style={styles.selectButton}>
//         <Text style={styles.selectButtonText}>SELECT</Text>
//       </TouchableOpacity>
//       <View style={styles.loanDetails}>
//         <Text style={[styles.detailText, appStyle.perctvalu]}>Maximum Loan Amount: Rs. 5,00,000</Text>
//         <Text style={[styles.detailText, appStyle.perctvalu]}>Loan Tenure: 60 months</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={appStyle.gstcraeccontainer}>
//       <StatusBar
//         barStyle={scheme === "dark" ? "light-content" : "dark-content"}
//         backgroundColor={scheme === "dark" ? "#000000" : "#FFFFFF"}
//       />
//       <FlatList
//         data={filteredAndSortedLoans}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <LoanCard item={item} />}
//         contentContainerStyle={styles.listContainer}
//       />
//       <View style={[styles.footer, appStyle.offerfooter]}>
//         <TouchableOpacity
//           style={styles.footerButton}
//           onPress={() => {
//             setFilter((prev) => (prev === "preApproved" ? null : "preApproved"));
//           }}
//         >
//           <Text style={styles.footerButtonText}>
//             {filter === "preApproved" ? "All Offers" : "Pre-Approved Only"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.footerButton}
//           onPress={() => {
//             setSortOrder((prev) => {
//               if (prev === "interestAsc") return "interestDesc";
//               return "interestAsc";
//             });
//           }}
//         >
//           <Text style={styles.footerButtonText}>
//             {sortOrder === "interestAsc"
//               ? "Interest ↓"
//               : sortOrder === "interestDesc"
//               ? "Interest ↑"
//               : "Sort by Interest"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.footerButton}
//           onPress={() => {
//             setSortOrder((prev) => {
//               if (prev === "emiAsc") return "emiDesc";
//               return "emiAsc";
//             });
//           }}
//         >
//           <Text style={styles.footerButtonText}>
//             {sortOrder === "emiAsc" ? "EMI ↓" : sortOrder === "emiDesc" ? "EMI ↑" : "Sort by EMI"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   listContainer: {
//     padding: 12,
//   },
  
//   preApproved: {
//     backgroundColor: "#35B8E0",
//     color: "white",
//     fontSize: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     alignSelf: "flex-start",
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   label: {
//     fontSize: 12,
//     color: "#666",
//   },
//   value: {
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   chanceRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   chanceValue: {
//     color: "#0BAA4D",
//     fontWeight: "bold",
//   },
//   selectButton: {
//     backgroundColor: "#ff5722",
//     padding: 10,
//     borderRadius: 4,
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   selectButtonText: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//   },
//   loanDetails: {
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     paddingTop: 8,
//   },
//   detailText: {
//     fontSize: 12,
//     color: "#555",
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
    
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//   },
//   footerButton: {
//     flex: 1,
//     paddingVertical: 16,
//     alignItems: "center",
//   },
//   footerButtonText: {
//     color: "#555",
//     fontWeight: "600",
//     fontSize: 12,
//   },
// });




import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import appStyle from "@/AppStyles";
import axios from "axios";

export default function LoanOffer({ navigation }) {
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [loanData, setLoanData] = useState([]);

  // Android hardware back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
        return true;
      };
      const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => backHandler.remove();
    }, [navigation])
  );

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("appIdData");
        const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;

        if (!parsedValue) {
          Alert.alert("Error", "App ID not found in storage.");
          setLoading(false);
          return;
        }

        console.log("🔍 Requesting loan offers with:", parsedValue);

        const response = await axios.post(
          "https://app.creditcircle.in/api/single-loan-application",
          {
            loanId: parsedValue,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("📥 Response received:", response.data);

        return;
        if (response.status === 200 && response.data?.data?.loans) {
          console.log("✅ Loan offers received:", response.data.data.loans);
          setLoanData(response.data.data.loans);
        } else {
          console.warn("⚠️ Unexpected response format", response.data);
          Alert.alert("Error", "Unexpected server response.");
        }
      } catch (error) {
        console.error("❌ API Error:", error.response?.data || error.message);
        Alert.alert("Error", "Could not fetch application data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoanData();
  }, []);

  const handleApplyLoan = (item) => {
    if (item.status === "rejected") {
      Alert.alert("Application Rejected", "This loan application has been rejected.");
    } else if (item.status === "get_url" && item.url) {
      navigation.navigate("WebviewScreen", { url: item.url });
    } else {
      Alert.alert("Error", "Unexpected application state.");
    }
  };

  const LoanCard = ({ item }) => (
    <View style={appStyle.acard}>
      <View style={styles.badges}>
        {item.preApproved && <Text style={styles.preApproved}>Pre-Approved</Text>}
        {item.status === "rejected" && <Text style={styles.rejected}>Rejected</Text>}
      </View>
      <Text style={[styles.title, appStyle.offetitle]}>{item.name}</Text>
      <View style={styles.infoRow}>
        <View>
          <Text style={[styles.label, appStyle.doblebal]}>Interest Rate</Text>
          <Text style={[styles.value, appStyle.perctvalu]}>{item.interestRate}%</Text>
        </View>
        <View>
          <Text style={[styles.label, appStyle.doblebal]}>EMI</Text>
          <Text style={[styles.value, appStyle.perctvalu]}>₹ {item.emi}</Text>
        </View>
      </View>
      <View style={styles.chanceRow}>
        <Text style={[styles.label, appStyle.doblebal]}>Chances of Approval</Text>
        <Text style={styles.chanceValue}>{item.chances}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.selectButton,
          item.status === "rejected" && { backgroundColor: "#ccc" },
        ]}
        onPress={() => handleApplyLoan(item)}
        disabled={item.status === "rejected"}
      >
        <Text style={styles.selectButtonText}>
          {item.status === "rejected" ? "REJECTED" : "APPLY LOAN"}
        </Text>
      </TouchableOpacity>
      <View style={styles.loanDetails}>
        <Text style={[styles.detailText, appStyle.perctvalu]}>
          Maximum Loan Amount: Rs. {item.maxAmount || "5,00,000"}
        </Text>
        <Text style={[styles.detailText, appStyle.perctvalu]}>
          Loan Tenure: {item.tenure || "60"} months
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.centered, appStyle.gstcraeccontainer]}>
        <ActivityIndicator size="large" color="#ff5722" />
      </View>
    );
  }

  return (
    <View style={appStyle.gstcraeccontainer}>
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={scheme === "dark" ? "#000" : "#fff"}
      />
      <FlatList
        data={loanData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LoanCard item={item} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No loan offers found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  badges: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  preApproved: {
    backgroundColor: "#35B8E0",
    color: "white",
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rejected: {
    backgroundColor: "#FF3B30",
    color: "white",
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
  chanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  chanceValue: {
    color: "#0BAA4D",
    fontWeight: "bold",
  },
  selectButton: {
    backgroundColor: "#ff5722",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 8,
  },
  selectButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  loanDetails: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  detailText: {
    fontSize: 12,
    color: "#555",
  },
});


