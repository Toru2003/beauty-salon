import React, { useState, useEffect } from 'react';
import styles from './services.module.css';
import browsimg from '../../images/browsimg.png';

const Brows = () => {
  const [prices, setPrices] = useState([]);
  const [description] = useState('Безусловно, тушь поможет добиться неплохого результата. Однако уже через несколько часов она начнет осыпаться, ее необходимо каждый раз тщательно смывать при помощи специальных средств. Мы предлагаем Вам современные салонные процедуры, которые помогут сделать взгляд незабываемым без вреда для натуральных ресничек.');

  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    setPrices(storedPrices.brows || []);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={browsimg} alt="Brows" />
      </div>
      <div className={styles.details}>
        <h1>Брови/Ресницы</h1>
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

export default Brows;
