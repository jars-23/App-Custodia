import React, { useState } from "react";
import AlertModal from "./AlertModal";
import { AlertContext } from "./AlertContext";

const AlertProvider = ({ children }) => {
  const [alertData, setAlertData] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
    onConfirm: null,
  });

  const showAlert = ({ type, title, message, onConfirm }) => {
    setAlertData({
      open: true,
      type,
      title,
      message,
      onConfirm,
    });
  };

  const handleClose = () => {
    setAlertData((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertModal
        open={alertData.open}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
        onClose={handleClose}
        onConfirm={alertData.onConfirm}
      />
    </AlertContext.Provider>
  );
};

export default AlertProvider;
