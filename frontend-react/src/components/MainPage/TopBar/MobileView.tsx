import {
    Box,
    Typography,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Avatar,
    Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { primaryText } from "../../../styles/colors";
import IconWithBadge from "../../../utils/IconWithBadge";

const MobileView: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2,
                backgroundColor: "#fff",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: primaryText }}
                >
                    Welcome Talia,
                </Typography>

                <IconButton onClick={handleMenuOpen}>
                    <ArrowDropDownIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    boxShadow: "0 0 4px rgba(0,0,0,0.05)",
                }}
            >
                <InputBase
                    placeholder="Search..."
                    sx={{ ml: 1, flex: 1, fontSize: "14px" }}
                />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem disabled>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar
                            alt="Talia"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 32, height: 32 }}
                        />
                        <Typography variant="body1">Talia</Typography>
                    </Box>
                </MenuItem>

                <Divider />

                <MenuItem>
                    <IconWithBadge icon={<NotificationsIcon />} count={4} />
                    <Typography sx={{ ml: 1 }}>Notifications</Typography>
                </MenuItem>

                <MenuItem>
                    <IconWithBadge icon={<MailIcon />} count={3} />
                    <Typography sx={{ ml: 1 }}>Messages</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default MobileView;
