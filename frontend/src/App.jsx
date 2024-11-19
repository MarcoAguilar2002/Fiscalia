import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/Register"
import Dashboard from "./pages/dashboard"
import Notfound from "./pages/Notfound"
import ProtectedRoute from "./components/ProtectedRoute"
import Inicio from "./pages/casos/Inicio"
import Caso from "./pages/casos/Caso"
import Buscar from "./pages/casos/Buscar"
import RegistrarCaso from "./pages/casos/RegistrarCaso"
import Perfil from "./pages/perfil/Perfil"

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
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/casos" element={<Caso />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/casos/registrar" element={<RegistrarCaso />} />

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
