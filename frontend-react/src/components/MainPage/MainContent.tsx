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

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface AnnouncementData {
    _id: string;
    senderName: string;
    senderRole: string;
    content: string;
    createdAt: string;
    updatedAt: string;
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
