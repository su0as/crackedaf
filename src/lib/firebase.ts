import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Initialize Firebase only if config is valid
function validateConfig(config: Record<string, string | undefined>): boolean {
  return Object.values(config).every(value => value !== undefined && value !== '');
}

let app;
let auth;
let db;
let analytics = null;

try {
  if (!validateConfig(firebaseConfig)) {
    throw new Error('Invalid Firebase configuration');
  }
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);
  
  // Initialize analytics only if supported
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    console.log('Analytics not supported');
  });
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Provide fallback or error state
}

export const googleProvider = new GoogleAuthProvider();
export { auth, db, analytics };