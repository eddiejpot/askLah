/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting
import React, { useState, useEffect, useRef } from 'react'; // React Module
import TextField from '@material-ui/core/TextField'; // MUI Module
import Grid from '@material-ui/core/Grid'; // MUI Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import Button from '@material-ui/core/Button'; // MUI Module
import { db, firebaseRef } from '../../../services/firebase/config.mjs'; // Firebase Module
import FormDialogMini from '../../modals/FormDialogMini.jsx'; // React Component

/* ================================================================== */
/* ========================================================= STYLES = */
/* ================================================================== */
const useStyles = makeStyles((theme) => ({
  form: {

  },
  main: {
  },

  textField: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  button: {
    // margin: theme.spacing(1),
    marginLeft: '0.25rem',
    width: '100%',
    height: '100%',
  },
}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function QuestionInput({ sessionId, userName, setUserName }) {
  const classes = useStyles();
  const userQuestion = useRef();
  const [wordCount, setWordCount] = useState('Word limit: 200');

  const handleSubmit = async (event) => {
    // Prevent the default form redirect
    event.preventDefault();

    // set information for new question entry
    const text = userQuestion.current;
    const createdAt = firebaseRef.firestore.FieldValue.serverTimestamp();
    const whoAsked = userName;
    console.log(text);

    // Write a new message to the database collection "questions"
    await db.collection(sessionId).add({
      whoAsked,
      vote: 0,
      isAnswered: false,
      isActive: false,
      text,
      createdAt,
      // name: firebase.auth().currentUser.displayName,
      // userId: firebase.auth().currentUser.uid,
    });

    console.log('DATA SENT TO DB!');
    // clear message input field
    document.getElementById('outlined-textarea').value = '';
    // Return false to avoid redirect
    return false;
  };

  const getTextFieldData = (event) => {
    userQuestion.current = event.target.value;
    setWordCount(`${200 - userQuestion.current.length} words left`);
  };

  const buttonToRender = () => {
    if (userName === "You're Anonymous") {
      return (<FormDialogMini userName={userName} setUserName={setUserName} />);
    }
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
      >
        ASK 🙋
      </Button>
    );
  };

  // final return
  return (
  /* ======================================================== RENDER = */
    <form id="ask-question" className={classes.form} onSubmit={() => handleSubmit(event)}>
      <Grid container className={classes.main}>
        <Grid item xs={10} className={classes.grid}>
          <TextField
            id="outlined-textarea"
            label={wordCount}
            rows={2}
            multiline
            variant="outlined"
            onChange={getTextFieldData}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs className={classes.grid}>
          {buttonToRender()}
        </Grid>
      </Grid>
    </form>

  );
}
