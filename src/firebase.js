import firebase from 'firebase/app'

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/functions");
require("firebase/storage");

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyCgzECt0z4GLYt-WhDTQFhVX2zATgyPDcI",
authDomain: "curso-vue-3412c.firebaseapp.com",
databaseURL: "https://curso-vue-3412c.firebaseio.com",
projectId: "curso-vue-3412c",
storageBucket: "",
messagingSenderId: "917487804218",
appId: "1:917487804218:web:0a086bad5c9cd40a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

export{
    firebase,
    auth,
    db,
    storage,
    functions
}