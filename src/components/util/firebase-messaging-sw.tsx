importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCECABok1kgsZaI52e8JtBa7qTsIBm3VFE",
  authDomain: "notifications-b781a.firebaseapp.com",
  projectId: "notifications-b781a",
  storageBucket: "notifications-b781a.appspot.com",
  messagingSenderId: "464691352676",
  appId: "1:464691352676:web:3e3dd81ec8047e7eba7b71",
  measurementId: "G-8737QB8G12",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ✅ Handle Background Notifications
messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background Notification Received:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png"
  });
});
