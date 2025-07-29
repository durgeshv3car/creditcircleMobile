import appStyle from '@/AppStyles';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';


const NotAvailable = ({ title = 'Data not available', uris }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  console.log('NotAvailable component rendered with title:', uris); // Debug log

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.container, appStyle.gstcraeccontainer]}>
      <Animated.View style={[styles.shadowWrapper, { opacity: fadeAnim }]}>
        <View style={styles.card}>
        
        

<Image
              style={styles.not_available}
              source={require('../../assets/images/not_available.png')}
            />
          <Text style={styles.text}>{title}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default NotAvailable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  shadowWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginVertical: 16,
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },

  not_available: {
    width: 250,
    height: 250,
    borderRadius: 12,}
});
