/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting

import React from 'react'; // React Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import Grid from '@material-ui/core/Grid'; // MUI Module
import CssBaseline from '@material-ui/core/CssBaseline'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import Container from '@material-ui/core/Container'; // MUI Module
import Link from '@material-ui/core/Link'; // MUI Module

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
    background: 'linear-gradient(20deg, #3f51b5 40%, #e9f3ff 40%)',
  },
  main: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(2),
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    padding: '2rem',
  },

  grid: {
    padding: '2rem',
  },

  footer: {
    justifySelf: 'self-end',
    alignSelf: 'stretch',
    padding: theme.spacing(2, 2),
    backgroundColor: '#3f51b5',
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */

export default function LandingPage() {
  const classes = useStyles();
  /* ======================================================== RENDER = */
  return (

    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main}>

        <Grid container className={classes.content}>
          <Grid item xs className={classes.grid}>
            <Typography variant="h6">
              <img src="/hero-illustration.svg" alt="hero" />
            </Typography>
          </Grid>

          <Grid item xs className={classes.grid}>
            <Typography variant="h2" component="h1" gutterBottom>
              Virtual Q&A Sessions Made Easy
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              Pin a footer to the bottom of the viewport.
              The footer will move as the main element of the page grows.
            </Typography>
          </Grid>
        </Grid>

      </Container>

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">My sticky footer can be found here.</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>

  );
}
