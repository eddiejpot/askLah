/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting

import axios from 'axios'; // Axios Module
import React, { useState, useEffect, useRef } from 'react'; // React Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import Lobby from './components/session/participant/Lobby.jsx'; // React Component
import SessionTemplate from './components/session/participant/SessionTemplate.jsx'; // React Component
import NavBarParticipant from './components/navBar/NavBarParticipant.jsx'; // React Component
import { getCookie, createCookie, deleteCookie } from '../utils/cookie.mjs'; // Util Module
import { db } from './services/firebase/config.mjs'; // Firebase Module
import CircularIndeterminate from './components/loading/CircularIndeterminate.jsx'; // MUI Module

/* ================================================================== */
/* ========================================================= STYLES = */
/* ================================================================== */
const useStyles = makeStyles((theme) => ({
  main: {
    // height: '100vh',
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */

export default function SessionLobby({ windowUrl }) {
  const classes = useStyles();
  // Component states
  // components to render are sessionNotFound, lobby, session, loading
  const [componentToRender, setComponentToRender] = useState('loading');
  const [sessionDetails, setSessionDetails] = useState({});
  const [userName, setUserName] = useState(getCookie('userName') || "You're Anonymous");

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
      // Check DB for session details
      const { data: getSessionDetails } = await axios.get('/api/sessions',
        {
          params: {
            sessionId,
          },
        });
      setSessionDetails(() => getSessionDetails);
      setComponentToRender(() => 'lobby');
    }
  }, []);

  const chooseComponentToRender = () => {
    let output;
    switch (componentToRender) {
      case 'loading':
        output = (<CircularIndeterminate />);
        break;
      case 'lobby':
        output = (<Lobby sessionId={sessionId} sessionDetails={sessionDetails} setComponentToRender={setComponentToRender} />);
        break;
      case 'session':
        output = (<SessionTemplate sessionId={sessionId} sessionDetails={sessionDetails} userName={userName} setUserName={setUserName} />);
        break;
      default:
        // sessionNotFound
        output = (<h1>Session Not Found</h1>);
        break;
    }
    return output;
  };

  /* ======================================================== RENDER = */
  return (
    <div>
      <NavBarParticipant sessionName={sessionDetails.title} userName={userName} setUserName={setUserName} />
      <div className={classes.main}>
        {chooseComponentToRender()}
      </div>
    </div>
  );
}
