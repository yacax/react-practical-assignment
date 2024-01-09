import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function SimpleSnackbar({ message, severity }) {
  const [open, setOpen] = useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => { if (message) setOpen(true); }, [message]);

  return (
    <div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

SimpleSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.string,
};

SimpleSnackbar.defaultProps = {
  severity: 'error',
};
