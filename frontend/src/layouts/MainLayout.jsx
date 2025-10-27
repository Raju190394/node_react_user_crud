import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/MainLayout.css";
function MainLayout() {
  return (
    <>
        <div className="layout">
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="page-content">
                <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    </>
  );
}

export default MainLayout;
