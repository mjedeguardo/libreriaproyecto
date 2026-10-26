import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FabricaProductos from '../components/FabricaProductos';
import styles from './Tienda.module.css';

export default function Tienda() {
  const navigate = useNavigate();
  
  // 1. Leemos quién es el usuario
  const sesionStr = localStorage.getItem('sesionLibreria');
  const sesion = sesionStr ? JSON.parse(sesionStr) : null;
  const esAdmin = sesion?.rol === 'ADMIN';

  // 2. Estado del inventario
  const [productos, setProductos] = useState(() => {
    const guardado = localStorage.getItem('inventarioLibreria');
    if (guardado) return JSON.parse(guardado);
    return [
      { id: 1, tipo: 'Libro', nombre: 'Cien Años de Soledad', precio: 50, imagen: '' }
    ];
  });

  // NUEVO: Estado para el buscador
  const [busqueda, setBusqueda] = useState('');

  // NUEVO EFECTO: Escuchar cuando el admin cambie cosas en otra pestaña o al volver
  useEffect(() => {
    const handleStorageChange = () => {
      const guardado = localStorage.getItem('inventarioLibreria');
      if (guardado) setProductos(JSON.parse(guardado));
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Al montar el componente, también refrescamos por si acaso
    handleStorageChange();

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 3. Estado del carrito
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carritoLibreria');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carritoLibreria', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('sesionLibreria');
    localStorage.removeItem('carritoLibreria');
    navigate('/login');
  };

  const totalPagar = carrito.reduce((suma, item) => suma + item.precio, 0);

  // NUEVO: Filtramos los productos según lo que el usuario escriba
  const productosFiltrados = productos.filter((prod) => 
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    prod.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.logo}>🏪 Librería Zonal</h2>
          
          <div className={styles.cartInfo}>
            {esAdmin ? (
              <>
                <span style={{ backgroundColor: '#ff9800', padding: '5px 10px', borderRadius: '15px', fontWeight: 'bold' }}>👑 Modo Admin</span>
                <button onClick={() => navigate('/admin')} style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Ir al Panel
                </button>
              </>
            ) : (
              <>
                <span>🛒 {carrito.length} items</span>
                <span className={styles.total}>Total: ${totalPagar.toFixed(2)}</span>
              </>
            )}
            
            <button onClick={cerrarSesion} className={styles.btnLogout}>Salir</button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{esAdmin ? 'Vista de Cliente (Admin)' : 'Catálogo de Productos'}</h1>
          <p className={styles.subtitle}>Encuentra lo mejor para tus estudios y colección</p>
          
          {/* NUEVO INPUT DE BÚSQUEDA */}
          <input 
            type="text" 
            placeholder="🔍 Buscar por nombre o categoría (Ej: Libro, Comic)..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ padding: '12px', width: '100%', maxWidth: '500px', marginTop: '20px', borderRadius: '25px', border: '1px solid #ccc', fontSize: '16px', outline: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
          />
        </div>
        
        <div className={styles.grid}>
          {/* Si no hay resultados, mostramos un mensaje */}
          {productosFiltrados.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '18px', color: '#666', marginTop: '20px' }}>
              😢 No se encontraron productos que coincidan con "{busqueda}".
            </p>
          ) : (
            productosFiltrados.map((prod) => (
              <FabricaProductos 
                key={prod.id} 
                tipo={prod.tipo} 
                nombre={prod.nombre} 
                precio={prod.precio} 
                imagen={prod.imagen} 
                autor={prod.autor} 
                marca={prod.marca} 
                onAgregar={agregarAlCarrito} 
                esAdmin={esAdmin} 
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}