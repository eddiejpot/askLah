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
  // const fireBaseCollection = db.collection(sessionId);

  // const [questions, setQuestions] = useState([]);

  // const updateQuestions = (snaps) => {
  //   console.log('LISTENER: AH YES DB UPDATED!');
  //   const newQuestions = [];

  //   data.forEach((doc) => {
  //     const question = doc.data();
  //     newQuestions.push(question);
  //   });
  //   console.log('UPDATING STATE IN REACT');
  //   setQuestions(newQuestions);
  // };

  // // Realtime Listener for updates to DB
  // fireBaseCollection
  //   .orderBy('createdAt')
  //   .onSnapshot((snaps) => {
  //     // Loop through documents in database
  //     updateQuestions(snaps);
  //   });

  // final return
  return (
    <>
      <ul>
        {
        questions.map((question) => <li>{question.text}</li>)
        }
      </ul>
    </>
  );
}
