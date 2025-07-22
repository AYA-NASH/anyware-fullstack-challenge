import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import InsightsIcon from "@mui/icons-material/Insights";
import CampaignIcon from "@mui/icons-material/Campaign";
import LogoutIcon from "@mui/icons-material/Logout";
import { ReactElement } from "react";

interface SidebarItem {
    label: string;
    path: string;
    icon: ReactElement;
}

const sidebarData: SidebarItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: <HomeIcon /> },
    { label: "Schedule", path: "/schedule", icon: <CalendarMonthIcon /> },
    { label: "Courses", path: "/courses", icon: <ClassIcon /> },
    { label: "Gradebook", path: "/gradebook", icon: <SchoolIcon /> },
    { label: "Performance", path: "/performance", icon: <InsightsIcon /> },
    { label: "Announcement", path: "/announcement", icon: <CampaignIcon /> },
    { label: "Logout", path: "/logout", icon: <LogoutIcon /> },
];

export default sidebarData;
