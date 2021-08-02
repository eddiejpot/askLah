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
import FormDialog from '../modals/FormDialog.jsx';

/* ========= Import util modules ========== */
import { getCookie, createCookie, deleteCookie } from '../../../utils/cookie.mjs';

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

export default function NavBarParticipant({ sessionName, userName, setUserName }) {
  const classes = useStyles();

  // final return
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Session:
            {' '}
            {sessionName}
          </Typography>
          <FormDialog userName={userName} setUserName={setUserName} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
