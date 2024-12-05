import React from "react";
import { Snackbar, Alert } from "@mui/material";

function Alerta({ open, onClose, type, message, position }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Duración (6s)
      onClose={onClose}
      anchorOrigin={position || { vertical: "bottom", horizontal: "right" }} // Posición predeterminada
    >
      <Alert
        onClose={onClose}
        severity={type || "info"} // Severidad predeterminada: "info"
        variant="filled" // Estilo lleno
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Alerta;