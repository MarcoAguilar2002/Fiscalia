import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

function EditarCarpeta() {
  const { pk } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numero_carpeta: '',
    fecha: '',
    numero_expediente: '',
    estado: 'Investigación', // Valor predeterminado
  });

  const getCarpeta = () => {
    api.get(`/api/carpeta-fiscal/${pk}/`)
      .then((res) => {
        setFormData(res.data); // Inicializa el formulario con los datos obtenidos
      })
      .catch((err) => alert('Error al cargar la carpeta: ' + err));
  };

  useEffect(() => {
    getCarpeta();
  }, [pk]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const editarCarpeta = (e) => {
    e.preventDefault();

    api.patch(`/api/carpeta-fiscal/${pk}/`, formData)
      .then((res) => {
        if (res.status === 200) {
          navigate('/carpetas', { state: { type: "info", message: "Carpeta editada exitosamente." } });
        } else {
          alert('No se pudo editar la carpeta');
        }
      })
      .catch((error) => alert('Error al editar la carpeta: ' + error));
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
          Editar Carpeta Fiscal
        </Typography>
        <form onSubmit={editarCarpeta}>
          <TextField
            label="Número de Carpeta"
            variant="outlined"
            fullWidth
            margin="normal"
            name="numero_carpeta"
            value={formData.numero_carpeta}
            onChange={handleChange}
            required
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
            name="numero_expediente"
            value={formData.numero_expediente}
            onChange={handleChange}
          />
          <Select
            fullWidth
            margin="normal"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            sx={{ marginTop: '16px' }}
          >
            <MenuItem value="Preliminar">Preliminar</MenuItem>
            <MenuItem value="Preparatoria">Preparatoria</MenuItem>
            <MenuItem value="Con requerimiento">Con Requerimiento</MenuItem>
            <MenuItem value="Archivado">Archivado</MenuItem>
          </Select>
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
            Guardar Cambios
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default EditarCarpeta;
