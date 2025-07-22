import React from "react";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import sidebarData from "./SidebarData";
import { hoverStyles } from "../../styles/themeStyles";
import { logout } from "../../state/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { showNotification } from "../../state/notification/notificationSlice";

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("auth");

        dispatch(
            showNotification({
                message: "Goodbye! You have been logged out.",
                type: "success",
                autoHideDuration: 4000,
            })
        );

        navigate("/login");
    };

    return (
        <List sx={{ flexGrow: 1, pt: 2, color: "white" }}>
            {sidebarData.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                    <ListItemButton
                        key={item.label}
                        onClick={() =>
                            item.label == "Logout"
                                ? handleLogout()
                                : navigate(item.path)
                        }
                        sx={{
                            bgcolor: isActive ? "white" : "transparent",
                            color: isActive ? "primary.main" : "white",
                            "&:hover": hoverStyles,
                            borderRadius: 2,
                            mx: 2,
                            my: 1,
                        }}
                    >
                        <ListItemIcon sx={{ color: "inherit" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default Sidebar;
