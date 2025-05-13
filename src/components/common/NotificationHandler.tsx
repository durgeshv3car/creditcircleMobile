// // src/components/NotificationHandler.js
// import { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
// import { useNotifications } from '@/context/NotificationContext';
// import * as RootNavigation from '../../../RootNavigation'; // fix path if needed

// const NotificationHandler = () => {
//   const { setNotifications } = useNotifications();

//   const extractNotification = (remoteMessage) => ({
//     id: Date.now().toString(),
//     title: remoteMessage.notification?.title || 'No Title',
//     description: remoteMessage.notification?.body || 'No Description',
//     image: remoteMessage.notification?.android?.imageUrl || '',
//     time: new Date().toLocaleTimeString(),
//     isRead: false,
//   });

//   useEffect(() => {
//     messaging().onNotificationOpenedApp(remoteMessage => {
//       if (remoteMessage) {
//         const notification = extractNotification(remoteMessage);
//         console.log('🚀 Background Notification:', notification);
//         setNotifications(prev => [notification, ...prev]);
//         RootNavigation.navigate('NotificationScreen');
//       }
//     });
  
//     messaging().getInitialNotification().then(remoteMessage => {
//       if (remoteMessage) {
//         const notification = extractNotification(remoteMessage);
//         console.log('🚀 Quit Notification:', notification);
//         setNotifications(prev => [notification, ...prev]);
//         RootNavigation.navigate('NotificationScreen');
//       }
//     });
//   }, []);
  

//   return null;
// };

// export default NotificationHandler;


// step 2   
// import { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
// import { useNotifications } from '@/context/NotificationContext';
// import * as RootNavigation from '../../../RootNavigation';

// const NotificationHandler = () => {
//   const { setNotifications } = useNotifications();

//   const extractNotification = (remoteMessage) => ({
//     id: Date.now().toString(),
//     title: remoteMessage.notification?.title || 'No Title',
//     description: remoteMessage.notification?.body || 'No Description',
//     image: remoteMessage.notification?.android?.imageUrl || '',
//     time: new Date().toLocaleTimeString(),
//     isRead: false
//   });

//   useEffect(() => {
//     messaging().onNotificationOpenedApp(remoteMessage => {
//       if (remoteMessage) {
//         const notification = extractNotification(remoteMessage);
//         setNotifications(prev => [notification, ...prev]);
//         RootNavigation.navigate('NotificationScreen');
//       }
//     });

//     messaging().getInitialNotification().then(remoteMessage => {
//       if (remoteMessage) {
//         const notification = extractNotification(remoteMessage);
//         setNotifications(prev => [notification, ...prev]);
//         RootNavigation.navigate('NotificationScreen');
//       }
//     });
//   }, []);

//   return null;
// };

// export default NotificationHandler;



// import { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
// import { useNotifications } from '@/context/NotificationContext';
// import * as RootNavigation from '../../../RootNavigation';
// import { Alert } from 'react-native';

// const NotificationHandler = () => {
//   const { setNotifications } = useNotifications();

//   const extractNotification = (remoteMessage) => ({

//     id: Date.now().toString(),
//     title: remoteMessage.notification?.title || 'No Title',
//     description: remoteMessage.notification?.body || 'No Description',
//     image: remoteMessage.notification?.android?.imageUrl || '',
//     time: new Date().toLocaleTimeString(),
//     timestamp: new Date().getTime(), // ✅ added
//     isRead: false,
//   });



//   useEffect(() => {
//     // ✅ Handle notification tap from background
//     messaging().onNotificationOpenedApp(remoteMessage => {

//       if (remoteMessage) {
//         const notification = extractNotification(remoteMessage);
//         setNotifications(prev => [notification, ...prev]);
//         RootNavigation.navigate('NotificationScreen');
//       }
//     });

//     // ✅ Handle notification tap from quit state
//     const handleInitialNotification = async () => {
//       const remoteMessage = await messaging().getInitialNotification();
//       if (remoteMessage) {
//         const notification = extractNotification(remoteMessage);
//         setNotifications(prev => [notification, ...prev]);

//         // 👇 Wait until navigation is ready before navigating
//         const waitForNav = () => {
//           if (RootNavigation.navigationRef.isReady()) {
//             RootNavigation.navigate('NotificationScreen');
//           } else {
//             setTimeout(waitForNav, 100); // retry in 100ms
//           }
//         };
//         waitForNav();
//       }
//     };

//     handleInitialNotification();
//   }, []);

//   return null;
// };

// export default NotificationHandler;

// NotificationHandler.tsx

import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useNotifications } from '@/context/NotificationContext';
import * as RootNavigation from '../../../RootNavigation';

const NotificationHandler = () => {
  const { setNotifications } = useNotifications();

  const extractNotification = (remoteMessage, fromTap = false) => {
    const data = remoteMessage.data || {};
    const notification = remoteMessage.notification || {};

    return {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      title: data.title || notification.title || 'No Title',
      description: data.body || notification.body || 'No Description',
      image: data.image || notification.android?.imageUrl || '',
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now(),
      isRead: false,
      isForeground: !fromTap,
    };
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const notification = extractNotification(remoteMessage);
      setNotifications(prev => [notification, ...prev]);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        const notification = extractNotification(remoteMessage, true);
        setNotifications(prev => [notification, ...prev]);
        RootNavigation.navigate('NotificationScreen');
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkInitialNotification = async () => {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        const notification = extractNotification(remoteMessage, true);
        setNotifications(prev => [notification, ...prev]);
        RootNavigation.navigate('NotificationScreen');
      }
    };
    checkInitialNotification();
  }, []);

  return null;
};

export default NotificationHandler;
