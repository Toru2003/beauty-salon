import React from 'react';
import styles from './WhyUs.module.css';
import './public/price.svg';
import './public/discount.svg';
import './public/like.svg';
import './public/medal.svg';
import './public/basket.svg';
import './public/body.svg';

const WhyUs = () => {
  const items = [
    { id: 'price', title: 'Низкие цены', text: 'У нас самые лучшие и небольшие цены на рынке' },
    { id: 'discount', title: 'Акции и скидки', text: 'только у нас вы найдете, множество акций и скидок' },
    { id: 'like', title: 'Отзывы', text: 'Наши клиенты довольны работой наших мастеров' },
    { id: 'medal', title: 'Качество', text: 'Мы выполняем нашу работу на высоком уровне качества' },
    { id: 'basket', title: 'Услуги', text: 'У нас есть огромный выбор услуг и предложений для вас' },
    { id: 'body', title: 'Персонал', text: 'У нас работают самые професиональные сотрудники' },
  ];

  return (
    <div className={styles.whyUsBlock}>
      <h2 className={styles.title}>Почему выбирают нас?</h2>
      <div className={styles.cardsContainer}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <img
              src={`${item.id}.svg`}
              alt={`${item.id}.svg`}
            />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
