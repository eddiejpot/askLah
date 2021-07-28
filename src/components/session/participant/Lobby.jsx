/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import firebase modules ========== */
// import { useAuthState } from 'react-firebase-hooks/auth';

/* ========= Import axios========== */
import axios from 'axios';

/* ========= Import react modules ========== */
import React, { useState, useEffect } from 'react';

/* ========= Import react components ========== */
import NavBarParticipant from '../../navBar/NavBarParticipant.jsx';

/* ======== Import Firebase modules from config ============ */

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function Lobby({ sessionId, setComponentToRender }) {
  // Component states
  const [sessionDetails, setSessionDetails] = useState(false);

  // Lifecycle
  // On page load
  // 1. Check DB for session details
  useEffect(async () => {
    const { data: getSessionDetails } = await axios.get('/api/sessions',
      {
        params: {
          sessionId,
        },
      });
    setSessionDetails(() => getSessionDetails);
  }, []);

  return (
    <>
      {sessionDetails
        ? (
          <>
            <NavBarParticipant participantName="Anonymus" sessionName={sessionDetails.title} />
            <p>{sessionDetails.speaker}</p>
            <p>{sessionDetails.date}</p>
            <p>{sessionDetails.description}</p>
            <button type="button" onClick={() => setComponentToRender('session')}> Enter QA </button>
          </>
        )
        : null}
    </>
  );
}
