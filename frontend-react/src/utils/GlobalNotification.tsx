import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { hideNotification } from "../state/notification/notificationSlice";

const GlobalNotification: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const notification = useSelector((state: RootState) => state.notification);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(hideNotification());
    };

    return (
        <Snackbar
            open={notification.open}
            autoHideDuration={notification.autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                onClose={handleClose}
                severity={notification.type}
                sx={{ width: "100%" }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalNotification;
