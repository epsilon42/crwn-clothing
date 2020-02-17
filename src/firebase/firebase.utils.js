import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBOndnaF51qL_G6Y07SQJdoXZVye5qpLYE",
  authDomain: "crwn-db-fc9a8.firebaseapp.com",
  databaseURL: "https://crwn-db-fc9a8.firebaseio.com",
  projectId: "crwn-db-fc9a8",
  storageBucket: "crwn-db-fc9a8.appspot.com",
  messagingSenderId: "382387856972",
  appId: "1:382387856972:web:3c671aa0b0265f1fed76e9",
  measurementId: "G-102ETG8J6J"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
