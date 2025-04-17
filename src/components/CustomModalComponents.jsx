import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CustomModalComponents = ({ open, onClose, title, children, data }) => {
    return (
        <Modal 
            open={open} 
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") return;
                onClose();
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", lg: 1200 },
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 2
                }}
            >
                {/* Encabezado con título y botón de cierre */}
                <div className="row pb-4" style={{ borderBottom: "1px solid #d5d5d5" }}>
                    <div className="col-lg-8 d-flex justify-content-start align-items-center">
                        <Typography style={{ color: "#4f6995", fontWeight: "500" }} variant="h6">{title}</Typography>
                    </div>
                    <div className="col-lg-4 d-flex justify-content-end align-items-center">
                        <IconButton onClick={onClose}>
                            <FontAwesomeIcon icon={faXmark} style={{ fontSize: "25px" }} />
                        </IconButton>
                    </div>
                </div>

                {/* Contenido dinámico */}
                <div className="modal-content">
                    {children}
                </div>
            </Box>
        </Modal>
    );
};

export default CustomModalComponents;
