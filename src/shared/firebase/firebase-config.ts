// firebase.config.ts
import * as firebase from 'firebase/app';
import 'firebase/storage';

import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyA-AoCdgxDRVWtLJg-X6h9kS-KFr9dDrSI",
  authDomain: "haru-77a68.firebaseapp.com",
  projectId: "haru-77a68",
  storageBucket: "haru-77a68.firebasestorage.app",
  messagingSenderId: "446850140059",
  appId: "1:446850140059:web:65f52bda4467932296433e"
};

const app = initializeApp(firebaseConfig);

export const storage: FirebaseStorage = getStorage(app);

