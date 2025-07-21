import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.authorized
    );

    return isAuthorized ? children : <Navigate to="/login" replace />;
};
