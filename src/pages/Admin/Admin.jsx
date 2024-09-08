import React, { useState, useEffect } from 'react';
import Login from './Login/Login';
import Tabs from './Tabs/Tabs';
import PromotionsEditor from './PromotionsEditor/PromotionsEditor';
import PriceListEditor from './PriceListEditor/PriceListEditor'; // Импортируем редактор прайс-листа
import styles from './Admin.module.css';
import MessagesBlock from './MessagesBlock/MessagesBlock.jsx';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  useEffect(() => {
    // Проверяем наличие информации о входе при загрузке страницы
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Сохраняем состояние входа в localStorage
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Удаляем состояние входа из localStorage при выходе
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.adminContainer}>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className={styles.content}>
          <Tabs onTabChange={handleTabChange} onLogout={handleLogout} />
          <div className={styles.tabContent}>
            {activeTab === 'editor' && <PromotionsEditor />}
            {activeTab === 'messages' && <MessagesBlock />}
            {activeTab === 'settings' && <div>Настройки</div>}
            {activeTab === 'priceList' && <PriceListEditor />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
