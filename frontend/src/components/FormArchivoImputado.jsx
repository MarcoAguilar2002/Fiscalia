import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

function FormArchivoImputado({ open, handleClose, handleSubmit, imputadoId, imputados }) {
  const [formData, setFormData] = useState({
    nombre: "",
    archivo: null,
    imputado: "",
    tipo: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    archivo: "",
    imputado: "",
    tipo: "",
  });

  const tipos = [
    "MIGRACIONES",
    "SUNAT",
    "JNE",
    "ONPE",
    "SUNEDU",
    "RENIEC",
    "SIAF",
    "SGF",
    "PROCESOS JUDICIALES",
    "ANTECEDENTES",
    "OFICIOS A FISCALÍA PROVINCIAL",
    "OFICIOS A FISCALÍA AMBIENTAL",
    "OFICIOS A FISCALÍA DE TRÁFICO ILÍCITO DE DROGAS",
    "OFICIOS A FISCALÍA DE CORRUPCIÓN DE FUNCIONARIOS",
    "INTERPOL",
    "DIVILA-LA LIBERTAD",
    "DIVILA-TRUJILLO",
    "SBS",
    "ADUANAS",
    "SERVICIOS",
    "REGISTROS LABORALES",
    "DICAPI",
    "MINCETUR",
    "CONITE",
    "ADEX",
    "CAVALI",
    "SMV",
    "SNI",
    "TRANSFERENCIA DE FONDOS",
    "SEGUROS",
    "TRANSPORTE",
    "TERRENOS",
    "SOCIOS Y PAGOS",
    "SENTINEL",
    "INFOCORP",
    "OSCE",
    "INGEMMET",
    "ESSALUD",
    "INFORMACIÓN CREDITICIA",
    "REGISTROS NOTARIALES",
    "SUNARP",
    "SATT",
    "CONTRALORÍA",
    "FPTEMA-LA",
    "MINEM",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileUpload = (e) => {
    setFormData({
      ...formData,
      archivo: e.target.files[0],
    });
    setErrors({ ...errors, archivo: "" });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.archivo) newErrors.archivo = "El archivo es obligatorio.";
    if (!formData.imputado) newErrors.imputado = "Debe seleccionar un imputado.";
    if (!formData.tipo) newErrors.tipo = "Debe seleccionar un tipo.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (!validateFields()) return;
    handleSubmit(formData);
    setFormData({
      nombre: "",
      archivo: null,
      imputado: "",
      tipo: "",
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
          error={!!errors.nombre}
          helperText={errors.nombre}
        />
        <TextField
          label="Seleccionar Imputado"
          name="imputado"
          select
          fullWidth
          margin="normal"
          value={formData.imputado}
          onChange={handleChange}
          error={!!errors.imputado}
          helperText={errors.imputado}
        >
          {imputados.map((imputado) => (
            <MenuItem key={imputado.id} value={imputado.id}>
              {`${imputado.nombres} ${imputado.apellidos}`}
            </MenuItem>
          ))}
        </TextField>
        <Autocomplete
          options={tipos}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tipo de Archivo"
              error={!!errors.tipo}
              helperText={errors.tipo}
            />
          )}
          fullWidth
          value={formData.tipo}
          onChange={(e, value) =>
            setFormData({
              ...formData,
              tipo: value || "",
            })
          }
        />
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
        {errors.archivo && (
          <Typography variant="caption" color="error" sx={{ marginTop: 1 }}>
            {errors.archivo}
          </Typography>
        )}
        <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
          <Button variant="outlined" color="error" onClick={handleClose}>
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
