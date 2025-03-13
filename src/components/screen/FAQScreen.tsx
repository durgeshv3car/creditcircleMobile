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
    { id: "1", question: "What is Viral Pitch?", answer: "Viral Pitch is a platform to ..." },
    { id: "2", question: "How to apply for a campaign?", answer: "To apply for a campaign, you need to ..." },
    { id: "3", question: "How to know status of a campaign?", answer: "To check the status of a campaign ..." },
    // Add more FAQs as needed
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
