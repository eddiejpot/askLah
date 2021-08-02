/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import firebase modules ========== */

/* ========= Import axios========== */
import axios from 'axios';

/* ========= Import react modules ========== */
import React, { useState, useEffect } from 'react';

/* ========= Import react components ========== */
import NavBarAdmin from './components/navBar/NavBarAdmin.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';
import AdminDashboard from './components/adminDashboard/AdminDashboard.jsx';

/* ========= Import util modules ========== */
import { getCookie, createCookie, deleteCookie } from '../utils/cookie.mjs';

/* ======== Import Firebase modules from config ============ */
import { auth, firebaseRef, provider } from './services/firebase/config.mjs';

/* ========= Import MUI modules ========== */
/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function App() {
  // Component states
  // check if there is a user that is logged in
  const [userData, setUserData] = useState(null);
  // user actions are: logIn, signUp, logOut, null
  const [userAction, setUserAction] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Firebase Google Auth
  const logInWithGoogle = async () => {
    try {
      console.log('loggin in with google auth');
      setUserAction(() => 'logIn');
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error('error logging in', error);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      console.log('signing up with google auth');
      setUserAction(() => 'signUp');
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error('error signing up', error);
    }
  };

  const logOut = async () => {
    try {
      console.log('logging out of google auth');
      await auth.signOut();
      setUserAction(() => 'logOut');
      setUserData(() => 'loggingOut');
    } catch (error) {
      console.error('error logging out', error);
    }
  };

  // Fire base real time listener to check if user logged in
  // if auth passes we'll return user data else return null
  try {
    auth.onAuthStateChanged((user) => {
      setUserData(user);
    });
  } catch (error) {
    console.error('error midway loggin in', error);
  }

  // Lifecycle
  // On page load
  // 1. Check if there is loggedIn cookie
  //    If there is then load AdminDashboard Component
  //    Else give option to log in / sign up
  useEffect(async () => {
    if (getCookie('userId')) {
      setIsUserLoggedIn(() => true);
    }
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
        // update component state
        setIsUserLoggedIn(() => true);
      } else {
        console.log('user not found');
        console.log('create an account!');
        setUserAction(() => null);
        // !!!! TODO: ASK USER TO SIGN UP
      }
    }
    // --- If user passed Google Auth and is is signing up
    if (userData != null && userAction === 'signUp') {
      console.log('user passed google Auth and is signing up');
      const { displayName, email } = userData;
      // create new user in DB
      const { data: newUser } = await axios.post('/api/adduser', { displayName, email });
      // send browser cookies
      createCookie('userId', newUser.id);
      createCookie('userName', newUser.displayName);
      // update component state
      setIsUserLoggedIn(() => true);
    }
    // --- If user is logged out / default state
    if (userAction === 'logOut') {
      console.log('user is logged out');
      // delete cookies
      deleteCookie('userId');
      deleteCookie('userName');
      // update component state
      setIsUserLoggedIn(() => false);
      setUserAction(() => null);
      setUserData(() => null);
    }
  }, [userData]);
  // [userData, isUserLoggedIn, userAction]

  return (
    <>
      { isUserLoggedIn
        ? (
          <>
            <NavBarAdmin logOut={logOut} isUserLoggedIn={isUserLoggedIn} />
            <AdminDashboard />
          </>
        )
        : (
          <>
            <NavBarAdmin logInWithGoogle={logInWithGoogle} signUpWithGoogle={signUpWithGoogle} isUserLoggedIn={isUserLoggedIn} />
            <LandingPage />
          </>
        )}
    </>
  );
}
