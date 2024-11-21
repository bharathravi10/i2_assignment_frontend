import { Alert, Snackbar } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { hideSnackbar } from '../../../store/snackbarSlice'; 
const CustomizedSnackBar = () => {
  const dispatch = useDispatch();
  const { isOpen, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  // Close snackbar handler
  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  // Auto hide the snackbar after 6 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        dispatch(hideSnackbar());
      }, 6000); // Auto hide after 6 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isOpen, dispatch]);

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackBar;
