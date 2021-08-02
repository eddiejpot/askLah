/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting

import * as React from 'react'; // React Module
import Button from '@material-ui/core/Button'; // MUI Module
import TextField from '@material-ui/core/TextField'; // MUI Module
import Dialog from '@material-ui/core/Dialog'; // MUI Module
import DialogActions from '@material-ui/core/DialogActions'; // MUI Module
import DialogContent from '@material-ui/core/DialogContent'; // MUI Module
import DialogContentText from '@material-ui/core/DialogContentText'; // MUI Module
import CssBaseline from '@material-ui/core/CssBaseline'; // MUI Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import DialogTitle from '@material-ui/core/DialogTitle'; // MUI Module
import { getCookie, createCookie, deleteCookie } from '../../../utils/cookie.mjs'; // Util Module

/* ================================================================== */
/* ========================================================= STYLES = */
/* ================================================================== */
const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: '0.25rem',
    width: '100%',
    height: '100%',
  },
}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function FormDialogMini({ userName, setUserName }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const userNameRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // create userName cookie
    if (getCookie('userName')) {
      deleteCookie('userName');
      createCookie('userName', userNameRef.current);
    } else {
      createCookie('userName', userNameRef.current);
    }
    setUserName(userNameRef.current);
    setOpen(false);
  };

  const getTextFieldData = (event) => {
    userNameRef.current = event.target.value;
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Ask
      </Button> */}
      <Button
        variant="outlined"
        // color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        ASK
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hello! 👋</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You'll need to provide us with a name/alias in order to ask questions 😁
          </DialogContentText>
          <TextField
            onChange={getTextFieldData}
            autoFocus
            margin="dense"
            id="name"
            label="enter name/alias here"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
