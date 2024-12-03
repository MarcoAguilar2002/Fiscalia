import { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function Perfil() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({});

  useEffect(() => {
    getPerfil();
  }, []);

  const getPerfil = () => {
    api
      .get("/api/perfil/")
      .then((res) => res.data)
      .then((data) => {
        setPerfil(data);
      })
      .catch((err) => alert(err));
  };

  const handleEditarPerfil = () => {
    navigate("/editar-perfil");
  };


  return (
    <Box
      sx={{
        height: "80vh", // Altura total de la ventana
        display: "flex",
        justifyContent: "center", // Centrado horizontal
        alignItems: "center", // Centrado vertical
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 5,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        {/* Encabezado */}
        <header
          style={{
            backgroundColor: "#003366",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0, textAlign: "center" }}>Mi Perfil</h2>
        </header>

        {/* Contenido dividido en dos columnas */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          {/* Columna Izquierda: Información del Usuario */}
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
              <Typography variant="body1">
              <strong>Nombres:</strong> {perfil.nombres}
            </Typography>
            <Typography variant="body1">
              <strong>Apellidos:</strong> {perfil.apellidos}
            </Typography>
            <Typography variant="body1">
              <strong>DNI:</strong> {perfil.dni}
            </Typography>
            <Typography variant="body1">
              <strong>Fecha de nacimiento:</strong> {perfil.fecha_nacimiento}
            </Typography>
            <Typography variant="body1">
              <strong>Sexo:</strong> {perfil.sexo}
            </Typography>
            <Typography variant="body1">
              <strong>Estado Civil:</strong> {perfil.estado_civil}
            </Typography>
            <Typography variant="body1">
              <strong>Dirección:</strong> {perfil.direccion}
            </Typography>
          </Box>

          {/* Columna Derecha: Foto de perfil y botón */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {perfil.foto ? (
              <img
                src={perfil.foto} // Enlace a la foto
                alt="Foto de perfil"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#ccc",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h6" color="white">
                  {perfil.nombres ? perfil.nombres.charAt(0) : "U"}
                </Typography>
              </Box>
            )}

            <Button
              variant="outlined" color="primary" size="large"
              onClick={handleEditarPerfil}
            >
              Editar Perfil
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Perfil;
