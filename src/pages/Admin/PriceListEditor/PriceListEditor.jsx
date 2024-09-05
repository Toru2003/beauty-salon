// src/Admin/PriceListEditor/PriceListEditor.jsx
import React, { useState, useEffect } from 'react';
import styles from './PriceListEditor.module.css';

const PriceListEditor = () => {
  const [selectedPage, setSelectedPage] = useState('depilation');
  const [prices, setPrices] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [pages] = useState(['depilation', 'manicure', 'brows', 'haircut']); // Возможные страницы

  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    setPrices(storedPrices[selectedPage] || []);
  }, [selectedPage]);

  const handleChange = (index, field, value) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = { ...updatedPrices[index], [field]: value };
    setPrices(updatedPrices);
  };

  const handleAddItem = () => {
    setPrices([...prices, { name: '', price: '' }]);
  };

  const handleSave = () => {
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    storedPrices[selectedPage] = prices;
    localStorage.setItem('prices', JSON.stringify(storedPrices));
  };

  const handleDelete = (index) => {
    const updatedPrices = prices.filter((_, i) => i !== index);
    setPrices(updatedPrices);
  };

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
  };

  return (
    <div className={styles.editor}>
      <h2>Редактор прайс-листа</h2>
      <div className={styles.pageSelector}>
        <label htmlFor="page">Выберите страницу:</label>
        <select id="page" value={selectedPage} onChange={handlePageChange}>
          {pages.map((page) => (
            <option key={page} value={page}>
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.table}>
        {prices.map((item, index) => (
          <div key={index} className={styles.row}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Название"
            />
            <input
              type="text"
              value={item.price}
              onChange={(e) => handleChange(index, 'price', e.target.value)}
              placeholder="Цена"
            />
            <button onClick={() => handleDelete(index)}>Удалить</button>
          </div>
        ))}
        <button onClick={handleAddItem}>Добавить новую услугу</button>
        <button onClick={handleSave}>Сохранить изменения</button>
      </div>
    </div>
  );
};

export default PriceListEditor;
