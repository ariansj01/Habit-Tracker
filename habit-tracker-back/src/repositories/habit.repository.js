const Habit = require('../models/Habit');

class HabitRepository {
    async findAll() {
        return await Habit.find();
    }

    async findById(id) {
        return await Habit.findById(id);
    }

    async findByEmail(email) {
        return await Habit.findOne({ email });
    }

    async create(habitData) {
        const habit = new Habit(habitData);
        return await habit.save();
    }

    async update(id, habitData) {
        return await Habit.findByIdAndUpdate(id, habitData, { new: true });
    }

    async delete(id) {
        return await Habit.findByIdAndDelete(id);
    }

    async count() {
        return await Habit.countDocuments();
    }
}

module.exports = new HabitRepository();
