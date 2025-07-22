import {
    Alert,
    Box,
    CircularProgress,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import AnnouncementCard from "./MainSection/AnnouncementCard";
import TaskCard from "./MainSection/TaskCard";
import { useEffect, useState } from "react";
import { baseUrl } from "../../config"; 


interface AnnouncementData {
    _id: string;
    senderName: string;
    senderRole: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

interface TaskData {
    _id: string;
    type: "quiz" | "assignment";
    title: string;
    course: string;
    topic: string;
    dueDate: string;
}

const MainContent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
    const [loadingAnnouncements, setLoadingAnnouncements] =
        useState<boolean>(true);
    const [announcementsError, setAnnouncementsError] = useState<string | null>(
        null
    );

    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true);
    const [tasksError, setTasksError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const url = baseUrl + "/api/announcements";
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAnnouncements(data.result);
            } catch (error: any) {
                console.error("Error fetching announcements:", error);
                setAnnouncementsError("Failed to load announcements.");
            } finally {
                setLoadingAnnouncements(false);
            }
        };

        fetchAnnouncements();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            const url = baseUrl + "/api";
            try {
                const [quizzesResponse, assignmentsResponse] =
                    await Promise.all([
                        fetch(`${url}/quizzes`),
                        fetch(`${url}/assignments`),
                    ]);

                if (!quizzesResponse.ok) {
                    throw new Error(
                        `HTTP error! Quizzes status: ${quizzesResponse.status}`
                    );
                }
                if (!assignmentsResponse.ok) {
                    throw new Error(
                        `HTTP error! Assignments status: ${assignmentsResponse.status}`
                    );
                }

                const quizzesData = await quizzesResponse.json();
                const assignmentsData = await assignmentsResponse.json();

                const allTasks: TaskData[] = [
                    ...quizzesData.result.map((quiz: any) => ({
                        _id: quiz._id,
                        type: "quiz",
                        title: quiz.title,
                        course: quiz.course,
                        topic: quiz.topic,
                        dueDate: quiz.dueDate,
                    })),
                    ...assignmentsData.result.map((assignment: any) => ({
                        _id: assignment._id,
                        type: "assignment",
                        title: assignment.title,
                        course: assignment.course,
                        topic: assignment.topic,
                        dueDate: assignment.dueDate,
                    })),
                ];

                const sortedTasks = allTasks.sort(
                    (a, b) =>
                        new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime()
                );

                setTasks(sortedTasks);
            } catch (error: any) {
                console.error("Error fetching tasks:", error);
                setTasksError("Failed to load what's due.");
            } finally {
                setLoadingTasks(false);
            }
        };

        fetchTasks();
    }, []);

    const formatDueDate = (isoDateString: string) => {
        const date = new Date(isoDateString);
        return (
            date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }) +
            " - " +
            date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
        );
    };

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

                {loadingAnnouncements && (
                    <CircularProgress
                        sx={{ display: "block", margin: "20px auto" }}
                    />
                )}
                {announcementsError && (
                    <Alert severity="error">{announcementsError}</Alert>
                )}

                {!loadingAnnouncements &&
                    !announcementsError &&
                    (announcements.length > 0 ? (
                        announcements.map((announcement) => (
                            <AnnouncementCard
                                key={announcement._id}
                                name={announcement.senderName}
                                role={announcement.senderRole}
                                message={announcement.content}
                            />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No announcements available.
                        </Typography>
                    ))}
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
                {loadingTasks && (
                    <CircularProgress
                        sx={{ display: "block", margin: "20px auto" }}
                    />
                )}
                {tasksError && <Alert severity="error">{tasksError}</Alert>}

                {!loadingTasks &&
                    !tasksError &&
                    (tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                type={task.type}
                                title={task.title}
                                course={task.course}
                                topic={task.topic}
                                dueDate={formatDueDate(task.dueDate)}
                            />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No tasks due.
                        </Typography>
                    ))}
            </Box>
        </Box>
    );
};

export default MainContent;
