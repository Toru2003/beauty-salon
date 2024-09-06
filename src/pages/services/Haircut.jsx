// src/pages/Haircut/Haircut.jsx
import React, { useState, useEffect } from 'react';
import styles from './services.module.css';
import haircutimg from '../../images/haircutimg.png';

const Haircut = () => {
  const [prices, setPrices] = useState([]);
  const [description] = useState('Чем отличается парикмахер-стилист от простого мастера? Это своеобразный креативный директор для вашей прически, который не только правильно и точно сделает стрижку или укладку, но сделает ее уникальной именно для своего клиента. Стилист-парикмахер тщательно прорабатывает ту идею, с которой модница к нему приходит, подбирает альтернативные варианты и самые лучшие форматы воплощения идеи в жизнь.');

  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    setPrices(storedPrices.haircut || []);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={haircutimg} alt="Haircut" />
      </div>
      <div className={styles.details}>
        <h1>Стрижка</h1>
        <p>{description}</p>
        <hr />
        <div className={styles.priceList}>
          <h2>Прайс-лист</h2>
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button>Записаться</button>
      </div>
    </div>
  );
};

export default Haircut;
