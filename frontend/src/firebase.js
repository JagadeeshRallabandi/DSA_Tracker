// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCEvZOnKpljMCzV69fIjmqZckvs60rdmxk",
  authDomain: "academic-tracker-dsa.firebaseapp.com",
  projectId: "academic-tracker-dsa",
  storageBucket: "academic-tracker-dsa.firebasestorage.app",
  messagingSenderId: "950419923560",
  appId: "1:950419923560:web:c71defc4cfe24d6a63d1dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
