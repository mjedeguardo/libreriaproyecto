export default function LibroCard({ nombre, precio }) {
  const precioConDescuento = precio * 0.90; // 10% de descuento
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h3>📚 Libro: {nombre}</h3>
      <p style={{ textDecoration: 'line-through', color: 'gray' }}>Precio normal: S/{precio}</p>
      <p style={{ color: 'green', fontWeight: 'bold' }}>Oferta: S/{precioConDescuento.toFixed(2)}</p>
    </div>
  );
}