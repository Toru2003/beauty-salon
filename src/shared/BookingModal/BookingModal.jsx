import React, { useState, useEffect } from 'react';
import styles from './BookingModal.module.css';

const Modal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');
  const [services, setServices] = useState({
    depilation: false,
    manicure: false,
    brows: false,
    haircut: false,
  });
  const [error, setError] = useState('');
  
  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setServices((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = () => {
    if (!name || !surname || !phone || !date || !time) {
      setError('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    
    // Check for time conflicts
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const now = new Date().getTime();
    const inputDateTime = new Date(`${date}T${time}`).getTime();
    const oneHour = 60 * 60 * 1000;

    const isTimeConflict = messages.some(message => {
      const messageDateTime = new Date(`${message.date}T${message.time}`).getTime();
      return Math.abs(inputDateTime - messageDateTime) < oneHour;
    });

    if (isTimeConflict) {
      setError('Это время уже занято. Пожалуйста, выберите другое время.');
      return;
    }

    const newMessage = {
      name,
      surname,
      phone,
      date,
      time,
      comment,
      services: Object.keys(services).filter(key => services[key]),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...(JSON.parse(localStorage.getItem('messages')) || []), newMessage];
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        <h2>Запись</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form>
          <label>
            Имя:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Фамилия:
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </label>
          <label>
            Номер телефона:
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label>
            Дата:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Время:
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
          <label>
            Комментарий:
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          </label>
          <fieldset>
            <legend>Услуги:</legend>
            <label>
              <input
                type="checkbox"
                name="depilation"
                checked={services.depilation}
                onChange={handleServiceChange}
              />
              Депиляция
            </label>
            <label>
              <input
                type="checkbox"
                name="manicure"
                checked={services.manicure}
                onChange={handleServiceChange}
              />
              Маникюр
            </label>
            <label>
              <input
                type="checkbox"
                name="brows"
                checked={services.brows}
                onChange={handleServiceChange}
              />
              Брови
            </label>
            <label>
              <input
                type="checkbox"
                name="haircut"
                checked={services.haircut}
                onChange={handleServiceChange}
              />
              Стрижка
            </label>
          </fieldset>
          <button type="button" onClick={handleSubmit}>Записаться</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
