import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StickyHeadTable from '../table/StickyHeadTable';

function Caso() {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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
            placeholder="Buscar por título o investigado"
            style={{ padding: '10px', fontSize: '14px' }}
          />
        </div>
        <Link 
          to="/casos/registrar" // Ruta de destino
          style={{
            padding: '10px 15px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50', // Color de fondo
            color: 'white',             // Color del texto
            textDecoration: 'none',     // Elimina el subrayado del enlace
            borderRadius: '5px',
            display: 'inline-block'
          }}
        >
          
          Agregar Expediente
        </Link>
      </div>
      <StickyHeadTable search={search} />
    </>
  );
}

export default Caso;
