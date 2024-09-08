export const validateFields = (fields) => {
    const errors = {};

    if (!fields.name) {
        errors.name = 'Заполните поле';
    }
    if (!fields.surname) {
        errors.surname = 'Заполните поле';
    }

    if (!fields.phone) {
        errors.phone = 'Заполните поле';
    } else {
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(fields.phone)) {
            errors.phone = 'Неправильный формат';
        }
    }

    if (!fields.date) {
        errors.date = 'Заполните поле';
    }

    if (!fields.time) {
        errors.time = 'Заполните поле';
    }

    const dateTimeError = isDateTimeValid(fields.date, fields.time);
    if (dateTimeError) {
        errors.date = dateTimeError;
    }

    if (!Object.values(fields.services).some((service) => service)) {
        errors.services = 'Выберите услугу';
    }

    return errors;
};

const isDateTimeValid = (date, time) => {
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);

    if (selectedDateTime < now) {
        return 'Дата и время уже прошли.';
    }

    const hour = selectedDateTime.getHours();
    if (hour < 9 || hour > 20 || (hour === 20 && selectedDateTime.getMinutes() > 0)) {
        return 'Мы работаем с 9:00 до 21:00.';
    }

    return null;
};
