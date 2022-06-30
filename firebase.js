// Import the functions you need from the SDKs you need
import { initializeApp , getApp, getApps} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIyXBhhLk3oxVltKVE1wPHnCVX1l7tcBY",
    authDomain: "twitterv2-fece7.firebaseapp.com",
    projectId: "twitterv2-fece7",
    storageBucket: "twitterv2-fece7.appspot.com",
    messagingSenderId: "788902127332",
    appId: "1:788902127332:web:cb4328bcd667357d2f2ef1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp() ;
const db = getFirestore();
const storage= getStorage();

export {app,db,storage}
