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

  const [errors, setErrors] = useState({
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
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.nombres) newErrors.nombres = "El nombre es obligatorio.";
    if (!formData.apellidos) newErrors.apellidos = "El apellido es obligatorio.";
    if (!formData.dni) newErrors.dni = "El DNI es obligatorio.";
    if (!formData.direccion) newErrors.direccion = "La dirección es obligatoria.";
    if (!formData.correo_electronico)
      newErrors.correo_electronico = "El correo es obligatorio.";
    if (!formData.telefono) newErrors.telefono = "El teléfono es obligatorio.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (!validateFields()) return;
    handleSubmit(formData);
    setFormData({
      nombres: "",
      apellidos: "",
      dni: "",
      direccion: "",
      correo_electronico: "",
      telefono: "",
    });
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
          maxHeight: "90vh", // Limita la altura máxima del modal
          overflowY: "auto", // Habilita el scroll vertical si el contenido excede la altura
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
          error={!!errors.nombres}
          helperText={errors.nombres}
        />
        <TextField
          label="Apellidos"
          name="apellidos"
          fullWidth
          margin="normal"
          value={formData.apellidos}
          onChange={handleChange}
          error={!!errors.apellidos}
          helperText={errors.apellidos}
        />
        <TextField
          label="DNI"
          name="dni"
          fullWidth
          margin="normal"
          value={formData.dni}
          onChange={handleChange}
          error={!!errors.dni}
          helperText={errors.dni}
        />
        <TextField
          label="Dirección"
          name="direccion"
          fullWidth
          margin="normal"
          value={formData.direccion}
          onChange={handleChange}
          error={!!errors.direccion}
          helperText={errors.direccion}
        />
        <TextField
          label="Correo Electrónico"
          name="correo_electronico"
          type="email"
          fullWidth
          margin="normal"
          value={formData.correo_electronico}
          onChange={handleChange}
          error={!!errors.correo_electronico}
          helperText={errors.correo_electronico}
        />
        <TextField
          label="Teléfono"
          name="telefono"
          fullWidth
          margin="normal"
          value={formData.telefono}
          onChange={handleChange}
          error={!!errors.telefono}
          helperText={errors.telefono}
        />
        <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Subir
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default FormImputado;
