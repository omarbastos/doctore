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

export {
  db,
  auth,
  increment,
  currentUser,
  usersCollection,
  sessionsCollection,
  onChange
};
