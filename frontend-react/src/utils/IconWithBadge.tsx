import { Badge, IconButton } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactNode } from "react";
import { badgesColor, iconsColor } from "../styles/colors";
interface IconWithBadgeProps {
    icon: ReactNode;
    count: number;
    badgeColor?: string;
    iconColor?: string;
    sx?: SxProps;
}

const IconWithBadge = ({
    icon,
    count,
    badgeColor = badgesColor,
    iconColor = iconsColor,
    sx,
}: IconWithBadgeProps) => (
    <IconButton>
        <Badge
            badgeContent={count}
            sx={{
                "& .MuiBadge-badge": {
                    backgroundColor: badgeColor,
                    color: "white",
                },
                ...sx,
            }}
        >
            {icon}
        </Badge>
    </IconButton>
);

export default IconWithBadge;
