// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}  from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCixBGzsxRh48I46w5EHWXSEW9K0EE2sAU",
  authDomain: "maha-scan-wd6n85-dc55f.firebaseapp.com",
  projectId: "maha-scan-wd6n85",
  storageBucket: "maha-scan-wd6n85.appspot.com",
  messagingSenderId: "421962036748",
  appId: "1:421962036748:web:874e87a5d2ef91166f6029"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)