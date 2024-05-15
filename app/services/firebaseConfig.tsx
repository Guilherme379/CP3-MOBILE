import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc, getDocs,doc, updateDoc,deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-1a_saOBTZtmHnjj2bhTn0wyv8Wu8a3I",
  authDomain: "loja-pf-5f896.firebaseapp.com",
  projectId: "loja-pf-5f896",
  storageBucket: "loja-pf-5f896.appspot.com",
  messagingSenderId: "398843861914",
  appId: "1:398843861914:web:dbedff95572799c7cc7823"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {app,db,getFirestore,collection, addDoc, getDocs,doc,updateDoc, deleteDoc}