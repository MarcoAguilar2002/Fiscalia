import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/form.css";
import { CircularProgress } from "@mui/material";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });
  const navigate = useNavigate();

  const name = method === "login" ? "Iniciar Sesión" : "Registrarse";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ username: "", password: "", general: "" }); // Reiniciar errores

    // Validación de campos vacíos
    if (!username || !password) {
      setErrors({
        username: !username ? "Ingrese su usuario." : "",
        password: !password ? "Ingrese su contraseña" : "",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      const serverError = error.response?.data?.detail;

      let translatedError = "Ocurrió un error. Por favor, intente nuevamente.";
      if (serverError === "No active account found with the given credentials") {
        translatedError = "No se encontró una cuenta con estas credenciales. Intentalo nuevamente";
      }

      setErrors({ general: translatedError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="text-center">{name}</h1>

      {errors.general && (
        <div
          style={{
            color: "#d32f2f",
            marginBottom: "10px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {errors.general}
        </div>
      )}

      <input
        className="form-input text-center"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuario"
        style={{
          borderColor: errors.username ? "#d32f2f" : undefined,
        }}
      />
      {errors.username && (
        <div style={{ color: "#d32f2f", fontSize: "14px", marginBottom: "10px" }}>
        {errors.username}
      </div>
      )}

      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        style={{
          borderColor: errors.password ? "#d32f2f" : undefined,
        }}
      />
      {errors.password && (
        <div style={{ color: "#d32f2f", fontSize: "14px", marginBottom: "10px" }}>
          {errors.password}
        </div>
      )}

      <button
        className="form-button"
        type="submit"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} style={{ color: "white" }} /> : name}
      </button>
    </form>
  );
}

export default Form;
