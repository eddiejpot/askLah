import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyAuq_BAfdVK7YDXhYgVWfQnNnWa4gnQcQY',
  authDomain: 'ask-lah.firebaseapp.com',
  projectId: 'ask-lah',
  storageBucket: 'ask-lah.appspot.com',
  messagingSenderId: '364927180279',
  appId: '1:364927180279:web:c455dccacb278e19c8e2f2',
});

export const firebaseRef = firebase;
export const auth = firebase.auth();
// Initialize firestore
export const db = firebase.firestore();
// Initialize Google Auth Provider
export const provider = new firebase.auth.GoogleAuthProvider();
