// firebase.config.ts
import * as firebase from 'firebase/app';
import 'firebase/storage';

import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage } from 'firebase/storage';



const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);

export const storage: FirebaseStorage = getStorage(app);

