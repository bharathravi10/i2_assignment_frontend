import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modelSlice';
import snackbarReducer from './snackbarSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer, 
    snackbar: snackbarReducer
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
