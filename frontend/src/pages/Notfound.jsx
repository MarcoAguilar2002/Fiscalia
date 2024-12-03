import React from 'react';
import logoLiga from "../images/logoFiscalia.png"

function NotFound() {
  return (
    <div style={styles.container}>
      <img 
        src={logoLiga} 
        alt="Page Not Found"
        style={styles.image}
      />
      <h1 style={styles.title}>Oops! Página no encontrada</h1>
      <p style={styles.text}>Parece que la página que estás buscando no existe.</p>
      <a href="/" style={styles.link}>Volver al inicio</a>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    textAlign: 'center',
  },
  image: {
    width: '300px', // Ajusta el tamaño de la imagen
    marginBottom: '20px',
  },
  title: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '10px',
  },
  text: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '20px',
  },
  link: {
    fontSize: '18px',
    color: '#1a73e8',
    textDecoration: 'none',
  },
};

export default NotFound;
