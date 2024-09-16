import React from 'react';
import styles from './WhyUs.module.css';
import price from  '../../../images/price.svg';
import discount from  '../../../images/discount.svg';
import like from  '../../../images/like.svg';
import medal from  '../../../images/medal.svg';
import basket from  '../../../images/basket.svg';
import body from  '../../../images/body.svg';


const WhyUs = () => {
  const items = [
    { id: price, title: 'Низкие цены', text: 'У нас самые лучшие и небольшие цены на рынке' },
    { id: discount, title: 'Акции и скидки', text: 'только у нас вы найдете, множество акций и скидок' },
    { id: like, title: 'Отзывы', text: 'Наши клиенты довольны работой наших мастеров' },
    { id: medal, title: 'Качество', text: 'Мы выполняем нашу работу на высоком уровне качества' },
    { id: basket, title: 'Услуги', text: 'У нас есть огромный выбор услуг и предложений для вас' },
    { id: body, title: 'Персонал', text: 'У нас работают самые професиональные сотрудники' },
  ];

  return (
    <div className={styles.whyUsBlock}>
      <h2 className={styles.title}>Почему выбирают нас?</h2>
      <div className={styles.cardsContainer}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <img
              src={`${item.id}`}
              alt={`${item.id}`}
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
