/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting
import React, { useState, useEffect } from 'react'; // React Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import Grid from '@material-ui/core/Grid'; // MUI Module
import Card from '@material-ui/core/Card'; // MUI Module
import CardContent from '@material-ui/core/CardContent'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import Box from '@material-ui/core/Box'; // MUI Module
import Checkbox from '@material-ui/core/Checkbox'; // MUI Module
import FormGroup from '@material-ui/core/FormGroup'; // MUI Module
import FormControlLabel from '@material-ui/core/FormControlLabel'; // MUI Module
import { db, firebaseRef } from '../../services/firebase/config.mjs'; // Firebase Module

/* ================================================================== */
/* ========================================================= STYLES = */
/* ================================================================== */
const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // margin: 2,
    // padding: '0.2rem 0',
    marginBottom: '0.5rem',
    background: '#F5F5F5',
  },
  card: {
    // margin: '0px',
    // padding: '0px',
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  vote: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20%',
  },
  ask: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '60%',
  },
  status: {
    textAlign: 'center',
    width: '20%',
  },
  button: {
    margin: theme.spacing(1),
  },
  askquestion: {
    textAlign: 'left',
  },
}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function QuestionCardAdmin({ question, sessionId }) {
  const classes = useStyles();

  const handleClick = () => {
    console.log(question.isAnswered);
    let toggleAnswered = true;
    if (question.isAnswered) {
      toggleAnswered = false;
    }
    // update isAswered in db
    db.collection(sessionId).doc(question.id).update({
      isAnswered: toggleAnswered,
    });
  };

  const answeredStatus = () => {
    let componentToRender;
    if (question.isAnswered) {
      componentToRender = (
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" checked onClick={handleClick} />}
          label="Answered"
          labelPlacement="end"
        />
      );
    } else {
      componentToRender = (
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" onClick={handleClick} />}
          label="Answered"
          labelPlacement="end"
        />
      );
    }
    return componentToRender;
  };

  /* ======================================================== RENDER = */
  return (
    <Card className={classes.root}>
      <CardContent className={classes.card}>
        <Grid container spacing={1} className={classes.main}>

          <Grid className={classes.vote}>
            <Typography gutterBottom variant="subtitle2">
              Votes:
            </Typography>
            <Typography gutterBottom variant="body1" display="inline">
              {question.vote}
            </Typography>
          </Grid>

          <Grid className={classes.ask}>
            <Typography gutterBottom variant="subtitle2" color="text.secondary">
              {question.whoAsked}
            </Typography>
            <Typography variant="body1" className={classes.askquestion}>
              <Box fontWeight="fontWeightBold">
                {question.text}
              </Box>
            </Typography>
          </Grid>

          <Grid className={classes.status}>
            <FormGroup aria-label="position" row>
              {answeredStatus()}
            </FormGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
