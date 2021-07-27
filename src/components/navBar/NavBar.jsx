/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */

/* ========= Import axios========== */
import axios from 'axios';
import { darkolivegreen } from 'color-name';

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

export default function NavBar({
  isUserLoggedIn, logInWithGoogle, signUpWithGoogle, logOut,
}) {
  console.log('in nav');
  console.log(isUserLoggedIn);

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

//   export default function NavBar({
//   isUserLoggedIn, logInWithGoogle, signUpWithGoogle, logOut,
// }) {
//   console.log('in nav');
//   console.log(isUserLoggedIn);

//   const classes = useStyles();

//   const contentOnNavBar = () => {
//     // If user is logged in
//     if (isUserLoggedIn) {
//       return (
//         <>
//           <h6>
//             Hi
//             {getCookie('userName')}
//             !
//           </h6>
//           <a className="navbar-brand" href="/">Navbar</a>
//           <button type="button" className="logOut-button" onClick={logOut}>
//             <span> Log Out</span>
//           </button>
//         </>
//       );
//     }
//     // if user is not logged in
//     return (
//       <>
//         <a className="navbar-brand" href="/">Navbar</a>
//         <button type="button" className="login-provider-button" onClick={logInWithGoogle}>
//           <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
//           <span> Log in with google</span>
//         </button>

//         <button type="button" className="login-provider-button" onClick={signUpWithGoogle}>
//           <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
//           <span> Sign Up with google</span>
//         </button>
//       </>
//     );
//   };

//   // final return
//   return (
//     <>
//       <nav className="navbar navbar-light bg-light">
//         <div className="container-fluid">
//           {contentOnNavBar()}
//         </div>
//       </nav>
//     </>
//   );
// }
