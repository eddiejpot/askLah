/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting
import moment from 'moment';
import React from 'react'; // React Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import Grid from '@material-ui/core/Grid'; // MUI Module
import Card from '@material-ui/core/Card'; // MUI Module
import CardContent from '@material-ui/core/CardContent'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import CssBaseline from '@material-ui/core/CssBaseline'; // MUI Module
import Tooltip from '@material-ui/core/Tooltip'; // MUI Module
import CopyClipboardButton from '../buttons/CopyClipboardButton.jsx'; // React Component

/* ================================================================== */
/* ========================================================= STYLES = */
/* ================================================================== */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 5,
  },
  vote: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  editSession: {
    cursor: 'pointer',
  },
  status: {
    // textAlign: 'center',
  },
}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function SessionCard({ sessionDetails, setComponentToRender }) {
  const classes = useStyles();

  // get current date
  const currentdate = moment().format('DD/MM/YYYY');
  const styleSessionDate = moment(sessionDetails.date).format('DD/MM/YYYY');
  const daysToEvent = moment(sessionDetails.date).fromNow();

  // set sessionStatus
  let sessionStatus;
  if (currentdate === styleSessionDate) {
    sessionStatus = 'today';
  } else if (daysToEvent.includes('ago')) {
    sessionStatus = 'archived';
  } else {
    sessionStatus = daysToEvent;
  }

  // click event
  const handleClick = () => {
    console.log(sessionDetails.sessionId);
    // render admin session
    setComponentToRender(sessionDetails.sessionId);
  };

  /* ======================================================== RENDER = */
  return (
    <Card className={classes.root}>
      <CssBaseline />
      <CardContent>
        <Grid container className={classes.content}>
          <Grid item xs={6} className={classes.grid}>
            <Tooltip title="open session">
              <Typography variant="h6" onClick={handleClick} className={classes.editSession}>
                {sessionDetails.title}
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs className={classes.grid}>
            <Typography variant="h6">
              {sessionStatus}
            </Typography>
          </Grid>

          <Grid item xs className={classes.grid}>
            <Typography variant="h6">
              {styleSessionDate}
            </Typography>
          </Grid>

          <Grid item xs className={classes.grid}>
            <Typography variant="h6">
              <CopyClipboardButton
                text={`${window.location.href
                }session/${sessionDetails.sessionId}`}
                buttonSize="small"
              />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
