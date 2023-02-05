// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcd5rdFLoxo60Mddnhj4IIHa8S0PLRgbs",
  authDomain: "tinder-clone-376916.firebaseapp.com",
  projectId: "tinder-clone-376916",
  storageBucket: "tinder-clone-376916.appspot.com",
  messagingSenderId: "992700783860",
  appId: "1:992700783860:web:836a0d74713367a18ed2a1"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
