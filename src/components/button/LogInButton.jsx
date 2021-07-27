import React from 'react';

export default function LoginButton({ logInWithGoogle }) {
  return (
    <div className="login-buttons">
      <button className="login-provider-button" onClick={logInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
        <span> Log in with google</span>
      </button>
    </div>
  );
}
