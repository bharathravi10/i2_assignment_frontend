import { createSlice } from "@reduxjs/toolkit";

// project imports
 
interface IUser {
  user_id: string
  username: string
  email: string
}

export interface IInitialState {
    error: string| null;
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: IUser| null;
}

// initial state
const initialState: IInitialState = {
  error: null,
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

// ==============================|| SLICE - AUTHENTICATION ||============================== //

const authentication = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },
    userLoginSuccess: (state, action) => {
      state.isInitialized = true;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    userLogoutSuccess: (state) => {
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.user = null;
    }
  },
});

export default authentication.reducer;

export const { userLoginSuccess, userLogoutSuccess, hasError } =
  authentication.actions;
