import React from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

const Dashboard = () => {
    return (
        <ResponsiveDrawer>
            <h2>Welcome to Dashboard</h2>
        </ResponsiveDrawer>
    );
};

export default Dashboard;
