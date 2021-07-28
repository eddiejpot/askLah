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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
        <Button color="inherit" onClick={logInWithGoogle}>Log in with google</Button>
        <Button color="inherit" onClick={signUpWithGoogle}>Sign Up with google</Button>
      </Toolbar>
    );
  };

  // final return
  return (
    <div className={classes.root}>
      <AppBar position="static">
        {contentOnNavBar()}
      </AppBar>
    </div>
  );
}
