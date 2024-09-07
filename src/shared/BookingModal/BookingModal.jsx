import React, { useState, useEffect } from 'react';
import styles from './BookingModal.module.css';
import MaskedInput from 'react-text-mask';  // Импортируем MaskedInput
import { validateFields } from './validation'; // Импортируем функцию валидации

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const phoneMask = [
  '+', /[7]/, ' ',
  '(',
  /[1-9]/, /\d/, /\d/, ')', ' ',
  /\d/, /\d/, /\d/, '-',
  /\d/, /\d/, '-',
  /\d/, /\d/
];

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
  const [selectedServices, setSelectedServices] = useState([]);
  const [errors, setErrors] = useState({});  // Для хранения ошибок

  useEffect(() => {
    // Получаем список выбранных услуг и их прайс-листы из localStorage
    const storedPrices = JSON.parse(localStorage.getItem('prices')) || {};
    const newSelectedServices = Object.keys(services).filter(key => services[key]);
    const newPrices = newSelectedServices.flatMap(service => storedPrices[service] || []);
    setSelectedServices(newPrices);
  }, [services]);

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setServices((prev) => ({ ...prev, [name]: checked }));
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
    const halfHour = 30 * 60 * 1000; // 30 минут

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

  // Проверяем, что все обязательные поля заполнены
  if (!name || !surname || !phone || !date || !time || !Object.values(services).some(Boolean)) {
    setErrors({ global: 'Заполните все обязательные поля.' });
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
            <MaskedInput
              mask={phoneMask}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.phoneInput}
            />
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

          <div className={styles.servicePrices}>
            <h3>Прайс-листы:</h3>
            {selectedServices.length > 0 ? (
              <div>
                {selectedServices.map((service, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const serviceName = e.target.nextSibling.textContent;
                        const updatedServices = [...(JSON.parse(localStorage.getItem('messages')) || []), serviceName];
                        localStorage.setItem('messages', JSON.stringify(updatedServices));
                      }}
                    />
                    {service.name} - {service.price}
                  </label>
                ))}
              </div>
            ) : (
              <p>Выберите услуги, чтобы увидеть прайс-листы.</p>
            )}
          </div>
          
          <button type="button" onClick={handleSubmit}>Записаться</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
