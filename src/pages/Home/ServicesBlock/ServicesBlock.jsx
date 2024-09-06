import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ServicesBlock.module.css';
import imagedepilation from '../../../images/depilation.png';
import browsimg from '../../../images/browsimg.png';
import manicureimg from '../../../images/manicureimg.png';
import haircutimg from '../../../images/haircutimg.png';

const services = [
  {
    id: 'depilation',
    title: 'Депиляция',
    imageUrl: imagedepilation,
  },
  {
    id: 'manicure',
    title: 'Маникюр/Педикюр',
    imageUrl: manicureimg,
  },
  {
    id: 'brows',
    title: 'Брови/Ресницы',
    imageUrl: browsimg,
  },
  {
    id: 'haircut',
    title: 'Стрижка',
    imageUrl: haircutimg,
  },
];

const ServicesBlock = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const handleMoreDetails = (serviceId) => {
    navigate(`/${serviceId}`);
  };

  return (
    <div className={styles.servicesContainer} ref={ref}>
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
});

export default ServicesBlock; 
