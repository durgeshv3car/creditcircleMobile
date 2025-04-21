import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export const MyWebComponent = ({ route }) => {
  const { urlName } = route.params;
  const [showWebView, setShowWebView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWebView(true);
    }, 2000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showWebView ? (
        <WebView source={{ uri: urlName }} style={{ flex: 1 }} />
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
