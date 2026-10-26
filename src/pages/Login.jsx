import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearSesion } from '../components/FabricaAutenticacion';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const sesion = crearSesion(usuario, password); // Llamamos a la Fábrica
    
    if (sesion) {
      localStorage.setItem('sesionLibreria', JSON.stringify(sesion)); // Guardamos en local
      navigate(sesion.rol === 'ADMIN' ? '/admin' : '/tienda'); // Redirigimos
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>🔐 Iniciar Sesión</h2>
        <input type="text" placeholder="Usuario (prueba: admin)" value={usuario} onChange={(e) => setUsuario(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        <input type="password" placeholder="Contraseña (prueba: 123)" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4a148c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Entrar</button>
      </form>
    </div>
  );
}