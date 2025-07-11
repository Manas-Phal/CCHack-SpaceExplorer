
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBFw_WTbkUfs6O9YljUgo7Ma8eQuwToZRw",
  authDomain: "space-explorer2-95c99.firebaseapp.com",
  projectId: "space-explorer2-95c99",
  storageBucket: "space-explorer2-95c99.firebasestorage.app", 
  messagingSenderId: "402587585881",
  appId: "1:402587585881:web:30591f8e38171307c2d048"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

