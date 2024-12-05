import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import api from '../../api'; 

function RegistrarCaso() {
  const navigate = useNavigate(); // Hook para redirigir
  const [formData, setFormData] = useState({
    numero_carpeta: '', // Alineado con el modelo
    fecha: '',
    numero_expediente: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const crearCarpeta = (e) => {
    e.preventDefault(); 

    api
      .post('/api/carpetasFiscales/', formData) 
      .then((res) => {
        if (res.status === 201) {
          navigate('/carpetas', { state: { type: "success", message: "Carpeta creada exitosamente." } }); // Redirige a la lista de carpetas
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
            name="numero_carpeta" // Alineado con el modelo
            value={formData.numero_carpeta}
            onChange={handleChange}
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
          />
          <TextField
            label="Número de Expediente"
            variant="outlined"
            fullWidth
            margin="normal"
            name="numero_expediente" // Alineado con el modelo
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
