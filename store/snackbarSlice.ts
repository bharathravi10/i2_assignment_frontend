import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SnackbarState {
  isOpen: boolean;
  message: string;
  severity: 'success' | 'error'; // for different types of alerts
}

const initialState: SnackbarState = {
  isOpen: false,
  message: '',
  severity: 'success',
};

const snackbarSlice = createSlice({
  name: 'snackbar-state',
  initialState,
  reducers: {
    showSnackbar(
      state,
      action: PayloadAction<{ message: string; severity: 'success' | 'error' }>
    ) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideSnackbar(state) {
      state.isOpen = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
