import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

const AnnouncementCard = ({
    name,
    role,
    message,
}: {
    name: string;
    role: string;
    message: string;
}) => {
    const avatarBgColor = "#415C77";
    return (
        <Card
            sx={{
                borderRadius: 3,
                backgroundColor: "#ffffff",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                mb: 2,
                p: 2,
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: avatarBgColor,
                        width: 40,
                        height: 40,
                        fontSize: "1rem",
                        mb: 0.5,
                    }}
                >
                    {name[0]}
                </Avatar>
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    lineHeight={1.2}
                    textAlign="center"
                >
                    {name.length > 10 ? name.split(" ")[0] : name}{" "}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    lineHeight={1.2}
                    textAlign="center"
                >
                    {role}
                </Typography>
            </Box>

            <CardContent sx={{ p: 0, flexGrow: 1, pt: 0.5 }}>
                <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.5, color: "#555555" }}
                >
                    {message}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AnnouncementCard;
