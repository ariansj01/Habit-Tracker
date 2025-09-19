const Joi = require("joi");

const userSchema = Joi.object({
    email: Joi.string().required().email().lowercase().trim(),
    displayName: Joi.string().required().min(2).max(50),
    passwordHash: Joi.string().required(),
    avatarUrl: Joi.string(),
    timezone: Joi.string()
})

const habitSchema = Joi.object({
    name : Joi.string().required().trim().min(5).max(60),
    description : Joi.string().max(60),
    archived : Joi.boolean().default(false),
    color : Joi.string(),
    frequency : Joi.string().default('daily'),
    startDate : Joi.string(),
    order : Joi.number(),
})

module.exports = {
    userSchema,
    habitSchema
}