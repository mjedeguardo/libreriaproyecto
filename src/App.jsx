import FabricaProductos from './components/FabricaProductos';

export default function App() {
 
  const productos = [
    { id: 1, tipo: 'Libro', nombre: 'Cien Años de Soledad', precio: 50 },
    { id: 2, tipo: 'Comic', nombre: 'Spider-Man #1', precio: 25 },
    { id: 3, tipo: 'Material', nombre: 'Cuaderno Cuadriculado', precio: 10 },
    { id: 4, tipo: 'Libro', nombre: 'El Principito', precio: 30 },
    { id: 5, tipo: 'Comic', nombre: 'Batman: Año Uno', precio: 40 },
    { id: 6, tipo: 'Mochila', nombre: 'Mochila Escolar Azul', precio: 45 },
    { id: 7, tipo: 'Mochila', nombre: 'Mochila Deportiva Crema', precio: 60 },
                               

  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#4a148c', margin: '0' }}>🏪 Librería Zonal</h1>
        <p style={{ color: '#666', marginTop: '10px' }}>Catálogo de productos disponibles</p>
      </header>
      
      <main style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        gap: '10px' 
      }}>
        {productos.map((prod) => (
          // AQUÍ USAMOS LA FÁBRICA. No usamos <LibroCard> directamente.
          <FabricaProductos 
            key={prod.id} 
            tipo={prod.tipo} 
            nombre={prod.nombre} 
            precio={prod.precio} 
          />
        ))}
      </main>
    </div>
  );
}