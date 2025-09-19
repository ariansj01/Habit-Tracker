const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 6;
};

const validateName = (name) => {
    return name && name.trim().length >= 2;
};

const validateHabitName = (title) => {
    return title && title.trim().length >= 1;
};

const validateId = (id) => {
    return id && id.match(/^[0-9a-fA-F]{24}$/);
};

const validateUserId = (userId) => {
    return userId && userId.match(/^[0-9a-fA-F]{24}$/);
};

const validateArchived = (archived) => {
    return typeof archived === 'boolean';
};

const validateColor = (color) => {
    if (!color) return true; // Optional field
    return /^#[0-9A-F]{6}$/i.test(color);
};

const validateFrequency = (frequency) => {
    return frequency === 'daily';
};

const validateStartDate = (startDate) => {
    if (!startDate) return true; // Optional field
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(startDate);
};

const validateOrder = (order) => {
    if (order === undefined || order === null) return true; // Optional field
    return Number.isInteger(order) && order >= 0;
};

module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validateHabitName,
    validateId,
    validateUserId,
    validateArchived,
    validateColor,
    validateFrequency,
    validateStartDate,
    validateOrder
};
