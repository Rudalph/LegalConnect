// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZy1O7NWHoAe2clBghbvOMRRQNQu2rSWg",
  authDomain: "ieee-3dfbf.firebaseapp.com",
  databaseURL: "https://ieee-3dfbf-default-rtdb.firebaseio.com",
  projectId: "ieee-3dfbf",
  storageBucket: "ieee-3dfbf.appspot.com", 
  messagingSenderId: "759189321926",
  appId: "1:759189321926:web:d0e8705fef350d96feffc7",
  measurementId: "G-9TQLWJ4K6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)
export { db, storage, auth };