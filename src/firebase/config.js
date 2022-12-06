// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiOtQTaEwnruqYgXYGaD2nAMldqiqpKIo",
  authDomain: "careerhub-f51f8.firebaseapp.com",
  projectId: "careerhub-f51f8",
  storageBucket: "careerhub-f51f8.appspot.com",
  messagingSenderId: "969971304274",
  appId: "1:969971304274:web:df6f393fb01ce198591c8b",
  measurementId: "G-DP0CHSBYVQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth  = getAuth(app)
export const db  = getFirestore(app)
export const storage  = getStorage(app)
