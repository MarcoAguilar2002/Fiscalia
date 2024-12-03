import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Configurado para manejar tokens de autenticación

function EditPerfil() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    fecha_nacimiento: "",
    sexo: "",
    estado_civil: "",
    direccion: "",
    foto: null, // Campo para la foto
  });

  const [fotoPreview, setFotoPreview] = useState(null); // Vista previa de la foto

  // Cargar datos del perfil
  useEffect(() => {
    api
      .get("/api/perfil/")
      .then((res) => {
        setPerfil(res.data);
        if (res.data.foto) {
          setFotoPreview(res.data.foto); // Mostrar la foto actual si ya existe
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Manejar el cambio de la foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      foto: file,
    }));
    setFotoPreview(URL.createObjectURL(file)); // Mostrar la foto seleccionada
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Asegúrate de que la imagen se agregue como un archivo
    if (perfil.foto && perfil.foto instanceof File) {
      formData.append('foto', perfil.foto);
    }

    // Agregar otros campos al formData
    for (const key in perfil) {
      if (perfil[key] !== null && key !== 'foto') {
        formData.append(key, perfil[key]);
      }
    }

    api.patch("/api/editar-perfil/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        navigate("/perfil");
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error.response?.data || error);
        alert("Error al actualizar el perfil.");
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 3,
        backgroundColor: "#fff5f8",
        borderRadius: 2,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <header
        style={{
          backgroundColor: "#003366",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, textAlign: "center" }}>Editar Perfil</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Cambia entre columnas y filas dependiendo del tamaño de la pantalla
            gap: 3,
          }}
        >
          {/* Columna Izquierda: Datos del Usuario */}
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Nombres"
              name="nombres"
              value={perfil.nombres}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Apellidos"
              name="apellidos"
              value={perfil.apellidos}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="DNI"
              name="dni"
              value={perfil.dni}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fecha de Nacimiento"
              name="fecha_nacimiento"
              value={perfil.fecha_nacimiento}
              onChange={handleChange}
              type="date"
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <Select
                labelId="sexo-label"
                name="sexo"
                value={perfil.sexo}
                onChange={handleChange}
              >
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="estado-civil-label">Estado Civil</InputLabel>
              <Select
                labelId="estado-civil-label"
                name="estado_civil"
                value={perfil.estado_civil}
                onChange={handleChange}
              >
                <MenuItem value="Soltero">Soltero</MenuItem>
                <MenuItem value="Casado">Casado</MenuItem>
                <MenuItem value="Divorciado">Divorciado</MenuItem>
                <MenuItem value="Viudo">Viudo</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Dirección"
              name="direccion"
              value={perfil.direccion}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Box>

          {/* Columna Derecha: Foto */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {fotoPreview && (
              <img
                src={fotoPreview}
                alt="Vista previa"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
            )}
            <Button
              variant="outlined"
              component="label"
              style={{ backgroundColor: "#8e919e", color: "white", borderColor: "#555865", }}
              sx={{ marginTop: 2 }}
            >
              Subir Foto
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFotoChange}
              />
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" color="secondary" style={{ backgroundColor: "#003366", fontWeight: "bold" }} type="submit">
            Guardar
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditPerfil;
