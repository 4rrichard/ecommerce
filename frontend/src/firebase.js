// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8y9gQfK0W_gFctHV4ZmMFEOZm--Ug3Og",
  authDomain: "ecommerce-site-b0d24.firebaseapp.com",
  projectId: "ecommerce-site-b0d24",
  storageBucket: "ecommerce-site-b0d24.appspot.com",
  messagingSenderId: "661839721641",
  appId: "1:661839721641:web:35615d0decdbde8034a5b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
