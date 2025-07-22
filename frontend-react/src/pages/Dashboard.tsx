import ExamSection from "../components/MainPage/ExamSection";
import MainContent from "../components/MainPage/MainContent";
import TopBar from "../components/MainPage/TopBar/TopBar";
import ResponsiveDrawer from "../components/SidebarComponents/ResponsiveDrawer";

const Dashboard = () => {
    return (
        <ResponsiveDrawer>
            <TopBar />
            <ExamSection />
            <MainContent />
        </ResponsiveDrawer>
    );
};

export default Dashboard;
