import { Box, useMediaQuery, useTheme } from "@mui/material";
import DesktopView from "./DesktopView";
import { backgroundColor } from "../../../styles/colors";
import MobileView from "./MobileView";

const TopBar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box sx={{ backgroundColor: backgroundColor, zIndex: 1100 }}>
            {isMobile ? <MobileView /> : <DesktopView />}
        </Box>
    );
};

export default TopBar;
