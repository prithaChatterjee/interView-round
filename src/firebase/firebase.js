import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyBdwSe-iJXcMep3urKolzGqIJGl3v016MA",
        authDomain: "auth-interview.firebaseapp.com",
        projectId: "auth-interview",
        storageBucket: "auth-interview.appspot.com",
        messagingSenderId: "618095158653",
        appId: "1:618095158653:web:d2da13e79f30fb46c25814"
      }
)
export const auth = app.auth()

export default app