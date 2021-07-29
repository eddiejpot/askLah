/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import firebase ========== */
import React, { useState, useEffect } from 'react';
import { db, firebaseRef } from '../../../services/firebase/config.mjs';

/* ========= Import react modules ========== */

/* ========= Import react components ========== */

/* ========= Import MUI modules ========== */

/* ========= Import util modules ========== */

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function AllQuestions({ questions }) {
  // final return
  return (
    <>
      <ul>
        {
        questions.map((question) => (
          <div key={question.id}>
            <p>
              Asked by:
              {question.whoAsked}
              <span>
                Question:
                {question.text}
              </span>
            </p>
          </div>
        ))
        }
      </ul>
    </>
  );
}
