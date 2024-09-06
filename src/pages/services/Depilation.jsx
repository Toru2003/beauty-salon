// src/pages/Depilation/Depilation.jsx
import React, { useState, useEffect } from 'react';
import styles from './services.module.css';
import Modal from '../../shared/BookingModal/BookingModal.jsx';

const Depilation = () => {
  const [prices, setPrices] = useState([]);
  const [description] = useState('Депиляция – это процесс удаления нежелательных волос. В нашем салоне Вы можете удалить волоски из подмышечных впадин, с рук, живота, ягодиц, бикини и спины. Депиляция – это еще и неотъемлемая часть подготовки к пляжному сезону, когда все то, что было скрыто под одеждой, становится заметным.');
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления видимостью модального окна

  useEffect(() => {
    // Избегайте изменения состояния в зависимости от самого состояния
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    setPrices(storedPrices.depilation || []);
  }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только при монтировании

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src="https://i.pinimg.com/originals/f0/11/a5/f011a55da79318dcb80866b1dcb6b688.jpg" alt="Depilation" />
      </div>
      <div className={styles.details}>
        <h1>Депиляция</h1>
        <p>{description}</p>
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
        <button className={styles.button} onClick={openModal}>Записаться</button>
      </div>
      {isModalOpen && <Modal onClose={closeModal} />} {/* Вставляем модальное окно */}
    </div>
  );
};

export default Depilation;
