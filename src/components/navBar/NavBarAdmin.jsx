/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import axios========== */
import axios from 'axios';

/* ========= Import react modules ========== */
import React, { useState, useEffect } from 'react';

/* ========= Import react components ========== */

/* ========= Import MUI modules ========== */
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/* ========= Import util modules ========== */
import { getCookie } from '../../../utils/cookie.mjs';

/* ================================================================== */
/* ============================================== RENDER ============ */
/* ================================================================== */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  adminTitle: {
    margin: '1rem',
    border: '1px solid ',
    borderRadius: '0.2rem',
    padding: '0.25rem',
  },
  nav: {
    // backgroundColor: '#f7f4e4',
    // color: '#363537',
  },
}));

export default function NavBarAdmin({
  isUserLoggedIn, logInWithGoogle, signUpWithGoogle, logOut,
}) {
  const classes = useStyles();

  const contentOnNavBar = () => {
    // If user is logged in
    if (isUserLoggedIn) {
      return (
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Hi
            {' '}
            {getCookie('userName')}
            {' '}
            !
            <Typography variant="overline" className={classes.adminTitle}>
              ADMIN
            </Typography>
          </Typography>
          <Button color="inherit" onClick={logOut}>Log Out</Button>
        </Toolbar>

      );
    }
    // if user is not logged in
    return (
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          AskLah
        </Typography>
        <img src="/google_icon.ico" alt="google-icon" width="20" height="20" />
        <Button color="inherit" onClick={logInWithGoogle}>Log in</Button>
        <Button color="inherit" onClick={signUpWithGoogle}>Sign Up</Button>
      </Toolbar>
    );
  };

  // final return
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.nav}>
        {contentOnNavBar()}
      </AppBar>
    </div>
  );
}
