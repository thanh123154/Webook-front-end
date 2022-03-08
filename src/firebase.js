import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3_1kHc7CJ_nB55U81RGfkUoC5rhzs46I",
  authDomain: "we-book-c7607.firebaseapp.com",
  projectId: "we-book-c7607",
  storageBucket: "we-book-c7607.appspot.com",
  messagingSenderId: "1067217328446",
  appId: "1:1067217328446:web:b6cd43aaa11425b659746f",
  measurementId: "G-7SEP56Y2DM",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
