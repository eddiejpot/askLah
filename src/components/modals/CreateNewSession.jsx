/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */
/* ========= Import axios========== */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

/* ========= Import react modules ========== */
import React, { useState, useRef } from 'react';

/* ========= Import firebase ========== */

/* ========= Import util modules ========== */

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { db, firebaseRef } from '../../services/firebase/config.mjs';
import { getCookie } from '../../../utils/cookie.mjs';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CreateNewSession({ userSessions, setUserSessions }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const sessionName = useRef();
  const speakerName = useRef();
  const eventDate = useRef();
  const sessionDescription = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    // Generate uuid
    const sessionId = uuidv4();
    //  data to send
    const newSessionData = {
      userId: getCookie('userId'),
      title: sessionName.current,
      speaker: speakerName.current,
      description: sessionDescription.current,
      date: eventDate.current,
      sessionId,
    };
    // Create new session in sql
    const { data: newSessionDetails } = await axios.post('/api/addsession', newSessionData);
    // Create new colletion in firebase
    await db.collection(sessionId).doc('dummy').set({
      dummyData: 'dummy',
    });
    // update sessions
    console.log(userSessions);
    console.log(newSessionDetails);
    setUserSessions(() => [...userSessions, newSessionDetails]);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<AddOutlinedIcon />}
        onClick={handleClickOpen}
      >
        Create a new session
      </Button>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Create a new session
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new Session</DialogTitle>
        <DialogContent>
          <Grid container spacing={0}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              Session Name
            </Typography>
            <TextField
              required
              autoFocus
              id="outlined-basic"
              label=""
              fullWidth
              variant="outlined"
              onChange={(event) => sessionName.current = event.target.value}
            />
          </Grid>

          <Grid container spacing={2}>

            <Grid item xs>
              <Typography variant="subtitle2" display="block" gutterBottom>
                Speaker Name
              </Typography>
              <TextField
                required
                autoFocus
                id="outlined-basic"
                label=""
                fullWidth
                variant="outlined"
                onChange={(event) => speakerName.current = event.target.value}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2" display="block" gutterBottom>
                Date
              </Typography>
              <TextField
                required
                autoFocus
                id="outlined-basic"
                label=""
                type="date"
                fullWidth
                variant="outlined"
                onChange={(event) => eventDate.current = event.target.value}
              />
            </Grid>

          </Grid>

          <Grid container spacing={0}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              Session Description
            </Typography>
            <TextField
              required
              autoFocus
              multiline
              rows={4}
              id="outlined-multiline-static"
              label=""
              fullWidth
              variant="outlined"
              onChange={(event) => sessionDescription.current = event.target.value}
            />
          </Grid>

          <DialogContentText margin>
            Each session has a unique link that will be generated upon creation
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create Session</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
