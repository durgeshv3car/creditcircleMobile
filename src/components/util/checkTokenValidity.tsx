import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkTokenValidity = async () => {
  const token = await AsyncStorage.getItem('userToken');

  if (!token) return false;

  // Optionally decode and check expiry (if it's a JWT)
  // Example for JWT:
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (e) {
    return false;
  }
};
