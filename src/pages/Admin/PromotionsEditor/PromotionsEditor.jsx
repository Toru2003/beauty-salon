import React, { useState, useEffect } from 'react';
import styles from './PromotionsEditor.module.css';

const PromotionsEditor = () => {
  const [promotions, setPromotions] = useState([]);
  
  useEffect(() => {
    const savedPromotions = JSON.parse(localStorage.getItem('promotions')) || [];
    setPromotions(savedPromotions);
  }, []);

  const handleAddPromotion = () => {
    setPromotions([...promotions, '']);
  };

  const handlePromotionChange = (index, value) => {
    const updatedPromotions = [...promotions];
    updatedPromotions[index] = value;
    setPromotions(updatedPromotions);
  };

  const handleRemovePromotion = (index) => {
    const updatedPromotions = promotions.filter((_, i) => i !== index);
    setPromotions(updatedPromotions);
  };

  const handleSave = () => {
    localStorage.setItem('promotions', JSON.stringify(promotions));
  };

  return (
    <div className={styles.promotionsEditor}>
      <h2>Редактор акций</h2>
      {promotions.length === 0 ? (
        <p className={styles.noPromotions}>Нет акций</p>
      ) : (
        <>
          {promotions.map((promotion, index) => (
            <div key={index} className={styles.promotionEntry}>
              <input
                type="text"
                value={promotion}
                onChange={(e) => handlePromotionChange(index, e.target.value)}
                className={styles.promotionInput}
              />
              <button
                onClick={() => handleRemovePromotion(index)}
                className={styles.removeButton}
              >
                Удалить
              </button>
            </div>
          ))}
        </>
      )}
      <button onClick={handleAddPromotion} className={styles.addButton}>
        +
      </button>
      <button onClick={handleSave} className={styles.saveButton}>
        Сохранить
      </button>
    </div>
  );
};

export default PromotionsEditor;
