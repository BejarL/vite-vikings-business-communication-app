
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


export const firebaseConfig = {
  apiKey: "AIzaSyBPqZ24MX5WzGq3RCadi7BGnkk2tLC-xbw",
  authDomain: "emanate-demo.firebaseapp.com",
  databaseURL: "https://emanate-demo-default-rtdb.firebaseio.com",
  projectId: "emanate-demo",
  storageBucket: "emanate-demo.appspot.com",
  messagingSenderId: "506379997369",
  appId: "1:506379997369:web:704f2a5374a8ab6d3a4b68",
  measurementId: "G-NP7MPZH3CE"
}



// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get authentication, database, and Firestore 
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app);

export const chatsCollection = collection(db, "Chats");

