import React, { useState, useEffect } from 'react';
import styles from './PromotionsBlock.module.css';

const PromotionsBlock = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const savedPromotions = JSON.parse(localStorage.getItem('promotions')) || [];
    setPromotions(savedPromotions);
  }, []);

  return (
    <section className={styles.promotionsBlock}>
      <h2 className={styles.title}>Акции</h2>
      {promotions.length === 0 ? (
        <p className={styles.noPromotions}>Нет акций</p>
      ) : (
        <ul className={styles.promotionsList}>
          {promotions.map((promotion, index) => (
            <li key={index} className={styles.promotionItem}>
              • {promotion}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PromotionsBlock;
