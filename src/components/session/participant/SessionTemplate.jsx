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

/* ========= Import MUI modules ========== */

/* ========= Import util modules ========== */

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function SessionTemplate({ sessionId }) {
  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    // Realtime Listener for updates to DB
    const unsubscribe = db.collection(sessionId)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        const newQuestions = [];
        console.log('NEW DATA!');
        querySnapshot.forEach((doc) => {
          newQuestions.push(doc.data());
        });
        setQuestions(newQuestions);
      });
    // Stop listening to changes
    // unsubscribe();
  }, []);

  return (

    <>
      <h2>Question</h2>
      <QuestionInput sessionId={sessionId} />
      <h2>All Questions</h2>
      <AllQuestions questions={questions} />
    </>
  );
}
