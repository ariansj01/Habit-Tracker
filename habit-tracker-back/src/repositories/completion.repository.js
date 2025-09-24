const Completion = require('../models/Completion');

class CompletionRepository {
    async upsert(userId, habitId, dateStr) {
        return await Completion.findOneAndUpdate(
            { userId, habitId, date: dateStr },
            { userId, habitId, date: dateStr },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    }

    async remove(userId, habitId, dateStr) {
        return await Completion.findOneAndDelete({ userId, habitId, date: dateStr });
    }

    async findRecentByHabit(userId, habitId, limit = 60) {
        return await Completion.find({ userId, habitId }).sort({ date: -1 }).limit(limit).exec();
    }
}

module.exports = new CompletionRepository();


