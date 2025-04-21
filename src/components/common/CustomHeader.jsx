import { Image, StyleSheet, Text, View, Appearance, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from '@/context/NotificationContext';
import appStyle from '@/AppStyles';


const CustomHeader = () => {

  const { notifications } = useNotifications();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navigation = useNavigation();

  const theme = Appearance.getColorScheme();

  const dynamicStyles = {
    backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
    shadowColor: theme === 'dark' ? '#FFFFFF' : '#000000',
  };


  const tintColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  const color = theme === 'dark' ? '#000000' : '#ffffff';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <ThemedView style={[styles.container, dynamicStyles]}>
          <TouchableOpacity onPress={() => navigation.navigate('SideMenuScreen')} style={{ padding: 10 }} >
            <Image
              style={[styles.menuicon, { tintColor }]}
              source={require('../../assets/images/menuIcon.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Home')} >
            <Image
              style={styles.tinyLogo}
              source={require('../../assets/images/logo-full-width.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationScreen')}
            style={{ padding: 10 }}
          >
            <View style={{ position: 'relative', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              {unreadCount > 0 && (
                <View style={{
                  position: 'absolute',
                  backgroundColor: '#FF4800',
                  top: -10,
                  right: 5,
                  width: 22,
                  height: 22,
                  borderRadius: 100,
                  zIndex: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: '#fff',
                    textAlign: 'center'
                  }}>
                    {unreadCount}
                  </Text>
                </View>
              )}

              <Image
                style={appStyle.bellicon} // adjust color if dynamic
                source={require('../../assets/images/notificationBell.png')}
              />
            </View>
          </TouchableOpacity>

        </ThemedView>
      </View>
    </SafeAreaView>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flexDirection: 'row',
    width: 'auto',
    justifyContent: "space-between",
    paddingLeft: "4%",
    paddingRight: "4%",
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: 'green',
    shadowColor: "#000000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 20,
    elevation: 10,

  },
  tinyLogo: {
    width: 200,
    height: 25,
    resizeMode: "contain",
    // backgroundColor:'red'
  },
  menuicon: {
    width: 20,
    height: 14,
    resizeMode: 'contain',
  },
  



})


