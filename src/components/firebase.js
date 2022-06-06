// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBNf0uVP8m5enZcMbaAYr_FQwaL3NQHrQk",

  authDomain: "acrossme-2e167.firebaseapp.com",

  projectId: "acrossme-2e167",

  storageBucket: "acrossme-2e167.appspot.com",

  messagingSenderId: "640826687071",

  appId: "1:640826687071:web:d4d36f678956e87822e5ea",

  measurementId: "G-8Z9S2ZMXMD"

};


// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);
export { db, auth,storage };
export default firebase;