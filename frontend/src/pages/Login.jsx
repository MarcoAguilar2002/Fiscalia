import React from 'react';
import Form from "../components/Form";
import logoFiscalia from '../images/logoFisca.png';
import fotoLogin from '../images/loginFoto.png';
import "../styles/login.css"

function Login() {
    
    return (
        <div className="login-page">
            <header className="header-section">
                <div className="header-left">
                    <img src={logoFiscalia} alt="Logo Fiscalía" />
                    <div className="header-text">
                        <h1>MINISTERIO PÚBLICO</h1>
                        <h2>FISCALÍA DE LA NACIÓN</h2>
                        <h3>DISTRITO FISCAL LA LIBERTAD</h3>
                    </div>
                </div>
                <div className="header-right">
                    <span>EQUIPO LAVADO DE ACTIVOS</span>
                </div>
            </header>
            <div className="container">
                <div className="left-column">
                    <img src={fotoLogin} alt="Login Illustration" />
                </div>
                <div className="right-column">
                    <div className="form-section">
                        <Form route="/api/token/" method="login" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
