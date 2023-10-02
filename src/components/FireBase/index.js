// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADUqhtKtmokChip1Tc-68JLas19t3_uM8",
  authDomain: "battlemode-43c9a.firebaseapp.com",
  projectId: "battlemode-43c9a",
  storageBucket: "battlemode-43c9a.appspot.com",
  messagingSenderId: "236012261649",
  appId: "1:236012261649:web:c0549d6f92265f0628fcb0",
  measurementId: "G-FDR5YK4M0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);