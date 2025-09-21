const habitService = require('../services/habit.sevice');
const { successResponse, errorResponse } = require('../utils/response');
const { notify } = require('../utils/habitEmitter');

const getAllHabits = async (req, res) => {
    try {
        const result = await habitService.findAll();
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
        const habit = await habitService.findById(req.params.id);
        successResponse(res, 200, habit, 'Habit fetched successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const createHabit = async (req, res) => {
    try {
        const habit = await habitService.create(req.body);
        notify('habitCreated', habit);
        successResponse(res, 201, habit, 'Habit created successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const updateHabit = async (req, res) => {
    try {
        const habit = await habitService.update(req.params.id, req.body);
        notify('habitUpdated', habit);
        successResponse(res, 200, habit, 'Habit updated successfully');
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

const deleteHabit = async (req, res) => {
    try {
        const habit = await habitService.deleteHabit(req.params.id);
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

module.exports = {
    getAllHabits,
    getHabitById,
    createHabit,
    updateHabit,
    deleteHabit,
    getHabitCount
}