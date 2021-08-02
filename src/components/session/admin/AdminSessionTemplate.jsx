/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting

import axios from 'axios'; // Axios Module
import React, { useState, useEffect, useRef } from 'react'; // React Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import Grid from '@material-ui/core/Grid'; // MUI Module
import CssBaseline from '@material-ui/core/CssBaseline'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import Container from '@material-ui/core/Container'; // MUI Module
import Link from '@material-ui/core/Link'; // MUI Module
import Button from '@material-ui/core/Button'; // MUI Module
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'; // MUI Module
import ScrollableTabsButtonAuto from '../../tabs/ScrollableTabsButtonAuto.jsx'; // React Component
import AdminAllQuestions from './AdminAllQuestions.jsx'; // React Component
import EditSession from '../../modals/EditSession.jsx'; // React Component
import { db, firebaseRef } from '../../../services/firebase/config.mjs'; // Firebase Module
import CopyClipboardButton from '../../buttons/CopyClipboardButton.jsx'; // React Component

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
    marginTop: theme.spacing(20),
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2rem',
  },

}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function AdminSessionTemplate({
  sessionId, setComponentToRender, userSessions, setUserSessions,
}) {
  const classes = useStyles();
  const [sessionDetails, setSessionDetails] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    // Check DB for session details
    const { data: getSessionDetails } = await axios.get('/api/sessions',
      {
        params: {
          sessionId,
        },
      });
    setSessionDetails(() => getSessionDetails);

    // Realtime Listener for updates to DB
    // higest votes go at the top
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

  // Helper function that splits all the questions into answered / unanswered
  const splitQuestions = (array) => {
    const answeredArr = [];
    const unAnsweredArr = [];
    array.forEach((question) => {
      if (question.isAnswered) {
        answeredArr.push(question);
      }
      else {
        unAnsweredArr.push(question);
      }
    });

    return {
      answered: answeredArr,
      unAnswered: unAnsweredArr,
    };
  };

  /* ======================================================== RENDER = */
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Container component="main" className={classes.main}>
        <Grid container className={classes.content}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => setComponentToRender('dashboard')}
          >
            Back to Dashboard
          </Button>
        </Grid>
        <Grid container className={classes.content}>
          <Typography variant="h4" gutterBottom>
            Edit Session:
            {' '}
            {sessionDetails.title}
          </Typography>
        </Grid>

        <Grid container className={classes.content}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Total Questions (
              {questions.length}
              )
            </Typography>
          </Grid>

          <Grid item xs>
            <CopyClipboardButton
              text={`${window.location.href
              }session/${sessionDetails.sessionId}`}
              buttonSize="medium"
            />
          </Grid>

          <Grid item xs>

            <EditSession sessionDetails={sessionDetails} setSessionDetails={setSessionDetails} setUserSessions={setUserSessions} />
            {/* <Typography variant="h6" gutterBottom>
              <Button
                variant="contained"
                color="default"
                size="medium"
                className={classes.button}
                startIcon={<EditIcon />}
              >
                Edit Session Details
              </Button>
            </Typography> */}
          </Grid>
          <Grid item xs={12}>
            <ScrollableTabsButtonAuto
              renderNotAnswered={<AdminAllQuestions questions={splitQuestions(questions).unAnswered} sessionId={sessionId} />}
              renderAnswered={<AdminAllQuestions questions={splitQuestions(questions).answered} sessionId={sessionId} />}
            />
          </Grid>
        </Grid>

      </Container>
    </div>
  );
}

// <div className={classes.root}>
//   <CssBaseline />
//   <Container component="main" className={classes.main}>
//     <Grid container>
//       <Typography variant="h6" gutterBottom>
//         Total Questions
//       </Typography>
//     </Grid>

//   </Container>
// </div>
