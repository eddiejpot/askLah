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

export default function NavBarParticipant({ participantName, sessionName }) {
  const classes = useStyles();

  const editName = () => {

  };

  const contentOnNavBar = () => {
    // If participant provides name
    if (participantName) {
      return (
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {sessionName}
          </Typography>
          <Button color="inherit" onClick={editName}>{participantName}</Button>
        </Toolbar>

      );
    }
    // If participant does not provide name
    return (
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {sessionName}
        </Typography>
        <Button color="inherit" onClick={editName}>Anonymous</Button>
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
