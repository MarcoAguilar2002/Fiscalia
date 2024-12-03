import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const columns = [
  { id: "numero_carpeta", label: "Número de Carpeta", minWidth: 170 },
  { id: "fecha", label: "Fecha", minWidth: 100 },
  { id: "estado", label: "Estado", minWidth: 170 },
  { id: "acciones", label: "Acciones", minWidth: 100, align: "center" },
];

function TablaCarpetaFiscales({ search, carpetas, deleteCarpeta }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filtrar las filas en base al término de búsqueda
  const filteredData = carpetas.filter((row) => {
    return (
      row.numero_carpeta.toLowerCase().includes(search.toLowerCase()) ||
      (row.estado && row.estado.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Función para obtener estilos basados en el estado
  const getEstadoStyles = (estado) => {
    switch (estado) {
      case "Investigación":
        return { backgroundColor: "secundary", color: "white" };
      case "Archivado":
        return { backgroundColor: "red", color: "white" };
      case "Finalizado":
        return { backgroundColor: "green", color: "white" };
      default:
        return { backgroundColor: "gray", color: "white" }; // Estilo predeterminado
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {/* Número de Carpeta */}
                  <TableCell align="center">{row.numero_carpeta}</TableCell>

                  {/* Fecha */}
                  <TableCell align="center">
                    {row.fecha ? row.fecha : "N/A"}
                  </TableCell>

                  {/* Estado */}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        ...getEstadoStyles(row.estado),
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {row.estado ? row.estado : "N/A"}
                    </Button>
                  </TableCell>

                  {/* Acciones */}
                  <TableCell align="center">
                    <Link
                      to={`/carpeta/${row.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton color="info" size="small">
                        <VisibilityIcon />
                      </IconButton>
                    </Link>

                    <Link
                      to={`/carpeta/editar/${row.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton color="secundary" size="small">
                        <EditIcon />
                      </IconButton>
                    </Link>

                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => deleteCarpeta(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />
    </Paper>
  );
}

export default TablaCarpetaFiscales;