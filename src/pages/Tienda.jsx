import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FabricaProductos from '../components/FabricaProductos';
import styles from './Tienda.module.css'; // <-- ESTE es el CSS correcto para la tienda

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
      { id: 1, tipo: 'Libro', nombre: 'Cien Años de Soledad', precio: 50, imagen: '', stock: 10 }
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

  // 1. Agregar producto validando el stock
  const agregarAlCarrito = (producto) => {
    const productoOriginal = productos.find(p => p.nombre === producto.nombre);
    
    // BLINDAJE: Convertimos el stock a número. Si es undefined o NaN, asumimos 10.
    const stockRealDB = productoOriginal ? parseInt(productoOriginal.stock) : 10;
    const stockDisponible = isNaN(stockRealDB) ? 10 : stockRealDB;

    const enCarrito = carrito.find(item => item.nombre === producto.nombre);
    const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;

    if (cantidadEnCarrito >= stockDisponible) {
      alert(`Lo sentimos, solo quedan ${stockDisponible} unidades de ${producto.nombre}.`);
      return;
    }

    if (enCarrito) {
      setCarrito(carrito.map(item => 
        item.nombre === producto.nombre ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // 2. Restar cantidad
  const restarDelCarrito = (nombre) => {
    setCarrito(carrito.map(item => {
      if (item.nombre === nombre) {
        const nuevaCantidad = item.cantidad > 1 ? item.cantidad - 1 : 1;
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    }));
  };

  // 3. Eliminar producto por completo
  const eliminarDelCarrito = (nombre) => {
    setCarrito(carrito.filter(item => item.nombre !== nombre));
  };

  // 4. Finalizar Compra
  const finalizarCompra = () => {
    if (carrito.length === 0) return;
    alert(`¡Gracias por tu compra! Total pagado: S/ ${totalPagar.toFixed(2)}`);
    setCarrito([]);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('sesionLibreria');
    localStorage.removeItem('carritoLibreria');
    navigate('/login');
  };

  // Cálculos del carrito
  const totalPagar = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
  const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  // Filtramos los productos
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
                <span>🛒 {totalItems} items</span>
                <span className={styles.total}>Total: S/{totalPagar.toFixed(2)}</span>
              </>
            )}
            
            <button onClick={cerrarSesion} className={styles.btnLogout}>Salir</button>
          </div>
        </div>
      </header>

      {/* PANEL DEL CARRITO */}
      {carrito.length > 0 && !esAdmin && (
        <div style={{ backgroundColor: '#fff', padding: '15px', margin: '20px auto', maxWidth: '800px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>🛒 Tu Carrito</h3>
          
          {carrito.map((item) => (
            <div key={item.nombre} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', padding: '10px 0' }}>
              <div>
                <strong>{item.nombre}</strong> <br/>
                <small>S/ {item.precio.toFixed(2)} c/u</small>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => restarDelCarrito(item.nombre)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#eee', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>-</button>
                <span style={{ fontWeight: 'bold' }}>{item.cantidad}</span>
                <button onClick={() => agregarAlCarrito(item)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#eee', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>+</button>
                
                <button onClick={() => eliminarDelCarrito(item.nombre)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#ffebee', color: '#d32f2f', border: 'none', borderRadius: '5px', marginLeft: '15px' }}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
          
          <div style={{ textAlign: 'right', marginTop: '15px' }}>
            <button onClick={finalizarCompra} style={{ padding: '10px 20px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Finalizar Compra (S/ {totalPagar.toFixed(2)})
            </button>
          </div>
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{esAdmin ? 'Vista de Cliente (Admin)' : 'Catálogo de Productos'}</h1>
          <p className={styles.subtitle}>Encuentra lo mejor para tus estudios y colección</p>
          
          <input 
            type="text" 
            placeholder="🔍 Buscar por nombre o categoría (Ej: Libro, Comic)..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ padding: '12px', width: '100%', maxWidth: '500px', marginTop: '20px', borderRadius: '25px', border: '1px solid #ccc', fontSize: '16px', outline: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
          />
        </div>
        
        <div className={styles.grid}>
          {productosFiltrados.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '18px', color: '#666', marginTop: '20px' }}>
              😢 No se encontraron productos que coincidan con "{busqueda}".
            </p>
          ) : (
            productosFiltrados.map((prod) => {
              const enCarrito = carrito.find(item => item.nombre === prod.nombre);
              const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;
              
              const stockBase = parseInt(prod.stock, 10) || 0;
              const stockVisual = stockBase - cantidadEnCarrito;

              return (
                <FabricaProductos 
                  key={prod.id} 
                  tipo={prod.tipo} 
                  nombre={prod.nombre} 
                  precio={prod.precio} 
                  imagen={prod.imagen} 
                  autor={prod.autor} 
                  marca={prod.marca} 
                  stock={stockVisual} 
                  onAgregar={agregarAlCarrito} 
                  esAdmin={esAdmin} 
                />
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}