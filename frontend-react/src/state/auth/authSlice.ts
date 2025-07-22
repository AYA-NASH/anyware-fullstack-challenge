import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { showNotification } from "../notification/notificationSlice";

interface AuthState{
    authorized: boolean;
    logoutTimerId: number | null;
}

const storedAuth = localStorage.getItem("auth");

const initialState: AuthState = {
    authorized: storedAuth === "true",
    logoutTimerId: null,
};

let logoutTimer: number | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state: AuthState) {
      state.authorized = true;
    },
    logout(state: AuthState) {
      state.authorized = false;
       if (logoutTimer) {
          clearTimeout(logoutTimer);
          logoutTimer = null;
        }
    },
    setLogoutTimerId(state: AuthState, action: PayloadAction<number | null>) {
      state.logoutTimerId = action.payload;
    },
  },
});

export const { login, logout, setLogoutTimerId } = authSlice.actions;

export default authSlice.reducer;

export const startLogoutTimer = (duration: number): AppThunk => (dispatch) => {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
    }
    logoutTimer = setTimeout(() => {
        dispatch(logout());

        localStorage.removeItem("auth"); 

        dispatch(showNotification({
            message: "Session expired. You have been automatically logged out.",
            type: "warning",
            autoHideDuration: null
        }));
        
    }, duration);
};

export const resetLogoutTimer = (duration: number): AppThunk => (dispatch) => {
    dispatch(startLogoutTimer(duration)); 
};

export const clearLogoutTimer = (): AppThunk => (dispatch) => {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
    }
};