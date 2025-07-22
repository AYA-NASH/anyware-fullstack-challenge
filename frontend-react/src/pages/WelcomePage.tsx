import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { login, startLogoutTimer } from "../state/auth/authSlice";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

const WelcomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const SESSION_TIMEOUT = 5 * 1000;

    const handleLogin = () => {
        dispatch(login());
        localStorage.setItem("auth", "true");
        dispatch(startLogoutTimer(SESSION_TIMEOUT));
        navigate("/dashboard");
    };

    return (
        <Box
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                background:
                    "linear-gradient(to right, rgba(61, 154, 235, 0.85), rgba(6, 217, 228, 0.85))",
            }}
        >
            <Card
                sx={{
                    minWidth: 340,
                    maxWidth: 400,
                    padding: 3,
                    borderRadius: 4,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#ffffff",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        gutterBottom
                        color="primary"
                        fontWeight="bold"
                    >
                        Welcome!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ marginBottom: 3, color: "#444" }}
                    >
                        Sign in to access your dashboard and stay updated with
                        your courses.
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            backgroundColor: "#00c6ff",
                            color: "#fff",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#00a4d6",
                            },
                        }}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default WelcomePage;
