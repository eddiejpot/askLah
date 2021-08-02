import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share'; // MUI Module
import { CopyToClipboard } from 'react-copy-to-clipboard'; // React Module

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CopyClipboardButton({ text, buttonSize }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div className={classes.root}>
      <CopyToClipboard text={text}>
        <Button
          variant="outlined"
          color="secondary"
          size={buttonSize}
          className={classes.button}
          onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}
          startIcon={<ShareIcon />}
        >
          Share Session Link
        </Button>
      </CopyToClipboard>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={1000}
        open={open}
        onClose={handleClose}
        message="Link copied to clipboard"
        key={vertical + horizontal}
      />
    </div>
  );
}
