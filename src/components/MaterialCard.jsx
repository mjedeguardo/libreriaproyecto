import styles from './ProductCard.module.css';

export default function MaterialCard({ nombre, precio, imagen, marca, stock, onAgregar, esAdmin }) {
  // BLINDAJE: Forzamos a que sea un número. Si falla, asume 10.
  const stockNumerico = parseInt(stock);
  const stockFinal = isNaN(stockNumerico) ? 10 : stockNumerico;

  return (
    <div className={styles.card}>
      {imagen ? <img src={imagen} alt={nombre} className={styles.cardImage} /> : <div className={`${styles.imagePlaceholder} ${styles.bgMaterial}`}>✏️</div>}
      
      <div className={styles.content}>
        <span className={`${styles.badge} ${styles.badgeMaterial}`}>Útiles</span>
        <h3 className={styles.title}>{nombre}</h3>
        
        {marca && <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>🏷️ Marca: {marca}</p>}
        
        {/* MOSTRAMOS EL STOCK CON LA VARIABLE BLINDADA */}
        <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: stockFinal > 0 ? '#2e7d32' : '#d32f2f', fontWeight: 'bold' }}>
          {stockFinal > 0 ? `Stock: ${stockFinal}` : 'Agotado'}
        </p>

        <p className={`${styles.price} ${styles.priceMaterial}`}>S/ {precio.toFixed(2)}</p>
        
        {esAdmin ? (
          <button disabled className={styles.button} style={{ backgroundColor: '#ccc' }}>Solo vista previa</button>
        ) : (
          <button 
            onClick={() => onAgregar({ nombre, precio })} 
            className={styles.button}
            disabled={stockFinal === 0}
            style={stockFinal === 0 ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
          >
            {stockFinal === 0 ? 'Sin Stock' : 'Agregar al carrito'}
          </button>
        )}
      </div>
    </div>
  );
}