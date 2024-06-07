import * as firebase from "firebase/app";
import type { Auth } from "firebase/auth";
import { getAuth } from "firebase/auth";

export type { AuthError, User as AuthUser } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  // We don't check this into Github because Google complains about it being
  // present in a publid repo, despite it not being a security risk 🤷‍♂️
  // See: https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_API_KEY,
  authDomain: "the-commit-lab-reader.firebaseapp.com",
  projectId: "the-commit-lab-reader",
  storageBucket: "the-commit-lab-reader.appspot.com",
  messagingSenderId: "571063538284",
  appId: "1:571063538284:web:80fdee60b36b065f87be49",
};

// Prevent re-initialization (mainly applies for hot reloads in dev, but it
// doesn't hurt to have this check in all envs)
if (firebase.getApps().length === 0) {
  firebase.initializeApp(firebaseConfig);
}

interface FirebaseAuthReady {
  auth: Auth;
  isReady: true;
}

interface FirebaseAuthNotReady {
  auth: null;
  isReady: false;
}

type FirebaseAuthStatus = FirebaseAuthReady | FirebaseAuthNotReady;

export const getFirebaseAuth = (): FirebaseAuthStatus => {
  const app = firebase.getApps()[0];

  return {
    auth: getAuth(app),
    isReady: true,
  };
};
