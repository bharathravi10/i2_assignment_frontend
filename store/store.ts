import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modelSlice';
import snackbarReducer from './snackbarSlice'
import notesReducer from './notesSlice'
import authReducer from './slice/auth'
export const store = configureStore({
  reducer: {
    modal: modalReducer, 
    snackbar: snackbarReducer,
    getNotes: notesReducer,
    auth: authReducer
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
