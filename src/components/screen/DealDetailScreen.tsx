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

  console.log('DealDetailScreen offer:', offer.buttonType); // Debug log

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: offer.offerImage?.web }} style={styles.image} />
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.category}>{offer.category}</Text>
        <Text style={styles.description}>{offer.description}</Text>
        <Text style={styles.description}>
          {/* {offer.detailDescription} */}
          <RenderHTML
  source={{ html: offer.detailDescription || '' }}
/>
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
          <Text style={styles.buttonText}>{offer.buttonType}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100, // Makes room for fixed button
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
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
