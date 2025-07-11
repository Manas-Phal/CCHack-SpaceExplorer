
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCoWxcp748t1ybG_V9BPhWmOWVzjiH8y0U",
  authDomain: "space-explorer2.firebaseapp.com",
  projectId: "space-explorer2",
  storageBucket: "space-explorer2.appspot.com", 
  messagingSenderId: "88497717973",
  appId: "1:88497717973:web:4a7df59ccbd45e2428985c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

