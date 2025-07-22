import { Box, Typography, Paper, Button } from "@mui/material";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

interface TaskCardProps {
    type: "quiz" | "assignment";
    title: string;
    course: string;
    topic: string;
    dueDate: string;
}

const TaskCard = ({ type, title, course, topic, dueDate }: TaskCardProps) => {
    const isQuiz = type === "quiz";
    const buttonText = isQuiz ? "Start Quiz" : "Solve Assignment";
    const IconComponent = isQuiz
        ? HourglassEmptyOutlinedIcon
        : AssignmentTurnedInOutlinedIcon;

    const primaryColor = "#52b2bf";

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: 3,
                backgroundColor: "#ffffff",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1.5,
                }}
            >
                <IconComponent sx={{ color: primaryColor, fontSize: 28 }} />

                <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: primaryColor }}
                >
                    {title}
                </Typography>
            </Box>

            <Box sx={{ ml: 4.5, mb: 2 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    lineHeight={1.5}
                >
                    Course: {course}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    lineHeight={1.5}
                >
                    Topic: {topic}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    lineHeight={1.5}
                >
                    Due to: {dueDate}
                </Typography>
            </Box>

            <Button
                variant="outlined"
                sx={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    borderRadius: 2,
                    textTransform: "none",
                    width: "100%",
                    py: 1.2,
                }}
            >
                {buttonText}
            </Button>
        </Paper>
    );
};

export default TaskCard;
