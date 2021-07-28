/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import react modules ========== */
import React, { useState, useEffect } from 'react';

/* ========= Import react components ========== */
import Lobby from './components/session/participant/Lobby.jsx';
import SessionTemplate from './components/session/participant/SessionTemplate.jsx';

/* ========= Import util modules ========== */
import { getCookie, createCookie, deleteCookie } from '../utils/cookie.mjs';

/* ======== Import Firebase modules from config ============ */
import { db } from './services/firebase/config.mjs';

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function App({ windowUrl }) {
  // Component states
  // components to render are sessionNotFound, lobby, session, loading
  const [componentToRender, setComponentToRender] = useState('loading');

  // Lifecycle
  // On page load
  // 1. Get sessionId from url
  // 2. Check DB if session exists
  //    If Exists: Show lobby and fetch the data in the background
  //    Else: show message that room does not exist
  const sessionId = windowUrl.slice(windowUrl.lastIndexOf('/') + 1);
  useEffect(async () => {
    const querySnapshot = await db.collection(sessionId).get();
    if (querySnapshot.empty) {
      setComponentToRender(() => 'sessionNotFound');
    } else {
      setComponentToRender(() => 'lobby');
    }
  }, []);

  const chooseComponentToRender = () => {
    let output;
    switch (componentToRender) {
      case 'loading':
        output = (<h1>loading</h1>);
        break;
      case 'lobby':
        output = (<Lobby sessionId={sessionId} setComponentToRender={setComponentToRender} />);
        break;
      case 'session':
        output = (<SessionTemplate sessionId={sessionId} />);
        break;
      default:
        // sessionNotFound
        output = (<h1>Session Not Found</h1>);
        break;
    }
    return output;
  };

  return (
    <div>
      {chooseComponentToRender()}
    </div>
  );
}
