// src/components/Logo.tsx
import React from "react";
import { Typography } from "@mui/material";
import { logoTypography } from "../styles/themeStyles";

const Logo: React.FC = () => (
    <Typography variant="h6" noWrap sx={logoTypography}>
        Coligo
    </Typography>
);

export default Logo;
