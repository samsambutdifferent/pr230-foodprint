import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyClPJ6obq1jrGZFFo7P0qgOPdEOaPcarto",
    authDomain: "swift-yew-2030.firebaseapp.com",
    databaseURL: "https://swift-yew-2030.firebaseio.com",
    projectId: "swift-yew-2030",
    storageBucket: "swift-yew-2030.appspot.com",
    messagingSenderId: "714109045789",
    appId: "1:714109045789:web:1cd93d76dc066f578b4af4",
    measurementId: "G-07MZ23FY5E"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();