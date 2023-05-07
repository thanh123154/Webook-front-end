import { initializeApp, type FirebaseOptions, type FirebaseApp } from "firebase/app";
import { type Firestore, getFirestore } from "firebase/firestore";
import { type FirebaseStorage, getStorage } from "firebase/storage";

const config: FirebaseOptions = {
  apiKey: "AIzaSyBeRlNnpSAS-IgnodhdDzyt3pJMOiraGvY",
  authDomain: "webook-374111.firebaseapp.com",
  projectId: "webook-374111",
  storageBucket: "webook-374111.appspot.com",
  messagingSenderId: "662119371152",
  appId: "1:662119371152:web:c86fb57895d31eeb9f6315",
  measurementId: "G-L42GZX05JQ",
};

const app: FirebaseApp = initializeApp(config);

export const storage: FirebaseStorage = getStorage(app);
export const db: Firestore = getFirestore(app);
