import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";


export const firebaseConfig = {
    apiKey: "AIzaSyBSDPTz2vz9woSAOvh1w1PsaUkC59zvwsc",
    authDomain: "test-lol-8c584.firebaseapp.com",
    projectId: "test-lol-8c584",
    storageBucket: "test-lol-8c584.appspot.com",
    messagingSenderId: "966447834824",
    appId: "1:966447834824:web:993203326e87c2c1de67fd",
    measurementId: "G-H2FNEHBJ5C",
    dataBaseURL: "https://test-lol-8c584-default-rtdb.firebaseio.com/"
  };
  
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const database = getFirestore(app);
  const analytics = getAnalytics(app);