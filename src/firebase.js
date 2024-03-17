// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage}  from 'firebase/storage'
import {getFirestore}  from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyCixBGzsxRh48I46w5EHWXSEW9K0EE2sAU",
//   authDomain: "maha-scan-wd6n85-dc55f.firebaseapp.com",
//   projectId: "maha-scan-wd6n85",
//   storageBucket: "maha-scan-wd6n85.appspot.com",
//   messagingSenderId: "421962036748",
//   appId: "1:421962036748:web:874e87a5d2ef91166f6029"
// };
const firebaseConfig = {
  apiKey: "AIzaSyB-FFY-UDbf42s-xM_9s9EILawIFBQXQg0",
  authDomain: "test-ba04a.firebaseapp.com",
  databaseURL: "https://test-ba04a-default-rtdb.firebaseio.com",
  projectId: "test-ba04a",
  storageBucket: "test-ba04a.appspot.com",
  messagingSenderId: "555913317987",
  appId: "1:555913317987:web:9aa30149236755a5077256",
  measurementId: "G-RCTJ3Q6J8C"
};



const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const imgDB=getStorage(app)
export const db = getFirestore(app)