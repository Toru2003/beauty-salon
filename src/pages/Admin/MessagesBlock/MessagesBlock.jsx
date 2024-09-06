// src/components/MessagesBlock/MessagesBlock.jsx
import React, { useEffect, useState } from 'react';
import styles from './MessagesBlock.module.css';

const MessagesBlock = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
      setMessages(savedMessages);
    };

    loadMessages();
  }, []); // Зависимости пустые, чтобы этот эффект выполнялся только при монтировании компонента

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
    }, 60000); // Проверка каждую минуту

    return () => clearInterval(interval);
  }, []); // Зависимости пустые, чтобы этот эффект выполнялся только при монтировании компонента

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
          {messages.map((message, index) => (
            <li key={index} className={styles.messageItem}>
              <p><strong>Имя:</strong> {message.name}</p>
              <p><strong>Фамилия:</strong> {message.surname}</p>
              <p><strong>Телефон:</strong> {message.phone}</p>
              <p><strong>Дата:</strong> {message.date}</p>
              <p><strong>Время:</strong> {message.time}</p>
              <p><strong>Комментарий:</strong> {message.comment}</p>
              <p><strong>Услуги:</strong> {message.services.join(', ')}</p>
              <button onClick={() => handleDelete(index)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesBlock;
