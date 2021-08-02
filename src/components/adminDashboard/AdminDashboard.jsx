/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting

import axios from 'axios'; // Axios Module
import React, { useState, useEffect } from 'react'; // React Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import Grid from '@material-ui/core/Grid'; // MUI Module
import CssBaseline from '@material-ui/core/CssBaseline'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import Container from '@material-ui/core/Container'; // MUI Module
import TextField from '@material-ui/core/TextField'; // MUI Module
import Link from '@material-ui/core/Link'; // MUI Module
import Box from '@material-ui/core/Box'; // MUI Module
import { getCookie } from '../../../utils/cookie.mjs'; // Util Module
import CreateNewSession from '../modals/CreateNewSession.jsx'; // React Component
import SessionCard from '../cards/SessionCard.jsx'; // React Component

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
    background: '#343434',
    color: '#FFFFFF',
  },
  main: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(2),
    padding: '0 4rem',
  },
  sessions: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function AdminDashboard() {
  const classes = useStyles();
  const [userSessions, setUserSessions] = useState([]);
  // states: 'dashboard', 'session-uuid'
  const [componentToRender, setComponentToRender] = useState('dashboard');

  // On page load
  useEffect(async () => {
    // Fetch all of user's created sessions
    const userId = getCookie('userId');
    const { data: allSessions } = await axios.get('/api/allsessions',
      {
        params: {
          userId,
        },
      });
    setUserSessions(() => [...allSessions]);
  }, []);

  /* ======================================================== RENDER = */

  const componentRender = () => {
    let renderComponent;
    if (componentToRender === 'dashboard') {
      renderComponent = (
        <Container component="main" className={classes.main}>

          <Grid container className={classes.content}>
            <Typography variant="h4" gutterBottom>
              <Box fontWeight="fontWeightBold" m={1}>
                All Sessions
              </Box>
            </Typography>
          </Grid>
          <Grid container className={classes.contentBar}>
            <Grid className={classes.contentBar}>
              <Grid>
                <TextField id="outlined-basic" label="quick search" variant="filled" disabled />
              </Grid>
              <Grid m="2rem">
                <Box m="2rem">
                  <Typography variant="h6">
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        console.info("I'm a button.");
                      }}
                    >
                      view archived
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid>
              <CreateNewSession userSessions={userSessions} setUserSessions={setUserSessions} />
            </Grid>
          </Grid>

          <Grid container className={classes.content}>
            <Grid item xs={6} className={classes.grid}>
              <Typography variant="h6">
                Session name
              </Typography>
            </Grid>

            <Grid item xs className={classes.grid}>
              <Typography variant="h6">
                Status
              </Typography>
            </Grid>

            <Grid item xs className={classes.grid}>
              <Typography variant="h6">
                Date
              </Typography>
            </Grid>

            <Grid item xs className={classes.grid}>
              <Typography variant="h6">
                Session link
              </Typography>
            </Grid>
          </Grid>

          <Grid container className={classes.sessions}>
            {
            userSessions.map((session) => (
              <SessionCard key={session.sessionId} sessionDetails={session} setComponentToRender={setComponentToRender} />
            ))
            }
          </Grid>
        </Container>
      );
    } else {
      // render admin session
    }
    return renderComponent;
  };

  console.log(componentToRender);
  return (
    <div className={classes.root}>
      <CssBaseline />
      {componentRender()}
    </div>
  );
}
