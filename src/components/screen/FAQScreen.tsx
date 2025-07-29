import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    FlatList,
} from "react-native";

const faqs = [
  {
    id: "1",
    question: "Is Credit Circle a lender?",
    answer: "No. Credit Circle is not a lender. We are a platform that helps you compare personal loan offers from multiple trusted banks and NBFCs."
  },
  {
    id: "2",
    question: "Will checking my loan eligibility affect my credit score?",
    answer: "No. Checking eligibility on Credit Circle uses a soft check and does not impact your credit score."
  },
  {
    id: "3",
    question: "Is the service free to use?",
    answer: "Yes. Using Credit Circle to compare loan offers and check your eligibility is completely free."
  },
  {
    id: "4",
    question: "What documents do I need to apply for a personal loan?",
    answer: "You typically need:\n- PAN Card\n- Aadhaar Card or address proof\n- Bank statements (last 3–6 months)\n- Salary slips or proof of income"
  },
  {
    id: "5",
    question: "How is my data stored and is it secure?",
    answer: "Your data is stored on secure servers in India and protected using encryption and best practices. We never sell your data."
  },
  {
    id: "6",
    question: "Who are your lending partners?",
    answer: "We work with leading banks and NBFCs across India. Specific partners may vary depending on your eligibility and location."
  },
  {
    id: "7",
    question: "Can I apply for multiple loans at once?",
    answer: "We recommend applying to one lender at a time to avoid multiple hard inquiries on your credit report."
  },
  {
    id: "8",
    question: "Are there any hidden charges?",
    answer: "No. Credit Circle doesn’t charge you anything. However, individual lenders may levy processing fees or other charges, which will be disclosed during your application."
  },
  {
    id: "9",
    question: "I'm self-employed. Can I still use Credit Circle?",
    answer: "Yes. Self-employed individuals can also check offers, though eligibility and document requirements may vary by lender."
  },
  {
    id: "10",
    question: "How do I contact customer support?",
    answer: "You can reach our support team via the in-app chat or email us at support@creditcircle.in"
  }
];


const FAQScreen = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleExpand = (id) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>We’re here to help you with anything and everything on ViralPitch</Text>
            <Text style={styles.subtitle}>
                At Viral Pitch, we expect at a day’s start is you, better and happier
                than yesterday. We have got you covered share your concern or check our
                frequently asked questions listed below.
            </Text>
            <TextInput
                style={styles.searchBox}
                placeholder="Search Help"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <Text style={styles.faqTitle}>FAQ</Text>
            <FlatList
                data={filteredFaqs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.faqItem}>
                        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                            <View style={styles.questionRow}>
                                <Text style={styles.questionText}>{item.question}</Text>
                                <Text style={styles.toggleSymbol}>{expandedId === item.id ? "-" : "+"}</Text>
                            </View>
                        </TouchableOpacity>
                        {expandedId === item.id && (
                            <Text style={styles.answerText}>{item.answer}</Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
    },
    searchBox: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    faqTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 10,
    },
    questionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    questionText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    toggleSymbol: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    answerText: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
});

export default FAQScreen;
