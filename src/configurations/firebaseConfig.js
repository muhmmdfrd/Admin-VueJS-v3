import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCn-rDWBbeXdvYsiM4HqkujA7m-NL19zdE",
    authDomain: "vuejs-v3-stisla.firebaseapp.com",
    databaseURL: "https://vuejs-v3-stisla.firebaseio.com",
    projectId: "vuejs-v3-stisla",
    storageBucket: "vuejs-v3-stisla.appspot.com",
    messagingSenderId: "133438919369",
    appId: "1:133438919369:web:0f94ae5510490853053318",
    measurementId: "G-PGZQ824EVQ",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const database = firebase.firestore();