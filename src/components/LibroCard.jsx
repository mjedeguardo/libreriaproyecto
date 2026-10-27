import styles from './ProductCard.module.css';

export default function LibroCard({ nombre, precio, imagen, autor, onAgregar, esAdmin }) {
  return (
    <div className={styles.card}>
      {imagen ? <img src={imagen} alt={nombre} className={styles.cardImage} /> : <div className={`${styles.imagePlaceholder} ${styles.bgLibro}`}>📚</div>}
      <div className={styles.content}>
        <span className={`${styles.badge} ${styles.badgeLibro}`}>Libro</span>
        <h3 className={styles.title}>{nombre}</h3>
        
        {/* MOSTRAMOS EL AUTOR SI EXISTE */}
        {autor && <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>✍️ {autor}</p>}
        
        {/* PRECIO ÚNICO EN SOLES */}
        <p className={`${styles.price} ${styles.priceLibro}`} style={{ marginTop: '15px' }}>
          S/ {precio.toFixed(2)}
        </p>
        
        {esAdmin ? (
          <button disabled className={styles.button} style={{ backgroundColor: '#ccc' }}>Solo vista previa</button>
        ) : (
          <button onClick={() => onAgregar({ nombre, precio })} className={styles.button}>Agregar al carrito</button>
        )}
      </div>
    </div>
  );
}