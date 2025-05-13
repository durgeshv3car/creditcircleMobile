// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { listenForMessages, requestFcmToken } from '../util/firebase';

// const NotificationScreen = ({ navigation }) => {
//   const [notifications, setNotifications] = useState([]);


//   useEffect(() => {
//     // ✅ Request Token on Load
//     const fetchToken = async () => {
//       const token = await requestFcmToken();
//       if (token) {
//         console.log("✅ Notification Token:", token);
//       }
//     };

//     fetchToken();

    

//     // ✅ Listen for incoming notifications
//     const unsubscribe = listenForMessages((payload) => {
//       console.log("📩 New Foreground Notification:", payload);

//       // ✅ Store the notification in state
//       setNotifications((prevNotifications) => [
//         {
//           id: Date.now().toString(),
//           title: payload.notification?.title || 'No Title',
//           description: payload.notification?.body || 'No Description',
//           image: payload.notification?.android?.imageUrl || 'No Description',
//           time: new Date().toLocaleTimeString(),
//         },
//         ...prevNotifications,
//       ]);
//     });

//     return () => {
//       unsubscribe(); // ✅ Cleanup listener on unmount
//     };
//   }, []);

//   const renderItem = ({ item }) => (

//     <TouchableOpacity
//     style={styles.card}
//     onPress={() => navigation.navigate('DetailScreen', { notification: item })}
//   >
//     <Text style={styles.title}>{item.title}</Text>
//     <Text style={styles.description}>{item.description}</Text>

//     {/* Show image if available */}
//     {item.image ? (
//       <Image
//         source={{ uri: item.image }}
//         style={{ width: '100%', height: 150, borderRadius: 8, marginTop: 10 }}
//         resizeMode="cover"
//       />
//     ) : null}

//     <Text style={styles.time}>{item.time}</Text>
//   </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={notifications}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   listContainer: {
//     padding: 10,
//   },
//   card: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   description: {
//     fontSize: 14,
//     color: '#555555',
//     marginVertical: 4,
//   },
//   time: {
//     fontSize: 12,
//     color: '#888888',
//   },
// });




  // import React, { useEffect } from 'react';
  // import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
  // import { listenForMessages } from '../util/firebase';
  // import { useNotifications } from '@/context/NotificationContext';


  // const NotificationScreen = ({ navigation }) => {
  //   // const { notifications, setNotifications } = useNotifications();

  //   const { notifications, markAsRead } = useNotifications();


  //   useEffect(() => {
  //     // const unsubscribe = listenForMessages((payload) => {
  //     //   const newNotification = {
  //     //     id: Date.now().toString(),
  //     //     title: payload.notification?.title || 'No Title',
  //     //     description: payload.notification?.body || 'No Description',
  //     //     image: payload.notification?.android?.imageUrl || '',
  //     //     time: new Date().toLocaleTimeString(),
  //     //   };
  //     //   setNotifications((prev) => [newNotification, ...prev]);
  //     // });

  //     // return () => unsubscribe();
  //   }, []);

  //   const renderItem = ({ item }) => (

  //     console.log("📩 New Foreground Notification:", item)  ,

  //     <TouchableOpacity
  //   style={styles.card}
  //   onPress={() => {
  //     markAsRead(item.id);
  //     navigation.navigate('DetailScreen', { notification: item });
  //   }}
  // >
  //       <Text style={styles.title}>{item.title}</Text>
  //       <Text style={styles.description}>{item.description}</Text>
  //       {item.image ? (
  //         <Image source={{ uri: item.image }} style={styles.image} />
  //       ) : null}
  //       <Text style={styles.time}>{item.time}</Text>
  //     </TouchableOpacity>
      
  //   );

  //   return (
  //     <View style={styles.container}>
  //       <FlatList
  //         data={notifications}
  //         keyExtractor={(item) => item.id}
  //         renderItem={renderItem}
  //         contentContainerStyle={styles.listContainer}
  //       />

  //     </View>
  //   );
  // };

  // export default NotificationScreen;

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#FFFFFF',
  //   },
  //   listContainer: {
  //     padding: 10,
  //   },
  //   card: {
  //     padding: 10,
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#E0E0E0',
  //     marginBottom: 10,
  //   },
  //   title: {
  //     fontSize: 16,
  //     fontWeight: 'bold',
  //     color: '#000000',
  //   },
  //   description: {
  //     fontSize: 14,
  //     color: '#555555',
  //     marginVertical: 4,
  //   },
  //   image: {
  //     width: '100%',
  //     height: 150,
  //     borderRadius: 8,
  //     marginVertical: 8,
  //   },
  //   time: {
  //     fontSize: 12,
  //     color: '#888888',
  //   },
  // });

/****************************** */

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNotifications } from '@/context/NotificationContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const NotificationScreen = ({ navigation }) => {
  const { notifications, markAsRead } = useNotifications();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          markAsRead(item.id);
          navigation.navigate('DetailScreen', { notification: item });
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : null}
        <Text style={styles.time}>{formatNotificationTime(item.timestamp)}</Text>
      </TouchableOpacity>
    );
  };

  const formatNotificationTime = (timestamp) => {
    const now = dayjs();
    const time = dayjs(timestamp);

    const minutesAgo = now.diff(time, 'minute');

    if (minutesAgo < 1) {
      return 'Just now';
    }

    if (minutesAgo < 60) {
      return `${minutesAgo} min ago`;  // ✅ Dynamic minutes
    }

    if (now.isSame(time, 'day')) {
      return `Today at ${time.format('h:mm A')}`;
    } else if (now.subtract(1, 'day').isSame(time, 'day')) {
      return `Yesterday at ${time.format('h:mm A')}`;
    } else if (now.diff(time, 'hour') < 24) {
      return time.fromNow(); // Example: "8 hours ago"
    } else {
      return time.format('D MMM, YYYY'); // Example: "26 Apr, 2025"
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[...notifications].sort((a, b) => b.timestamp - a.timestamp)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    padding: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
  description: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  time: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
    textAlign: 'right',
  },
});





///***************************************** */

// import React from 'react';
// import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useNotifications } from '@/context/NotificationContext';

// const NotificationScreen = () => {
//   const { notifications, markAsRead, loading } = useNotifications();

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.card, item.isRead ? styles.read : styles.unread]}
//       onPress={() => markAsRead(item.id)}
//     >
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//       <Text style={styles.time}>{item.time}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (notifications.length === 0) {
//     return (
//       <View style={styles.centered}>
//         <Text>No notifications</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={[...notifications].sort((a, b) => b.timestamp - a.timestamp)}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', padding: 10 },
//   card: { padding: 12, marginBottom: 10, borderRadius: 8 },
//   unread: { backgroundColor: '#f5f5f5' },
//   read: { backgroundColor: '#e0e0e0' },
//   title: { fontWeight: 'bold', fontSize: 16 },
//   description: { fontSize: 14, marginVertical: 4 },
//   time: { fontSize: 12, color: '#888' },
//   centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
// });
