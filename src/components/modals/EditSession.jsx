/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting
import moment from 'moment'; // Moment Module
import axios from 'axios'; // Axios Module
import React, { useState, useRef } from 'react'; // React Module
import Button from '@material-ui/core/Button'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import Grid from '@material-ui/core/Grid'; // MUI Module
import TextField from '@material-ui/core/TextField'; // MUI Module
import Dialog from '@material-ui/core/Dialog'; // MUI Module
import DialogActions from '@material-ui/core/DialogActions'; // MUI Module
import DialogContent from '@material-ui/core/DialogContent'; // MUI Module
import DialogTitle from '@material-ui/core/DialogTitle'; // MUI Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import EditIcon from '@material-ui/icons/Edit'; // MUI Module
import { getCookie } from '../../../utils/cookie.mjs'; // Util Module

/* ================================================================== */
/* ========================================================= STYLES = */
/* ================================================================== */
const useStyles = makeStyles((theme) => ({
  main: {
    padding: '2rem 2rem',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function EditSession({ sessionDetails, setSessionDetails, setUserSessions }) {
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

  const handleEdit = async () => {
    //  data to send
    const editedSessionData = {
      userId: getCookie('userId'),
      id: sessionDetails.id,
      title: sessionName.current,
      speaker: speakerName.current,
      description: sessionDescription.current,
      date: eventDate.current,
      // sessionId, id, userId stays the same
    };
    // edit session in sql
    const { data } = await axios.put('/api/editsession', editedSessionData);
    console.log(data);
    setSessionDetails(() => data.updatedSession);
    setUserSessions(() => data.allSessions);
    setOpen(false);
  };

  /* ======================================================== RENDER = */
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<EditIcon />}
        onClick={handleClickOpen}
        size="medium"
      >
        Edit Session Details
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Session</DialogTitle>
        <DialogContent className={classes.main}>
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
              defaultValue={sessionDetails.title}
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
                defaultValue={sessionDetails.speaker}
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
                defaultValue={moment(sessionDetails.date).format('YYYY-MM-DD')}
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
              defaultValue={sessionDetails.description}
              onChange={(event) => sessionDescription.current = event.target.value}
            />
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Confirm Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
