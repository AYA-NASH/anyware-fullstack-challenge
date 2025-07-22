import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
    open: boolean;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    autoHideDuration: number | null; 
}

const initialState: NotificationState = {
    open: false,
    message: '',
    type: 'info',
    autoHideDuration: 6000, 
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<{ message: string; type?: 'success' | 'info' | 'warning' | 'error'; autoHideDuration?: number | null }>) => {
            state.open = true;
            state.message = action.payload.message;
            state.type = action.payload.type || 'info';
            state.autoHideDuration = action.payload.autoHideDuration !== undefined ? action.payload.autoHideDuration : 6000;
        },

        hideNotification: (state) => {
            state.open = false;
            state.message = ''; 
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;