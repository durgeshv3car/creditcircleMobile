import { Image, StyleSheet, Text, View, Appearance, TouchableOpacity, Pressable  } from 'react-native'
import React from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedHeadingText, ThemedText } from '../ThemedText'
import { useNavigation } from '@react-navigation/native';
import appStyle from '@/AppStyles';




const CustomFormHeader = ({ titleName, step }) => {

   const navigation = useNavigation();

  const theme = Appearance.getColorScheme();

  const dynamicStyles = {
    backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
    // shadowColor: theme === 'dark' ? '#FFFFFF' : '#000000',
  };

  
  const tintColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  
  const color = theme === 'dark' ? '#000000' : '#ffffff';

  const imagecoleor = {
    tintColor: theme === 'dark' ? "#ffffff" : ""
  };


  return (
    <ThemedView style={[styles.container, dynamicStyles]}>

     <Image
        style={styles.tinyLogo}
        source={require('../../assets/images/logo-full-width.png')}
      />
     
     
{/*   */}
             <View style={appStyle.HeaderBar}>
          
                              <Pressable style={{flexDirection:'row' ,gap:5, alignItems:'center'}} onPress={() => navigation.canGoBack() ? navigation.goBack() : null}>
                                  <Image
                                      source={require("../../assets/icons/backarrow.png")}
                                      style={[imagecoleor, { width: 20, height: 20 }]}
                                  />
          <ThemedHeadingText style={{ fontSize: 12 }}>{titleName}</ThemedHeadingText>
                              </Pressable>
        <ThemedHeadingText style={{ fontSize: 12, }}>Step  {step}</ThemedHeadingText>
      </View>
      

    </ThemedView>
  )
}

export default CustomFormHeader

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection:'column',
    width:'auto',
    justifyContent:"space-between",
    paddingLeft:"4%",
    paddingRight:"4%",
    alignItems:'center',
    
    

  },
  tinyLogo: {
    width: 200,
    height: 25,
    resizeMode: "contain",
    textAlign: 'center',
    margin: 'auto',
  },
  menuicon:{
    width: 16,
    height: 14,
  },
  bellicon:{
    width: 16,
    height: 18,
  }

})

