import appStyle from '@/AppStyles';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import RenderHTML from 'react-native-render-html';

const MoneySmartDetail = ({ route }) => {
  const { item } = route.params;

  console.log('Detail Page Item:', item); // ✅ Debug log

  return (
    <View style={appStyle.gstcraeccontainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: item.offerImage?.mobile }}
          style={styles.image}
          resizeMode="cover"
          onError={() => console.log('Image failed to load:', item.mobileUrl)}
        />
        <Text style={[styles.title, appStyle.moneysmarttitle]}>{item.title}</Text>
        <Text style={[styles.description, appStyle.moneysmarttitle]}>{item.description}</Text>
          <View>
               <RenderHTML
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
  }}
            source={{ html: item.detailDescription || 'No description provided.' }}
          />
          </View>
    
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
 image: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#eee', // fallback if image fails
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default MoneySmartDetail;
