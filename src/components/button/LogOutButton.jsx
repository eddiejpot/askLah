import React from 'react';

export default function LogOutButton({ logOut }) {
  return (
    <div className="login-buttons">
      <button className="logOut-button" onClick={logOut}>
        <span> Log Out</span>
      </button>
    </div>
  );
}
