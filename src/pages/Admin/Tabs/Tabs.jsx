import React, { useState } from 'react';
import styles from './Tabs.module.css';

const Tabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('editor');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === 'editor' ? styles.active : ''}`}
        onClick={() => handleTabChange('editor')}
      >
        Редактор акций
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'messages' ? styles.active : ''}`}
        onClick={() => handleTabChange('messages')}
      >
        Сообщения
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
        onClick={() => handleTabChange('settings')}
      >
        Настройки
      </button>
    </div>
  );
};

export default Tabs;
