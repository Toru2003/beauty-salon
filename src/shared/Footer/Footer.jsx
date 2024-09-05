import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.icon}>
        {/* Здесь можно вставить любую иконку, например через <img> или <i> */}
        🌸
      </div>
    </footer>
  );
};

export default Footer;
