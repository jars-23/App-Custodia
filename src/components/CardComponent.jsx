import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesPacking, faHandshake, faCartFlatbed} from "@fortawesome/free-solid-svg-icons";

const CardComponent = ({number, text, type}) => {

const getIcon = (type) => {
  switch (type) {
    case "prestamos":
      return <FontAwesomeIcon icon={faHandshake} />;
    case "devoluciones":
      return <FontAwesomeIcon icon={faCartFlatbed} />;
    case "total":
      return <FontAwesomeIcon icon={faBoxesPacking} />;
    default:
                return null;
        }
    };

    const getBackground = (type) => {
        switch (type) {
            case "prestamos":
                return "green--modify";
            case "devoluciones":
                return "yellow--modify";
            case "total":
                return "red--modify";
            default:
                return null;
        }
    };

    const getIconBackground = (type) => {
        switch (type) {
            case "prestamos":
                return "green";
            case "devoluciones":
                return "yellow";
            case "total":
                return "red";
            default:
                return null;
        }
    };


    return (
        <>
            <div className={`card-dashboard ${getBackground(type)}`}>
                <div className="row w-100">
                    <div className="col-3 col-sm-5 col-md-3 d-flex justify-content-center align-items-center">
                        <div className={`icon-card ${getIconBackground(type)}`}>
                            {getIcon(type)}
                        </div>
                    </div>
                    <div className="col-9 col-sm-7 col-md-9 d-flex flex-column justify-content-center px-3">
                        <h2 className="m-0 num-card">{number}</h2>
                        <p className="m-0 text-card">{text}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardComponent;