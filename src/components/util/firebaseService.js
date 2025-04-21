import axios from "axios";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";

// ✅ Firebase Project Number (Replace with yours)
const FIREBASE_PROJECT_NUMBER = "464691352676";

// ✅ Fetch Firebase Access Token
async function getAccessToken() {
  try {
    const user = auth().currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const token = await user.getIdToken(true);
    return token;
  } catch (error) {
    console.error("❌ Error getting Firebase access token:", error);
    return null;
  }
}

// ✅ Verify FCM Token
export async function verifyFcmToken(fcmToken) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    const url = `https://iid.googleapis.com/iid/info/${fcmToken}?details=true`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // ✅ Use OAuth2 Token
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Verified FCM Token Data:", response.data);
  } catch (error) {
    console.error("❌ Error Verifying FCM Token:", error.response?.data || error.message);
  }
}

// ✅ Get FCM Token
export async function getFcmToken() {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("✅ FCM Token:", fcmToken);
      return fcmToken;
    } else {
      console.warn("⚠️ No FCM token found");
      return null;
    }
  } catch (error) {
    console.error("❌ Error getting FCM token:", error);
    return null;
  }
}
