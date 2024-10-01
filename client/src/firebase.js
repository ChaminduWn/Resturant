// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "resturant-app-bb067.firebaseapp.com",
  projectId: "resturant-app-bb067",
  storageBucket: "resturant-app-bb067.appspot.com",
  messagingSenderId: "585101680141",
  appId: "1:585101680141:web:100b8ff502fb807c69ff44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);