import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function FormImputado({ open, handleClose, handleSubmit }) {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    direccion: "",
    correo_electronico: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Registrar Imputado
        </Typography>
        <TextField
          label="Nombres"
          name="nombres"
          fullWidth
          margin="normal"
          value={formData.nombres}
          onChange={handleChange}
        />
        <TextField
          label="Apellidos"
          name="apellidos"
          fullWidth
          margin="normal"
          value={formData.apellidos}
          onChange={handleChange}
        />
        <TextField
          label="DNI"
          name="dni"
          fullWidth
          margin="normal"
          value={formData.dni}
          onChange={handleChange}
        />
        <TextField
          label="Dirección"
          name="direccion"
          fullWidth
          margin="normal"
          value={formData.direccion}
          onChange={handleChange}
        />
        <TextField
          label="Correo Electrónico"
          name="correo_electronico"
          type="email"
          fullWidth
          margin="normal"
          value={formData.correo_electronico}
          onChange={handleChange}
        />
        <TextField
          label="Teléfono"
          name="telefono"
          fullWidth
          margin="normal"
          value={formData.telefono}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default FormImputado;
