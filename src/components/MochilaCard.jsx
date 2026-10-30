import styles from './ProductCard.module.css';

export default function MochilaCard({ nombre, precio, imagen, stock, onAgregar, esAdmin }) {
  // BLINDAJE: Forzamos a que sea un número. Si falla, asume 10.
  const stockNumerico = parseInt(stock);
  const stockFinal = isNaN(stockNumerico) ? 10 : stockNumerico;

  return (
    <div className={styles.card}>
      {/* Reutilizamos la clase de imagen, si no hay imagen usamos un emoji */}
      {imagen ? (
        <img src={imagen} alt={nombre} className={styles.cardImage} />
      ) : (
        <div className={`${styles.imagePlaceholder} ${styles.bgLibro}`}>🎒</div> 
      )}
      
      <div className={styles.content}>
        <span className={`${styles.badge} ${styles.badgeLibro}`}>Mochila</span>
        <h3 className={styles.title}>{nombre}</h3>
        
        {/* MOSTRAMOS EL STOCK CON LA VARIABLE BLINDADA */}
        <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: stockFinal > 0 ? '#2e7d32' : '#d32f2f', fontWeight: 'bold' }}>
          {stockFinal > 0 ? `Stock: ${stockFinal}` : 'Agotado'}
        </p>

        <p className={styles.oldPrice}>Precio regular</p>
        <p className={`${styles.price} ${styles.priceLibro}`}>S/ {precio.toFixed(2)}</p>
        
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