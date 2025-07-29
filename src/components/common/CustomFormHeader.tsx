import {
  Image,
  StyleSheet,
  View,
  Appearance,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <>
 
      <SafeAreaView style={[styles.safeArea, dynamicStyles]}>
        <ThemedView style={[styles.container, dynamicStyles]}>
          <Image
            style={[styles.tinyLogo]}
            source={require('../../assets/images/logo-full-width.png')}
          />

          <View style={appStyle.HeaderBar}>
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
            >
              <Image
                source={require('../../assets/icons/backarrow.png')}
                style={[imageColor, { width: 20, height: 20 }]}
              />
              <ThemedHeadingText style={{ fontSize: 12 }}>
                {titleName}
              </ThemedHeadingText>
            </Pressable>
            <ThemedHeadingText style={{ fontSize: 12 }}>
              Step {step}
            </ThemedHeadingText>
          </View>
        </ThemedView>
      </SafeAreaView>
    </>
  );
};

export default CustomFormHeader;

const styles = StyleSheet.create({
  safeArea: {
  flex: 0,
  backgroundColor: '#fff',
  elevation: 10,
},
  container: {
    paddingBottom: 12,
    paddingHorizontal: '4%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 60,

    
  },
  tinyLogo: {
    width: 200,
    resizeMode: 'contain',
  },
});
