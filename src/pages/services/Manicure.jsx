import React, { useState, useEffect } from 'react';
import styles from './services.module.css';
import manicureimg from '../../images/manicureimg.png';
import Modal from '../../shared/BookingModal/BookingModal.jsx';

const Manicure = () => {
  const [prices, setPrices] = useState([]);
  const [description] = useState('Эти процедуры позволяют чувствовать себя уверенно в любой ситуации. Более того, нейл-дизайн помогает разнообразить образ, сделать его более стильным и актуальным. Наш Салон красоты предлагает девушкам качественные услуги ногтевого сервиса, а опытные мастера – гордость салона. Мы предлагаем широкий выбор уходовых процедур,  разные виды маникюра и педикюра. В салоне используются только профессиональные декоративные покрытия известных мировых брендов.');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    setPrices(storedPrices.manicure || []);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={manicureimg} alt="Manicure" />
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
                  <td>{item.price} ₽</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className={styles.button} onClick={openModal}>Записаться</button>
      </div>
      {isModalOpen && <Modal onClose={closeModal} />} 
    </div>
  );
};

export default Manicure;
