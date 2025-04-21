import {
  Image,
  StyleSheet,
  View,
  Appearance,
  Pressable,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import React from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedHeadingText } from '../ThemedText';
import { useNavigation } from '@react-navigation/native';
import appStyle from '@/AppStyles';

const CustomFormHeader = ({ titleName, step }) => {
  const navigation = useNavigation();
  const theme = Appearance.getColorScheme();

  const dynamicStyles = {
    backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
  };

  const imageColor = {
    tintColor: theme === 'dark' ? '#ffffff' : undefined,
  };

  return (
    <SafeAreaView style={[dynamicStyles]}>
      <ThemedView style={[styles.container, dynamicStyles]}>
        <Image
          style={[styles.tinyLogo, imageColor ]}
          source={require('../../assets/images/logo-full-width.png')}
        />

        <View style={appStyle.HeaderBar}>
          <Pressable
            style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
            onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
          >
            <Image
              source={require('../../assets/icons/backarrow.png')}
              style={[imageColor, { width: 20, height: 20 }]}
            />
            <ThemedHeadingText style={{ fontSize: 12 }}>{titleName}</ThemedHeadingText>
          </Pressable>
          <ThemedHeadingText style={{ fontSize: 12 }}>Step {step}</ThemedHeadingText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

export default CustomFormHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add paddingTop for Android StatusBar
  },
  tinyLogo: {
    width: 200,
    height: 25,
    resizeMode: 'contain',
  },
});
