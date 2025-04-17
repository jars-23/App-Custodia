import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import {
  CheckCircleOutlineRounded,
  WarningAmberRounded,
  InfoOutlineRounded,
  HighlightOffRounded,
  HelpOutlineRounded,
} from "@mui/icons-material";

const getAlertIcon = (type) => {
  switch (type) {
    case "error":
      return <HighlightOffRounded sx={{ fontSize: 60, color: "#fff"}} />;
    case "info":
      return <InfoOutlineRounded sx={{ fontSize: 60, color: "#fff"}} />;
    case "warning":
      return <WarningAmberRounded sx={{ fontSize: 60, color: "#fff"}} />;
    case "confirm":
      return <HelpOutlineRounded sx={{ fontSize: 60, color: "#fff"}} />;
      case "success":
        return <CheckCircleOutlineRounded sx={{ fontSize: 60, color: "#fff"}} />;
    default:
      return null;
  }
};

const getAlertBackground = (type) => {
  switch (type) {
    case "error":
      return <HighlightOffRounded sx={{ fontSize: 190, color: "#f44336"}} />;
    case "info":
      return <InfoOutlineRounded sx={{ fontSize: 190, color: "#2196f3"}} />;
    case "warning":
      return <WarningAmberRounded sx={{ fontSize: 190, color: "#ff9800"}} />;
    case "confirm":
      return <HelpOutlineRounded sx={{ fontSize: 190, color: "#2ba1ad"}} />;
      case "success":
        return <CheckCircleOutlineRounded sx={{ fontSize: 190, color: "#4caf50"}} />;
    default:
      return null;
  }
};

const getTitleColor = (type) => {
  switch (type) {
    case "error":
      return "#f44336";
    case "info":
      return "#2196f3";
    case "warning":
      return "#ff9800";
    case "confirm":
      return "#2ba1ad";
    case "success":
      return "#4caf50"; 
    default:
      return "#1976d2";
  }
};

const AlertModal = ({ open, type, title, message, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={(event, reason) =>{  if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') { onClose();} }}>
      <DialogTitle sx={{ backgroundColor: getTitleColor(type), color: "#fff"}}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px 0" }}>
          {getAlertIcon(type)}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
          <Typography variant="h6" sx={{fontSize: "25px"}}>{title}</Typography>
        </div>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{padding: "50px 15px 30px 15px", textAlign: "center", fontSize: "19px"}}>{message}</Typography>
        <div className="background-icon">
          {getAlertBackground(type)}
        </div>
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #ededed"}}>
        <>
          <div className="row w-100 m-0 p-0 d-flex justify-content-center">

          <div className="col-sm-3 col-md-3 col-lg-4 p-0 mx-1">
              <Button className="w-100" variant="contained" color="primary" onClick={() => { onConfirm?.(); onClose(); }}>
                {type === "confirm" ? "Si" : "Aceptar"}
              </Button>
            </div>

            {type === "confirm" && (
              <div className="col-sm-3 col-md-3 col-lg-4 p-0">
                <Button onClick={onClose} className="w-100" variant="contained" color="secondary" >No</Button>
              </div>
            )}

          </div>
        </>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;

// <----{Ejemplos de llamado - JR}---->

/*

<---{Exito}--->

showAlert({
  type: "error",
  title: "Éxito",
  message: "",
})

<---{Error}--->

showAlert({
  type: "error",
  title: "Error",
  message: "",
})

<---{Información}--->

showAlert({
  type: "info",
  title: "Información",
  message: "",
})

<---{Advertencia}--->

showAlert({
    type: "warning",
    title: "Advertencia",
    message: "",
  })
}

<---{Confirmación}--->

showAlert({
  type: "confirm",
  title: "¿Estás seguro?",
  message: "",
  onConfirm: () => alert("¡Confirmado!"),
})

*/