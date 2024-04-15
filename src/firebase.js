import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_AKY,
  authDomain: "hextagram.firebaseapp.com",
  projectId: "hextagram",
  storageBucket: "hextagram.appspot.com",
  messagingSenderId: "784683604885",
  appId: "1:784683604885:web:267694cfc65daad270f49c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);