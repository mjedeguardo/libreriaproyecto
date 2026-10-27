import styles from './ProductCard.module.css';

export default function MochilaCard({ nombre, precio, imagen, onAgregar, esAdmin }) {
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
        
        <p className={styles.oldPrice}>Precio regular</p>
        <p className={`${styles.price} ${styles.priceLibro}`}>S/ {precio.toFixed(2)}</p>
        
        {esAdmin ? (
          <button disabled className={styles.button} style={{ backgroundColor: '#ccc' }}>Solo vista previa</button>
        ) : (
          <button onClick={() => onAgregar({ nombre, precio })} className={styles.button}>Agregar al carrito</button>
        )}
      </div>
    </div>
  );
}