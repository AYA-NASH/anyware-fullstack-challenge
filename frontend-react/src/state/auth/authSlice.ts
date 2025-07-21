import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    authorized: boolean;
}

const initialState: AuthState = {
    authorized: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.authorized = true;
    },
    logout(state) {
      state.authorized = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
