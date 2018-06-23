import firebase from "firebase/app";
import 'firebase/auth';

export function createFirebase() {
    const config = {
        apiKey: "AIzaSyAR55es0Q7BASqZ7gEwXc4hrg2vgB_LKMg",
        authDomain: "bepdeli-12087.firebaseapp.com",
        databaseURL: "https://bepdeli-12087.firebaseio.com",
        projectId: "bepdeli-12087",
        storageBucket: "bepdeli-12087.appspot.com",
        messagingSenderId: "99085711391"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(config)
    }
    return firebase;
}