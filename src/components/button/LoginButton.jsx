import React from 'react';
import { googleLogIn } from '../../services/firebase.js';

export default function LogInButton({ setUserData }) {
  const logInThroughGoolge = async () => {
    const userData = await googleLogIn();
    setUserData(userData);
  };
  return (
    <div className="login-buttons">
      <button className="login-provider-button" onClick={logInThroughGoolge}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
        <span> Log in with google</span>
      </button>
    </div>
  );
}
