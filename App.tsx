// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import { NotificationProvider } from '@/context/NotificationContext';
// import Routes from './src/Navigation/Routes';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import NotificationHandler from '@/components/common/NotificationHandler';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [showRoutes, setShowRoutes] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowRoutes(true);
//     }, 1000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)

//     return () => clearTimeout(timer); // Clear timeout on unmount
//   }, []);


  

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={{ flex: 1 }}>
//         <NotificationProvider>
//           <StatusBar
//             backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
//             barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//           />
//           <NotificationHandler />
//           {showRoutes ? <Routes /> : null}
//         </NotificationProvider>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NotificationProvider, useNotifications } from '@/context/NotificationContext';
import Routes from './src/Navigation/Routes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NotificationHandler from '@/components/common/NotificationHandler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as RootNavigation from './RootNavigation'; // ✅ adjust path if needed
import { AppEventsLogger, Settings } from 'react-native-fbsdk-next';
// ✅ This part now lives **inside** the provider context
function MainApp() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showRoutes, setShowRoutes] = useState(false);
  const { setNotifications } = useNotifications();
  const [isNavReady, setIsNavReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoutes(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);



  useEffect(() => {
  let hasHandledInitialNotification = false;

  const handleInitialNotification = async () => {
    if (hasHandledInitialNotification) return;

    try {
      const remoteMessage = await messaging().getInitialNotification();
      hasHandledInitialNotification = true;

      console.log('🔥 getInitialNotification() result:', remoteMessage);

      if (!remoteMessage) {
        console.log('⚠️ No remoteMessage found (opened app directly or no data)');
        return;
      }

      const data = remoteMessage.data || {};
      const notification = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: data.title || remoteMessage.notification?.title || 'No Title',
        description: data.body || remoteMessage.notification?.body || 'No Description',
        image: data.image || remoteMessage.notification?.android?.imageUrl || '',
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now(),
        isRead: false,
        isForeground: false,
      };

      console.log('📥 Notification object created from FCM:', notification);

      setTimeout(() => {
        setNotifications(prev => {
          const updated = [notification, ...prev];
          console.log('📦 Final list after adding:', updated);
          return updated;
        });

        RootNavigation.navigate('NotificationScreen');
      }, 1000);
    } catch (e) {
      console.error('❌ Error in handleInitialNotification:', e);
    }
  };

  
  if (isNavReady) {
    handleInitialNotification();
  }
}, [isNavReady]);

  useEffect(() => {
    // (Optional) Explicit init/consent toggles
    
    Settings.setAppID('766848652858707');
Settings.setClientToken('a9432c883e5644de41e62094005c37b8');
Settings.initializeSDK();

  }, []);







  return (
    <>
      <StatusBar
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <NotificationHandler />
      {showRoutes ? <Routes onReady={() => setIsNavReady(true)} /> : null}
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NotificationProvider>
          <MainApp />
        </NotificationProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
