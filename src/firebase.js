import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAut6vqnimGfA8-stmTnB-q4tyrXv2aJow",
    authDomain: "tipourboire-57c09.firebaseapp.com",
    projectId: "tipourboire-57c09",
    storageBucket: "tipourboire-57c09.appspot.com",
    messagingSenderId: "592397685193",
    appId: "1:592397685193:web:e6c6a5fca6aeccef5f1818",
    measurementId: "G-5LS7DQYY60"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;