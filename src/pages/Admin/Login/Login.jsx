import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      onLogin();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <h2>Вход в админ-панель</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="Logintext"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleLogin} className={styles.loginButton}>
          Войти
        </button>
      </div>
      <div className={styles.imageContainer}>
        <img
          src="https://avatars.mds.yandex.net/i?id=5af9e137db54c2ec0243e18572e767c2_l-5246115-images-thumbs&n=13"
          alt="Admin"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Login;
