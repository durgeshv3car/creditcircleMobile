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

// import Banner1 from "../../assets/slider/Banner1.png";
import EMICalculator from "./loanEMICalculater";
import { ThemedView } from "../ThemedView";
import { ThemedHeadingText, ThemedText } from "../ThemedText";
// import MoneySmart from "./MoneySmart";
// import { useNavigation } from "@react-navigation/native";
// import HeroSlider from "../common/HeroSlider";
import BannerSlider from "../common/BannerSlider";
import PartnerLogo from "../common/partnerLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MoneySmart } from "./MoneySmart";
import { ThemeContext } from "@react-navigation/native";
import InviteBanner from "./Refer";
import OffersSlider from "../common/OffersSlider";
import appStyle from "@/AppStyles";
import Ads from "../common/ads";


// import MoneySmart from "./MoneySmart";

const HomeScreen = ({ navigation }) => {
   
  // const banners = [
  //   { id: 1, image: Banner1 },
  //   { id: 2, image: Banner1 },
  //   { id: 3, image: Banner1 },
  // ];

  const [score, setScore] = useState(300);

  useEffect(() => {
    // Alert.alert(
    //   "Welcome to MoneySmart",
    //   "Get the best financial advice and services at your fingertips."
    // );

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



  const theme = Appearance.getColorScheme();


  const imagecoleor = {
    tintColor: theme === 'dark' ? "#ffffff" : "#273283"
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {/* Banners */}
        <ThemedView>
        <BannerSlider></BannerSlider>
        </ThemedView>
       

        {/* Credit Score */}
        <ThemedView>
          <CreditScoreMeter
            score={score}
            previousScore={600}
            // onCheckScore={() => {}}
             onCheckScore={async () => {
    try {

      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch('http://creditcircle.ap-south-1.elasticbeanstalk.com/api/credit-score-url', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      });
  // const response = await fetch('http://creditcircle.ap-south-1.elasticbeanstalk.com/api/credit-score-url');

      const json = await response.json();

      console.log('Response JSON:', json);

      if (json?.data?.[0]?.companyUrl) {
        navigation.navigate('WebviewScreen', { urlName: json.data[0].companyUrl });
      } else {
        console.warn('No company URL found');
      }
    } catch (error) {
      console.error('Failed to fetch credit score URL', error);
    }
  }}
          />
        </ThemedView> 

        {/* Loan and Credit Options */}




        {/* Loan and Credit Options */}
        <ThemedView style={styles.optionsSection}>

          <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <ThemedHeadingText style={appStyle.sectionTitle}>Loan & Credit</ThemedHeadingText>
            <ThemedView style={appStyle.homeAppiconLine}></ThemedView>
          </ThemedView>

          <ThemedView style={styles.optionsRow}>
            <TouchableOpacity style={styles.optionCard} onPress={async() => 
              
               {
                await AsyncStorage.setItem('loanType', 'PersonalLoan'); // Store the loan type in AsyncStorage
                navigation.navigate("PersonalDetailsOne")
              }}>
              
              <View style={appStyle.iconContainer}>
              <Image source={require("../../assets/icons/H-Personal-Loan.png")} style={[imagecoleor, appStyle.homeAppicon]}></Image>
              </View>
              <ThemedText style={appStyle.planalFontsize}>Personal Loan</ThemedText>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate("PersonalDetailsOne")}>
              <Image source={require("../../assets/icons/H-BusinessLoan.png")} style={[imagecoleor, { width: 24, height: 24, marginBottom: 4 }]}></Image>
              <ThemedText>Business Loan</ThemedText>
            </TouchableOpacity> */}
            <TouchableOpacity
  style={styles.optionCard}
  onPress={async () => {
    await AsyncStorage.setItem('loanType', 'BusinessLoan'); // Store the loan type in AsyncStorage
    navigation.navigate("PersonalDetailsOne");
  }}
>
<View style={appStyle.iconContainer}>
  <Image
    source={require("../../assets/icons/H-BusinessLoan.png")}
    style={[imagecoleor, appStyle.homeAppicon]}
  />
</View>
  <ThemedText style={appStyle.planalFontsize}>Business Loan</ThemedText>
</TouchableOpacity>
<TouchableOpacity
  style={styles.optionCard}
  onPress={async () => {
    await AsyncStorage.setItem('loanType', 'CreditCard'); // Store the loan type
    // navigation.navigate("QuickListing");
    navigation.navigate("QuickListing", { investmentType: 'creditcard' });
  }}
>
<View style={appStyle.iconContainer}>
  <Image
    source={require("../../assets/icons/h-CreditCard.png")}
    style={[imagecoleor, appStyle.homeAppicon ]}
  />
  </View>
  <ThemedText style={appStyle.planalFontsize}>Credit Card</ThemedText>
</TouchableOpacity>
          </ThemedView>
        </ThemedView>


        {/* Loan and Credit Options */}
        <ThemedView style={styles.optionsSection}>

          <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <ThemedHeadingText style={appStyle.sectionTitle}>Investment</ThemedHeadingText>
            <ThemedView style={appStyle.homeAppiconLine}></ThemedView>
          </ThemedView>

          <ThemedView style={styles.optionsRow}>
  <TouchableOpacity
    style={styles.optionCard}
    onPress={async () => {
      await AsyncStorage.setItem('loanType', 'PersonalLoan'); // Store the loan type in AsyncStorage
      // navigation.navigate("QuickListing");
      navigation.navigate("QuickListing", { investmentType: 'incomeplan' });
    }}
  >
    <View style={appStyle.iconContainer}>
    <Image
      source={require("../../assets/icons/4.png")}
      style={[imagecoleor, { width: 26, height: 26 }]}
    />
    </View>
    <ThemedText style={appStyle.planalFontsize}>Income Plans</ThemedText>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.optionCard}
    onPress={async () => {
      await AsyncStorage.setItem('loanType', 'PersonalLoan'); // Store the loan type in AsyncStorage
      // navigation.navigate("QuickListing");
      navigation.navigate("QuickListing", { investmentType: 'stockmarket' });
    }}
  >
     <View style={appStyle.iconContainer}>
    <Image
      source={require("../../assets/icons/5.png")}
      style={[imagecoleor, { width: 24, height: 24, marginBottom: 4 }]}
    />
    </View>
    <ThemedText style={appStyle.planalFontsize}>Stock Market</ThemedText>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.optionCard}
    onPress={async () => {
      await AsyncStorage.setItem('loanType', 'PersonalLoan'); // Store the loan type in AsyncStorage
      // navigation.navigate("QuickListing");
      navigation.navigate("QuickListing", { investmentType: 'mutualfund' });
    }}
  >
     <View style={appStyle.iconContainer}>
    <Image
      source={require("../../assets/icons/6.png")}
      style={[imagecoleor, { width: 26, height: 26 }]}
    />
    </View>
    <ThemedText style={appStyle.planalFontsize}>Mutual Funds</ThemedText>
  </TouchableOpacity>
</ThemedView>

        </ThemedView>

        


        <ThemedView style={styles.optionsSection}>

        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <ThemedHeadingText style={appStyle.sectionTitle}>Insurance</ThemedHeadingText>
            <ThemedView style={appStyle.homeAppiconLine}></ThemedView>
          </ThemedView>

<ThemedView style={styles.optionsRow}>
<TouchableOpacity style={styles.optionCard}
onPress={async () => {
  await AsyncStorage.setItem('loanType', 'PersonalLoan'); // Store the loan type in AsyncStorage
// navigation.navigate("QuickListing");
navigation.navigate("QuickListing", { investmentType: 'healthinsurance' });
}}
>
<View style={appStyle.iconContainer}>
              <Image source={require("../../assets/icons/7.png")} style={[imagecoleor, { width: 24, height: 24 }]}></Image>
              </View>
              <ThemedText style={appStyle.planalFontsize}>Health Insurance</ThemedText>
</TouchableOpacity>

<TouchableOpacity
style={styles.optionCard}
onPress={async () => {
  await AsyncStorage.setItem('loanType', 'PersonalLoan'); // Store the loan type in AsyncStorage
// navigation.navigate("QuickListing");
navigation.navigate("QuickListing", { investmentType: 'lifeinsurance' });
}}
>
<View style={appStyle.iconContainer}>
              <Image source={require("../../assets/icons/8.png")} style={[imagecoleor, { width: 24, height: 24, marginBottom: 4 }]}></Image>
              </View>
              <ThemedText style={appStyle.planalFontsize}>Life Insurance</ThemedText>
</TouchableOpacity>

<TouchableOpacity
style={styles.optionCard}
onPress={async () => {
  await AsyncStorage.setItem('loanType', 'PersonalLoan'); // Store the loan type in AsyncStorage
// navigation.navigate("QuickListing");
navigation.navigate("QuickListing", { investmentType: 'carinsurance' });
}}
>
<View style={appStyle.iconContainer}>
              <Image source={require("../../assets/icons/9.png")} style={[imagecoleor, { width: 26, height: 26 }]}></Image>
              </View>
              <ThemedText style={appStyle.planalFontsize}>Car Insurance</ThemedText>
</TouchableOpacity>
</ThemedView>

</ThemedView>


        <EMICalculator />

        {/* Recommended Section */}
       
        <ThemedView style={styles.recommendedSection}>
          <ThemedHeadingText style={appStyle.sectionTitle}>
            Offers
          </ThemedHeadingText>

<OffersSlider/>

        </ThemedView>


        <MoneySmart limit={4} />

        {/* Invite & Earn */}
        <ThemedView style={styles.inviteSection}>
          <ThemedHeadingText  style={[appStyle.sectionTitle, { marginBottom: -20 }]}>
            Invite & Earn
          </ThemedHeadingText>
          <InviteBanner/>
        </ThemedView>


        {/* <MoneySmartListing data={gridData.slice(0, 4)} /> */}


        

        {/* <ThemedView style={styles.inviteSection}>


        {/* Lending Partners */}
        <ThemedView >
          <View>
            {/* <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              numColumns={4}
              scrollEnabled={false} // Fix for nested FlatList inside ScrollView
              contentContainerStyle={styles.BrandLogo}
            /> */}

<PartnerLogo></PartnerLogo>

          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
 
  // image: { width: '100%', height: 140, resizeMode: 'stretch', borderRadius: 10 },


  // BrandLogo: {
  //   flex: 1,
  //   justifyContent: 'space-between',
  //   flexDirection: 'row',
  // },


  // dot: {
  //   backgroundColor: 'rgba(0,0,0,.2)', // Inactive dot color
  //   width: 20,
  //   height: 2,
  //   borderRadius: 5,
  //   marginHorizontal: 5,
  // },
  // activeDot: {
  //   backgroundColor: '#007bff', // Active dot color
  //   width: 30,
  //   height: 3,
  //   borderRadius: 6,
  // },

  header: { flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "#f8f8f8" },
  logo: { fontSize: 18, fontWeight: "bold" },
  notifications: { backgroundColor: "#ff0000", borderRadius: 15, padding: 5 },
  notificationText: { color: "#fff", fontWeight: "bold" },
  creditScoreSection: { alignItems: "center", padding: 20 },
  creditScoreLabel: { fontSize: 40, fontWeight: "bold", color: "#4caf50" },
  creditScoreStatus: { fontSize: 16, color: "#555" },
  checkCreditButton: { marginTop: 10, backgroundColor: "#007bff", padding: 10, borderRadius: 5 },
  checkCreditText: { color: "#fff" },
  optionsSection: { padding: 20 },

  optionsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 0 },
  optionCard: { borderRadius: 5, alignItems: "center", height: 50, marginTop: 16, justifyContent: 'space-between' },
  emiCalculatorSection: { padding: 20 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginVertical: 5, borderRadius: 5 },
  emiButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, alignItems: "center" },
  emiButtonText: { color: "#fff" },
  recommendedSection: { paddingHorizontal: 18},
  recommendedCard: { marginRight: 10 },
  recommendedImage: { width: 150, height: 270, borderRadius: 5 },
  inviteSection: { padding: 20, paddingTop:10, paddingBottom:10 },
  inviteImage: { width: "100%", height: 150, borderRadius: 10, resizeMode: 'contain' },

  partnerLogo: { width: 80, height: 80, borderRadius: 50, }
});

export default HomeScreen;
