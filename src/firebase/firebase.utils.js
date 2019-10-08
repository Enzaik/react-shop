import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCah9gMZmpZGWCLV3gZS59VoeuZAci9RxU",
  authDomain: "shop-4dbad.firebaseapp.com",
  databaseURL: "https://shop-4dbad.firebaseio.com",
  projectId: "shop-4dbad",
  storageBucket: "shop-4dbad.appspot.com",
  messagingSenderId: "185628300756",
  appId: "1:185628300756:web:7a2b4ffda4ea988b67f241",
  measurementId: "G-6PNKQX7MPN"
};

firebase.initializeApp(config);

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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
