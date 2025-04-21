import React from 'react';
import { View, Button, Alert, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export const OpenInAppBrowser = async (url) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        // Customize the appearance as needed
        toolbarColor: '#6200EE',
        secondaryToolbarColor: '#FFFFFF',
        navigationBarColor: '#000000',
        navigationBarDividerColor: '#FFFFFF',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
      });
    } else {
      // Fallback if InAppBrowser is not available
      Alert.alert('InAppBrowser not supported', 'Opening link in default browser');
      Linking.openURL(url);
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

// export default function App() {
//   return (
//     <View style={{ padding: 20 }}>
//       <Button
//         title="Open Link in In-App Browser"
//         onPress={() => OpenInAppBrowser('https://www.example.com')}
//       />
//     </View>
//   );
// }
