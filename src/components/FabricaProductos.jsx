import LibroCard from './LibroCard';
import ComicCard from './ComicCard';
import MaterialCard from './MaterialCard';

// Recibimos autor y marca
export default function FabricaProductos({ tipo, nombre, precio, imagen, autor, marca, onAgregar, esAdmin }) {
  switch (tipo) {
    case 'Libro': 
      return <LibroCard nombre={nombre} precio={precio} imagen={imagen} autor={autor} onAgregar={onAgregar} esAdmin={esAdmin} />;
    case 'Comic': 
      return <ComicCard nombre={nombre} precio={precio} imagen={imagen} autor={autor} onAgregar={onAgregar} esAdmin={esAdmin} />;
    case 'Material': 
      return <MaterialCard nombre={nombre} precio={precio} imagen={imagen} marca={marca} onAgregar={onAgregar} esAdmin={esAdmin} />;
    default: 
      return <div>⚠️ Producto no reconocido</div>;
  }
}