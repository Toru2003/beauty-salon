import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import styles from './DetailedInfoBlock.module.css';
import primer1 from '../../../images/primer1.png';
import primer2 from '../../../images/primer2.png';
import primer3 from '../../../images/primer3.png';
import primer4 from '../../../images/primer4.png';


const DetailedInfoBlock = () => {
  const images = [
    primer1,
    primer2,
    primer3,
    primer4,
  ];

  return (
    <div className={styles.detailedInfoBlock}>
      <div className={styles.slider}>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`Slide ${index}`} className={styles.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.info}>
        <h2>Подробнее о нас</h2>
        <p>
          Добро пожаловать в наш салон красоты! Мы предлагаем широкий спектр услуг для вашего
          преображения и расслабления. Наши мастера – профессионалы своего дела, готовые помочь вам
          в создании уникального образа.
        </p>
      </div>
    </div>
  );
};

export default DetailedInfoBlock;
