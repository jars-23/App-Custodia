import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Sidebar from "../components/SliderComponent";
import Navbar from "../components/NavbarComponent";
import "../assets/styles/MainLayout.css";

const MainLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Detectar cambios en la resolución y ajustar el sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`layout ${isSidebarVisible ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar isVisible={isSidebarVisible} />
      <div className="main-content">
        <Navbar />
        <button
          className="toggle-button"
          title={isSidebarVisible ? "Ocultar menú" : "Mostrar menú"}
          onClick={toggleSidebar}
        >
          {isSidebarVisible ? <FaAngleLeft size={20} color="#fff" /> : <FaAngleRight size={20} color="#fff" />}
        </button>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;