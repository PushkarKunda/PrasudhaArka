import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase only when every required key is present, so the
// `if (!auth)` / `if (!db)` guards throughout the app actually fire instead
// of the SDK throwing at module load (which white-screened /admin).
const REQUIRED_KEYS = Object.keys(firebaseConfig);
const missingKeys = REQUIRED_KEYS.filter((key) => !firebaseConfig[key]);

let app = null;
if (missingKeys.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  console.error(
    `[firebase] Missing environment variables: ${missingKeys.join(", ")}. ` +
    `Copy .env.example to .env.local and fill in your Firebase project keys.`
  );
}

// Initialize Firebase services (null when not configured)
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

export default app;
