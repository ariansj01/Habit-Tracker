const bcrypt = require('bcryptjs');
const habitRepository = require('../repositories/habit.repository');
const  {validateId, validateHabitName, validateUserId, validateArchived, validateColor, validateFrequency, validateStartDate, validateOrder} = require('../utils/validation');
const findAll = async () => {
    try {
        const GetAll = await habitRepository.findAll()
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
        const GetById = await habitRepository.findById(id)
        return { success: true, data: GetById };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const findByEmail = async (email) => {
    if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email' };
    }
    try {
        const GetById = await habitRepository.findByEmail(email)
        return { success: true, data: GetById };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const create = async (habitData) => {
    const { userId, name, description , archived , color, frequency, startDate, order } = habitData
    try {
        const GetById = await habitRepository.create(userId, name, description, archived, color, frequency, startDate, order)
        return { success: true, data: GetById, message: 'Habit created successfully' };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const update = async (id, userData) => {
    const { userId, name, description , archived , color, frequency, startDate, order } = userData
    try {
        const GetById = await habitRepository.update(id, userId, name, description, archived, color, frequency, startDate, order)
        return { success: true, data: GetById, message: 'Habit updated successfully' };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const deleteHabit = async (id) => {
    if (!validateId(id)) {
        return { success: false, error: 'Invalid ID' };
    }
    try {
        const GetById = await habitRepository.delete(id)
        return { success: true, data: GetById, message: 'Habit deleted successfully' };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const count = async () => {
    try {
        const GetCount = await habitRepository.count()
        return { success: true, data: GetCount, message: 'Habit count' };
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
    deleteHabit,
    count
}