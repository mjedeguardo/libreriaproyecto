export default function ComicCard({ nombre, precio }) {
  const precioConBolsa = precio + 2.00;  
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h3>🦸 Cómic: {nombre}</h3>
      <p>Precio base: S/{precio}</p>
      <p style={{ color: 'blue', fontWeight: 'bold' }}>Total con bolsa: S/{precioConBolsa.toFixed(2)}</p>
    </div>
  );
}