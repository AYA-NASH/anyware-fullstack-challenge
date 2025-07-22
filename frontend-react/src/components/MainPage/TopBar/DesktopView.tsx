import { Box, Typography, Avatar, InputBase } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import IconWithBadge from "../../../utils/IconWithBadge";

import { primaryText, backgroundColor } from "../../../styles/colors";

const DesktopView: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: (theme) => `${theme.spacing(2)} ${theme.spacing(3)}`,
                backgroundColor: backgroundColor,
                gap: 0,
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                zIndex: 1100,
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 600,
                    color: primaryText,
                    textAlign: "left",
                    width: "100%",
                }}
            >
                Welcome Talia,
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                        borderRadius: "20px",
                        padding: "4px 12px",
                        boxShadow: "0 0 4px rgba(0,0,0,0.05)",
                        width: "300px",
                    }}
                >
                    <SearchIcon fontSize="small" sx={{ color: "#aaa" }} />
                    <InputBase
                        placeholder="Search..."
                        sx={{ ml: 1, flex: 1, fontSize: "14px" }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                    }}
                >
                    <IconWithBadge icon={<NotificationsIcon />} count={1} />
                    <IconWithBadge icon={<MailIcon />} count={3} />
                    <Avatar
                        alt="Talia"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 36, height: 36 }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default DesktopView;
