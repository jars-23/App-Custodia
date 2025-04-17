import "../assets/styles/NavbarComponent.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../components/Alert/AlertContext";

const NavbarComponent = () => {

  // #region Environment    
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // #region Methods-Handle
  const handleLogout = () => {

    showAlert({
      type: "confirm",
      title: "Cierre de sesión",
      message: "Tu sesión está a punto de finalizar. ¿Deseas finalizarla?",
      onConfirm: () => {
        localStorage.removeItem("auth");
        navigate("/");
      },
    })
  };

  return (
    <nav className="navbar d-flex justify-content-end">
      <div className="linea-nav"></div>
      <button onClick={handleLogout} className="logout-button" title="Cerrar sesión">
        <FontAwesomeIcon style={{ width: "30px" }} icon={faPowerOff} />
      </button>
    </nav>
  );
};

export default NavbarComponent;
