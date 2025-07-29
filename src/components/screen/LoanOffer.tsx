import appStyle from "@/AppStyles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  useColorScheme,
} from "react-native";

export default function LoanOffer() {
  const navigation = useNavigation();
  const scheme = useColorScheme(); // detect dark/light mode

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

  const [loanData] = useState([
    { id: "1", name: "Piramal", interestRate: 27.5, emi: 17283, chances: "Excellent", preApproved: true },
    { id: "2", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Excellent", preApproved: false },
    { id: "3", name: "Tata Capital", interestRate: 14.99, emi: 11892, chances: "Good", preApproved: false },
    { id: "4", name: "HDFC Bank", interestRate: 16.5, emi: 12500, chances: "Fair", preApproved: false },
    { id: "5", name: "Axis Bank", interestRate: 13.5, emi: 11000, chances: "Excellent", preApproved: true },
  ]);

  const [filter, setFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const filteredAndSortedLoans = useMemo(() => {
    let loans = [...loanData];

    if (filter === "preApproved") {
      loans = loans.filter((item) => item.preApproved);
    } else if (filter === "excellentChance") {
      loans = loans.filter((item) => item.chances === "Excellent");
    }

    if (sortOrder === "interestAsc") {
      loans.sort((a, b) => a.interestRate - b.interestRate);
    } else if (sortOrder === "interestDesc") {
      loans.sort((a, b) => b.interestRate - a.interestRate);
    } else if (sortOrder === "emiAsc") {
      loans.sort((a, b) => a.emi - b.emi);
    } else if (sortOrder === "emiDesc") {
      loans.sort((a, b) => b.emi - a.emi);
    }

    return loans;
  }, [loanData, filter, sortOrder]);

  const LoanCard = ({ item }) => (
    <View style={appStyle.acard}>
      {item.preApproved && <Text style={styles.preApproved}>Pre-Approved</Text>}
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
      <TouchableOpacity style={styles.selectButton}>
        <Text style={styles.selectButtonText}>SELECT</Text>
      </TouchableOpacity>
      <View style={styles.loanDetails}>
        <Text style={[styles.detailText, appStyle.perctvalu]}>Maximum Loan Amount: Rs. 5,00,000</Text>
        <Text style={[styles.detailText, appStyle.perctvalu]}>Loan Tenure: 60 months</Text>
      </View>
    </View>
  );

  return (
    <View style={appStyle.gstcraeccontainer}>
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={scheme === "dark" ? "#000000" : "#FFFFFF"}
      />
      <FlatList
        data={filteredAndSortedLoans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LoanCard item={item} />}
        contentContainerStyle={styles.listContainer}
      />
      <View style={[styles.footer, appStyle.offerfooter]}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            setFilter((prev) => (prev === "preApproved" ? null : "preApproved"));
          }}
        >
          <Text style={styles.footerButtonText}>
            {filter === "preApproved" ? "All Offers" : "Pre-Approved Only"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            setSortOrder((prev) => {
              if (prev === "interestAsc") return "interestDesc";
              return "interestAsc";
            });
          }}
        >
          <Text style={styles.footerButtonText}>
            {sortOrder === "interestAsc"
              ? "Interest ↓"
              : sortOrder === "interestDesc"
              ? "Interest ↑"
              : "Sort by Interest"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            setSortOrder((prev) => {
              if (prev === "emiAsc") return "emiDesc";
              return "emiAsc";
            });
          }}
        >
          <Text style={styles.footerButtonText}>
            {sortOrder === "emiAsc" ? "EMI ↓" : sortOrder === "emiDesc" ? "EMI ↑" : "Sort by EMI"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 12,
  },
  
  preApproved: {
    backgroundColor: "#35B8E0",
    color: "white",
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  footerButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  footerButtonText: {
    color: "#555",
    fontWeight: "600",
    fontSize: 12,
  },
});
