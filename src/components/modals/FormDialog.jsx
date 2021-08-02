/* ================================================================== */
/* ===================================== Import Modules ============= */
/* ================================================================== */
/* ========= Import util modules ========== */

/* ========= Import MUI modules ========== */
import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getCookie, createCookie, deleteCookie } from '../../../utils/cookie.mjs';

export default function FormDialog({ userName, setUserName }) {
  const [open, setOpen] = React.useState(false);
  // if session has userName cookie, show value
  // const [userName, setUserName] = React.useState(getCookie('userName') || "You're Anonymous");
  const userNameRef = React.useRef();

  // Check if user has userName cookie

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
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {userName}
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
    </div>
  );
}
