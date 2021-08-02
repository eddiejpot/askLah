/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting
import React, { useState, useEffect } from 'react'; // React Module
import QuestionCard from '../../cards/QuestionCard.jsx'; // React Component

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function AllQuestions({ questions, sessionId }) {
  /* ======================================================== RENDER = */
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
