import React from 'react';
import styles from './Footer.module.css';
import '../public/logo.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.icon}>
        <img src='logo.svg' alt="Site Logo" className={styles.logo} /> 
      </div>
    </footer>
  );
};

export default Footer;