import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function LoanOffer() {
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

    // Apply filter
    if (filter === "preApproved") {
      loans = loans.filter((item) => item.preApproved);
    } else if (filter === "excellentChance") {
      loans = loans.filter((item) => item.chances === "Excellent");
    }

    // Apply sorting
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
    <View style={styles.card}>
      {item.preApproved && <Text style={styles.preApproved}>Pre-Approved</Text>}
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.infoRow}>
        <View>
          <Text style={styles.label}>Interest Rate</Text>
          <Text style={styles.value}>{item.interestRate}%</Text>
        </View>
        <View>
          <Text style={styles.label}>EMI</Text>
          <Text style={styles.value}>₹ {item.emi}</Text>
        </View>
      </View>
      <View style={styles.chanceRow}>
        <Text style={styles.label}>Chances of Approval</Text>
        <Text style={styles.chanceValue}>{item.chances}</Text>
      </View>
      <TouchableOpacity style={styles.selectButton}>
        <Text style={styles.selectButtonText}>SELECT</Text>
      </TouchableOpacity>
      <View style={styles.loanDetails}>
        <Text style={styles.detailText}>Maximum Loan Amount: Rs. 5,00,000</Text>
        <Text style={styles.detailText}>Loan Tenure: 60 months</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredAndSortedLoans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LoanCard item={item} />}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.footer}>
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
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  listContainer: {
    padding: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
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
    backgroundColor: "#FF9A00",
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
    backgroundColor: "#FFFFFF",
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
