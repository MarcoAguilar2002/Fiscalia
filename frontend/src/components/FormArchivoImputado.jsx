import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

function FormArchivoImputado({ open, handleClose, handleSubmit, imputadoId, imputados }) {
  const [formData, setFormData] = useState({
    nombre: "",
    archivo: null,
    imputado: "", // Relacionado con el imputado seleccionado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    setFormData({
      ...formData,
      archivo: e.target.files[0],
    });
  };

  const onSubmit = () => {
    if (!formData.nombre || !formData.archivo || !formData.imputado) {
      alert("Todos los campos son obligatorios.");
      return;
    }
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
          Registrar Archivo Investigado
        </Typography>
        <TextField
          label="Nombre del Archivo"
          name="nombre"
          fullWidth
          margin="normal"
          value={formData.nombre}
          onChange={handleChange}
        />
        <TextField
          label="Seleccionar Imputado"
          name="imputado"
          select
          fullWidth
          margin="normal"
          value={formData.imputado}
          onChange={handleChange}
        >
          {imputados.map((imputado) => (
            <MenuItem key={imputado.id} value={imputado.id}>
              {`${imputado.nombres} ${imputado.apellidos}`}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Seleccionar Archivo
          <input
            type="file"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
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

export default FormArchivoImputado;
