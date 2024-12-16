import React, { useState, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import TablaCarpetaFiscales from '../table/TablaCarpetaFiscales';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import api from "../../api";
import Alerta from '../Alerta';

function Carpeta() {
  const [search, setSearch] = useState('');
  const [carpetas, setCarpetas] = useState([]);
  const [alerta, setAlerta] = useState({ open: false, type: '', message: '' });
  const location = useLocation();

  useEffect(() => {
    getCarpetas();
    if (location.state && location.state.type && location.state.message) {
      setAlerta({
        open: true,
        type: location.state.type,
        message: location.state.message,
      });
    }
  }, [location]);

  const getCarpetas = () => {
    api.get("/api/carpetasFiscales/")
      .then((res) => res.data)
      .then((data) => {
        setCarpetas(data);
      })
      .catch((err) => alert("Error al cargar las carpetas: " + err));
  }

  const deleteCarpeta = (id) => {
    api.delete(`/api/carpeta-fiscal/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          setAlerta({
            open: true,
            type: "error",
            message: "Carpeta eliminada exitosamente.",
          });
          getCarpetas();
        } else {
          alert("No se pudo eliminar");
        }
      })
      .catch((error) => alert("Error al eliminar la carpeta: " + error));
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCloseAlert = () => {
    setAlerta({ ...alerta, open: false });
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h4 style={{ paddingRight: '10px' }}>Buscar: </h4>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar por número de carpeta "
            style={{
              padding: '10px',
              fontSize: '14px',
              width: '300px', 
              borderRadius: '5px',
              border: '1px solid #ccc',
              transition: 'border-color 0.3s',
            }}
          />


        </div>
        <Link
          to="/carpetas/registrar"
          style={{
            padding: '10px 15px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: 'green', // Color de fondo
            color: 'white', // Color del texto
            textDecoration: 'none', // Elimina el subrayado del enlace
            borderRadius: '5px',
            display: 'flex', // Flexbox para alinear ícono y texto
            alignItems: 'center', // Alineación vertical
            gap: '5px', // Espaciado entre el ícono y el texto
          }}
        >
          <CreateNewFolderIcon style={{ fontSize: '18px' }} /> {/* Tamaño del ícono ajustado */}
          Agregar Carpeta Fiscal
        </Link>

      </div>
      <TablaCarpetaFiscales search={search} carpetas={carpetas} deleteCarpeta={deleteCarpeta} />
      <Alerta
        open={alerta.open}
        onClose={handleCloseAlert}
        type={alerta.type}
        message={alerta.message}
      />
    </>
  );
}

export default Carpeta;
