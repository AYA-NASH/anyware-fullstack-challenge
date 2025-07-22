import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth/authSlice";
import NotificationReducer from "./notification/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: NotificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = (dispatch: AppDispatch, getState: () => RootState) => void; 