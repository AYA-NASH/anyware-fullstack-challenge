import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import { RequireAuth } from "./state/auth/RequireAuth";
import { clearLogoutTimer, startLogoutTimer } from "./state/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import GlobalNotification from "./utils/GlobalNotification";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.authorized
    );

    const SESSION_TIMEOUT = 5 * 1000;

    useEffect(() => {
        if (isAuthorized) {
            dispatch(startLogoutTimer(SESSION_TIMEOUT));
        }

        const resetTimerOnActivity = () => {
            if (isAuthorized) {
                dispatch(startLogoutTimer(SESSION_TIMEOUT));
            }
        };

        window.addEventListener("mousemove", resetTimerOnActivity);
        window.addEventListener("keydown", resetTimerOnActivity);
        window.addEventListener("click", resetTimerOnActivity);

        return () => {
            window.removeEventListener("mousemove", resetTimerOnActivity);
            window.removeEventListener("keydown", resetTimerOnActivity);
            window.removeEventListener("click", resetTimerOnActivity);

            dispatch(clearLogoutTimer());
        };
    }, [isAuthorized, dispatch]);

    return (
        <Router>
            <GlobalNotification />
            <Routes>
                <Route path="/login" element={<WelcomePage />} />

                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
