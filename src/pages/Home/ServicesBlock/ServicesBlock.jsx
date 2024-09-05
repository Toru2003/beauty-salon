import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ServicesBlock.module.css';

const services = [
  {
    id: 'depilation',
    title: 'Депиляция',
    imageUrl: 'https://i.pinimg.com/originals/f0/11/a5/f011a55da79318dcb80866b1dcb6b688.jpg', // Укажите здесь ссылки на изображения
  },
  {
    id: 'manicure',
    title: 'Маникюр/Педикюр',
    imageUrl: 'https://i.pinimg.com/originals/f0/11/a5/f011a55da79318dcb80866b1dcb6b688.jpg',
  },
  {
    id: 'brows',
    title: 'Брови/Ресницы',
    imageUrl: 'https://i.pinimg.com/originals/f0/11/a5/f011a55da79318dcb80866b1dcb6b688.jpg',
  },
  {
    id: 'haircut',
    title: 'Стрижка',
    imageUrl: 'https://i.pinimg.com/originals/f0/11/a5/f011a55da79318dcb80866b1dcb6b688.jpg',
  },
];

const ServicesBlock = () => {
  const navigate = useNavigate();

  const handleMoreDetails = (serviceId) => {
    navigate(`/${serviceId}`);
  };

  return (
    <div className={styles.servicesContainer}>
      <h2 className={styles.title}>Наши услуги</h2>
      {services.map((service) => (
        <div key={service.id} className={styles.card}>
          <img src={service.imageUrl} alt={service.title} className={styles.image} />
          <div className={styles.info}>
            <h3>{service.title}</h3>
            <button
              className={styles.button}
              onClick={() => handleMoreDetails(service.id)}
            >
              Подробнее
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesBlock;
