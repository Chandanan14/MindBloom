
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import { getFirestore, collection, getDocs, getDoc, doc 
  ,setDoc, addDoc,serverTimestamp ,updateDoc,orderBy,
  query,where,deleteDoc }
from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCcJKofJy261GeoK18iCAx3booDuQ8bGPU",
  authDomain: "mental-wellness-1d08d.firebaseapp.com",
  projectId: "mental-wellness-1d08d",
  storageBucket: "mental-wellness-1d08d.firebasestorage.app",
  messagingSenderId: "325566802089",
  appId: "1:325566802089:web:0ad3a2933f5eaa1cd2e1b8",
  measurementId: "G-XKKQKZBZXY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, getDocs, getDoc, 
  doc ,setDoc, addDoc,serverTimestamp,
  updateDoc,orderBy,query,where,deleteDoc , onAuthStateChanged};