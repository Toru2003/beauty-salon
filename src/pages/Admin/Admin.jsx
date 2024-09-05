import React, { useState } from 'react';
import Login from './Login/Login';
import Tabs from './Tabs/Tabs';
import PromotionsEditor from './PromotionsEditor/PromotionsEditor';
import PriceListEditor from './PriceListEditor/PriceListEditor'; // Импортируем редактор прайс-листа
import styles from './Admin.module.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  const handleLogin = () => {
    setIsAuthenticated(true);
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
          <Tabs onTabChange={handleTabChange} />
          <div className={styles.tabContent}>
            {activeTab === 'editor' && <PromotionsEditor />}
            {activeTab === 'messages' && <div>Сообщения</div>}
            {activeTab === 'settings' && <div>Настройки</div>}
            {activeTab === 'priceList' && <PriceListEditor />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
