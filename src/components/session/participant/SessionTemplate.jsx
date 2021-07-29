/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import firebase ========== */
import React, { useState, useEffect } from 'react';
import { db, firebaseRef } from '../../../services/firebase/config.mjs';

/* ========= Import react modules ========== */
import QuestionInput from './QuestionInput.jsx';
import AllQuestions from './AllQuestions.jsx';

/* ========= Import react components ========== */
import NavBarParticipant from '../../navBar/NavBarParticipant.jsx';

/* ========= Import MUI modules ========== */

/* ========= Import util modules ========== */
import { getCookie } from '../../../../utils/cookie.mjs';
/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function SessionTemplate({ sessionId, sessionDetails }) {
  const [questions, setQuestions] = useState([]);
  const [userName, setUserName] = useState(getCookie('userName') || "You're Anonymous");

  useEffect(async () => {
    // Realtime Listener for updates to DB
    const unsubscribe = db.collection(sessionId)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        const newQuestions = [];
        querySnapshot.forEach((doc) => {
          // add documentId into each question object
          newQuestions.push({ id: doc.id, ...doc.data() });
        });
        setQuestions(newQuestions);
      });
    // Stop listening to changes
    // unsubscribe();
  }, []);

  return (
    <>
      <NavBarParticipant sessionName={sessionDetails.title} userName={userName} setUserName={setUserName} />
      <h2>Question</h2>
      <QuestionInput sessionId={sessionId} userName={userName} setUserName={setUserName} />
      <h2>All Questions</h2>
      <AllQuestions questions={questions} />
    </>
  );
}
