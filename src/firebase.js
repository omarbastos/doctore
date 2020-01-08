import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyAtwUSnMzMSzRGxrZlL3z5CwLADZ-BIYDM",
  authDomain: "doctore-alfa.firebaseapp.com",
  databaseURL: "https://doctore-alfa.firebaseio.com",
  projectId: "doctore-alfa",
  storageBucket: "doctore-alfa.appspot.com",
  messagingSenderId: "409330698434",
  appId: "1:409330698434:web:042bc27403d082c19d135b"
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
const incrementRS = firebase.firestore.FieldValue;

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
  onChange,
  incrementRS
};
