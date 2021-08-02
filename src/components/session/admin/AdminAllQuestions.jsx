/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import firebase ========== */
import React, { useState, useEffect } from 'react';
import { db, firebaseRef } from '../../../services/firebase/config.mjs';

/* ========= Import react modules ========== */

/* ========= Import react components ========== */
import QuestionCardAdmin from '../../cards/QuestionCardAdmin.jsx';
/* ========= Import MUI modules ========== */

/* ========= Import util modules ========== */

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function AdminAllQuestions({ questions, sessionId }) {
  // final return
  return (
    <>
      {
        questions.map((question) => (
          <QuestionCardAdmin key={question.id} question={question} sessionId={sessionId} />
        ))
        }
    </>
  );
}
