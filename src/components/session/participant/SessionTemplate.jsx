/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting

import React, { useState, useEffect } from 'react'; // React Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import Grid from '@material-ui/core/Grid'; // MUI Module
import CssBaseline from '@material-ui/core/CssBaseline'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import Container from '@material-ui/core/Container'; // MUI Module
import Link from '@material-ui/core/Link'; // MUI Module
import { db, firebaseRef } from '../../../services/firebase/config.mjs'; // Firebase Module
import NavBarParticipant from '../../navBar/NavBarParticipant.jsx'; // React Component
import AllQuestions from './AllQuestions.jsx'; // React Component
import QuestionInput from './QuestionInput.jsx'; // React Component
import { getCookie } from '../../../../utils/cookie.mjs'; // Util Module

/* ================================================================== */
/* ========================================================= STYLES = */
/* ================================================================== */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100vh',
    minWidth: '100vh',
    margin: '0px',
    padding: '0px',
    background: '#F5F5F5',
  },

  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    padding: '0 4rem',
  },
  questionInput: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2rem',
  },
  allQuestions: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function SessionTemplate({
  sessionId, sessionDetails, userName, setUserName,
}) {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  // const [userName, setUserName] = useState(getCookie('userName') || "You're Anonymous");

  useEffect(async () => {
    // Realtime Listener for updates to DB
    const unsubscribe = db.collection(sessionId)
      .orderBy('vote', 'desc')
      .onSnapshot((querySnapshot) => {
        const newQuestions = [];
        querySnapshot.forEach((doc) => {
          // ignore dummy data
          // add documentId into each question object
          doc.id === 'dummy' ? null : newQuestions.push({ id: doc.id, ...doc.data() });
        });
        setQuestions(newQuestions);
      });
    // Stop listening to changes
    // unsubscribe();
  }, []);

  /* ======================================================== RENDER = */
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main}>
        <Grid container className={classes.questionInput}>
          <Typography variant="h6" gutterBottom>
            Ask away!
          </Typography>
          <QuestionInput sessionId={sessionId} userName={userName} setUserName={setUserName} />
        </Grid>
        <Grid container className={classes.allQuestions}>
          <AllQuestions questions={questions} sessionId={sessionId} />
        </Grid>
      </Container>
    </div>
  );
}
