const redis = require('redis')
const User = require('../models/User')
const Habit = require('../models/Habit')
const client = redis.createClient()


async function getCache() {
    const UserCached = await client.get('Users')
    if(UserCached) return JSON.parse(UserCached)

    const HabitCached = await client.get('Habit')
    if(HabitCached) return JSON.parse(HabitCached)

    const users = await User.find().limit(50)
    client.set('Users' , JSON.stringify(users) , 'EX' , 60)

    const habits = await Habit.find().limit(50)
    client.set('habits' , JSON.stringify(habits) , 'EX' , 60)

    return { users, habits }
}

module.exports = {
    getCache
}