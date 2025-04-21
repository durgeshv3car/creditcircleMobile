import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


import messaging from '@react-native-firebase/messaging';
import { useEffect } from "react";

// ✅ Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ Service Worker Registered:", registration);
    })
    .catch((error) => {
      console.error("❌ Service Worker Registration Failed:", error);
    });
}

// ✅ Request FCM Token
// export const requestFcmToken = async () => {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") {
//       console.warn("❌ Permission denied for notifications");
//       return null;
//     }

//     const registration = await navigator.serviceWorker.ready;

//     const token = await getToken(messaging, {
//       vapidKey: "BESxFdOkI4lDWF1h40RF7cZGFdHQ3GH-FZm9T1VpTXDhVY5RvpvJVcAT2kHlbw45qR8Vmhw4PRE-AW0IaTSAG5g",
//       serviceWorkerRegistration: registration
//     });

//     if (token) {
//       console.log("✅ FCM Token:", token);
//       return token;
//     } else {
//       console.warn("❌ No FCM token available");
//       return null;
//     }
//   } catch (error) {
//     console.error("❌ Error retrieving FCM token:", error);
//     return null;
//   }
// };





export const requestFcmToken = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.warn('🚫 Notification permission not granted');
      return null;
    }




    const token = await messaging().getToken();
    console.log('✅ FCM Token:', token);
    return token;
  } catch (error) {
    console.error('❌ Failed to get FCM token:', error);
    return null;
  }
};




export const listenForMessages = (onMessage) => {
  
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log('📩 Foreground Notification:', remoteMessage);
    if (onMessage) onMessage(remoteMessage);
  });
  console.log("List ",unsubscribe)

  return unsubscribe;

};


