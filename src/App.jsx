/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import firebase auth modules ========== */
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

/* ========= Import axios========== */
import axios from 'axios';

/* ========= Import react modules ========== */
import React, { useState, useEffect } from 'react';

/* ========= Import react components ========== */
import LogInButton from './components/button/LogInButton.jsx';
import LogOutButton from './components/button/LogOutButton.jsx';
import NavBar from './components/navBar/NavBar.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';
import AdminDashboard from './components/adminDashboard/AdminDashboard.jsx';

/* ========= Import util modules ========== */
import { createCookie, deleteCookie } from '../utils/cookie.mjs';

/* ================================================================== */
/* ================================== Firebase Auth Init ============ */
/* ================================================================== */
const firebaseConfig = {
  apiKey: 'AIzaSyAuq_BAfdVK7YDXhYgVWfQnNnWa4gnQcQY',
  authDomain: 'ask-lah.firebaseapp.com',
  projectId: 'ask-lah',
  storageBucket: 'ask-lah.appspot.com',
  messagingSenderId: '364927180279',
  appId: '1:364927180279:web:c455dccacb278e19c8e2f2',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// Initialize Google Auth Proider
const provider = new firebase.auth.GoogleAuthProvider();

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function App() {
  // Component states
  const [userData, setUserData] = useState(null);
  // user actions are: logIn, signUp, null
  const [userAction, setUserAction] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Firebase Google Auth
  const logInWithGoogle = async () => {
    try {
      console.log('loggin in');
      setUserAction(() => 'logIn');
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error('error logging in', error);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      console.log('signing up');
      setUserAction(() => 'signUp');
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error('error signing up', error);
    }
  };

  const logOut = async () => {
    try {
      console.log('logging out');
      await firebase.auth().signOut();
    } catch (error) {
      console.error('error logging out', error);
    }
  };

  // Fire base real time listener to check if user logged in
  // if auth passes we'll return user data else return null
  try {
    firebase.auth().onAuthStateChanged((user) => {
      setUserData(user);
    });
  } catch (error) {
    console.error('error midway loggin in', error);
  }

  // Lifecycle
  useEffect(async () => {
    // --- If user passed Google Auth and is is logging in
    if (userData != null && userAction === 'logIn') {
      console.log('user passed google Auth and is logging in');
      const { email } = userData;
      // check if user in DB: had to use post here in order to send data through
      // if user is in DB. Backend will send user data. If not, backend will send false
      const { data: loggedInUserData } = await axios.post('/api/users', { email });
      // If user found in DB
      if (loggedInUserData) {
        console.log('existing user');
        // send browser cookies
        createCookie('userId', loggedInUserData.id);
        createCookie('userName', loggedInUserData.displayName);
        console.log('welcome back!');
        // update component state
        setIsUserLoggedIn(() => true);
      } else {
        console.log('user not found');
        console.log('create an account!');
        setUserAction(() => null);
        // !!!! TODO: ASK USER TO SIGN UP
      }

    // --- If user passed Google Auth and is is signing up
    } else if (userData != null && userAction === 'signUp') {
      console.log('user passed google Auth and is signing up');
      const { displayName, email } = userData;
      // create new user in DB
      const { data: newUser } = await axios.post('/api/adduser', { displayName, email });
      // send browser cookies
      createCookie('userId', newUser.id);
      createCookie('userName', newUser.displayName);
      // update component state
      setIsUserLoggedIn(() => true);

    // --- If user is logged out / default state
    } else {
      console.log('user is logged out');
      // delete cookies
      deleteCookie('userId');
      deleteCookie('userName');
      // update component state
      setIsUserLoggedIn(() => false);
      setUserAction(() => null);
    }
  }, [userData]);
  // [userData, isUserLoggedIn, userAction]

  return (
    <div>
      { isUserLoggedIn
        ? (
          <>
            <NavBar logOut={logOut} isUserLoggedIn={isUserLoggedIn} />
            <AdminDashboard />
          </>
        )
        : (
          <>
            <NavBar logInWithGoogle={logInWithGoogle} signUpWithGoogle={signUpWithGoogle} isUserLoggedIn={isUserLoggedIn} />
            <LandingPage />
          </>
        )}
    </div>
  );
}
