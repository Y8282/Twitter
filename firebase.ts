import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEGMpcwsb-BWMRf5SyssnWDg1KsgbG2zY",
  authDomain: "twitter-be2ae.firebaseapp.com",
  projectId: "twitter-be2ae",
  storageBucket: "twitter-be2ae.firebasestorage.app",
  messagingSenderId: "443038912877",
  appId: "1:443038912877:web:1aa507d2c702ae21b50a64",
  measurementId: "G-2Q1ML0EL67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
