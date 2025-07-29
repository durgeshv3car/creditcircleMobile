/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-reanimated';
import messaging from '@react-native-firebase/messaging';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Background notification:', remoteMessage);
// });


// 🔧 Background message handler (runs even when app is killed - Android)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Background message received:', remoteMessage);
  // You can save to AsyncStorage here if needed
});

AppRegistry.registerComponent(appName, () => App);
