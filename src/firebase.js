// Import the functions you need from the SDKs you need
import { connectAuthEmulator, getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtHn2JCCGTwBlXCbV9NLsyyHZHOwgEoZg",
  authDomain: "openlongevity-c4a65.firebaseapp.com",
  projectId: "openlongevity-c4a65",
  storageBucket: "openlongevity-c4a65.appspot.com",
  messagingSenderId: "735099292761",
  appId: "1:735099292761:web:746eed4bccb7430ba5b548",
  measurementId: "G-506H7WLS8K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

export default auth;
