import styles from './ProductCard.module.css';

export default function MaterialCard({ nombre, precio, imagen, marca, onAgregar, esAdmin }) {
  return (
    <div className={styles.card}>
      {imagen ? <img src={imagen} alt={nombre} className={styles.cardImage} /> : <div className={`${styles.imagePlaceholder} ${styles.bgMaterial}`}>✏️</div>}
      <div className={styles.content}>
        <span className={`${styles.badge} ${styles.badgeMaterial}`}>Útiles</span>
        <h3 className={styles.title}>{nombre}</h3>
        
        {/* MOSTRAMOS LA MARCA SI EXISTE */}
        {marca && <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>🏷️ Marca: {marca}</p>}
        
        <p className={styles.oldPrice}>Precio único</p>
        <p className={`${styles.price} ${styles.priceMaterial}`}>S/ {precio.toFixed(2)}</p>
        
        {esAdmin ? (
          <button disabled className={styles.button} style={{ backgroundColor: '#ccc' }}>Solo vista previa</button>
        ) : (
          <button onClick={() => onAgregar({ nombre, precio })} className={styles.button}>Agregar al carrito</button>
        )}
      </div>
    </div>
  );
}