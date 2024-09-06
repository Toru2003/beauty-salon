import React, { useState } from 'react';
import styles from './BookingModal.module.css';
import { validateFields } from './validation'; // Импортируем функцию валидации

const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, ''); // Удаляем все нецифровые символы

  if (cleaned.length <= 1) return `+7${cleaned}`;

  let formatted = `+7 (${cleaned.slice(1, 4)}`;
  if (cleaned.length > 4) formatted += `) ${cleaned.slice(4, 7)}`;
  if (cleaned.length > 7) formatted += `-${cleaned.slice(7, 9)}`;
  if (cleaned.length > 9) formatted += `-${cleaned.slice(9, 11)}`;

  return formatted;
};

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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
  const [errors, setErrors] = useState({});  // Для хранения ошибок

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setServices((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatPhoneNumber(rawValue);
    setPhone(formattedValue);
  };

  const handleTextChange = (e, setter) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^a-zA-Zа-яА-Я]/g, ''); // Оставляем только буквы
    setter(capitalizeFirstLetter(formattedValue));
  };

  const handleSubmit = () => {
    const fields = { name, surname, phone, date, time, services };
    const validationErrors = validateFields(fields);

    // Проверка занятости времени
    if (!validationErrors.date && !validationErrors.time) {
      const messages = JSON.parse(localStorage.getItem('messages')) || [];
      const inputDateTime = new Date(`${date}T${time}`).getTime();
      const halfHour = 30 * 60 * 1000;

      const isTimeConflict = messages.some(message => {
        const messageDateTime = new Date(`${message.date}T${message.time}`).getTime();
        const messageServices = message.services || [];
        return Math.abs(inputDateTime - messageDateTime) < halfHour &&
               messageServices.some(service => services[service]);
      });

      if (isTimeConflict) {
        validationErrors.time = 'Время занято.';
        setErrors(validationErrors);
        return;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);  // Если есть ошибки, сохраняем их
      return;
    }

    // Если ошибок нет, продолжаем выполнение
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
        {errors.global && <p className={styles.error}>{errors.global}</p>}
        <form>
          <div className={styles.formGroup}>
            <div className={styles.formLabelWrapper}>
              <label>Имя:</label>
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => handleTextChange(e, setName)}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formLabelWrapper}>
              <label>Фамилия:</label>
              {errors.surname && <span className={styles.errorText}>{errors.surname}</span>}
            </div>
            <input
              type="text"
              value={surname}
              onChange={(e) => handleTextChange(e, setSurname)}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formLabelWrapper}>
              <label>Номер телефона:</label>
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
            <input type="text" value={phone} onChange={handlePhoneChange} />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formLabelWrapper}>
              <label>Дата:</label>
              {errors.date && <span className={styles.errorText}>{errors.date}</span>}
            </div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formLabelWrapper}>
              <label>Время:</label>
              {errors.time && <span className={styles.errorText}>{errors.time}</span>}
            </div>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formLabelWrapper}>
              <label>Комментарий:</label>
            </div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>

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
            {errors.services && <p className={styles.errorText}>{errors.services}</p>}
          </fieldset>
          
          <button type="button" onClick={handleSubmit}>Записаться</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
