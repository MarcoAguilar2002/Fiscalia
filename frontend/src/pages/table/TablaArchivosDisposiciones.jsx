import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Ícono de editar
import DeleteIcon from "@mui/icons-material/Delete"; // Ícono de eliminar

function TablaArchivosDisposiciones({ archivos,tipo}) {
  const archivosFiltrados = archivos.filter((archivo) => archivo.tipo === tipo);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha de recepción</TableCell>
            <TableCell>Subido por</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {archivosFiltrados.length > 0 ? (
            archivosFiltrados.map((archivo) => (
              <TableRow key={archivo.id}>
                <TableCell>{archivo.nombre}</TableCell>
                <TableCell>{archivo.fecha}</TableCell>
                <TableCell>{archivo.subido_user || "Desconocido"}</TableCell>
                <TableCell align="center">
                  {/* Ícono de editar */}
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => alert(`Editar ${archivo.nombre}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  {/* Ícono de eliminar */}
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => alert(`Eliminar ${archivo.nombre}`)}
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
  );
}

export default TablaArchivosDisposiciones;
