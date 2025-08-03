// File: src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


// Export the auth instance to be used in other parts of the app



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVYnC70s7XODqvE81UVqUVuwtOLGG_hQ8",
  authDomain: "dsa-tracker-fullstack.firebaseapp.com",
  projectId: "dsa-tracker-fullstack",
  storageBucket: "dsa-tracker-fullstack.firebasestorage.app",
  messagingSenderId: "292899114489",
  appId: "1:292899114489:web:9ccaf9e1f81269a8798128"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);