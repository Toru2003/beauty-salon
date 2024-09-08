import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import '../public/logo.svg';


const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
      <img src='logo.svg' alt="Site Logo" className={styles.logoico} /> 
        <p>BeautySalon</p>
      </Link>
      <div className={styles.info}>
        <div className={styles.infoBlock}>
          <strong>г. Челябинск</strong>
          <span>ул. Барбюсса, д. 18</span>
        </div>
        <div className={styles.infoBlock}>
          <strong>Режим работы:</strong>
          <span>с 9:00 до 21:00</span>
        </div>
        <div className={styles.infoBlock}>
          <strong>Номер:</strong>
          <span>+7 (999) 999-99-99</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
