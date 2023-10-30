import app from 'firebase/app' 
import firebase from 'firebase' 

const firebaseConfig = {
    apiKey: "AIzaSyAkrnZc6oN5XArXugDl9ugPC_xdzOPPRsU",
    authDomain: "proyecto-integrador-mml.firebaseapp.com",
    projectId: "proyecto-integrador-mml",
    storageBucket: "proyecto-integrador-mml.appspot.com",
    messagingSenderId: "504828747798",
    appId: "1:504828747798:web:34fadfa4df2e1ed2f4d537",
    measurementId: "G-46KFVT1CGR"
  };

  app.initializeApp(firebaseConfig) 

  export const auth = firebase.auth()
  export const storage = app.storage() 
  export const db = app.firestore() 
  