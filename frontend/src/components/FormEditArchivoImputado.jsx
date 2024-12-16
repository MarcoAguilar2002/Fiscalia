import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

function FormEditArchivoImputado({ open, handleClose, handleSubmit, imputados, archivo }) {
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

  const [formData, setFormData] = useState({
    nombre: "",
    archivo: null,
    imputado: "",
    tipo: "",
    archivoActual: ""
  });

  const [errors, setErrors] = useState({
    nombre: "",
    archivo: "",
    imputado: "",
    tipo: "",
  });

  useEffect(() => {
    if (archivo) {
      setFormData({
        nombre: archivo.nombre || "",
        archivo: null,
        imputado: archivo.imputado || "",
        tipo: archivo.tipo || "",
        archivoActual: archivo.archivo || ""
      });
      setErrors({ nombre: "", archivo: "", imputado: "", tipo: "" });
    }
  }, [archivo]);

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
    if (!formData.imputado) newErrors.imputado = "Debe seleccionar un imputado.";
    if (!formData.tipo) newErrors.tipo = "Debe seleccionar un tipo.";

    // El archivo no es estrictamente obligatorio en la edición si ya existe uno actual,
    // pero si se desea obligar a siempre cambiar el archivo, descomenta la línea siguiente:
    // if (!formData.archivo && !formData.archivoActual) newErrors.archivo = "El archivo es obligatorio.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (!validateFields()) return;
    // handleSubmit debe encargarse de enviar un PATCH al servidor con los datos y el archivo (si cambió).
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
          Editar Archivo Investigado
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
        {formData.archivoActual && (
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
            Archivo Actual: {formData.archivoActual.split('/').pop()}
          </Typography>
        )}
        <Button
          variant="outlined"
          component="label"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Seleccionar Nuevo Archivo
          <input
            type="file"
            hidden
            onChange={handleFileUpload}
            accept="application/pdf"
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

export default FormEditArchivoImputado;
