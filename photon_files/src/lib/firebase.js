import firebase from 'firebase'
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBn1n34tmZg7lZa-26qww6dLZLYvy8rwQ8",
    authDomain: "photon-7dda4.firebaseapp.com",
    projectId: "photon-7dda4",
    storageBucket: "photon-7dda4.appspot.com",
    messagingSenderId: "432867593907",
    appId: "1:432867593907:web:b5b3d455188760049f6ac6",
    measurementId: "G-R17WFV5HH6"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;