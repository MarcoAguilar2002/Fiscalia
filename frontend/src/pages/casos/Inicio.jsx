import React from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function Inicio() {
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
        <Typography variant="h5">Número de casos</Typography>
        <Avatar 
          sx={{ 
            bgcolor: '#bdbdbd', // Color personalizado (azul oscuro)
            width: 70, // Tamaño del avatar
            height: 70, // Tamaño del avatar
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto', // Asegura que el avatar esté centrado en su celda
          }}
        >
          0
        </Avatar>
      </Box>
      
      <Box sx={{ width: '80%', textAlign: 'center' }}>
        <Typography variant="h5">Expedientes en Investigación</Typography>
        <Avatar 
          sx={{ 
            bgcolor: '#bdbdbd', // Color personalizado (azul oscuro)
            width: 70, // Tamaño del avatar
            height: 70, // Tamaño del avatar
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto', // Asegura que el avatar esté centrado en su celda
          }}
        >
          0
        </Avatar>
      </Box>

      <Box sx={{ width: '80%', textAlign: 'center' }}>
        <Typography variant="h5">Expedientes en Apelación</Typography>
        <Avatar 
          sx={{ 
            bgcolor: '#bdbdbd', // Color personalizado (azul oscuro)
            width: 70, // Tamaño del avatar
            height: 70, // Tamaño del avatar
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto', // Asegura que el avatar esté centrado en su celda
          }}
        >
          0
        </Avatar>
      </Box>

      <Box sx={{ width: '80%', textAlign: 'center' }}>
        <Typography variant="h5">Archivados</Typography>
        <Avatar 
          sx={{ 
            bgcolor: '#bdbdbd', // Color personalizado (azul oscuro)
            width: 70, // Tamaño del avatar
            height: 70, // Tamaño del avatar
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto', // Asegura que el avatar esté centrado en su celda
          }}
        >
          0
        </Avatar>
      </Box>
    </Box>
  );
}

export default Inicio;
