import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Appearance,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import { CreditScoreMeter } from "./score";

import Banner1 from "../../assets/slider/Banner1.png";
import EMICalculator from "./loanEMICalculater";
import { ThemedView } from "../ThemedView";
import { ThemedHeadingText, ThemedText } from "../ThemedText";
import MoneySmart from "./MoneySmart";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const banners = [
    { id: 1, image: Banner1 },
    { id: 2, image: Banner1 },
    { id: 3, image: Banner1 },
  ];

  const [score, setScore] = useState(300);

  useEffect(() => {
    Alert.alert(
      "Welcome to MoneySmart",
      "Get the best financial advice and services at your fingertips."
    );

    let currentScore = 300;
    const maxScore = 900;
    const increment = 10;
    const intervalTime = 10;
    let interval;

    const incrementScore = () => {
      if (currentScore < maxScore) {
        currentScore += increment;
        setScore(currentScore);
      } else {
        clearInterval(interval);
        setTimeout(() => setScore(300), 2000);
      }
    };

    interval = setInterval(incrementScore, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const data = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

  const renderItem = () => (
    <Image
      source={{ uri: "https://via.placeholder.com/50" }}
      style={styles.partnerLogo}
    />
  );

  const theme = Appearance.getColorScheme();

  const imageColor = {
    tintColor: theme === "dark" ? "#ffffff" : "#273283",
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {/* Banners */}
        <ThemedView style={styles.bannerContainer}>
          <Swiper
            autoplay
            autoplayTimeout={4}
            loop
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            style={{ height: 180 }}
          >
            {banners.map((banner) => (
              <ThemedView key={banner.id}>
                <Image
                  source={
                    typeof banner.image === "string"
                      ? { uri: banner.image }
                      : banner.image
                  }
                  style={styles.image}
                />
              </ThemedView>
            ))}
          </Swiper>
        </ThemedView>

        {/* Credit Score */}
        <ThemedView>
          <CreditScoreMeter
            score={score}
            previousScore={300}
            onCheckScore={() => {}}
          />
        </ThemedView>

        {/* Loan and Credit Options */}
        <ThemedView style={styles.optionsSection}>
          <ThemedView style={styles.row}>
            <ThemedHeadingText style={styles.sectionTitle}>
              Loan & Credit
            </ThemedHeadingText>
            <ThemedView style={styles.line} />
          </ThemedView>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => navigation.navigate("PersonalDetailsOne")}
            >
              <Image
                source={require("../../assets/icons/H-Personal-Loan.png")}
                style={[imageColor, styles.optionIcon]}
              />
              <ThemedText>Personal Loan</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionCard}>
              <Image
                source={require("../../assets/icons/H-BusinessLoan.png")}
                style={[imageColor, styles.optionIcon]}
              />
              <ThemedText>Business Loan</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionCard}>
              <Image
                source={require("../../assets/icons/h-CreditCard.png")}
                style={[imageColor, styles.optionIcon]}
              />
              <ThemedText>Credit Card</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* EMI Calculator */}
        <EMICalculator />

        {/* Recommended Section */}
        <ThemedView style={styles.recommendedSection}>
          <ThemedHeadingText style={styles.sectionTitle}>
            Recommended for you
          </ThemedHeadingText>
          <ScrollView horizontal>
            {[1, 2, 3].map((item) => (
              <ThemedView key={item} style={styles.recommendedCard}>
                <Image
                  source={require("../../assets/slider/AbsBanner.png")}
                  style={styles.recommendedImage}
                />
              </ThemedView>
            ))}
          </ScrollView>
        </ThemedView>

        {/* Invite & Earn */}
        <ThemedView style={styles.inviteSection}>
          <ThemedHeadingText style={styles.sectionTitle}>
            Invite & Earn
          </ThemedHeadingText>
          <Image
            source={require("../../assets/slider/banner_inviteandEarn.png")}
            style={styles.inviteImage}
          />
        </ThemedView>

        {/* Lending Partners */}
        <ThemedView style={styles.partnersSection}>
          <ThemedHeadingText style={styles.sectionTitle}>
            Our Lending Partners
          </ThemedHeadingText>
          <View>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              numColumns={4}
              scrollEnabled={false} // Fix for nested FlatList inside ScrollView
              contentContainerStyle={styles.BrandLogo}
            />
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  bannerContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },

  image: {
    width: "100%",
    height: 140,
    resizeMode: "stretch",
    borderRadius: 10,
  },

  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 20,
    height: 2,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: "#007bff",
    width: 30,
    height: 3,
    borderRadius: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  line: {
    flex: 1,
    backgroundColor: "#DDE1FF",
    height: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  optionCard: {
    alignItems: "center",
    marginTop: 16,
    justifyContent: "center",
  },

  optionIcon: {
    width: 30,
    height: 30,
  },

  recommendedCard: {
    marginRight: 10,
  },

  recommendedImage: {
    width: 150,
    height: 270,
    borderRadius: 5,
  },

  inviteImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },

  partnerLogo: {
    width: 50,
    height: 50,
    margin: 10,
  },
});

export default HomeScreen;
