import styles from './ProductCard.module.css';

export default function ComicCard({ nombre, precio, imagen, autor, onAgregar, esAdmin }) {
  const precioConBolsa = precio + 2.00;
  
  return (
    <div className={styles.card}>
      {imagen ? <img src={imagen} alt={nombre} className={styles.cardImage} /> : <div className={`${styles.imagePlaceholder} ${styles.bgComic}`}>🦸</div>}
      <div className={styles.content}>
        <span className={`${styles.badge} ${styles.badgeComic}`}>Cómic</span>
        <h3 className={styles.title}>{nombre}</h3>
        
        {/* MOSTRAMOS EL AUTOR SI EXISTE */}
        {autor && <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>✍️ {autor}</p>}
        
        <p className={styles.oldPrice}>Precio base: ${precio.toFixed(2)}</p>
        <p className={`${styles.price} ${styles.priceComic}`}>${precioConBolsa.toFixed(2)}</p>
        
        {esAdmin ? (
          <button disabled className={styles.button} style={{ backgroundColor: '#ccc' }}>Solo vista previa</button>
        ) : (
          <button onClick={() => onAgregar({ nombre, precio: precioConBolsa })} className={styles.button}>Agregar al carrito</button>
        )}
      </div>
    </div>
  );
}