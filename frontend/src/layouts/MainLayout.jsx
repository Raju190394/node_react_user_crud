import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/MainLayout.css";

function MainLayout() {
  return (
    <div className="layout">
      {/* Top Navbar */}
      <Navbar />

      <div className="main-wrapper d-flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Page Area */}
        <div className="content-wrapper d-flex flex-column flex-grow-1">
          <main className="page-content flex-grow-1 p-3">
            <Outlet />
          </main>

          {/* Footer fixed at bottom */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
