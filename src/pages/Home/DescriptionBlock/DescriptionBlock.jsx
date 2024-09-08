import React from 'react';
import styles from './DescriptionBlock.module.css';
import imagest from '../../../images/mainimage.png';


const DescriptionBlock = ({ scrollToServices }) => {
  return (
    <section className={styles.homeSection}>
      <div className={styles.textBlock}>
        <h1 className={styles.title}>BeautySalon</h1>
        <p className={styles.description}>
          Добро пожаловать в наш салон красоты, где вы сможете получить
          самые качественные услуги по уходу за собой.
        </p>
        <button className={styles.servicesButton} onClick={scrollToServices}>
          Смотреть услуги
        </button>
      </div>
      <div className={styles.imageBlock}>
        <img
          src={imagest}
          alt="Beauty Salon"
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default DescriptionBlock;
