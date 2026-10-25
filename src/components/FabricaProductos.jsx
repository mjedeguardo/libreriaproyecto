import LibroCard from './LibroCard';
import ComicCard from './ComicCard';
import MaterialCard from './MaterialCard';
import MochilaCard from './MochilaCard';

export default function FabricaProductos({ tipo, nombre, precio }) {
  let componente;

  switch (tipo) {
    case 'Libro':
      componente = <LibroCard nombre={nombre} precio={precio} />;
      break;
    case 'Comic':
      componente = <ComicCard nombre={nombre} precio={precio} />;
      break;
    case 'Material':
      componente = <MaterialCard nombre={nombre} precio={precio} />;
      break;
    case 'Mochila':
      componente = <MochilaCard nombre={nombre} precio={precio} />;
      break;
    default:
      componente = <div>⚠️ Producto no reconocido</div>;
  }

  return (
    <div style={{ width: '250px' }}>
      {componente}
    </div>
  );
}