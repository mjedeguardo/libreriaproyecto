import LibroCard from './LibroCard';
import ComicCard from './ComicCard';
import MaterialCard from './MaterialCard';

// Recibimos stock también en la fábrica
export default function FabricaProductos({ tipo, nombre, precio, imagen, autor, marca, stock, onAgregar, esAdmin }) {
  switch (tipo) {
    case 'Libro': 
      return <LibroCard nombre={nombre} precio={precio} imagen={imagen} autor={autor} stock={stock} onAgregar={onAgregar} esAdmin={esAdmin} />;
      
    case 'Comic': 
      return <ComicCard nombre={nombre} precio={precio} imagen={imagen} autor={autor} stock={stock} onAgregar={onAgregar} esAdmin={esAdmin} />;
      
    case 'Material': 
      return <MaterialCard nombre={nombre} precio={precio} imagen={imagen} marca={marca} stock={stock} onAgregar={onAgregar} esAdmin={esAdmin} />;
      
    default: 
      return <div>⚠️ Producto no reconocido</div>;
  }
}