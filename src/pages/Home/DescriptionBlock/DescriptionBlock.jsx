import React from 'react';
import styles from './DescriptionBlock.module.css';

const DescriptionBlock = () => {
  return (
    <section className={styles.homeSection}>
      <div className={styles.textBlock}>
        <h1 className={styles.title}>Beauty Salon</h1>
        <p className={styles.description}>
          Добро пожаловать в наш салон красоты, где вы сможете получить
          самые качественные услуги по уходу за собой.
        </p>
        <button className={styles.servicesButton}>
          Смотреть услуги
        </button>
      </div>
      <div className={styles.imageBlock}>
        <img
          src="https://yt3.ggpht.com/a/AGF-l78OL5DjYiwMUuj3JiSLWUWXXQUNztM7xf7Wcg=s900-c-k-c0xffffffff-no-rj-mo"
          alt="Beauty Salon"
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default DescriptionBlock;
