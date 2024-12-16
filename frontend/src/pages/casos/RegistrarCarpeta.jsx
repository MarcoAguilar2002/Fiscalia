import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import api from '../../api'; 

function RegistrarCaso() {
  const navigate = useNavigate(); // Hook para redirigir
  const [formData, setFormData] = useState({
    numero_carpeta: '', 
    fecha: '',
    numero_expediente: '',
  });

  const [errors, setErrors] = useState({
    numero_carpeta: '',
    fecha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Al cambiar cualquier campo, borramos sus errores previos
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validarCampos = () => {
    let isValid = true;
    const newErrors = { numero_carpeta: '', fecha: '' };

    if (!formData.numero_carpeta.trim()) {
      newErrors.numero_carpeta = 'El número de carpeta es obligatorio.';
      isValid = false;
    }

    if (!formData.fecha.trim()) {
      newErrors.fecha = 'La fecha es obligatoria.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const crearCarpeta = (e) => {
    e.preventDefault(); 

    // Validar antes de enviar
    if (!validarCampos()) return;

    api
      .post('/api/carpetasFiscales/', formData) 
      .then((res) => {
        if (res.status === 201) {
          navigate('/carpetas', { state: { type: "success", message: "Carpeta creada exitosamente." } }); 
        } else {
          alert('No se pudo registrar la Carpeta Fiscal.');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('Error al crear la Carpeta Fiscal. Verifica los datos.');
      });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
          Crear Carpeta Fiscal
        </Typography>
        <form onSubmit={crearCarpeta}>
          <TextField
            label="Número de Carpeta"
            variant="outlined"
            fullWidth
            margin="normal"
            name="numero_carpeta"
            value={formData.numero_carpeta}
            onChange={handleChange}
            error={!!errors.numero_carpeta}
            helperText={errors.numero_carpeta}
          />
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            margin="normal"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.fecha}
            helperText={errors.fecha}
          />
          <TextField
            label="Número de Expediente"
            variant="outlined"
            fullWidth
            margin="normal"
            name="numero_expediente"
            value={formData.numero_expediente}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: '20px',
              padding: '10px 0',
              fontWeight: 'bold',
            }}
          >
            Crear
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default RegistrarCaso;
