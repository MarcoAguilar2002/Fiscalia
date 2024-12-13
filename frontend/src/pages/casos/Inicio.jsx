import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import api from "../../api";
import React, { useState, useEffect } from 'react';

function Inicio() {
  const [carpetas, setCarpetas] = useState([]);

  useEffect(() => {
    getCarpetas();
  }, []);

  const getCarpetas = () => {
    api.get("/api/carpetasFiscales/")
      .then((res) => res.data)
      .then((data) => {
        setCarpetas(data);
      })
      .catch((err) => alert("Error al cargar las carpetas: " + err));
  };

  // Contadores por estado
  const contarPorEstado = (estado) => {
    return carpetas.filter(carpeta => carpeta.estado === estado).length;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 2 columnas, cada una con el mismo tamaño
        gridTemplateRows: 'repeat(2, 1fr)', // 2 filas, cada una con el mismo tamaño
        gap: 2, // Espacio entre las celdas
        height: '80vh', // Utiliza el alto total de la ventana
        justifyItems: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
      }}
    >
      <Box sx={{ width: '80%', textAlign: 'center' }}>
        <Typography variant="h5">Carpetas Preliminar</Typography>
        <Avatar
          sx={{
            bgcolor: '#bdbdbd', // Color personalizado
            width: 70,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          {contarPorEstado("Preliminar")}
        </Avatar>
      </Box>

      <Box sx={{ width: '80%', textAlign: 'center' }}>
        <Typography variant="h5">Carpetas Preparatoria</Typography>
        <Avatar
          sx={{
            bgcolor: '#bdbdbd',
            width: 70,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          {contarPorEstado("Preparatoria")}
        </Avatar>
      </Box>

      <Box sx={{ width: '80%', textAlign: 'center' }}>
        <Typography variant="h5">Carpetas con Requerimiento</Typography>
        <Avatar
          sx={{
            bgcolor: '#bdbdbd',
            width: 70,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          {contarPorEstado("Con requerimiento")}
        </Avatar>
      </Box>

      <Box sx={{ width: '80%', textAlign: 'center' }}>
        <Typography variant="h5">Carpeta Archivada</Typography>
        <Avatar
          sx={{
            bgcolor: '#bdbdbd',
            width: 70,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          {contarPorEstado("Archivado")}
        </Avatar>
      </Box>
    </Box>
  );
}

export default Inicio;
