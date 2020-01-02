import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyD0-SmnnZUkMQ79WQ9BoGmxg5gxHeglNk4",
  authDomain: "doctore-fix.firebaseapp.com",
  databaseURL: "https://doctore-fix.firebaseio.com",
  projectId: "doctore-fix",
  storageBucket: "doctore-fix.appspot.com",
  messagingSenderId: "705365696235",
  appId: "1:705365696235:web:5f734b3c190cfc73f2a8ae",
  measurementId: "G-4VHP7MZWTF"
};

firebase.initializeApp(config);

const onChange = (firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
});

// firebase utils
const increment = firebase.firestore.FieldValue.increment(1);
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// firebase collections
const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");
const gruposCollection = db.collection("grupos");

export {
  db,
  auth,
  increment,
  currentUser,
  usersCollection,
  sessionsCollection,
  gruposCollection,
  onChange
};
