import React, { useEffect, useState } from 'react';
import styles from './MessagesBlock.module.css';

const MessagesBlock = () => {
  const [messages, setMessages] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
      setMessages(savedMessages);
    };

    loadMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
      const updatedMessages = savedMessages.filter(message => {
        const messageTime = new Date(message.timestamp).getTime();
        return now < messageTime + 60 * 60 * 1000;
      });
      setMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
    }, 60000); 

    return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    setPrices(storedPrices);
  }, []);

  const handleDelete = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  return (
    <div className={styles.messagesContainer}>
      <h2>Сообщения</h2>
      {messages.length === 0 ? (
        <p>Нет записей</p>
      ) : (
        <ul>
          {messages
            .filter(message => message.name && message.surname && message.phone) // Фильтрация пустых сообщений
            .map((message, index) => (
              <li key={index} className={styles.messageItem}>
                <p><strong>Имя:</strong> {message.name}</p>
                <p><strong>Фамилия:</strong> {message.surname}</p>
                <p><strong>Телефон:</strong> {message.phone}</p>
                <p><strong>Дата:</strong> {message.date}</p>
                <p><strong>Время:</strong> {message.time}</p>
                <p><strong>Комментарий:</strong> {message.comment}</p>
                <p><strong>Услуги:</strong> {Array.isArray(message.services) ? message.services.join(', ') : 'Не указаны'}</p>
                <div>
                  <h4>Прайс-лист выбранных услуг:</h4>
                  <ul>
                    {Array.isArray(message.services) && message.services.length > 0 ? (
                      message.services.map((serviceName, i) => {
                        const servicePrices = prices[serviceName] || [];
                        return (
                          <div key={i}>
                            <h5>{serviceName}</h5>
                            <ul>
                              {servicePrices.map((priceItem, j) => (
                                <li key={`${i}-${j}`}>
                                  {priceItem.name} - {priceItem.price} ₽
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })
                    ) : (
                      <p>Не указаны прайсы для выбранных услуг</p>
                    )}
                  </ul>
                </div>
                <button onClick={() => handleDelete(index)}>Удалить</button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesBlock;
