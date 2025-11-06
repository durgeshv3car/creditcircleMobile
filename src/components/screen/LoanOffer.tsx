// import React, { useEffect, useState, useCallback, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   StatusBar,
//   Alert,
//   RefreshControl,
//   SafeAreaView,
//   useColorScheme,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { BASE_URL } from "../util/api_url";

// type OfferRow = {
//   id: string;
//   name: string;
//   status?: string;
//   url?: string;
//   interestRate?: string | number;
//   emi?: string | number;
//   chances?: string;
//   maxAmount?: string | number;
//   tenure?: string | number;
//   reason?: string;
//   updatedAt?: string;
// };

// const parseStoredPhone = (raw: any) => {
//   if (!raw) return null;
//   try {
//     const parsed = JSON.parse(raw);
//     if (typeof parsed === "string") return parsed;
//     if (parsed?.phoneNumber) return parsed.phoneNumber;
//     if (parsed?.phone) return parsed.phone;
//     return null;
//   } catch {
//     return raw;
//   }
// };

// const safeHttpUrl = (u?: string) => {
//   if (!u) return "";
//   return /^https?:\/\//i.test(u) ? u : `https://${u}`;
// };

// const formatINR = (v?: string | number) => {
//   if (v === undefined || v === null || v === "" || Number.isNaN(Number(v))) return "—";
//   try {
//     return new Intl.NumberFormat("en-IN").format(Number(v));
//   } catch {
//     return String(v);
//   }
// };

// const isRejected = (status?: string) => String(status || "").toLowerCase().includes("reject");
// const isPreApproved = (status?: string, url?: string) => !isRejected(status) && !!url;

// const explodeLoanDataStatus = (app: any): OfferRow[] => {
//   const out: OfferRow[] = [];
//   if (!app || typeof app !== "object") return out;

//   const map = app.loanDataStatus;
//   const updated = app.updatedAt || app.createdAt || app.timestamp || app.date || undefined;

//   if (map && typeof map === "object") {
//     const entries = Object.entries(map);
//     for (const [rawName, val] of entries) {
//       const name = String(rawName || "Lender");

//       if (typeof val === "string") {
//         out.push({
//           id: `${app.id ?? "app"}-${name}`,
//           name,
//           status: "get_url",
//           url: val,
//           interestRate: app.interestRate ?? "—",
//           emi: app.emi ?? "—",
//           chances: app.chances ?? "Excellent",
//           maxAmount: app.maxAmount ?? 500000,
//           tenure: app.tenure ?? 60,
//           updatedAt: updated,
//         });
//       } else if (val && typeof val === "object") {
//         out.push({
//           id: `${app.id ?? "app"}-${name}`,
//           name,
//           status: val.status ?? "unknown",
//           url: typeof val.url === "string" ? val.url : undefined,
//           interestRate: val.interestRate ?? app.interestRate ?? "—",
//           emi: val.emi ?? app.emi ?? "—",
//           chances: val.chances ?? app.chances ?? "Excellent",
//           maxAmount: val.maxAmount ?? app.maxAmount ?? 500000,
//           tenure: val.tenure ?? app.tenure ?? 60,
//           reason: val.reason ?? "",
//           updatedAt: val.updatedAt || updated,
//         });
//       }
//     }
//   }

//   return out;
// };

// // ---------- Date helpers ----------
// const parseDate = (s?: string): Date | null => {
//   if (!s) return null;
//   const d = new Date(s);
//   return isNaN(d.getTime()) ? null : d;
// };
// const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
// const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
// const formatHuman = (d?: Date | null) => (d ? d.toDateString() : "—");

// // ---------- Loan Card (with 5s countdown) ----------
// const LoanCard = ({
//   item,
//   onApply,
// }: {
//   item: OfferRow;
//   onApply: (url?: string, lenderName?: string) => void;
// }) => {
//   const disabled = isRejected(item.status);
//   const showPreApproved = isPreApproved(item.status, item.url);

//   // countdown state (null = idle, number = seconds remaining)
//   const [countdown, setCountdown] = useState<number | null>(null);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (countdown === 0) {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//       setCountdown(null);
//       onApply(item.url, item.name);
//     }
//   }, [countdown, item.name, item.url, onApply]);

//   const startCountdown = () => {
//     if (disabled || countdown !== null) return;
//     setCountdown(5);
//     intervalRef.current = setInterval(() => {
//       setCountdown((s) => (typeof s === "number" ? s - 1 : s));
//     }, 1000);
//   };

//   const isBusy = countdown !== null;

//   return (
//     <View style={ui.acard}>
//       <View style={ui.badges}>
//         {showPreApproved && <Text style={ui.preApproved}>Pre-Approved</Text>}
//         {disabled && <Text style={ui.rejected}>Rejected</Text>}
//       </View>

//       <Text style={ui.title}>{item.name}</Text>

//       <View style={ui.infoRow}>
//         <View>
//           <Text style={ui.label}>Interest Rate</Text>
//           <Text style={ui.value}>
//             {String(item.interestRate).includes("%") ? item.interestRate : `${item.interestRate}%`}
//           </Text>
//         </View>
//         <View style={{ alignItems: "flex-end" }}>
//           <Text style={ui.label}>EMI</Text>
//           <Text style={ui.value}>₹ {formatINR(item.emi)}</Text>
//         </View>
//       </View>

//       <View style={ui.chanceRow}>
//         <Text style={ui.label}>Chances of Approval</Text>
//         <Text style={ui.chanceValue}>{item.chances}</Text>
//       </View>

//       <TouchableOpacity
//         style={[ui.cta, (disabled || isBusy) && ui.ctaDisabled]}
//         onPress={startCountdown}
//         disabled={disabled || isBusy}
//         activeOpacity={0.85}
//       >
//         <Text style={ui.ctaText}>
//           {disabled ? "REJECTED" : isBusy ? `OPENING IN ${countdown}s` : "APPLY LOAN"}
//         </Text>
//       </TouchableOpacity>

//       <View style={ui.footer}>
//         {disabled && item.reason && <Text style={[ui.detailText, { marginBottom: 4 }]}>Reason: {item.reason}</Text>}
//         <Text style={ui.detailText}>Maximum Loan Amount: ₹ {formatINR(item.maxAmount)}</Text>
//         <Text style={ui.detailText}>Loan Tenure: {item.tenure} months</Text>
//         {item.updatedAt && (
//           <Text style={[ui.detailText, { marginTop: 4 }]}>Updated: {new Date(item.updatedAt).toLocaleString()}</Text>
//         )}
//       </View>
//     </View>
//   );
// };

// export default function LoanOffer() {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [offers, setOffers] = useState<OfferRow[]>([]);
//   const [phoneUsed, setPhoneUsed] = useState<string | null>(null);

//   // Tabs
//   const [activeTab, setActiveTab] = useState<"recent" | "history">("recent");

//   // History date filter
//   const [fromDate, setFromDate] = useState<Date | null>(null);
//   const [toDate, setToDate] = useState<Date | null>(null);
//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);

//   const navigation = useNavigation();
//   const scheme = useColorScheme();
//   const isDark = scheme === "dark";

//   const fetchAllLoans = async () => {
//     setLoading(true);
//     try {
//       const userRaw = await AsyncStorage.getItem("userData");
//       const ph = parseStoredPhone(userRaw);
//       setPhoneUsed(ph ?? null);

//       const url = `${BASE_URL}/api/single-loan-application-mobile/${ph}`;
//       const resp = await axios.get(url, { headers: { Accept: "application/json" } });

//       console.log("All-loans fetch response:", resp?.data);

//       const root = resp?.data?.data ?? resp?.data ?? {};
//       let rows: OfferRow[] = [];

//       if (Array.isArray(root)) {
//         for (const app of root) rows.push(...explodeLoanDataStatus(app));
//       } else if (root && typeof root === "object") {
//         rows = explodeLoanDataStatus(root);
//       }

//       // sort newest first for nicer display
//       rows.sort((a, b) => {
//         const da = parseDate(a.updatedAt)?.getTime() ?? 0;
//         const db = parseDate(b.updatedAt)?.getTime() ?? 0;
//         return db - da;
//       });

//       setOffers(rows);
//     } catch (e: any) {
//       console.log("❌ all-loans fetch error:", e?.response?.data || e?.message);
//       Alert.alert("Error", "Could not load loans.");
//       setOffers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await fetchAllLoans();
//     setRefreshing(false);
//   }, []);

//   useEffect(() => {
//     fetchAllLoans();
//   }, []);

//   const onApply = useCallback(
//     async (rawUrl?: string, lenderName?: string) => {
//       const isCashe = lenderName?.toLowerCase().includes("cashe");

//       if (!isCashe) {
//         const url = safeHttpUrl(rawUrl);
//         if (!url) {
//           Alert.alert("Unavailable", "No application link found.");
//           return;
//         }
//         navigation.navigate("WebviewScreen" as never, { urlName: url } as never);
//         return;
//       }

//       setTimeout(async () => {
//         try {
//           const userRaw = await AsyncStorage.getItem("userData");
//           const parsed = JSON.parse(userRaw || "{}");

//           console.log("CASHe login-url payload:", parsed);

//           // 1) Get user ID from profile API
//           const profileRes = await axios.get(`${BASE_URL}/api/otp/get-profile?phoneNumber=${parsed}`);

//           console.log("CASHe login-url user id:", profileRes.data.id);

//           const userId = profileRes.data.id;
//           if (!userId) {
//             Alert.alert("Error", "Unable to fetch user ID from profile.");
//             return;
//           }

//           // 2) Send to CASHe API
//           const api = `${BASE_URL}/api/partner/cashe/login-url`;
//           const payload = {
//             createToken: {
//               phoneNumber: parsed,
//               id: userId,
//             },
//           };

//           const response = await axios.post(api, payload, {
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           });

//           console.log("CASHe login-url response:", response?.data);

//           const loginUrl = response?.data?.data?.payLoad ?? response?.data?.payLoad ?? response?.data;

//           if (!loginUrl) {
//             Alert.alert("Error", "No CASHe login URL returned.");
//             return;
//           }

//           const finalUrl = safeHttpUrl(loginUrl);
//           navigation.navigate("WebviewScreen" as never, { urlName: finalUrl } as never);
//         } catch (error: any) {
//           console.log("❌ CASHe login-url error:", error?.response?.data || error?.message);
//           Alert.alert("Error", "Could not prepare CASHe application link.");
//         }
//       }, 500); // 500 milliseconds
//     },
//     [navigation]
//   );

//   // ---------- Derived lists for tabs ----------
//   const recentThreshold = (() => {
//     const d = new Date();
//     d.setDate(d.getDate() - 7);
//     return d;
//   })();

//   const recentOffers = offers.filter((o) => {
//     const d = parseDate(o.updatedAt);
//     return d ? d >= recentThreshold : false;
//   });

//   const historyOffers = offers.filter((o) => {
//     const d = parseDate(o.updatedAt);
//     if (!d) return false;
//     if (fromDate && d < startOfDay(fromDate)) return false;
//     if (toDate && d > endOfDay(toDate)) return false;
//     return true;
//   });

//   const renderList = (data: OfferRow[]) => (
//     <FlatList
//       data={data}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => <LoanCard item={item} onApply={onApply} />}
//       contentContainerStyle={data.length ? styles.listContainer : styles.emptyContainer}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ff5722" />}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//       ListEmptyComponent={
//         <View style={styles.emptyBox}>
//           <Text style={[styles.emptyTitle, isDark && { color: "#fff" }]}>No offers found</Text>
//           <Text style={[styles.emptyText, isDark && { color: "#cfd8dc" }]}>
//             Pull down to refresh or try different dates.
//           </Text>
//         </View>
//       }
//     />
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
//         <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
//         <View style={styles.centered}>
//           <ActivityIndicator size="large" />
//           <Text style={[styles.loadingText, isDark && { color: "#cfd8dc" }]}>Loading loan applications…</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
//       <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
//       <View style={styles.header}>
//         <Text style={[styles.heading, isDark && { color: "#fff" }]}>All Loan Offers</Text>
//         {phoneUsed && (
//           <View style={styles.phonePill}>
//             <Text style={styles.phonePillText}>Phone: {phoneUsed}</Text>
//           </View>
//         )}
//       </View>

//       {/* Tabs */}
//       <View style={tabs.tabBar}>
//         <TouchableOpacity
//           style={[tabs.tabBtn, activeTab === "recent" && tabs.tabBtnActive]}
//           onPress={() => setActiveTab("recent")}
//           activeOpacity={0.9}
//         >
//           <Text style={[tabs.tabText, activeTab === "recent" && tabs.tabTextActive]}>Recent Loan</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[tabs.tabBtn, activeTab === "history" && tabs.tabBtnActive]}
//           onPress={() => setActiveTab("history")}
//           activeOpacity={0.9}
//         >
//           <Text style={[tabs.tabText, activeTab === "history" && tabs.tabTextActive]}>History Loan</Text>
//         </TouchableOpacity>
//       </View>

//       {/* History filter controls */}
//       {activeTab === "history" && (
//         <View style={filter.wrap}>
//           <View style={filter.row}>
//             <TouchableOpacity style={filter.pill} onPress={() => setShowFromPicker(true)}>
//               <Text style={filter.pillLabel}>From</Text>
//               <Text style={filter.pillValue}>{formatHuman(fromDate)}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={filter.pill} onPress={() => setShowToPicker(true)}>
//               <Text style={filter.pillLabel}>To</Text>
//               <Text style={filter.pillValue}>{formatHuman(toDate)}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[filter.clearBtn, (!fromDate && !toDate) && { opacity: 0.5 }]}
//               onPress={() => {
//                 setFromDate(null);
//                 setToDate(null);
//               }}
//               disabled={!fromDate && !toDate}
//             >
//               <Text style={filter.clearText}>Clear</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Date pickers */}
//           {showFromPicker && (
//             <DateTimePicker
//               value={fromDate || new Date()}
//               mode="date"
//               display={Platform.OS === "ios" ? "spinner" : "default"}
//               onChange={(e, d) => {
//                 setShowFromPicker(Platform.OS === "ios");
//                 if (d) setFromDate(d);
//               }}
//               maximumDate={toDate || undefined}
//             />
//           )}
//           {showToPicker && (
//             <DateTimePicker
//               value={toDate || new Date()}
//               mode="date"
//               display={Platform.OS === "ios" ? "spinner" : "default"}
//               onChange={(e, d) => {
//                 setShowToPicker(Platform.OS === "ios");
//                 if (d) setToDate(d);
//               }}
//               minimumDate={fromDate || undefined}
//             />
//           )}
//         </View>
//       )}

//       {/* Lists */}
//       {activeTab === "recent" ? renderList(recentOffers) : renderList(historyOffers)}
//     </SafeAreaView>
//   );
// }

// // ---------- Styles ----------
// const ui = StyleSheet.create({
//   acard: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 16,
//     marginHorizontal: 12,
//     marginVertical: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 3,
//   },
//   badges: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
//   preApproved: {
//     backgroundColor: "#35B8E0",
//     color: "#fff",
//     fontSize: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 6,
//     overflow: "hidden",
//     fontWeight: "700",
//   },
//   rejected: {
//     backgroundColor: "#FF3B30",
//     color: "#fff",
//     fontSize: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 6,
//     overflow: "hidden",
//     fontWeight: "700",
//   },
//   title: { fontSize: 20, fontWeight: "800", marginBottom: 8, color: "#121212" },
//   infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   label: { fontSize: 13, color: "#2b3a67", fontWeight: "700" },
//   value: { fontSize: 18, fontWeight: "800", color: "#121212", marginTop: 2 },
//   chanceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
//   chanceValue: { color: "#0BAA4D", fontWeight: "800", fontSize: 16 },
//   cta: { backgroundColor: "#ff5722", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginBottom: 12 },
//   ctaDisabled: { backgroundColor: "#d9d9d9" },
//   ctaText: { color: "#fff", fontWeight: "900", letterSpacing: 0.5 },
//   footer: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#eaeaea", paddingTop: 10 },
//   detailText: { fontSize: 13, color: "#444", marginBottom: 2 },
// });

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f7f9fc" },
//   containerDark: { backgroundColor: "#0b0f14" },
//   centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
//   loadingText: { marginTop: 12, color: "#607d8b" },

//   header: {
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   heading: { fontSize: 20, fontWeight: "800", color: "#0b0f14" },

//   phonePill: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "#E8F6FF", borderRadius: 16 },
//   phonePillText: { fontSize: 12, color: "#0866A6", fontWeight: "600" },

//   listContainer: { padding: 8, paddingBottom: 16 },
//   emptyContainer: { flexGrow: 1, padding: 16, justifyContent: "center" },

//   separator: { height: 4 },

//   emptyBox: { alignItems: "center", borderRadius: 12, padding: 20, backgroundColor: "#f1f5f9", marginHorizontal: 16 },
//   emptyTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6, color: "#0b0f14" },
//   emptyText: { fontSize: 13, color: "#607d8b", textAlign: "center" },
// });

// const tabs = StyleSheet.create({
//   tabBar: {
//     flexDirection: "row",
//     paddingHorizontal: 12,
//     gap: 8,
//     marginBottom: 8,
//   },
//   tabBtn: {
//     flex: 1,
//     backgroundColor: "#e7edf3",
//     borderRadius: 12,
//     paddingVertical: 10,
//     alignItems: "center",
//   },
//   tabBtnActive: {
//     backgroundColor: "#0866A6",
//   },
//   tabText: {
//     fontWeight: "800",
//     color: "#1b2b3a",
//   },
//   tabTextActive: {
//     color: "#fff",
//   },
// });

// const filter = StyleSheet.create({
//   wrap: {
//     paddingHorizontal: 12,
//     paddingBottom: 8,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   pill: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   pillLabel: {
//     fontSize: 11,
//     color: "#6b7280",
//     marginBottom: 2,
//     fontWeight: "700",
//   },
//   pillValue: {
//     fontSize: 14,
//     fontWeight: "800",
//     color: "#0b0f14",
//   },
//   clearBtn: {
//     paddingVertical: 12,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     backgroundColor: "#ffe8e0",
//   },
//   clearText: {
//     fontWeight: "800",
//     color: "#ff5722",
//   },
// });




import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Alert,
  RefreshControl,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BASE_URL } from "../util/api_url";

type OfferRow = {
  id: string;
  name: string;
  status?: string;
  url?: string;
  interestRate?: string | number;
  emi?: string | number;
  chances?: string;
  maxAmount?: string | number;
  tenure?: string | number;
  reason?: string;
  updatedAt?: string;
};

const parseStoredPhone = (raw: any) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return parsed;
    if (parsed?.phoneNumber) return parsed.phoneNumber;
    if (parsed?.phone) return parsed.phone;
    return null;
  } catch {
    return raw;
  }
};

const safeHttpUrl = (u?: string) => {
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
};

const formatINR = (v?: string | number) => {
  if (v === undefined || v === null || v === "" || Number.isNaN(Number(v))) return "—";
  try {
    return new Intl.NumberFormat("en-IN").format(Number(v));
  } catch {
    return String(v);
  }
};

const isRejected = (status?: string) => String(status || "").toLowerCase().includes("reject");
const isPreApproved = (status?: string, url?: string) => !isRejected(status) && !!url;

// NEW: detect CASHe user exists case
const isCasheUserExists = (row: OfferRow) => {
  const nameHit = String(row.name || "").toLowerCase().includes("cashe");
  const statusHit = String(row.status || "").toLowerCase() === "cashe_user_exists";
  const reasonHit = String(row.reason || "").toLowerCase().includes("user already exist with cashe");
  return nameHit && (statusHit || reasonHit);
};

const explodeLoanDataStatus = (app: any): OfferRow[] => {
  const out: OfferRow[] = [];
  if (!app || typeof app !== "object") return out;

  const map = app.loanDataStatus;
  const updated = app.updatedAt || app.createdAt || app.timestamp || app.date || undefined;

  if (map && typeof map === "object") {
    const entries = Object.entries(map);
    for (const [rawName, val] of entries) {
      const name = String(rawName || "Lender");
      const isCashe = name.toLowerCase().includes("cashe");

      if (typeof val === "string") {
        const valLower = val.toLowerCase().trim();

        // NEW: special string path
        if (isCashe && valLower === "user already exist with cashe") {
          out.push({
            id: `${app.id ?? "app"}-${name}`,
            name,
            status: "cashe_user_exists",
            reason: "User Already Exist with Cashe",
            interestRate: app.interestRate ?? "—",
            emi: app.emi ?? "—",
            chances: app.chances ?? "Excellent",
            maxAmount: app.maxAmount ?? 500000,
            tenure: app.tenure ?? 60,
            updatedAt: updated,
          });
        } else {
          // default: treat string as URL
          out.push({
            id: `${app.id ?? "app"}-${name}`,
            name,
            status: "get_url",
            url: val,
            interestRate: app.interestRate ?? "—",
            emi: app.emi ?? "—",
            chances: app.chances ?? "Excellent",
            maxAmount: app.maxAmount ?? 500000,
            tenure: app.tenure ?? 60,
            updatedAt: updated,
          });
        }
      } else if (val && typeof val === "object") {
        const reason = val.reason ?? "";
        const reasonLower = String(reason).toLowerCase();

        out.push({
          id: `${app.id ?? "app"}-${name}`,
          name,
          // NEW: normalize status if object carries the special reason
          status:
            isCashe && reasonLower.includes("user already exist with cashe")
              ? "cashe_user_exists"
              : val.status ?? "unknown",
          url: typeof val.url === "string" ? val.url : undefined,
          interestRate: val.interestRate ?? app.interestRate ?? "—",
          emi: val.emi ?? app.emi ?? "—",
          chances: val.chances ?? app.chances ?? "Excellent",
          maxAmount: val.maxAmount ?? app.maxAmount ?? 500000,
          tenure: val.tenure ?? app.tenure ?? 60,
          reason,
          updatedAt: val.updatedAt || updated,
        });
      }
    }
  }

  return out;
};

// ---------- Date helpers ----------
const parseDate = (s?: string): Date | null => {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
};
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
const formatHuman = (d?: Date | null) => (d ? d.toDateString() : "—");

// ---------- Loan Card (with special CASHe UI) ----------
const LoanCard = ({
  item,
  onApply,
}: {
  item: OfferRow;
  onApply: (url?: string, lenderName?: string) => void;
}) => {
  const disabled = isRejected(item.status);
  const showPreApproved = isPreApproved(item.status, item.url);
  const showCasheExistUI = isCasheUserExists(item);

  // countdown state (null = idle, number = seconds remaining)
  const [countdown, setCountdown] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCountdown(null);
      onApply(item.url, item.name);
    }
  }, [countdown, item.name, item.url, onApply]);

  const startCountdown = () => {
    // NEW: block countdown when CASHe user exists
    if (disabled || countdown !== null || showCasheExistUI) return;
    setCountdown(5);
    intervalRef.current = setInterval(() => {
      setCountdown((s) => (typeof s === "number" ? s - 1 : s));
    }, 1000);
  };

  const isBusy = countdown !== null;

  return (
    <View style={ui.acard}>
      <View style={ui.badges}>
        {showPreApproved && <Text style={ui.preApproved}>Pre-Approved</Text>}
        {disabled && <Text style={ui.rejected}>Rejected</Text>}
      </View>

      <Text style={ui.title}>{item.name}</Text>

      <View style={ui.infoRow}>
        <View>
          <Text style={ui.label}>Interest Rate</Text>
          <Text style={ui.value}>
            {String(item.interestRate).includes("%") ? item.interestRate : `${item.interestRate}%`}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={ui.label}>EMI</Text>
          <Text style={ui.value}>₹ {formatINR(item.emi)}</Text>
        </View>
      </View>

      <View style={ui.chanceRow}>
        <Text style={ui.label}>Chances of Approval</Text>
        <Text style={ui.chanceValue}>{item.chances}</Text>
      </View>

      {/* NEW: special UI, no button */}
      {isCasheUserExists(item) ? (
        <View style={[ui.infoBanner]}>
          <Text style={ui.infoBannerTitle}>Already Registered with CASHe</Text>
          {item.reason ? <Text style={ui.infoBannerText}>{item.reason}</Text> : null}
        </View>
      ) : (
        <TouchableOpacity
          style={[ui.cta, (disabled || isBusy) && ui.ctaDisabled]}
          onPress={startCountdown}
          disabled={disabled || isBusy}
          activeOpacity={0.85}
        >
          <Text style={ui.ctaText}>
            {disabled ? "REJECTED" : isBusy ? `OPENING IN ${countdown}s` : "APPLY LOAN"}
          </Text>
        </TouchableOpacity>
      )}

      <View style={ui.footer}>
        {(disabled || isCasheUserExists(item)) && item.reason && (
          <Text style={[ui.detailText, { marginBottom: 4 }]}>Reason: {item.reason}</Text>
        )}
        <Text style={ui.detailText}>Maximum Loan Amount: ₹ {formatINR(item.maxAmount)}</Text>
        <Text style={ui.detailText}>Loan Tenure: {item.tenure} months</Text>
        {item.updatedAt && (
          <Text style={[ui.detailText, { marginTop: 4 }]}>
            Updated: {new Date(item.updatedAt).toLocaleString()}
          </Text>
        )}
      </View>
    </View>
  );
};

export default function LoanOffer() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [offers, setOffers] = useState<OfferRow[]>([]);
  const [phoneUsed, setPhoneUsed] = useState<string | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<"recent" | "history">("recent");

  // History date filter
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const navigation = useNavigation();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const fetchAllLoans = async () => {
    setLoading(true);
    try {
      const userRaw = await AsyncStorage.getItem("userData");
      const ph = parseStoredPhone(userRaw);
      setPhoneUsed(ph ?? null);

      const url = `${BASE_URL}/api/single-loan-application-mobile/${ph}`;
      const resp = await axios.get(url, { headers: { Accept: "application/json" } });

      const root = resp?.data?.data ?? resp?.data ?? {};
      let rows: OfferRow[] = [];

      if (Array.isArray(root)) {
        for (const app of root) rows.push(...explodeLoanDataStatus(app));
      } else if (root && typeof root === "object") {
        rows = explodeLoanDataStatus(root);
      }

      // sort newest first for nicer display
      rows.sort((a, b) => {
        const da = parseDate(a.updatedAt)?.getTime() ?? 0;
        const db = parseDate(b.updatedAt)?.getTime() ?? 0;
        return db - da;
      });

      setOffers(rows);
    } catch (e: any) {
      console.log("❌ all-loans fetch error:", e?.response?.data || e?.message);
      Alert.alert("Error", "Could not load loans.");
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllLoans();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAllLoans();
  }, []);

  const onApply = useCallback(
    async (rawUrl?: string, lenderName?: string) => {
      const isCashe = lenderName?.toLowerCase().includes("cashe");

      if (!isCashe) {
        const url = safeHttpUrl(rawUrl);
        if (!url) {
          Alert.alert("Unavailable", "No application link found.");
          return;
        }
        navigation.navigate("WebviewScreen" as never, { urlName: url } as never);
        return;
      }

      setTimeout(async () => {
        try {
          const userRaw = await AsyncStorage.getItem("userData");
          const parsed = JSON.parse(userRaw || "{}");

          console.log("CASHe login-url payload:", parsed);

          // 1) Get user ID from profile API
          const profileRes = await axios.get(`${BASE_URL}/api/otp/get-profile?phoneNumber=${parsed}`);

          console.log("CASHe login-url user id:", profileRes.data.id);

          const userId = profileRes.data.id;
          if (!userId) {
            Alert.alert("Error", "Unable to fetch user ID from profile.");
            return;
          }

          // 2) Send to CASHe API
          const api = `${BASE_URL}/api/partner/cashe/login-url`;
          const payload = {
            createToken: {
              phoneNumber: parsed,
              id: userId,
            },
          };

          const response = await axios.post(api, payload, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          console.log("CASHe login-url response:", response?.data);

          const loginUrl = response?.data?.data?.payLoad ?? response?.data?.payLoad ?? response?.data;

          if (!loginUrl) {
            Alert.alert("Error", "No CASHe login URL returned.");
            return;
          }

          const finalUrl = safeHttpUrl(loginUrl);
          navigation.navigate("WebviewScreen" as never, { urlName: finalUrl } as never);
        } catch (error: any) {
          console.log("❌ CASHe login-url error:", error?.response?.data || error?.message);
          Alert.alert("Error", "Could not prepare CASHe application link.");
        }
      }, 500); // 500 milliseconds
    },
    [navigation]
  );

  // ---------- Derived lists for tabs ----------
  const recentThreshold = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  })();

  const recentOffers = offers.filter((o) => {
    const d = parseDate(o.updatedAt);
    return d ? d >= recentThreshold : false;
  });

  const historyOffers = offers.filter((o) => {
    const d = parseDate(o.updatedAt);
    if (!d) return false;
    if (fromDate && d < startOfDay(fromDate)) return false;
    if (toDate && d > endOfDay(toDate)) return false;
    return true;
  });

  const renderList = (data: OfferRow[]) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <LoanCard item={item} onApply={onApply} />}
      contentContainerStyle={data.length ? styles.listContainer : styles.emptyContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ff5722" />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.emptyBox}>
          <Text style={[styles.emptyTitle, isDark && { color: "#fff" }]}>No offers found</Text>
          <Text style={[styles.emptyText, isDark && { color: "#cfd8dc" }]}>
            Pull down to refresh or try different dates.
          </Text>
        </View>
      }
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text style={[styles.loadingText, isDark && { color: "#cfd8dc" }]}>
            Loading loan applications…
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <Text style={[styles.heading, isDark && { color: "#fff" }]}>All Loan Offers</Text>
        {phoneUsed && (
          <View style={styles.phonePill}>
            <Text style={styles.phonePillText}>Phone: {phoneUsed}</Text>
          </View>
        )}
      </View>

      {/* Tabs */}
      <View style={tabs.tabBar}>
        <TouchableOpacity
          style={[tabs.tabBtn, activeTab === "recent" && tabs.tabBtnActive]}
          onPress={() => setActiveTab("recent")}
          activeOpacity={0.9}
        >
          <Text style={[tabs.tabText, activeTab === "recent" && tabs.tabTextActive]}>Recent Loan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[tabs.tabBtn, activeTab === "history" && tabs.tabBtnActive]}
          onPress={() => setActiveTab("history")}
          activeOpacity={0.9}
        >
          <Text style={[tabs.tabText, activeTab === "history" && tabs.tabTextActive]}>History Loan</Text>
        </TouchableOpacity>
      </View>

      {/* History filter controls */}
      {activeTab === "history" && (
        <View style={filter.wrap}>
          <View style={filter.row}>
            <TouchableOpacity style={filter.pill} onPress={() => setShowFromPicker(true)}>
              <Text style={filter.pillLabel}>From</Text>
              <Text style={filter.pillValue}>{formatHuman(fromDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={filter.pill} onPress={() => setShowToPicker(true)}>
              <Text style={filter.pillLabel}>To</Text>
              <Text style={filter.pillValue}>{formatHuman(toDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[filter.clearBtn, (!fromDate && !toDate) && { opacity: 0.5 }]}
              onPress={() => {
                setFromDate(null);
                setToDate(null);
              }}
              disabled={!fromDate && !toDate}
            >
              <Text style={filter.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Date pickers */}
          {showFromPicker && (
            <DateTimePicker
              value={fromDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, d) => {
                setShowFromPicker(Platform.OS === "ios");
                if (d) setFromDate(d);
              }}
              maximumDate={toDate || undefined}
            />
          )}
          {showToPicker && (
            <DateTimePicker
              value={toDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, d) => {
                setShowToPicker(Platform.OS === "ios");
                if (d) setToDate(d);
              }}
              minimumDate={fromDate || undefined}
            />
          )}
        </View>
      )}

      {/* Lists */}
      {activeTab === "recent" ? renderList(recentOffers) : renderList(historyOffers)}
    </SafeAreaView>
  );
}

// ---------- Styles ----------
const ui = StyleSheet.create({
  acard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  badges: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  preApproved: {
    backgroundColor: "#35B8E0",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
    fontWeight: "700",
  },
  rejected: {
    backgroundColor: "#FF3B30",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
    fontWeight: "700",
  },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 8, color: "#121212" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  label: { fontSize: 13, color: "#2b3a67", fontWeight: "700" },
  value: { fontSize: 18, fontWeight: "800", color: "#121212", marginTop: 2 },
  chanceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  chanceValue: { color: "#0BAA4D", fontWeight: "800", fontSize: 16 },

  cta: { backgroundColor: "#ff5722", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  ctaDisabled: { backgroundColor: "#d9d9d9" },
  ctaText: { color: "#fff", fontWeight: "900", letterSpacing: 0.5 },

  // NEW: info banner (replaces button for CASHe user exists)
  infoBanner: {
    backgroundColor: "#FFE8E0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FFD0C2",
  },
  infoBannerTitle: {
    fontWeight: "900",
    fontSize: 14,
    color: "#FF5722",
    marginBottom: 2,
  },
  infoBannerText: {
    fontSize: 12,
    color: "#7a4a3a",
    fontWeight: "600",
  },

  footer: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#eaeaea", paddingTop: 10 },
  detailText: { fontSize: 13, color: "#444", marginBottom: 2 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc" },
  containerDark: { backgroundColor: "#0b0f14" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  loadingText: { marginTop: 12, color: "#607d8b" },

  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: { fontSize: 20, fontWeight: "800", color: "#0b0f14" },

  phonePill: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "#E8F6FF", borderRadius: 16 },
  phonePillText: { fontSize: 12, color: "#0866A6", fontWeight: "600" },

  listContainer: { padding: 8, paddingBottom: 16 },
  emptyContainer: { flexGrow: 1, padding: 16, justifyContent: "center" },

  separator: { height: 4 },

  emptyBox: { alignItems: "center", borderRadius: 12, padding: 20, backgroundColor: "#f1f5f9", marginHorizontal: 16 },
  emptyTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6, color: "#0b0f14" },
  emptyText: { fontSize: 13, color: "#607d8b", textAlign: "center" },
});

const tabs = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 8,
  },
  tabBtn: {
    flex: 1,
    backgroundColor: "#e7edf3",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabBtnActive: {
    backgroundColor: "#0866A6",
  },
  tabText: {
    fontWeight: "800",
    color: "#1b2b3a",
  },
  tabTextActive: {
    color: "#fff",
  },
});

const filter = StyleSheet.create({
  wrap: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pill: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  pillLabel: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 2,
    fontWeight: "700",
  },
  pillValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0b0f14",
  },
  clearBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#ffe8e0",
  },
  clearText: {
    fontWeight: "800",
    color: "#ff5722",
  },
});
