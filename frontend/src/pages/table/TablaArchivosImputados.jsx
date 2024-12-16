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
import Autocomplete from "@mui/material/Autocomplete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Lista de tipos disponibles
const tiposDisponibles = [
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

function TablaArchivosImputados({
  archivos,
  imputado,
  deleteArchivosImputados,
  handleOpenEditModalImputado,
}) {
  // Estados para los filtros
  const [filtroTipo, setFiltroTipo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const archivosFiltradosImputado = archivos.filter(
    (archivo) => String(archivo.imputado) === String(imputado.id || imputado)
  );

  // Aplica los filtros
  let archivosFiltrados = archivosFiltradosImputado;

  // Filtrar por tipo si existe uno seleccionado
  if (filtroTipo) {
    archivosFiltrados = archivosFiltrados.filter(
      (archivo) => archivo.tipo === filtroTipo
    );
  }

  // Filtrar por rango de fechas
  // Asumiendo que fecha está en formato YYYY-MM-DD o similar
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
    setFiltroTipo("");
    setFechaInicio("");
    setFechaFin("");
  };

  return (
    <Box>
      {/* Controles de filtrado */}
      <Box display="flex" gap={2} marginBottom={2} flexWrap="wrap">
        <Autocomplete
          options={tiposDisponibles}
          value={filtroTipo || null}
          onChange={(event, newValue) => setFiltroTipo(newValue || "")}
          clearOnEscape
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filtrar por tipo"
              size="small"
              style={{ width: 200 }}
            />
          )}
        />

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

      {/* Tabla de resultados */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Fecha de recepción</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">Subido por</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivosFiltrados.length > 0 ? (
              archivosFiltrados.map((archivo) => (
                <TableRow key={archivo.id}>
                  <TableCell align="center">{archivo.nombre}</TableCell>
                  <TableCell align="center">{archivo.fecha}</TableCell>
                  <TableCell align="center">{archivo.tipo}</TableCell>
                  <TableCell align="center">
                    {archivo.subido_user_username || "Desconocido"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenEditModalImputado(archivo)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => deleteArchivosImputados(archivo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay archivos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TablaArchivosImputados;
