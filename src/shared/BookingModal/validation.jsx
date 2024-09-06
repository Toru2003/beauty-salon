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

    if (!Object.values(fields.services).some((service) => service)) {
        errors.services = 'Выберите услугу';
    }

    return errors;
};
