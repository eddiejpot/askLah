/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting
import React, { useState, useEffect } from 'react'; // React Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import AppBar from '@material-ui/core/AppBar'; // MUI Module
import Toolbar from '@material-ui/core/Toolbar'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import FormDialog from '../modals/FormDialog.jsx'; // React Component

/* ================================================================== */
/* ========================================================= STYLES = */
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

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function NavBarParticipant({ sessionName, userName, setUserName }) {
  const classes = useStyles();

  /* ======================================================== RENDER = */
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
