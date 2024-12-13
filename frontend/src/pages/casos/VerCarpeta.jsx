import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import BarraLateral from "../../components/BarraLateral";
import TablaArchivosImputados from "../table/TablaArchivosImputados";
import TablaArchivosDisposiciones from '../table/TablaArchivosDisposiciones';
import FormImputado from '../../components/FormImputado';
import FormArchivoImputado from '../../components/FormArchivoImputado';
import api from "../../api";
import Alerta from '../Alerta';

function VerCarpeta() {
  const { pk } = useParams();
  const [carpeta, setCarpeta] = useState({});
  const [imputados, setImputados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isArchivoImputadoModalOpen, setIsArchivoImputadoModalOpen] = useState(false);
  const [archivosDisposiciones, setArchivosDisposiciones] = useState([]);
  const [archivosImputados, setArchivosImputados] = useState([]);
  const [selectedSub, setSelectedSub] = useState('Providencia');
  const [fileData, setFileData] = useState({
    nombre: '',
    archivo: null,
    tipo: '',
  });
  const [errors, setErrors] = useState({
    nombre: '',
    tipo: '',
    archivo: '',
  });
  const [alerta, setAlerta] = useState({ open: false, type: '', message: '' });
  const location = useLocation();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setFileData({ nombre: '', archivo: null, tipo: '' });
    setErrors({ nombre: '', tipo: '', archivo: '' });
  };

  const handleOpenArchivoImputadoModal = () => setIsArchivoImputadoModalOpen(true);
  const handleCloseArchivoImputadoModal = () => setIsArchivoImputadoModalOpen(false);

  const handleFormSubmit = (formData) => {
    api.post(`/api/carpeta/${pk}/imputados/`, { ...formData, carpeta_fiscal: pk })
      .then((res) => {
        if (res.status === 201) {
          setAlerta({
            open: true,
            type: "success",
            message: "Imputado registrado exitosamente.",
          });
          getImputados();
        } else {
          alert("Error al registrar imputado");
        }
      })
      .catch((err) => alert("Error en la solicitud: " + err));
    handleCloseModal();
  };

  const handleFileChange = (e) => {
    setFileData({ ...fileData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileUpload = (e) => {
    setFileData({ ...fileData, archivo: e.target.files[0] });
    setErrors({ ...errors, archivo: '' });
  };

  const validateFileData = () => {
    const newErrors = {};
    if (!fileData.nombre) newErrors.nombre = "El nombre del archivo es obligatorio.";
    if (!fileData.tipo) newErrors.tipo = "Debe seleccionar un tipo.";
    if (!fileData.archivo) newErrors.archivo = "Debe seleccionar un archivo.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadSubmit = () => {
    if (!validateFileData()) return;

    const formData = new FormData();
    formData.append('nombre', fileData.nombre);
    formData.append('archivo', fileData.archivo);
    formData.append('tipo', fileData.tipo);

    api.post(`/api/carpeta/${pk}/archivos-disposiciones/`, formData)
      .then((res) => {
        if (res.status === 201) {
          setAlerta({
            open: true,
            type: "success",
            message: "Disposición fiscal subida exitosamente.",
          });
          getArchivosDisposiciones();
        } else {
          alert("Error al subir archivo");
        }
      })
      .catch((err) => alert("Error en la solicitud: " + err));
    handleCloseUploadModal();
  };

  const handleArchivoImputadoSubmit = (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('archivo', formData.archivo);
    formDataToSend.append('tipo', formData.tipo);

    api.post(`/api/imputado/${formData.imputado}/archivos/`, formDataToSend)
      .then((res) => {
        if (res.status === 201) {
          setAlerta({
            open: true,
            type: "success",
            message: "Archivo investigado registrado exitosamente.",
          });
          getArchivosImputados();
        } else {
          alert("Error al registrar el archivo investigado.");
        }
      })
      .catch((err) => {
        console.error("Error en la solicitud:", err);
        alert("Error en la solicitud.");
      });
    handleCloseArchivoImputadoModal();
  };

  useEffect(() => {
    getCarpeta();
    getImputados();
    if (location.state && location.state.type && location.state.message) {
      setAlerta({
        open: true,
        type: location.state.type,
        message: location.state.message,
      });
    }
  }, [location]);

  useEffect(() => {
    if (['Providencia', 'Disposiciones', 'Requerimientos'].includes(selectedSub)) {
      getArchivosDisposiciones();
    } else if (selectedSub) {
      getArchivosImputados();
    }
  }, [selectedSub]);

  const getCarpeta = () => {
    api.get(`api/carpeta/${pk}/`)
      .then((res) => res.data)
      .then((data) => {
        setCarpeta(data);
      })
      .catch((err) => alert(err));
  };

  const getImputados = () => {
    api.get(`api/carpeta/${pk}/imputados/`)
      .then((res) => res.data)
      .then((data) => {
        setImputados(data);
      })
      .catch((err) => console.error("Error al cargar imputados:", err));
  };

  const getArchivosDisposiciones = () => {
    api.get(`api/carpeta/${pk}/archivos-disposiciones/`)
      .then((res) => res.data)
      .then((data) => {
        setArchivosDisposiciones(data);
      })
      .catch((err) => console.error("Error al cargar archivos disposiciones", err));
  };

  const getArchivosImputados = () => {
    api.get(`api/imputado/${selectedSub}/archivos/`)
      .then((res) => res.data)
      .then((data) => {
        setArchivosImputados(data);
      })
      .catch((err) => console.error("Error al cargar archivos disposiciones", err));
  };

  const handleSubSelected = (subName) => {
    setSelectedSub(subName);
    getArchivosDisposiciones();
  };

  const handleCloseAlert = () => {
    setAlerta({ ...alerta, open: false });
  };

  return (
    <>
      <Grid container style={{ height: "100vh" }}>
        <Grid
          item
          xs={3}
          style={{
            borderRight: "1px solid #ccc",
            backgroundColor: "#003366",
            color: "#fff",
            padding: "20px",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              style={{ marginBottom: "20px", color: "#fff" }}
              fontSize="17px"
            >
              Carpeta Fiscal: {carpeta.numero_carpeta}
            </Typography>
            <BarraLateral
              imputados={imputados}
              onSubSelected={handleSubSelected}
              archivosDisposiciones={archivosDisposiciones}
              archivosImputados={archivosImputados}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={handleOpenModal}
            style={{
              marginTop: "20px",
              backgroundColor: "#0056b3",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Añadir Imputados
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Box
            display="flex"
            gap={2}
            padding={2}
            alignItems="center"
            style={{ backgroundColor: "#003366", color: "#fff" }}
          >
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={handleOpenUploadModal}
              style={{ backgroundColor: "#0056b3", color: "#fff" }}
            >
              Disposiciones Fiscales
            </Button>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={handleOpenArchivoImputadoModal}
              style={{ backgroundColor: "#0056b3", color: "#fff" }}
            >
              Información Recibida
            </Button>
          </Box>
          <Box padding={2}>
            {['Providencia', 'Disposiciones', 'Requerimientos'].includes(selectedSub) ? (
              <TablaArchivosDisposiciones archivos={archivosDisposiciones} tipo={selectedSub} />
            ) : (
              <TablaArchivosImputados archivos={archivosImputados} imputado={selectedSub} />
            )}
          </Box>
        </Grid>

        <FormImputado
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleSubmit={handleFormSubmit}
        />

        <FormArchivoImputado
          open={isArchivoImputadoModalOpen}
          handleClose={handleCloseArchivoImputadoModal}
          handleSubmit={handleArchivoImputadoSubmit}
          imputadoId={selectedSub}
          imputados={imputados}
        />

        <Dialog open={isUploadModalOpen} onClose={handleCloseUploadModal}>
          <DialogTitle>Importar Archivo</DialogTitle>
          <DialogContent>
            <TextField
              name="nombre"
              label="Nombre del Archivo"
              fullWidth
              value={fileData.nombre}
              onChange={handleFileChange}
              style={{ marginBottom: "20px" }}
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
            <TextField
              name="tipo"
              label="Tipo"
              select
              fullWidth
              value={fileData.tipo}
              onChange={handleFileChange}
              style={{ marginBottom: "20px" }}
              error={!!errors.tipo}
              helperText={errors.tipo}
            >
              <MenuItem value="Providencia">Providencia</MenuItem>
              <MenuItem value="Disposiciones">Disposiciones</MenuItem>
              <MenuItem value="Requerimientos">Requerimientos</MenuItem>
            </TextField>
            <Button
              variant="outlined"
              component="label"
              style={{ marginBottom: "20px", display: "block" }}
            >
              Seleccionar Archivo
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            {errors.archivo && (
              <Typography variant="caption" color="error" style={{ marginTop: "5px" }}>
                {errors.archivo}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseUploadModal} color="error">
              Cancelar
            </Button>
            <Button variant="contained"
              onClick={() => {
                if (validateFileData()) {
                  handleUploadSubmit();
                }
              }}
              color="primary"
            >
              Subir
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Alerta
        open={alerta.open}
        onClose={handleCloseAlert}
        type={alerta.type}
        message={alerta.message}
      />
    </>
  );
}

export default VerCarpeta;
