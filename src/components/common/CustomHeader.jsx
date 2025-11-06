import {
  Image,
  StyleSheet,
  Text,
  View,
  Appearance,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from '@/context/NotificationContext';
import { ThemedView } from '../ThemedView';
import appStyle from '@/AppStyles';

const CustomHeader = () => {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navigation = useNavigation();
  const theme = Appearance.getColorScheme();

  const dynamicStyles = {
    backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
  };

  const tintColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <>
<StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#000' : '#fff'}
      /> 
{/* 
      <StatusBar
  barStyle="dark-content"
  backgroundColor="#fff" // Match header background
  translucent={false}    // 🛑 Don't allow overlay under status bar
/> */}


      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: theme === 'dark' ? '#000' : '#fff' },
        ]}
      >
     {/*  */}
          <ThemedView style={[styles.container, dynamicStyles ]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SideMenuScreen')}
              style={{ padding: 10 }}
            >
              <Image
                style={[styles.menuicon, { tintColor }]}
                source={require('../../assets/images/menuIcon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                style={styles.tinyLogo}
                source={require('../../assets/images/logo-full-width.png')}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => navigation.navigate('NotificationScreen')}
              style={{ padding: 10 }}
            >
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                {unreadCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: '#FF4800',
                      right: 5,
                      width: 22,
                      borderRadius: 100,
                      zIndex: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: '#fff',
                        textAlign: 'center',
                      }}
                    >
                      {unreadCount}
                    </Text>
                  </View>
                )}

                <Image
                  style={appStyle.bellicon}
                  source={require('../../assets/images/notificationBell.png')}
                /> <Text>1</Text>
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity
  onPress={() => navigation.navigate('NotificationScreen')}
  style={{ padding: 10 }}
  accessibilityRole="button"
  accessibilityLabel={`Notifications, ${unreadCount} unread`}
>
  <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
    {/* Bell Icon */}
    <Image
      style={appStyle.bellicon}
      source={require('../../assets/images/notificationBell.png')}
    />

    {/* Badge */}
    {unreadCount > 0 && (
      <View
        style={{
          position: 'absolute',
          top: -10,
          right: -2,
          backgroundColor: '#FF4800',
          minWidth: 18,
          height: 18,
          paddingHorizontal: 4, // lets it grow for 2–3 digits
          borderRadius: 9,
          zIndex: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Text>
      </View>
    )}
  </View>
</TouchableOpacity>
          </ThemedView>
        
      </SafeAreaView>
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
  flex: 0,
  backgroundColor: '#fff',
  elevation: 10,
  
},
  headerContainer: {
    width: '100%',
  },

container: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
   paddingVertical: 12, // dynamic height
  paddingHorizontal: 16,
  marginBottom: 0,
  height: Platform.OS === 'ios' ? 80 : 60, // dynamic height based on platform
},


  tinyLogo: {
    width: 200,
    height: 25,
    resizeMode: 'contain',
    marginLeft: 20,
  },

  menuicon: {
    width: 20,
    height: 14,
    resizeMode: 'contain',
  },
});
