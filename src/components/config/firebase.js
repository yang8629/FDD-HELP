import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBuXjFbmnYOmkZMMsv41JqGvc9lcrUAOsk",
    authDomain: "help-49fbd.firebaseapp.com",
    databaseURL: "https://help-49fbd.firebaseio.com",
    projectId: "help-49fbd",
    storageBucket: "help-49fbd.appspot.com",
    messagingSenderId: "786581740292"
};

firebase.initializeApp(config);

export const Database = firebase.database();