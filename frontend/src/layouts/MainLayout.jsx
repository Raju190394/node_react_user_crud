import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet /> {/* Child routes render yahan honge */}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
