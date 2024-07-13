import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj3VYWgepIblA1dho69Vn_GQtROhPH8S8",
  authDomain: "campuslyft-d5896.firebaseapp.com",
  projectId: "campuslyft-d5896",
  storageBucket: "campuslyft-d5896.appspot.com",
  messagingSenderId: "93854783233",
  appId: "1:93854783233:web",
  measurementId: "G-62N5G3NK2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app); // Initialize and export Firestore
