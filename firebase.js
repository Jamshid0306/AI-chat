// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyD0aNw0TS_TBBofI3QMGAyGnQn3AmdPtBA",
  authDomain: "aichat-f816c.firebaseapp.com",
  projectId: "aichat-f816c",
  storageBucket: "aichat-f816c.firebasestorage.app",
  messagingSenderId: "325235432184",
  appId: "1:325235432184:web:70c29dd32faa1879c0390d",
  measurementId: "G-6VT99F2KT9",
};

// Firebase ilovasini ishga tushirish
const app = initializeApp(firebaseConfig);

// Authentication (Login, Register) uchun
const auth = getAuth(app);

// Firestore ma'lumotlar bazasi uchun
const db = getFirestore(app);

export { auth, db };
