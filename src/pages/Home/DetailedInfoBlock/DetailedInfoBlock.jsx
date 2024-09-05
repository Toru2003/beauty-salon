import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import styles from './DetailedInfoBlock.module.css';

const DetailedInfoBlock = () => {
  const images = [
    'https://avatars.mds.yandex.net/i?id=690120a2a3029cc0f0535916905112080bb6ca4db6515874-12625178-images-thumbs&n=13',
    'https://avatars.mds.yandex.net/i?id=690120a2a3029cc0f0535916905112080bb6ca4db6515874-12625178-images-thumbs&n=13',
    'https://avatars.mds.yandex.net/i?id=690120a2a3029cc0f0535916905112080bb6ca4db6515874-12625178-images-thumbs&n=13',
    'https://avatars.mds.yandex.net/i?id=690120a2a3029cc0f0535916905112080bb6ca4db6515874-12625178-images-thumbs&n=13',
    'https://avatars.mds.yandex.net/i?id=690120a2a3029cc0f0535916905112080bb6ca4db6515874-12625178-images-thumbs&n=13',
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
