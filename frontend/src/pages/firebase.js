import firebase, { initializeApp } from 'firebase/app'
import "firebase/storage";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD76E7Fy4A28fXpL5ZleD6Y7ayClfGAru4",
    authDomain: "mtt-social-4cf10.firebaseapp.com",
    projectId: "mtt-social-4cf10",
    storageBucket: "mtt-social-4cf10.appspot.com",
    messagingSenderId: "291996005695",
    appId: "1:291996005695:web:e0d5bd1a7e9613b95acf8a",
    measurementId: "G-W57L5T57JC"
  };

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app);