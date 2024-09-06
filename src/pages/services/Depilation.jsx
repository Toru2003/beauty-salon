
import React, { useState, useEffect } from 'react';
import styles from './services.module.css';
import Modal from '../../shared/BookingModal/BookingModal.jsx';
import imagedepilation from '../../images/depilation.png';

const Depilation = () => {
  const [prices, setPrices] = useState([]);
  const [description] = useState('Депиляция – это процесс удаления нежелательных волос. В нашем салоне Вы можете удалить волоски из подмышечных впадин, с рук, живота, ягодиц, бикини и спины. Депиляция – это еще и неотъемлемая часть подготовки к пляжному сезону, когда все то, что было скрыто под одеждой, становится заметным.');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    setPrices(storedPrices.depilation || []);
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
        <img src={imagedepilation} alt="Depilation" />
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
      {isModalOpen && <Modal onClose={closeModal} />} 
    </div>
  );
};

export default Depilation;
