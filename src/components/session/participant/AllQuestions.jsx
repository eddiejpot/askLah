/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import firebase ========== */
import React, { useState, useEffect } from 'react';
import { db, firebaseRef } from '../../../services/firebase/config.mjs';

/* ========= Import react modules ========== */

/* ========= Import react components ========== */
import QuestionCard from '../../cards/QuestionCard.jsx';
/* ========= Import MUI modules ========== */

/* ========= Import util modules ========== */

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function AllQuestions({ questions, sessionId }) {
  // final return
  return (
    <>
      {
        questions.map((question) => (
          <QuestionCard key={question.id} question={question} sessionId={sessionId} />
        ))
        }
    </>
  );
}
