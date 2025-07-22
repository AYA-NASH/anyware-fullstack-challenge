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

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <List sx={{ flexGrow: 1, pt: 2, color: "white" }}>
            {sidebarData.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                    <ListItemButton
                        key={item.label}
                        onClick={() => navigate(item.path)}
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
