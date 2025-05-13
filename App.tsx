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

  // useEffect(() => {
  //   const handleInitialNotification = async () => {
  //     const remoteMessage = await messaging().getInitialNotification();
  //     if (remoteMessage) {
  //       const data = remoteMessage.data || {};
  //       const notification = {
  //         id: Date.now().toString(),
  //         title: data.title || remoteMessage.notification?.title || 'No Title',
  //         description: data.body || remoteMessage.notification?.body || 'No Description',
  //         image: data.image || remoteMessage.notification?.android?.imageUrl || '',
  //         time: new Date().toLocaleTimeString(),
  //         timestamp: new Date().getTime(),
  //         isRead: false,
  //         isForeground: false,
  //       };

  //       setTimeout(() => {
  //         setNotifications(prev => [notification, ...prev]);
  //         RootNavigation.navigate('NotificationScreen');
  //       }, 500); // delay just enough for hydration
  //     }
  //   };

  //   if (isNavReady) {
  //     handleInitialNotification();
  //   }
  // }, [isNavReady]);


  useEffect(() => {
    const handleInitialNotification = async () => {
      try {
        const remoteMessage = await messaging().getInitialNotification();
  
        console.log('🔥 getInitialNotification() result:', remoteMessage);
  
        if (!remoteMessage) {
          console.log('⚠️ No remoteMessage found (user opened app directly or message was not a data-only payload)');
          return;
        }
  
        const data = remoteMessage.data || {};
        const notification = {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          title: data.title || remoteMessage.notification?.title || 'No Title',
          description: data.body || remoteMessage.notification?.body || 'No Description',
          image: data.image || remoteMessage.notification?.android?.imageUrl || '',
          time: new Date().toLocaleTimeString(),
          timestamp: Date.now(), // ✅ Ensure this is valid
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
        }, 1000); // 1 sec delay is enough
      } catch (e) {
        console.error('❌ Error in handleInitialNotification:', e);
      }
    };
  
    if (isNavReady) {
      handleInitialNotification();
    }
  }, [isNavReady]);
  


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
