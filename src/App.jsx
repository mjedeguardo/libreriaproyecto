// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Tienda from './pages/Tienda';
import Dashboard from './pages/Dashboard';

// Componente para proteger rutas (que no entren sin loguearse)
function RutaProtegida({ children, rolRequerido }) {
  const sesionStr = localStorage.getItem('sesionLibreria');
  const sesion = sesionStr ? JSON.parse(sesionStr) : null;

  if (!sesion) return <Navigate to="/login" />; // Si no hay sesión, al login
  if (rolRequerido && sesion.rol !== rolRequerido) return <Navigate to="/tienda" />; // Si no es admin, a la tienda

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/tienda" element={
          <RutaProtegida><Tienda /></RutaProtegida>
        } />
        
        <Route path="/admin" element={
          <RutaProtegida rolRequerido="ADMIN"><Dashboard /></RutaProtegida>
        } />

        {/* Si entran a la raíz, redirigir al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}