import React, { useEffect, useState } from 'react';
import styles from './MessagesBlock.module.css';

const MESSAGES_PER_PAGE = 5;

const MessagesBlock = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMessages = () => {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(savedMessages.reverse());
  };

  useEffect(() => {
    loadMessages(); 

    window.addEventListener('storage', loadMessages);

    return () => window.removeEventListener('storage', loadMessages);
  }, []); 

  const handleDelete = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedMessages = messages.slice((currentPage - 1) * MESSAGES_PER_PAGE, currentPage * MESSAGES_PER_PAGE);

  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);

  return (
    <div className={styles.messagesContainer}>
      <h2>Сообщения</h2>
      {paginatedMessages.length === 0 ? (
        <p>Нет записей</p>
      ) : (
        <ul>
          {paginatedMessages
            .filter(message => message.name && message.surname && message.phone) 
            .map((message, index) => (
              <li key={index} className={styles.messageItem}>
                <p><strong>Имя:</strong> {message.name}</p>
                <p><strong>Фамилия:</strong> {message.surname}</p>
                <p><strong>Телефон:</strong> {message.phone}</p>
                <p><strong>Дата:</strong> {message.date}</p>
                <p><strong>Время:</strong> {message.time}</p>
                <p><strong>Комментарий:</strong> {message.comment}</p>
                <p><strong>Услуги:</strong> {Array.isArray(message.services) ? message.services.join(', ') : 'Не указаны'}</p>
                <button onClick={() => handleDelete(index)}>Удалить</button>
              </li>
            ))}
        </ul>
      )}
      <div className={styles.pagination}>
        {[...Array(totalPages).keys()].map(page => (
          <button
            key={page + 1}
            className={styles.pageButton}
            onClick={() => handlePageChange(page + 1)}
            disabled={currentPage === page + 1}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessagesBlock;
