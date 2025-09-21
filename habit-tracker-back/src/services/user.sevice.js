const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');
const  {validateEmail, validatePassword, validateName, validateId} = require('../utils/validation');

const findAll = async () => {
    try {
        const GetAll = await userRepository.findAll()
        return { success: true, data: GetAll };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const findById = async (id) => {
    if (!validateId(id)) {
        return { success: false, error: 'Invalid ID' };
    }
    try {
        const GetById = await userRepository.findById(id)
        return { success: true, data: GetById };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

const findByEmail = async (email) => {
    if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email' };
    }
    try {
        const GetById = await userRepository.findByEmail(email)
        return { success: true, data: GetById };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const create = async (userData) => {
    if (!validateEmail(userData.email)) {
        return { success: false, error: 'Invalid email' };
    }
    if (!validatePassword(userData.passwordHash)) {
        return { success: false, error: 'Invalid password' };
    }
    if (!validateName(userData.displayName)) {
        return { success: false, error: 'Invalid name' };
    }
    const { email, passwordHash, displayName, avatarUrl, timezone, settings } = userData
    const password = await bcrypt.hash(passwordHash, 10)
    try {
        const GetById = await userRepository.create(email, password, displayName, avatarUrl, timezone, settings)
        return { success: true, data: GetById, message: 'User created successfully' };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const update = async (id, userData) => {
    if (!validateId(id)) {
        return { success: false, error: 'Invalid ID' };
    }
    if (!validateEmail(userData.email)) {
        return { success: false, error: 'Invalid email' };
    }
    if (!validatePassword(userData.passwordHash)) {
        return { success: false, error: 'Invalid password' };
    }
    if (!validateName(userData.displayName)) {
        return { success: false, error: 'Invalid name' };
    }
    const { email, passwordHash, displayName, avatarUrl, timezone, settings } = userData
    const password = await bcrypt.hash(passwordHash, 10)
    try {
        const GetById = await userRepository.update(id, email, password, displayName, avatarUrl, timezone, settings)
        return { success: true, data: GetById, message: 'User updated successfully' };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const deleteUser = async (id) => {
    if (!validateId(id)) {
        return { success: false, error: 'Invalid ID' };
    }
    try {
        const GetById = await userRepository.delete(id)
        return { success: true, data: GetById, message: 'User deleted successfully' };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const count = async () => {
    try {
        const GetCount = await userRepository.count()
        return { success: true, data: GetCount, message: 'User count' };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    create,
    update,
    deleteUser,
    count
}