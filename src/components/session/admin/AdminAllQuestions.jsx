/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting
import React, { useState, useEffect } from 'react'; // React Module
import QuestionCardAdmin from '../../cards/QuestionCardAdmin.jsx'; // React Component

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function AdminAllQuestions({ questions, sessionId }) {
  /* ======================================================== RENDER = */
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
