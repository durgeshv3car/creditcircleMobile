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




import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { listenForMessages } from '../util/firebase';
import { useNotifications } from '@/context/NotificationContext';


const NotificationScreen = ({ navigation }) => {
  // const { notifications, setNotifications } = useNotifications();

  const { notifications } = useNotifications();



  useEffect(() => {
    // const unsubscribe = listenForMessages((payload) => {
    //   const newNotification = {
    //     id: Date.now().toString(),
    //     title: payload.notification?.title || 'No Title',
    //     description: payload.notification?.body || 'No Description',
    //     image: payload.notification?.android?.imageUrl || '',
    //     time: new Date().toLocaleTimeString(),
    //   };
    //   setNotifications((prev) => [newNotification, ...prev]);
    // });

    // return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (

    console.log("📩 New Foreground Notification:", item)  ,

    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailScreen', { notification: item })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : null}
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
    
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#555555',
    marginVertical: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 8,
  },
  time: {
    fontSize: 12,
    color: '#888888',
  },
});
