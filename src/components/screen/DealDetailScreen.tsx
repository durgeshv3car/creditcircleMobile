import appStyle from '@/AppStyles';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

const DealDetailScreen = ({ route, navigation }) => {
  const { offer } = route.params;

  // console.log('DealDetailScreen offer:', offer); // Debug log

  return (
    <View style={appStyle.gstcraeccontainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: offer.offerBanner?.banner }} style={styles.image} />
        <Text style={[styles.title, appStyle.detailston]}>{offer.title}</Text>
        <Text style={[styles.category, appStyle.detailston]}>{offer.category}</Text>
        <Text style={[styles.description, appStyle.detailston]}>{offer.description}</Text>
        <Text style={[styles.description, appStyle.detailston]}>
          {/* <RenderHTML source={{ html: offer.detailDescription || '' }}/> */}

<RenderHTML
  source={{ html: offer.detailDescription || '' }}
  tagsStyles={{
    p: appStyle.commonStyle,
    div: appStyle.commonStyle,
    span: appStyle.commonStyle,
    li: appStyle.commonStyle,
    ol: appStyle.commonStyle,
    ul: appStyle.commonStyle,
    h1: { ...appStyle.commonStyle, fontSize: 20 },
    h2: { ...appStyle.commonStyle, fontSize: 18 },
    h3: { ...appStyle.commonStyle, fontSize: 16 },
    // etc.
  }}></RenderHTML>

          </Text>
      </ScrollView>

      {offer.buttonType !== '' && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WebviewScreen', { urlName: offer.redirectUrl })
          }
          style={styles.bottomButton}
        >
          <View style={styles.buttoncon}>
          <Text style={styles.buttonText}>{offer.buttonType==null ? "Get Offer" : offer.buttonType}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  scrollContainer: {
    padding: 16,
    paddingBottom: 100, // Makes room for fixed button
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
      resizeMode: 'contain'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
 
  },
  buttoncon:{
    width: '90%',
    marginVertical: 10,
    margin: 'auto',
    backgroundColor: '#FF4800',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
 
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DealDetailScreen;
