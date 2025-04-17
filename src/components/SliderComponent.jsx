import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faGear, faArrowsSpin } from "@fortawesome/free-solid-svg-icons"; /* Iconos menú*/
import { faCity, faUser, faUserGroup, faAddressBook, faClipboard, faJarWheat, faCartShopping, faTruckField, faPager } from "@fortawesome/free-solid-svg-icons"; /* Iconos Sub-menú*/
import { faChevronCircleDown, faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import {
  Typography
} from "@mui/material";

import "../assets/styles/SliderComponent.css";

const SliderComponent = ({ isVisible }) => {

  // #region Environment
  const location = useLocation();
  const [isParameterizationOpen, setIsParameterizationOpen] = useState(false);
  const [isProcessesOpen, setIsProcessesOpen] = useState(false);

  // #region Methods-Varied 
  const closedDropdown = () => {
    setIsParameterizationOpen(false);
    setIsProcessesOpen(false);
  };

  return (
    <div className={`sidebar ${isVisible ? "expanded" : "collapsed"}`}>

      <div style={{backgroundColor: "#fff", height: "150px", display: "flex", alignItems: "center", padding: "0 25px",borderBottom: "1px solid rgb(203, 203, 203)"}}>
        <img src={`${import.meta.env.BASE_URL}img/logo-entidad.png`}
          style={{
            maxWidth: "100%",
            maxHeight: "150px",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: isVisible ? 'block':'none'
          }} alt="Logo de Entidad" />
           <img src={`${import.meta.env.BASE_URL}img/icono-entidad.png`}
          style={{
            maxWidth: "32px",
            maxHeight: "32px",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: isVisible ? 'none':'block'
          }} alt="iciono de Entidad" />
      </div>
      
      <Typography variant="label" align="start" style={{display: isVisible ? 'block':'none', margin:"20px 0px 0px 20px", fontSize:"13px", fontWeight:"bold", color:"#4f626f"}}> MENÚ PRINCIPAL</Typography>

      <nav style={{padding: "0 15px", marginTop: "10px"}}>
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""} onClick={() => closedDropdown()}>
            <Link to="/dashboard" title="Dashboard" className="w-100">
              <FontAwesomeIcon className="pe-3" icon={faChartLine} />
              <span className={isVisible ? "visible-text ps-2" : "hidden-text"}>Dashboard</span>
            </Link>
          </li>

          <li className={`dropdown ${isParameterizationOpen ? "open" : ""}`}>
            <button onClick={() => setIsParameterizationOpen(!isParameterizationOpen)} className="dropdown-toggle-slider w-100">
              <FontAwesomeIcon icon={faGear} />
              <span className={isVisible ? "visible-text" : "hidden-text"}>Parametrización</span>
              <FontAwesomeIcon icon={isParameterizationOpen ? faChevronCircleUp : faChevronCircleDown} />
            </button>

            <ul className={`submenu ${isParameterizationOpen ? "show" : ""}`}>
              {/* <li className={location.pathname === "/dashboard/reports" ? "active" : ""}>
                <Link to="/dashboard/reports">
                  <FontAwesomeIcon className="pe-3" icon={faCity} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Entidad</span>
                </Link>
              </li> */}
              <li className={location.pathname === "/user" ? "active mt-4" : "mt-4"}>
                <Link to="/user" title="Funcionarios">
                  <FontAwesomeIcon style={{width: "30px"}} icon={faUser} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Funcionarios</span>
                </Link>
              </li>
              <li className={location.pathname === "/group" ? "active" : ""}>
                <Link to="/group" title="Grupos">
                  <FontAwesomeIcon style={{width: "30px"}} icon={faUserGroup} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Grupos</span>
                </Link>
              </li>
              <li className={location.pathname === "/rol" ? "active" : ""}>
                <Link to="/rol" title="Roles">
                  <FontAwesomeIcon style={{width: "30px"}} icon={faAddressBook} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Roles</span>
                </Link>
              </li>
              <li className={location.pathname === "/services" ? "active" : ""}>
                <Link to="/services">
                  <FontAwesomeIcon style={{width: "30px"}} icon={faTruckField} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Servicios</span>
                </Link>
              </li>
              <li className={location.pathname === "/unit" ? "active" : ""}>
                <Link to="/unit">
                  <FontAwesomeIcon style={{width: "30px", paddingRight: "6px"}} icon={faJarWheat} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Unidades de conservación</span>
                </Link>
              </li>
              <li className={location.pathname === "/loans" ? "active" : ""}>
                <Link to="/loans">
                  <FontAwesomeIcon style={{width: "30px"}} icon={faClipboard} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Clases de préstamos</span>
                </Link>
              </li>
              <li className={location.pathname === "/products" ? "active" : ""}>
                <Link to="/products">
                  <FontAwesomeIcon style={{width: "30px"}} icon={faCartShopping} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Clases de productos</span>
                </Link>
              </li>
              
              <li className={`mb-0 ${location.pathname === "/etl" ? "active" : ""}`}>
                <Link to="/etl">
                  <FontAwesomeIcon  style={{width: "30px"}} icon={faPager} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Clases de ETL</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className={`dropdown ${isProcessesOpen ? "open" : ""}`}>
            <button onClick={() => setIsProcessesOpen(!isProcessesOpen)} className="dropdown-toggle-slider w-100">
              <FontAwesomeIcon icon={faArrowsSpin} />
              <span className={isVisible ? "visible-text" : "hidden-text"}>Procesos</span>
              <FontAwesomeIcon icon={isProcessesOpen ? faChevronCircleUp : faChevronCircleDown} />
            </button>

            <ul className={`submenu ${isProcessesOpen ? "show" : ""}`}>

              <li className={location.pathname === "/inventorycontracts" ? "active" : ""}>
                <Link to="/inventorycontracts" title="Inventarios y contratos">
                  <FontAwesomeIcon style={{width: "30px"}} icon={faUserGroup} />
                  <span className={isVisible ? "visible-text" : "hidden-text"}>Inventarios y contratos</span>
                </Link>
              </li>
              
            </ul>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default SliderComponent;
