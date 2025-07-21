// src/components/ResponsiveDrawer.tsx
import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useMediaQuery,
    Drawer,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useTheme } from "@mui/material/styles";
import { drawerWidth, sidebarGradient } from "../styles/themeStyles";
import Logo from "./Logo";

const ResponsiveDrawer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* AppBar for mobile */}
            {isMobile && (
                <AppBar
                    position="fixed"
                    sx={{
                        background: sidebarGradient,
                        boxShadow: "none",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            sx={{
                                display: { xs: "flex", sm: "none" },
                                alignItems: "center",
                            }}
                        >
                            <Logo />
                        </Box>
                    </Toolbar>
                </AppBar>
            )}

            {/* Sidebar: permanent on desktop, temporary on mobile */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="sidebar"
            >
                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}
                    open={isMobile ? mobileOpen : true}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            background: sidebarGradient,
                            color: "white",
                            mt: isMobile
                                ? `${theme.mixins.toolbar.minHeight}px`
                                : 0,
                        },
                    }}
                >
                    {!isMobile && <Logo />}
                    <Sidebar />
                </Drawer>
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: isMobile ? `${theme.mixins.toolbar.minHeight}px` : 0,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default ResponsiveDrawer;
