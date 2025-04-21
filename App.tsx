import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NotificationProvider } from '@/context/NotificationContext';
import Routes from './src/Navigation/Routes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NotificationHandler from '@/components/common/NotificationHandler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showRoutes, setShowRoutes] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoutes(true);
    }, 1000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, []);


  

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NotificationProvider>
          <StatusBar
            backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />
          <NotificationHandler />
          {showRoutes ? <Routes /> : null}
        </NotificationProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
