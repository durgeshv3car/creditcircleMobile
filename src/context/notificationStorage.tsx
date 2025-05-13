import AsyncStorage from "@react-native-async-storage/async-storage";

const cleanOldNotifications = (allNotifications) => {
    const now = Date.now();
    return allNotifications.filter(n => now - n.timestamp <= THIRTY_DAYS_MS);
  };
  
  // When loading from storage:
  const loaded = await AsyncStorage.getItem('notifications');
  const parsed = loaded ? JSON.parse(loaded) : [];
  const fresh = cleanOldNotifications(parsed);
  setNotifications(fresh);
  