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
  apiKey: "AIzaSyAPgJZPdN2HQLpWsrgFnyfBU8mRP_K90ds",
  authDomain: "apla-connect.firebaseapp.com",
  projectId: "apla-connect",
  storageBucket: "apla-connect.appspot.com",
  messagingSenderId: "110921354319",
  appId: "1:110921354319:web:76ebc77c2d6f5f181cae3a",
  measurementId: "G-E8FCCMHT1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)
export { app, db, storage, auth };