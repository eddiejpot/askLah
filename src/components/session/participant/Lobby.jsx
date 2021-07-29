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

export default function Lobby({ sessionId, setComponentToRender, sessionDetails }) {
  return (
    <>
      {sessionDetails
        ? (
          <>
            <NavBarParticipant sessionName={sessionDetails.title} />
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
