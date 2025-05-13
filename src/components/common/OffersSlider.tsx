// import React, { useEffect, useState } from "react";
// import { ScrollView, Image, StyleSheet, Alert, View, TouchableOpacity } from "react-native";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native"; // ✅ Import navigation hook
// import { BASE_URL } from "../util/api_url";

// const DEALS_API_URL = `${BASE_URL}/api/offer/offer`;

// const OffersSlider = () => {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation(); // ✅ Get navigation object

//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   const fetchOffers = async () => {
//     try {
//       const response = await axios.get(DEALS_API_URL);
//       if (response.data.success && Array.isArray(response.data.offers)) {
//         setOffers(response.data.offers);
//         console.log("Offers fetched successfully:", response.data.offers);
//       } else {
//         Alert.alert("Error", "Invalid response from server");
//       }
//     } catch (error) {
//       console.error("❌ Error fetching offers:", error);
//       Alert.alert("Error", "Failed to fetch offers. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getImageUrl = (item) => {
//     const imagePath = item.offerImage?.mobile;
//     console.log("Image path:", imagePath); // Debug log
//     if (!imagePath) return null;
//     return imagePath.startsWith("http") ? imagePath : `${BASE_URL}${imagePath}`;
//   };

//   const handleOfferPress = (offer) => {
//     navigation.navigate("DealDetail", { offer }); // ✅ Navigate and pass offer as param
//   };

//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
//       {Array.isArray(offers) &&
//         offers.map((item, index) => {
//           const imageUrl = getImageUrl(item);
//           if (!imageUrl) return null;
//           console.log("Image URL:", imageUrl); // Debug log 

//           return (
//             <TouchableOpacity
//               key={item.id || index}
//               onPress={() => handleOfferPress(item)}
//               activeOpacity={0.8}
//             >
//               <View style={styles.recommendedCard}>
//                 <Image
//                   source={{ uri: imageUrl }}
//                   style={styles.recommendedImage}
//                   resizeMode="cover"
//                   width={300}
//                   height={150}  
//                 />
//               </View>
//             </TouchableOpacity>
//           );
//         })}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 0,
//     marginTop: 10,
//   },
//   recommendedCard: {
//     width: 300,
//     height: 150,
//     marginRight: 10,
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#ccc",
//   },
//   recommendedImage: {
//     width: "100%",
//     height: "100%",
//   },
// });

// export default OffersSlider;




import React, { useEffect, useState } from "react";
import { ScrollView, Image, StyleSheet, Alert, View, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../util/api_url";
import { ThemedText } from "../ThemedText";

const DEALS_API_URL = `${BASE_URL}/api/offer/offer`;

const OffersSlider = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(DEALS_API_URL);
      if (response.data.success && Array.isArray(response.data.offers)) {
        setOffers(response.data.offers);
      } else {
        Alert.alert("Error", "Invalid response from server");
      }
    } catch (error) {
      console.error("❌ Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (item) => {
    const imagePath = item.offerBanner?.banner;
    if (!imagePath) return null;
    return imagePath.startsWith("http") ? imagePath : `${BASE_URL}${imagePath}`;
  };

  const handleOfferPress = (offer) => {
    navigation.navigate("DealDetail", { offer });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {Array.isArray(offers) &&
        offers
          .filter((item) => item.isHome) // ✅ Show only offers with isHome = true
          .map((item, index) => {
            const imageUrl = getImageUrl(item);
            if (!imageUrl) return null;

            return (
              <TouchableOpacity
                key={item.id || index}
                onPress={() => handleOfferPress(item)}
                activeOpacity={0.8}
              >
                <View style={styles.recommendedCard}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.recommendedImage}
                    resizeMode="cover"
                  />
                  
                </View>
              </TouchableOpacity>
            );
          })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginTop: 10,
    
  },
  recommendedCard: {
    width: 150,
    height: 280,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ccc",
  },
  recommendedImage: {
    width: "100%",
    height: 280,
    resizeMode:"contain",
  },
});

export default OffersSlider;
