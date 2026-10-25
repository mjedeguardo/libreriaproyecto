export default function MochilaCard({ nombre, precio }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h3>🎒 Mochila: {nombre}</h3>
      <p style={{ color: 'purple', fontWeight: 'bold' }}>Precio: S/{precio}</p>
      <p style={{ fontSize: '12px', color: 'gray' }}>¡Ideal para el regreso a clases!</p>
    </div>
  );
}