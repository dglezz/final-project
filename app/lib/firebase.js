import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "dg-final-project.firebaseapp.com",
  projectId: "dg-final-project",
  storageBucket: "dg-final-project.firebasestorage.app",
  messagingSenderId: "681823741511",
  appId: "1:681823741511:web:ac302fcd16a29fd5653362",
};

Object.keys(firebaseConfig).forEach((key) => {
  const configValue = firebaseConfig[key] + "";
  if (configValue.charAt(0) === '"') {
    firebaseConfig[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
