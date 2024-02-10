import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyBPqZ24MX5WzGq3RCadi7BGnkk2tLC-xbw",
  authDomain: "emanate-demo.firebaseapp.com",
  projectId: "emanate-demo",
  storageBucket: "emanate-demo.appspot.com",
  messagingSenderId: "506379997369",
  appId: "1:506379997369:web:704f2a5374a8ab6d3a4b68",
  measurementId: "G-NP7MPZH3CE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app);
// const analytics = getAnalytics(app);  