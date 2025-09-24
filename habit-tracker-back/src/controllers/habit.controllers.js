const habitService = require('../services/habit.sevice');
const { successResponse, errorResponse } = require('../utils/response');
const { notify } = require('../utils/habitEmitter');

const getAllHabits = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?._id || req.user?.id || req.query.userId
        const { page, limit, archived } = req.query
        const options = {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            archived: typeof archived !== 'undefined' ? (archived === 'true') : undefined
        }
        const result = await habitService.findAll(userId, options);
        if (result.success) {
            successResponse(res, 200, result.data, 'Habits fetched successfully');
        } else {
            errorResponse(res, 500, result.error);
        }
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const getHabitById = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?._id || req.user?.id || req.query.userId
        const habit = await habitService.findById(req.params.id, userId);
        successResponse(res, 200, habit, 'Habit fetched successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const createHabit = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?._id || req.user?.id || req.body.userId
        const habit = await habitService.create(req.body, userId);
        notify('habitCreated', habit);
        successResponse(res, 201, habit, 'Habit created successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const updateHabit = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?._id || req.user?.id || req.body.userId
        const habit = await habitService.update(req.params.id, req.body, userId);
        notify('habitUpdated', habit);
        successResponse(res, 200, habit, 'Habit updated successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const deleteHabit = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?._id || req.user?.id || req.query.userId
        const habit = await habitService.deleteHabit(req.params.id, userId);
        notify('habitDeleted', habit);
        successResponse(res, 200, habit, 'Habit deleted successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const getHabitCount = async (req, res) => {
    try {
        const habit = await habitService.count();
        notify('habitCount', habit);
        successResponse(res, 200, habit, 'Habit count fetched successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

// Streak endpoints
const getHabitStreak = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?._id || req.user?.id || req.query.userId
        const result = await habitService.findById(req.params.id, userId)
        if (!result?.data) return successResponse(res, 200, { currentStreak: 0, longestStreak: 0, lastCompletedDate: null }, 'No streak')
        const { currentStreak = 0, longestStreak = 0, lastCompletedDate = null } = result.data
        successResponse(res, 200, { currentStreak, longestStreak, lastCompletedDate }, 'Streak fetched successfully')
    } catch (error) {
        errorResponse(res, 500, error.message)
    }
}

const getAllStreaks = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?._id || req.user?.id || req.query.userId
        const result = await habitService.findAll(userId)
        const data = (result?.data || []).map(h => ({
            habitId: h._id,
            currentStreak: h.currentStreak || 0,
            longestStreak: h.longestStreak || 0,
            lastCompletedDate: h.lastCompletedDate || null,
        }))
        successResponse(res, 200, data, 'All streaks')
    } catch (error) {
        errorResponse(res, 500, error.message)
    }
}

// Complete/uncomplete today
const completeHabit = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?._id || req.user?.id || req.body.userId
        const { complete } = req.body || {}
        const id = req.params.id
        const updated = await habitService.update(id, { archived: !!complete }, userId)
        successResponse(res, 200, updated?.data, 'Completion updated')
    } catch (error) {
        errorResponse(res, 500, error.message)
    }
}

module.exports = {
    getAllHabits,
    getHabitById,
    createHabit,
    updateHabit,
    deleteHabit,
    getHabitCount
    , getHabitStreak
    , getAllStreaks
    , completeHabit
}