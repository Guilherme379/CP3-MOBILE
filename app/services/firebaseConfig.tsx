import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc, getDocs,doc, updateDoc,deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgl_z1nhg-EV54RzyOBO7FZIHFRhHEN3o",
  authDomain: "checkpoint-c719c.firebaseapp.com",
  projectId: "checkpoint-c719c",
  storageBucket: "checkpoint-c719c.appspot.com",
  messagingSenderId: "908864245508",
  appId: "1:908864245508:web:21e3e76952c9a291f1ca51"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {app,db,getFirestore,collection, addDoc, getDocs,doc,updateDoc, deleteDoc}