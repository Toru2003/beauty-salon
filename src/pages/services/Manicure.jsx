// src/pages/Manicure/Manicure.jsx
import React, { useState, useEffect } from 'react';
import styles from './services.module.css';

const Manicure = () => {
  const [prices, setPrices] = useState([]);
  const [description] = useState('Описание услуги маникюра.');

  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    setPrices(storedPrices.manicure || []);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src="https://i.pinimg.com/originals/f0/11/a5/f011a55da79318dcb80866b1dcb6b688.jpg" alt="Manicure" />
      </div>
      <div className={styles.details}>
        <h1>Маникюр/Педикюр</h1>
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

export default Manicure;
