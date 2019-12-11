import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyBUdn07YpuKFf66GTYXPPnfn_AmTUInftU",
  authDomain: "doctore-uc.firebaseapp.com",
  databaseURL: "https://doctore-uc.firebaseio.com",
  projectId: "doctore-uc",
  storageBucket: "doctore-uc.appspot.com",
  messagingSenderId: "895555902961"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// firebase collections
const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");

export { db, auth, currentUser, usersCollection, sessionsCollection };
