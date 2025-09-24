const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompletionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true, index: true },
    date: { type: String, required: true, index: true }, // toDateString()
  },
  { timestamps: true }
);

CompletionSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true });

const Completion = mongoose.models.Completion || mongoose.model('Completion', CompletionSchema);

module.exports = Completion;


