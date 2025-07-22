import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import AnnouncementCard from "./MainSection/AnnouncementCard";
import TaskCard from "./MainSection/TaskCard";

const MainContent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 3,
                mt: 4,
            }}
        >
            <Box
                sx={{
                    flex: isMobile ? 1 : 2,
                    maxWidth: isMobile ? "100%" : "none",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Announcements
                    </Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{ cursor: "pointer" }}
                    >
                        All
                    </Typography>
                </Box>
                <AnnouncementCard
                    name="Mr Ahmed Mostafa"
                    role="Math 101"
                    message="Hi my hero! I just want you ready to our exams and focus on remaining assessments to gain more grades. good luck my warriors! 😊"
                />
                <AnnouncementCard
                    name="Mrs Salma Ahmed"
                    role="Physics 02"
                    message="Hello my students, I want to announce that the next quiz will be within 3 days and will cover the whole unit 2. Add and subtract number, Study hard Good luck :)"
                />
                <AnnouncementCard
                    name="School management"
                    role="Management"
                    message="Goooooooood morning, Warriors! That get-ready-for-the-day call is heard each morning by 850 students at Goodwyn Junior High School in Tagamoa, Egypt. I just want you ready to our exams and focus on remaining assessments to gain more grades. good luck my warriors! 😊"
                />
                <AnnouncementCard
                    name="Events Manager"
                    role="Events"
                    message="Hellooo, Can’t wait our upcoming trip on the next weekend. The trip will be to Dreampark and Pyramids. :) Q to book your seat please contact your class teacher."
                />
            </Box>

            <Box
                sx={{
                    flex: isMobile ? 1 : 1,
                    maxWidth: isMobile ? "100%" : "none",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        What’s Due?
                    </Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{ cursor: "pointer" }}
                    >
                        All
                    </Typography>
                </Box>
                <TaskCard
                    type="quiz"
                    title="Unit 2 quiz"
                    course="Physics 02"
                    topic="Unit2: Motion and forces"
                    dueDate="20 Dec 2017 - 09:00 PM"
                />
                <TaskCard
                    type="assignment"
                    title="12-12 Assignment"
                    course="Arabic K12"
                    topic="-------"
                    dueDate="20 Dec 2017 - 09:00 PM"
                />
            </Box>
        </Box>
    );
};

export default MainContent;
