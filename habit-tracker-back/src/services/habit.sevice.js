const bcrypt = require('bcryptjs');
const habitRepository = require('../repositories/habit.repository');
const completionRepository = require('../repositories/completion.repository');
const  {validateId, validateHabitName, validateUserId, validateArchived, validateColor, validateFrequency, validateStartDate, validateOrder} = require('../utils/validation');
const findAll = async (userId, options = {}) => {
    try {
        const { page = 1, limit = 20, archived, sort = { createdAt: -1 } } = options
        const skip = (Math.max(1, Number(page)) - 1) * Math.max(1, Number(limit))
        const parsedLimit = Math.min(100, Math.max(1, Number(limit)))
        const GetAll = userId 
            ? await habitRepository.findAllByUser(userId, { archived: typeof archived === 'boolean' ? archived : undefined, skip, limit: parsedLimit, sort }) 
            : await habitRepository.findAll()
        return { success: true, data: GetAll, meta: { page: Number(page), limit: parsedLimit } };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const findById = async (id, userId) => {
    if (!validateId(id)) {
        return { success: false, error: 'Invalid ID' };
    }
    try {
        const GetById = userId ? await habitRepository.findByIdAndUser(id, userId) : await habitRepository.findById(id)
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

const create = async (habitData, userId) => {
    const { name, description , archived , color, frequency, startDate, order } = habitData
    try {
        const createdHabit = await habitRepository.create({
            userId, name, description, archived, color, frequency, startDate, order
        })
        return { success: true, data: createdHabit, message: 'Habit created successfully' };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const update = async (id, habitData, userId) => {
    const { name, description , archived , color, frequency, startDate, order } = habitData
    try {
        // Toggle archived and manage completion logs + recompute streak
        let patch = { userId, name, description, archived, color, frequency, startDate, order }
        const existing = await habitRepository.findByIdAndUser(id, userId)
        const todayStr = new Date().toDateString()
        if (typeof archived === 'boolean' && existing) {
            if (archived === true) {
                await completionRepository.upsert(userId, id, todayStr)
            } else {
                await completionRepository.remove(userId, id, todayStr)
            }
            // recompute streak from recent logs (last 60 days)
            const logs = await completionRepository.findRecentByHabit(userId, id, 60)
            // compute current streak ending today
            let current = 0
            let longest = existing.longestStreak || 0
            const daysSet = new Set(logs.map(l => l.date))
            let cursor = new Date()
            while (daysSet.has(cursor.toDateString())) {
                current += 1
                cursor = new Date(cursor.getTime() - 24*60*60*1000)
            }
            longest = Math.max(longest, current)
            patch.currentStreak = current
            patch.longestStreak = longest
            patch.lastCompletedDate = daysSet.has(todayStr) ? todayStr : (existing.lastCompletedDate || null)
        }
        const updatedHabit = await habitRepository.updateByIdAndUser(id, userId, patch)
        return { success: true, data: updatedHabit, message: 'Habit updated successfully' };
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

const deleteHabit = async (id, userId) => {
    if (!validateId(id)) {
        return { success: false, error: 'Invalid ID' };
    }
    try {
        const GetById = await habitRepository.deleteByIdAndUser(id, userId)
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