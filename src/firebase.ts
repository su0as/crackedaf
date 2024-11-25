import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA6H6az1e8-_QDldc14cpATRQCpGDEpHJ0",
  authDomain: "crackedaf.firebaseapp.com",
  databaseURL: "https://crackedaf-default-rtdb.firebaseio.com",
  projectId: "crackedaf",
  storageBucket: "crackedaf.firebasestorage.app",
  messagingSenderId: "900375735545",
  appId: "1:900375735545:web:4eee97ffb6861246424628",
  measurementId: "G-7F01GRCXNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);