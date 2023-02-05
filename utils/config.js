// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCozjt-evnk5JHYiNkdKbD51P0rD6feeE0",
  authDomain: "tinder-clone-f7ca5.firebaseapp.com",
  projectId: "tinder-clone-f7ca5",
  storageBucket: "tinder-clone-f7ca5.appspot.com",
  messagingSenderId: "801544109335",
  appId: "1:801544109335:web:06cdcae384f1a9ca4e8b52",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
