const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, required: true, minlength: 2, maxlength: 50 },
    avatarUrl: { type: String },
    timezone: { type: String },
    settings: {
      weekStart: { type: Number, default: 6 },
      locale: { type: String, default: 'fa-IR' },
      notificationsEmailEnabled: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
