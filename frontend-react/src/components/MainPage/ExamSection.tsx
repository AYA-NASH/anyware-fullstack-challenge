import { Box, Typography, Button, Paper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { gradientColor } from "../../styles/colors";

const ExamSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Paper
                elevation={2}
                sx={{
                    width: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    p: 0,
                    position: "relative",
                    background: isMobile ? "none" : "#ffffff",
                }}
            >
                {isMobile && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url("/images/exam_illustration.png")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            zIndex: 0,
                        }}
                    />
                )}

                {isMobile && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1,
                        }}
                    />
                )}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            p: isMobile ? 3 : 5,
                            color: isMobile ? "#ffffff" : "#000000",
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{
                                background: isMobile ? "none" : gradientColor,
                                WebkitBackgroundClip: isMobile
                                    ? "unset"
                                    : "text",
                                WebkitTextFillColor: isMobile
                                    ? "#ffffff"
                                    : "transparent",
                                display: "inline-block",
                                mb: "10px",
                                color: isMobile ? "#ffffff" : "inherit",
                            }}
                        >
                            EXAMS TIME
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Here we are, Are you ready to fight? Don’t worry, we
                            prepared some tips to be ready for your exams.
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                fontStyle: "italic",
                                color: isMobile ? "#e0e0e0" : "gray",
                                mb: 3,
                            }}
                        >
                            “Nothing happens until something moves” - Albert
                            Einstein
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#3dc5a0",
                                textTransform: "none",
                                px: 3,
                                "&:hover": {
                                    backgroundColor: "#35b194",
                                },
                            }}
                        >
                            View exams tips
                        </Button>
                    </Box>

                    {!isMobile && (
                        <Box
                            sx={{
                                flex: 1,
                                minHeight: "250px",
                                backgroundImage: `url("/images/exam_illustration.png")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right center",
                                backgroundSize: "contain",
                            }}
                        />
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default ExamSection;
