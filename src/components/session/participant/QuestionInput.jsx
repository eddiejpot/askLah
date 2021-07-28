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

export default function QuestionInput({ sessionId }) {
  // // const [question, setQuestion] = useState('');

  console.log(sessionId);
  const fireBaseCollection = db.collection(sessionId);

  const handleSubmit = async (event) => {
    // Prevent the default form redirect
    event.preventDefault();
    const inputFieldElement = event.target.getElementsByTagName('input')[0];
    const text = inputFieldElement.value;
    const createdAt = firebaseRef.firestore.FieldValue.serverTimestamp();

    // Write a new message to the database collection "questions"
    await fireBaseCollection.add({
      whoAsked: 'TEST',
      vote: 'TEST',
      status: 'TEST',
      text,
      createdAt,
      // name: firebase.auth().currentUser.displayName,
      // userId: firebase.auth().currentUser.uid,
    });

    console.log('DATA SENT TO DB!');
    // clear message input field
    inputFieldElement.value = '';
    // Return false to avoid redirect
    return false;
  };

  // final return
  return (

    <section id="guestbook-container">
      <form id="ask-question" onSubmit={() => handleSubmit(event)}>
        <p>Leave a message: </p>
        <input type="text" id="question" />
        <button type="submit">
          <span>ASK</span>
        </button>
      </form>

    </section>
  );
}
