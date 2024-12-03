import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Notfound from "./pages/Notfound"
import ProtectedRoute from "./components/ProtectedRoute"
import Inicio from "./pages/casos/Inicio"
import Carpeta from "./pages/casos/Carpeta"
import RegistrarCarpeta from "./pages/casos/RegistrarCarpeta"
import Perfil from "./pages/perfil/Perfil"
import EditPerfil from "./pages/perfil/EditPerfil"
import VerCarpeta from "./pages/casos/VerCarpeta"
import EditarCarpeta from "./pages/casos/EditarCarpeta"

function Logout(){
  localStorage.clear()
  return <Navigate to="/"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Inicio />} />
          <Route path="/carpetas" element={<Carpeta />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editar-perfil" element={<EditPerfil />} />
          <Route path="/carpetas/registrar" element={<RegistrarCarpeta />} />
          <Route path="/carpeta/:pk" element={<VerCarpeta />} />
          <Route path="/carpeta/editar/:pk" element={<EditarCarpeta />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
