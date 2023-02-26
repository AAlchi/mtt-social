import firebase, { initializeApp } from 'firebase/app'
import "firebase/storage";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAVs_44RDOIrHo6tFzZnOAD5ubbhcuFG5Q",
  authDomain: "mtt-social-b1623.firebaseapp.com",
  projectId: "mtt-social-b1623",
  storageBucket: "mtt-social-b1623.appspot.com",
  messagingSenderId: "642313500885",
  appId: "1:642313500885:web:c257f510bea506da324a5c",
  measurementId: "G-T51SYYG0DN"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app);