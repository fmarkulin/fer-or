import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnMXECMZCVdBQCfs33imEYJ6k3YkhjUWs",
  authDomain: "fer-or.firebaseapp.com",
  projectId: "fer-or",
  storageBucket: "fer-or.appspot.com",
  messagingSenderId: "421079904660",
  appId: "1:421079904660:web:6142ef00b8f2503281df81",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// if (process.env.NODE_ENV === "development") {
//   console.log("development mode");
//   connectFirestoreEmulator(db, "localhost", 8080);
//   console.log("connected to firestore emulator");
// }

export const storage = getStorage();
