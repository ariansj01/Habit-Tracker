const mongoose = require('mongoose');
const { Schema } = mongoose;

const HabitSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    description: { type: String, maxlength: 300 },
    archived: { type: Boolean, default: false, index: true },
    color: { type: String },
    frequency: { type: String, enum: ['daily'], default: 'daily' },
    startDate: { type: String },
    order: { type: Number },
  },
  { timestamps: true }
);

HabitSchema.index({ userId: 1, archived: 1 });
// Optional partial unique index to prevent duplicate active names
// Note: Requires MongoDB 3.2+ for partial indexes
HabitSchema.index(
  { userId: 1, name: 1 },
  { unique: true, partialFilterExpression: { archived: false } }
);

const Habit = mongoose.models.Habit || mongoose.model('Habit', HabitSchema);

module.exports = Habit;
