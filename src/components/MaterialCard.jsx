export default function MaterialCard({ nombre, precio }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h3>✏️ Material Escolar: {nombre}</h3>
      <p style={{ fontWeight: 'bold' }}>Precio: S/{precio}</p>
    </div>
  );
}