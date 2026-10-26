import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Estado inicial vacío
  const estadoInicial = { tipo: 'Libro', nombre: '', precio: '', imagen: '', detalleExtra: '' };
  
  const [nuevoProducto, setNuevoProducto] = useState(estadoInicial);
  
  // NUEVO ESTADO: Guarda el ID del producto si estamos editando, o null si estamos creando
  const [idEditando, setIdEditando] = useState(null);

  const [inventario, setInventario] = useState(() => {
    const guardado = localStorage.getItem('inventarioLibreria');
    return guardado ? JSON.parse(guardado) : [];
  });

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  // Función para guardar (sirve tanto para Crear como para Actualizar)
  const guardarProducto = (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return alert('Llena los campos obligatorios');

    const productoFormateado = {
      id: idEditando ? idEditando : Date.now(), // Mantiene el ID si edita, crea uno nuevo si no
      tipo: nuevoProducto.tipo,
      nombre: nuevoProducto.nombre,
      precio: parseFloat(nuevoProducto.precio),
      imagen: nuevoProducto.imagen,
      autor: (nuevoProducto.tipo === 'Libro' || nuevoProducto.tipo === 'Comic') ? nuevoProducto.detalleExtra : '',
      marca: nuevoProducto.tipo === 'Material' ? nuevoProducto.detalleExtra : ''
    };

    let nuevoInventario;
    if (idEditando) {
      // ACTUALIZAR: Buscamos el producto por ID y lo reemplazamos
      nuevoInventario = inventario.map(p => p.id === idEditando ? productoFormateado : p);
      alert('¡Producto actualizado con éxito!');
    } else {
      // CREAR: Lo agregamos al final
      nuevoInventario = [...inventario, productoFormateado];
      alert('¡Producto agregado con éxito!');
    }

    setInventario(nuevoInventario);
    localStorage.setItem('inventarioLibreria', JSON.stringify(nuevoInventario));
    
    // Limpiamos el formulario y el modo edición
    setNuevoProducto(estadoInicial);
    setIdEditando(null);
  };

  // Función para Eliminar
  const eliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      const nuevoInventario = inventario.filter(p => p.id !== id);
      setInventario(nuevoInventario);
      localStorage.setItem('inventarioLibreria', JSON.stringify(nuevoInventario));
    }
  };

  // Función para preparar la Edición
  const editarProducto = (producto) => {
    // Llenamos el formulario con los datos del producto
    setNuevoProducto({
      tipo: producto.tipo,
      nombre: producto.nombre,
      precio: producto.precio.toString(),
      imagen: producto.imagen,
      detalleExtra: producto.autor || producto.marca || ''
    });
    setIdEditando(producto.id); // Activamos el modo edición
    window.scrollTo(0, 0); // Subimos al inicio para ver el formulario
  };

  return (
    <div style={{ fontFamily: 'Arial', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>👑 Panel de Control - Admin</h2>
        <div>
          <button onClick={() => navigate('/tienda')} style={{ marginRight: '10px', padding: '8px 15px', cursor: 'pointer', border: 'none', borderRadius: '5px' }}>Ver Tienda</button>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ padding: '8px 15px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cerrar Sesión</button>
        </div>
      </header>

      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        {/* FORMULARIO */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', border: idEditando ? '2px solid #1976d2' : 'none' }}>
          <h2>{idEditando ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}</h2>
          <form onSubmit={guardarProducto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <select name="tipo" value={nuevoProducto.tipo} onChange={handleChange} style={{ padding: '10px' }}>
              <option value="Libro">Libro</option>
              <option value="Comic">Cómic</option>
              <option value="Material">Material Escolar</option>
            </select>

            <input type="text" name="nombre" placeholder="Nombre del producto" value={nuevoProducto.nombre} onChange={handleChange} style={{ padding: '10px' }} />
            
            <input type="number" name="precio" placeholder="Precio en $" value={nuevoProducto.precio} onChange={handleChange} style={{ padding: '10px' }} />
            
            <input type="url" name="imagen" placeholder="URL de la imagen (Opcional)" value={nuevoProducto.imagen} onChange={handleChange} style={{ padding: '10px' }} />
            
            <input 
              type="text" 
              name="detalleExtra" 
              placeholder={nuevoProducto.tipo === 'Material' ? "Marca (Ej: Faber-Castell)" : "Autor (Ej: Gabriel García Márquez)"} 
              value={nuevoProducto.detalleExtra} 
              onChange={handleChange} 
              style={{ padding: '10px' }} 
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: idEditando ? '#1976d2' : '#2e7d32', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                {idEditando ? 'Guardar Cambios' : 'Guardar Producto'}
              </button>
              
              {/* Botón para cancelar edición */}
              {idEditando && (
                <button type="button" onClick={() => { setNuevoProducto(estadoInicial); setIdEditando(null); }} style={{ padding: '12px', backgroundColor: '#e0e0e0', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LISTA DE PRODUCTOS */}
        <h2>📦 Inventario Actual ({inventario.length})</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {inventario.map(p => (
            <li key={p.id} style={{ backgroundColor: 'white', padding: '15px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {p.imagen ? <img src={p.imagen} alt={p.nombre} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} /> : <div style={{ width: '60px', height: '60px', backgroundColor: '#eee', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📦</div>}
                <div>
                  <strong style={{ fontSize: '16px' }}>{p.nombre}</strong> <span style={{ color: '#666' }}>({p.tipo})</span><br/>
                  <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>${p.precio}</span>
                  {p.autor && <span style={{ marginLeft: '10px', fontSize: '13px', color: '#888' }}>✍️ {p.autor}</span>}
                  {p.marca && <span style={{ marginLeft: '10px', fontSize: '13px', color: '#888' }}>🏷️ {p.marca}</span>}
                </div>
              </div>

              {/* BOTONES DE ACCIÓN (Editar / Eliminar) */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => editarProducto(p)} style={{ padding: '8px 12px', backgroundColor: '#fbc02d', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Editar
                </button>
                <button onClick={() => eliminarProducto(p.id)} style={{ padding: '8px 12px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Eliminar
                </button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}