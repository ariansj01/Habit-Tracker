const Habit = require('../models/Habit');

class HabitRepository {
    async findAll() {
        return await Habit.find();
    }
    async findAllByUser(userId, { archived, limit, skip, sort } = {}) {
        const query = { userId }
        if (typeof archived === 'boolean') query.archived = archived
        const cursor = Habit.find(query)
        if (sort) cursor.sort(sort)
        if (typeof skip === 'number') cursor.skip(skip)
        if (typeof limit === 'number') cursor.limit(limit)
        return await cursor.exec()
    }

    async findById(id) {
        return await Habit.findById(id);
    }

    async findByIdAndUser(id, userId) {
        return await Habit.findOne({ _id: id, userId });
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

    async updateByIdAndUser(id, userId, habitData) {
        return await Habit.findOneAndUpdate({ _id: id, userId }, habitData, { new: true });
    }

    async delete(id) {
        return await Habit.findByIdAndDelete(id);
    }

    async deleteByIdAndUser(id, userId) {
        return await Habit.findOneAndDelete({ _id: id, userId });
    }

    async count() {
        return await Habit.countDocuments();
    }
}

module.exports = new HabitRepository();
