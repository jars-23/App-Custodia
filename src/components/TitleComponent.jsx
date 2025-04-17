import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { colors } from "@mui/material";

const TitleComponent = ({ firstTitle, secondTitle, subtitle, btnTitle = "", onBtnClick }) => {
    return (
        <>
            <div className="col-md-12 my-3 pb-3 ms-3">
                <div className="row me-3">
                    <div className="col-lg-9 d-flex align-items-center">
                        <label className="firstTitle" style={{ color: "#4f6995", fontSize: "20px", fontWeight: 200 }}>{firstTitle}</label> <FontAwesomeIcon className="px-2" icon={faChevronRight} style={{ color: "#002d7c" }} /> <label className="secondTitle" style={{ fontWeight: 500, fontSize: "20px", color: "#002d7c" }}>{secondTitle}</label>
                    </div>
                    
                    {btnTitle !== "" &&
                        <div className="col-lg-3 d-flex justify-content-end">
                            <Button fullWidth variant="contained" color="primary" type="button" onClick={onBtnClick}>
                                {btnTitle}
                            </Button>
                        </div>
                    }
                </div>
            </div>
            {subtitle && (
                <div className="col-md-12 mb-3 mt-1">
                    <label className="subTitle">{subtitle}</label>
                </div>
            )}
        </>
    );
};

export default TitleComponent;