/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting

import React, { useState, useEffect } from 'react'; // React Module
import moment from 'moment'; // moment Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import Grid from '@material-ui/core/Grid'; // MUI Module
import CssBaseline from '@material-ui/core/CssBaseline'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import Container from '@material-ui/core/Container'; // MUI Module
import Link from '@material-ui/core/Link'; // MUI Module
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'; // MUI Module
import Button from '@material-ui/core/Button'; // MUI Module

/* ================================================================== */
/* ========================================================= STYLES = */
/* ================================================================== */
const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: '100vh',
    marginTop: theme.spacing(12),
    // minWidth: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // background: '#F5F5F5',
  },
  main: {
    margin: '0 5rem',
    padding: '2rem 5rem',
    background: '#FFF',
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0px',
  },

  grid: {
    marginBottom: '2rem',
  },

  button: {
    width: '100%',
    padding: '1rem 0',
  },
}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */

export default function Lobby({ sessionId, setComponentToRender, sessionDetails }) {
  const classes = useStyles();
  /* ======================================================== RENDER = */
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main}>

        <Grid container className={classes.content}>
          <Grid item xs className={classes.grid}>
            <Typography variant="h6">
              Speaker
            </Typography>
          </Grid>
          <Grid item xs className={classes.grid}>
            <Typography variant="body1">
              {sessionDetails.speaker}
            </Typography>
          </Grid>
        </Grid>

        <Grid container className={classes.content}>
          <Grid item xs className={classes.grid}>
            <Typography variant="h6">
              Date
            </Typography>
          </Grid>
          <Grid item xs className={classes.grid}>
            <Typography variant="body1">
              {moment(sessionDetails.date).format('DD/MM//YYYY')}
            </Typography>
          </Grid>
        </Grid>

        <Grid container className={classes.content}>
          <Grid item xs className={classes.grid}>
            <Typography variant="h6">
              Description
            </Typography>
            <Typography variant="body1">
              {sessionDetails.description}
            </Typography>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<ArrowRightAltIcon />}
          onClick={() => setComponentToRender('session')}
        >
          Enter Q&A
        </Button>

      </Container>

    </div>
  );
}

// <>
//   {sessionDetails
//     ? (
//       <>
//         {/* <NavBarParticipant sessionName={sessionDetails.title} /> */}
//         <p>{sessionDetails.speaker}</p>
//         <p>{sessionDetails.date}</p>
//         <p>{sessionDetails.description}</p>
//         <button type="button" onClick={() => setComponentToRender('session')}> Enter QA </button>
//       </>
//     )
//     : null}
// </>
