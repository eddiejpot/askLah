/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import firebase ========== */
import React, { useState, useEffect, useRef } from 'react';
import { db, firebaseRef } from '../../../services/firebase/config.mjs';

/* ========= Import react modules ========== */

/* ========= Import react components ========== */
import FormDialogMini from '../../modals/FormDialogMini.jsx';
/* ========= Import MUI modules ========== */

/* ========= Import util modules ========== */
import { getCookie } from '../../../../utils/cookie.mjs';

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

export default function QuestionInput({ sessionId, userName, setUserName }) {
  const userQuestion = useRef();

  const handleSubmit = async (event) => {
    // Prevent the default form redirect
    event.preventDefault();

    // set information for new question entry
    const text = userQuestion.current;
    const createdAt = firebaseRef.firestore.FieldValue.serverTimestamp();
    const whoAsked = userName;

    // Write a new message to the database collection "questions"
    await db.collection(sessionId).add({
      whoAsked,
      vote: 0,
      status: 'default',
      text,
      createdAt,
      // name: firebase.auth().currentUser.displayName,
      // userId: firebase.auth().currentUser.uid,
    });

    console.log('DATA SENT TO DB!');
    // clear message input field
    document.getElementById('question').value = '';
    // Return false to avoid redirect
    return false;
  };

  const getTextFieldData = (event) => {
    userQuestion.current = event.target.value;
  };

  const buttonToRender = () => {
    if (userName === "You're Anonymous") {
      return (<FormDialogMini userName={userName} setUserName={setUserName} />);
    }
    return (
      <button type="submit">
        <span>ASK</span>
      </button>
    );
  };

  // final return
  return (

    <section id="guestbook-container">
      <form id="ask-question" onSubmit={() => handleSubmit(event)}>
        <p>Leave a message: </p>
        <input type="text" id="question" onChange={getTextFieldData} />
        {buttonToRender()}
      </form>

    </section>
  );
}
