import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TablaArchivosDisposiciones({ archivos, tipo, deleteArchivosDisposiciones, handleOpenEditModal }) {
  // Estados para filtrado por fecha
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Filtra primero por el tipo
  let archivosFiltrados = archivos.filter((archivo) => archivo.tipo === tipo);

  // Filtrar por rango de fechas (asumiendo formato YYYY-MM-DD)
  if (fechaInicio) {
    archivosFiltrados = archivosFiltrados.filter(
      (archivo) => archivo.fecha >= fechaInicio
    );
  }
  if (fechaFin) {
    archivosFiltrados = archivosFiltrados.filter(
      (archivo) => archivo.fecha <= fechaFin
    );
  }

  const limpiarFiltros = () => {
    setFechaInicio("");
    setFechaFin("");
  };

  return (
    <>
      <Box display="flex" gap={2} marginBottom={2} alignItems="center" flexWrap="wrap">
        <TextField
          label="Fecha Inicio"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          size="small"
        />
        <TextField
          label="Fecha Fin"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          size="small"
        />
        <Button variant="outlined" onClick={limpiarFiltros}>
          Limpiar
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Fecha de recepción</TableCell>
              <TableCell align="center">Subido por el usuario</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivosFiltrados.length > 0 ? (
              archivosFiltrados.map((archivo) => (
                <TableRow key={archivo.id}>
                  <TableCell align="center">{archivo.nombre}</TableCell>
                  <TableCell align="center">{archivo.fecha}</TableCell>
                  <TableCell align="center">{archivo.subido_user_username || "Desconocido"}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenEditModal(archivo)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        deleteArchivosDisposiciones(archivo.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay archivos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TablaArchivosDisposiciones;
