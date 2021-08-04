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
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'; // MUI Module
import IconButton from '@material-ui/core/IconButton'; // MUI Module
import Box from '@material-ui/core/Box'; // MUI Module
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
  icon: {
    border: '1px solid #757eb3',
    height: '0.5rem',
    width: '0.5rem',
    padding: '1rem',
  },
  askquestion: {
    textAlign: 'left',
  },
}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function QuestionCard({ question, sessionId }) {
  const [btnDisabled, setBtnDisabled] = useState(false);

  const classes = useStyles();

  const handleVoteClick = (event) => {
    const newVoteValue = question.vote + 1;
    // update vote in db
    db.collection(sessionId).doc(question.id).update({
      vote: newVoteValue,
    });
    // disable button for user. they can only vote for each item once
    setBtnDisabled(() => true);
  };

  const renderStatus = () => {
    let componentToRender;
    if (question.isAnswered) {
      componentToRender = (
        <Typography gutterBottom variant="body1">
          Answered
        </Typography>
      );
    } else {
      componentToRender = (
        <Typography gutterBottom variant="body1">
          Not Answered
        </Typography>
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
            <Typography gutterBottom variant="body1">
              Votes:
              <Typography gutterBottom variant="subtitle2" display="inline">
                {question.vote}
              </Typography>
            </Typography>
            <IconButton onClick={handleVoteClick} disabled={btnDisabled} className={classes.icon}>
              <ThumbUpOutlinedIcon />
            </IconButton>
          </Grid>

          <Grid className={classes.ask}>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {question.whoAsked}
            </Typography>
            <Typography variant="body1" className={classes.askquestion}>
              <Box fontWeight="fontWeightBold">
                {question.text}
              </Box>
            </Typography>
          </Grid>

          <Grid className={classes.status}>
            {renderStatus()}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
