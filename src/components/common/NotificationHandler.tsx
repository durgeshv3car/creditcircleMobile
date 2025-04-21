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




import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useNotifications } from '@/context/NotificationContext';
import * as RootNavigation from '../../../RootNavigation';

const NotificationHandler = () => {
  const { setNotifications } = useNotifications();

  // const extractNotification = (remoteMessage: any, fromTap = false) => ({
  //   id: Date.now().toString(),
  //   title: remoteMessage.notification?.title || 'No Title',
  //   description: remoteMessage.notification?.body || 'No Description',
  //   image: remoteMessage.notification?.android?.imageUrl || '',
  //   time: new Date().toLocaleTimeString(),
  //   timestamp: new Date().getTime(),
  //   isRead: false,
  //   isForeground: !fromTap,
  // });


  const extractNotification = (remoteMessage, fromTap = false) => {
    const data = remoteMessage.data || {};
    const notification = remoteMessage.notification || {};
  
    return {
      id: Date.now().toString(),
      title: data.title || notification.title || 'No Title',
      description: data.body || notification.body || 'No Description',
      image: data.image || notification.android?.imageUrl || '',
      time: new Date().toLocaleTimeString(),
      timestamp: new Date().getTime(),
      isRead: false,
      isForeground: !fromTap,
    };
  };

  // 🔄 Handle background tap (app already open in background)
  useEffect(() => {
    // const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
    //   if (remoteMessage) {
    //     const notification = extractNotification(remoteMessage, true);
    //     setNotifications(prev => [notification, ...prev]);
    //     RootNavigation.navigate('NotificationScreen');
    //   }
    // });

    // return unsubscribe;


    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        const notification = extractNotification(remoteMessage);
        setNotifications(prev => [notification, ...prev]);
        RootNavigation.navigate('NotificationScreen', notification);
      }
    });
  
    return unsubscribe;

  }, []);

//   // 🧊 Handle quit-state tap (app was killed)
//   useEffect(() => {
//     const handleInitialNotification = async () => {
//       try {
//         const remoteMessage = await messaging().getInitialNotification();
//         if (remoteMessage) {
//           const notification = extractNotification(remoteMessage, true);
//           setNotifications(prev => [notification, ...prev]);

//           const waitForNav = () => {
//             if (RootNavigation.navigationRef.isReady()) {
//               RootNavigation.navigate('NotificationScreen');
//             } else {
//               setTimeout(waitForNav, 100);
//             }
//           };

//           waitForNav();
//         }
//       } catch (e) {
//         console.error('❌ Error fetching initial FCM message:', e);
//       }
//     };

//     handleInitialNotification();
//   }, []);

//   return null;
// };

// 🔁 Handle background tap
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

// 🧊 Handle quit state
useEffect(() => {
  const handleInitialNotification = async () => {
    try {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        const notification = extractNotification(remoteMessage, true);
        setNotifications(prev => [notification, ...prev]);

        const waitForNav = () => {
          if (RootNavigation.navigationRef.isReady()) {
            RootNavigation.navigate('NotificationScreen');
          } else {
            setTimeout(waitForNav, 100);
          }
        };

        waitForNav();
      }
    } catch (e) {
      console.error('❌ Error fetching initial FCM message:', e);
    }
  };

  handleInitialNotification();
}, []);

return null;
};


export default NotificationHandler;
