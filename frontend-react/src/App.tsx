import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import { RequireAuth } from "./state/auth/RequireAuth";

function App() {
    return (
        <Router>
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
